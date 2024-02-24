import express from "express";
import { JSONFilePreset } from "lowdb/node";
import ejs from "ejs";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const db = await JSONFilePreset("db.json", { surveys: [] });

app.engine(".html", ejs.__express);

app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`Received request ${req.method} ${req.url}`);

  next();
});

app.get("/survey", (req, res) => {
  console.log("hello");
  res.render("survey");
});

app.get("/analysis", (req, res) => {
  const { surveys } = db.data;

  res.render("analysis", { surveys });
});

app.post("/surveys", async (req, res) => {
  const survey = req.body;
  survey.videoType ??= [];
  survey.videoType = Array.isArray(survey.videoType)
    ? survey.videoType
    : [survey.videoType];

  await db.update(({ surveys }) => {
    surveys.push(survey);
  });

  res.redirect("/survey?submitted");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
