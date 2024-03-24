import session from "express-session";
import express from "express";
import http from "http";
import * as uuid from "uuid";
import { WebSocketServer } from "ws";
import cors from "cors";
import cookieParser from "cookie-parser";

function onSocketError(err) {
  console.error(err);
}

const app = express();
const connections = {};
const rooms = {};

const sessionParser = cookieParser();

const colors = [
  "gray",
  "red",
  "orange",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

const darkness = [400, 700];

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(sessionParser);
app.use((req, res, next) => {
  if (!req.cookies.session) {
    const id = uuid.v4();
    res.cookie("session", id, { maxAge: 900000, httpOnly: true });
  }

  next();
});

app.post("/join", function (req, res) {
  const { roomname, passcode, nickname } = req.body;

  if (roomname in rooms) {
    if (rooms[roomname]["passcode"] !== passcode) {
      res.status(401).send({ error: "Incorrect passcode" });
    } else {
      let id = req.cookies.session;

      const user = rooms[roomname].users.find((user) => user.id === id);

      if (user) {
        user.nickname = nickname;
        user.color = `${chooseRandom(colors)}.${chooseRandom(darkness)}`;
      } else {
        rooms[roomname].users.push({
          id: id,
          nickname,
          color: `${chooseRandom(colors)}.${chooseRandom(darkness)}`,
        });
      }

      res.status(204).send();
    }
  } else {
    rooms[roomname] = {
      users: [
        {
          id: req.cookies.session,
          nickname,
          color: `${chooseRandom(colors)}.${chooseRandom(darkness)}`,
        },
      ],
      passcode: passcode,
    };

    res.status(204).send();
  }
});

const server = http.createServer(app);

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on("upgrade", function (req, socket, head) {
  socket.on("error", onSocketError);

  sessionParser(req, {}, () => {
    // console.log(JSON.stringify(request.cookie.split('-')))

    if (!req.cookies.session) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    socket.removeListener("error", onSocketError);

    wss.handleUpgrade(req, socket, head, function (ws) {
      wss.emit("connection", ws, req);
    });
  });
});

function getCurrentTime() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  let meridiem = "am";

  if (hours >= 12) {
    meridiem = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  }

  if (hours === 0) {
    hours = 12;
  }

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + formattedMinutes + meridiem;
}

wss.on("connection", function (ws, req) {
  const id = req.cookies.session;
  connections[id] = ws;

  console.log(`${id} connecting`);

  ws.on("error", console.error);

  ws.on("message", function (data) {
    console.log(`${id} message ${data.toString()}`);

    try {
      const { roomname, message } = JSON.parse(data.toString());

      if (roomname in rooms) {
        const user = rooms[roomname].users.find((user) => user.id === id);
        console.log(user);
        if (user) {
          rooms[roomname].users.forEach((otherUser) => {
            console.log(`Pushing message to ${otherUser.id}`);
            connections[otherUser.id].send(
              JSON.stringify({
                nickname: user.nickname,
                roomname,
                message,
                isUser: otherUser.id === id,
                color: user.color,
                time: getCurrentTime(),
              })
            );
          });
        }
      }
    } catch {}
  });

  ws.on("close", function () {
    console.log(`${id} disconnected`);

    delete connections.id;
  });
});

//
// Start the server.
//
server.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
