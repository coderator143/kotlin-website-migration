const { render } = require("./dist/server.js");

const url = process.argv[2] || "/";

render(url).then((html) => {
  console.log(html);
});