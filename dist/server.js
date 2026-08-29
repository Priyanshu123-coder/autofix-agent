const http = require("http");
const fs = require("fs");
const path = require("path");
const net = require("net");

const PUBLIC_DIR = path.resolve(__dirname, "../public");

function createHandler() {
  return (req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === "/" ? "index.html" : req.url);
    
    if (!fs.existsSync(filePath)) {
      filePath = path.join(PUBLIC_DIR, "index.html");
    }

    const ext = path.extname(filePath);
    const contentType = ext === ".js" ? "application/javascript" : ext === ".css" ? "text/css" : "text/html";

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    });
  };
}

function findOpenPort(startPort, callback) {
  const tester = net.createServer();
  tester.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      findOpenPort(startPort + 1, callback);
    } else {
      callback(startPort);
    }
  });
  tester.once("listening", () => {
    tester.close(() => callback(startPort));
  });
  tester.listen(startPort);
}

findOpenPort(3000, (availablePort) => {
  const server = http.createServer(createHandler());
  server.listen(availablePort, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 AutoFix-Agent Visual Web Dashboard is LIVE!`);
    console.log(`👉 Open your browser at: http://localhost:${availablePort}`);
    console.log(`=================================================\n`);
  });
});
