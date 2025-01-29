const http = require('http');
const fspromises = require('fs/promises');
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  if (req.method == 'GET' && req.url == '/about') {
    res.end("<h1>Hello World</h1>");
  }
  else if (req.url == '/error') {
    const a = await fspromises.readFile("./pages/error.html");
    res.end(a)
  }
  else {
    const a = await fspromises.readFile("./pages/home.html");
    res.end(a)
    // res.end("<h1 style='color:red'>Error..No, Data Associated with /msg</h1>");
  }
})
server.listen(3003, () => {
  console.log("Server running on", 3003);
})