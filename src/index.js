var http = require("http");
const fetch = require("node-fetch");

const format = async (url) => {
  const result = await fetch(url);
  const data = await result.json();

  const allKeys = data.result
    //
    .map((data) => Object.keys(data))
    .reduce((acc, cur) => {
      const set = new Set([...acc, ...cur]);
      return Array.from(set);
    }, []);

  const blankObj = allKeys.reduce(
    (acc, cur) => ({ ...acc, [cur]: "null" }),
    {}
  );

  const cleaned = data.result.map((item) => {
    return { ...blankObj, ...item };
  });

  const cleanedAndFormatted = cleaned.map((item) => {
    const vals = Object.values(item);

    const transformed = vals.map((val) => {
      if (val._type === "image") {
        console.log(val);
      }

      return val;
    });

    return transformed;
  });

  return cleaned;
};

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
