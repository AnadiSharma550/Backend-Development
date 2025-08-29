import http from "http";

let todos = [
  { id: 1, task: "Learn Node.js", done: false },
  { id: 2, task: "Build an API", done: false }
];

// Helper to send JSON responses
function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Create server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // GET: Fetch all todos
  if (url === "/todos" && method === "GET") {
    return sendJson(res, 200, todos);
  }

  // POST: Add new todo
  if (url === "/todos" && method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        const newTodo = { id: todos.length + 1, ...data };
        todos.push(newTodo);
        sendJson(res, 201, newTodo);
      } catch {
        sendJson(res, 400, { error: "Invalid JSON" });
      }
    });
    return;
  }

  // PUT: Update todo by id
  if (url.startsWith("/todos/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const data = JSON.parse(body || "{}");
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) return sendJson(res, 404, { error: "Todo not found" });
        todos[index] = { ...todos[index], ...data };
        sendJson(res, 200, todos[index]);
      } catch {
        sendJson(res, 400, { error: "Invalid JSON" });
      }
    });
    return;
  }

  // DELETE: Remove todo by id
  if (url.startsWith("/todos/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    todos = todos.filter(t => t.id !== id);
    return sendJson(res, 200, { message: "Todo deleted" });
  }

  // Fallback: Not found
  sendJson(res, 404, { error: "Route not found" });
});

// Start server
server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
