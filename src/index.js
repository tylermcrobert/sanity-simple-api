/************************************************
 *
 * Formats a list of sanity
 * documents for use in Figma
 *
 ************************************************/
var http = require("http");
const fetch = require("node-fetch");

const format = async (url) => {
  const result = await fetch(url);
  const data = await result.json();

  /**
   * Get each key in doc array
   */
  const allKeys = data.result
    //
    .map((data) => Object.keys(data))
    .reduce((acc, cur) => {
      const set = new Set([...acc, ...cur]);
      return Array.from(set);
    }, []);

  /**
   * Fill in missing values
   */
  const blankObj = allKeys.reduce(
    (acc, cur) => ({ ...acc, [cur]: "null" }),
    {}
  );

  /**
   * Include null vals
   */
  const cleaned = data.result.map((item) => {
    return { ...blankObj, ...item };
  });

  /**
   * Transform dates from ISO and images
   * TODO: transform date
   * TODO: transform images
   */

  //   const cleanedAndFormatted = cleaned.map((item) => {
  //     const vals = Object.values(item);

  //     const transformed = vals.map((val) => {
  //       if (val._type === "image") {
  //         console.log(val);
  //       }

  //       return val;
  //     });

  //     return transformed;
  //   });

  //   return cleaned;
};

/**
 * Start server
 */

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
