const { render } = require("./dist/server.js");

const url = process.argv[2] || "/";

render(url)
  .then((html) => {
    if (!html) {
      console.error("SSR Error: Render returned empty string");
      process.exit(1);
    }
    process.stdout.write(html.trim());
  })
  .catch((err) => {
    console.error("SSR Fatal Error:", err);
    process.exit(1);
  });
