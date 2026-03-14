import { render } from "./entry.server.js";

const url = process.argv[2] || "/";

const html = render(url);

console.log(html);