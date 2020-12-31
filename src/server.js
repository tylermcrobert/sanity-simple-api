var http = require("http");

export const createServer = (format) => {
  http
    .createServer(async function (req, res) {
      const url = req.url.split("/?url=")[1];
      res.setHeader("Content-Type", "application/json");

      if (!url) {
        res.end(JSON.stringify({ error: true, message: "Please include URL" }));
      }

      const formatted = await format(url);

      res.end(JSON.stringify(formatted));
    })
    .listen(8080); //the server object listens on port 8080
};
