// frontend/render.js
const { render } = require("./dist/server.js");

const url = process.argv[2] || "/";

render(url)
  .then((html) => {
    if (!html) {
      // This goes to stderr, so it won't break the Python string
      // but will show up in your terminal
      console.error("SSR Error: Render returned empty string");
      process.exit(1);
    }
    process.stdout.write(html);
  })
  .catch((err) => {
    console.error("SSR Fatal Error:", err);
    process.exit(1);
  });
