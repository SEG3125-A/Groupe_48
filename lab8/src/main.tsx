import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import Room from "./Room.tsx";
import Home from "./Home.tsx";
import Guide from "./Guide.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Guide />
    </ChakraProvider>
  </React.StrictMode>
);
