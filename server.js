const { createServer } = require("http");
const { parse } = require("url");
const { join } = require("path");
const next = require("next");
const { detailPrefix } = require("./config/server-config");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const issueJSON = require("./issue.json");

// Root files.
const rootStaticFiles = ["/favicon.ico", "/assets"];

const cacheSet = new Set();
Object.keys(issueJSON).forEach(item => {
  cacheSet.add(item);
});

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    // const [, key] = pathname.match(/\/detail\/(\d+?)$/i) || [];
    // 静态文件
    // console.log(pathname.indexOf(detailPrefix) === 0);

    if (
      rootStaticFiles.filter(file => pathname.indexOf(file) > -1).length > 0
    ) {
      const path = join(__dirname, "static", pathname);
      app.serveStatic(req, res, path);
    } else if (pathname.indexOf(detailPrefix) === 0) {
      const matchRegExp = new RegExp(detailPrefix + "/([\\s\\S]+)");
      const [, id] = pathname.match(matchRegExp) || [];

      if (!cacheSet.has(id)) {
        app.render(req, res, "/404");
        return;
      }
      // Code path for posts in content/posts
      query.id = id;
      app.render(req, res, detailPrefix + "/" + id, query);
    } else {
      // Default code path
      handle(req, res, parsedUrl);
    }
  }).listen(3333, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3333");
  });
});
