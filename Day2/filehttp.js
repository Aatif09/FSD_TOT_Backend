const http = require('http');
const server = http.createServer(async (req, res) => {
  console.log(req.url);
  // console.log(Object.keys(req))
  res.setHeader('Content-Type', 'text/html');
  const response = await fetch("https://dummyjson.com/products/1");

  const data = await response.json();
  // res.end(data.title)
  res.end(JSON.stringify(data));
  console.log(data)
  // res.end("<h1 style='color:red'>Hello World</h1>");
})
server.listen(3000);
// server.listen(() => {
//   const addr = server.address();
//   console.log("Server running on port", addr.port);
// });