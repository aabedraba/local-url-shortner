import express from "express";

const server = express();

const resources = [{ tag: "business", url: "business.greenmobility.com" }];

server.get("/", (req, res) => {
  const query = req.query;
  const internalUrl = query.url;
  if (internalUrl.includes("go/")) {
    const resource = internalUrl.split("go/")[1];
    const redirect = resources.find((r) => r.tag === resource);
    if (redirect) {
      res.redirect("https://" + redirect.url);
    } else {
      res.send("Non existing resource");
    }
  } else {
    res.redirect(`https://google.com/search?q=${query.url}`);
  }
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
