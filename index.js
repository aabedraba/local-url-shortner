import express from "express";
import bodyParser from "body-parser";
import { appendFile } from "fs";

const server = express();
// server.use(bodyParser.json());

const resources = [{ tag: "business", url: "business.greenmobility.com" }];

server.get("/", (req, res) => {
  const query = req.query;
  const internalUrl = query.url;
  if (internalUrl.includes("go/")) {
    if (internalUrl === "go/create") {
      return res.redirect("/create");
    }
    const resource = internalUrl.split("go/")[1];
    const redirect = resources.find((r) => r.tag === resource);
    if (redirect) {
      return res.redirect("https://" + redirect.url);
    } else {
      return res.send("Non existing resource");
    }
  } else {
    return res.redirect(`https://google.com/search?q=${query.url}`);
  }
});

server.get("/create", (req, res) => {
  return res.sendFile(__dirname + "/pages/create/index.html");
});

server.get("/add", (req, res) => {
  const query = req.query;
  if (!query.keyword || !query.url) {
    return res.send("Wrong parameters");
  }

  appendFile(
    "./resources.csv",
    `${query.keyword}=${query.url}\n`,
    "utf8",
    (err) => {
      if (err) console.log(err);
    }
  );

  return res.send("Added");
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
