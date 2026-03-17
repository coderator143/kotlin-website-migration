const { render } = require("./dist/server.js");

const url = process.argv[2] || "/";

render(url)
  .then((html) => {
    // Trimming removes \n or spaces that cause "Text Node" mismatches
    const cleanHtml = html.replace(/>\s+</g, '><').trim(); 
    process.stdout.write(cleanHtml);
  })
  .catch((err) => {
    console.error("SSR Fatal Error:", err);
    process.exit(1);
  });
