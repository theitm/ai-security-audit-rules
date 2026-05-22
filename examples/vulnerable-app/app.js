/* eslint-disable */
// DELIBERATELY VULNERABLE — DO NOT DEPLOY.
// This file plants 7 bugs for AI agents to find. See README.md.

const express = require("express");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const sqlite3 = require("sqlite3").verbose();
const http = require("http");

const app = express();
app.use(express.json());

// BUG 4: Hardcoded secret in source.
const JWT_SECRET = "supersecret-change-me-in-prod-pls";

const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, note TEXT)");
  // BUG 5: Password stored in plaintext.
  db.run("INSERT INTO users (username, password) VALUES ('alice', 'alice123'), ('bob', 'bob123')");
  db.run("INSERT INTO orders (user_id, amount, note) VALUES (1, 99.99, 'alice order'), (2, 199.99, 'bob secret order')");
});

function authMiddleware(req, res, next) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/, "");
  try {
    // BUG 6: jwt.verify without algorithm pinning, accepts alg:none.
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: "unauth" });
  }
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // BUG 5 again: plaintext compare. Also BUG 7-adjacent: user enumeration via different errors.
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (!row) return res.status(401).json({ error: "bad creds" });
    const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET);
    res.json({ token });
  });
});

// BUG 1: IDOR — no ownership check.
app.get("/orders/:id", authMiddleware, (req, res) => {
  db.get("SELECT * FROM orders WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: "not found" });
    res.json(row);
  });
});

// BUG 2: SQL injection via string concatenation.
app.get("/search", (req, res) => {
  const q = req.query.q || "";
  db.all("SELECT id, username FROM users WHERE username LIKE '%" + q + "%'", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// BUG 3: Command injection via shell.
app.post("/ping", (req, res) => {
  const host = req.body.host || "127.0.0.1";
  exec(`ping -c 1 ${host}`, (err, stdout) => {
    res.json({ output: stdout || (err && err.message) });
  });
});

// BUG 7: SSRF — fetches any URL the user provides.
app.get("/fetch", (req, res) => {
  const url = req.query.url;
  http.get(url, (proxied) => {
    let data = "";
    proxied.on("data", (chunk) => (data += chunk));
    proxied.on("end", () => res.send(data));
  }).on("error", (e) => res.status(500).send(e.message));
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`vulnerable demo on :${PORT}`));
}

module.exports = app;
