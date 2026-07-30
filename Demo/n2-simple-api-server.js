/**
 * simple-api-server.js
 *
 * Demonstrates:
 * ✔ http module
 * ✔ EventEmitter
 * ✔ GET requests
 * ✔ POST requests
 * ✔ DELETE requests
 * ✔ HTTP Status Codes
 *
 * Run:
 * node simple-api-server.js
 */

const http = require("http");
const { EventEmitter } = require("events");

// =====================================
// Event Logger
// =====================================

const activityLogger = new EventEmitter();

activityLogger.on("activity", ({ method, url }) => {
    console.log(
        `[${new Date().toLocaleTimeString()}] ${method} ${url}`
    );
});

// =====================================
// Sample Data
// =====================================

let members = [
    { id: 1, name: "Kyle" },
    { id: 2, name: "John" },
    { id: 3, name: "Maria" }
];

// =====================================
// Send JSON Response
// =====================================

function reply(res, status, data) {

    res.writeHead(status, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data, null, 2));
}

// =====================================
// GET Home
// =====================================

function showHome(res) {

    reply(res, 200, {
        message: "Welcome to the Simple API Server"
    });
}

// =====================================
// GET Members
// =====================================

function listMembers(res) {

    reply(res, 200, members);
}

// =====================================
// POST Member
// =====================================

function addMember(req, res) {

    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {

        try {

            const data = JSON.parse(body);

            if (!data.name) {
                return reply(res, 400, {
                    message: "Member name is required."
                });
            }

            const member = {
                id: members.length + 1,
                name: data.name
            };

            members.push(member);

            reply(res, 201, {
                success: true,
                member
            });

        } catch {

            reply(res, 400, {
                message: "Invalid JSON."
            });

        }

    });

}

// =====================================
// DELETE Member
// Example:
// DELETE /members/2
// =====================================

function removeMember(req, res) {

    const id = Number(req.url.split("/")[2]);

    const index = members.findIndex(member => member.id === id);

    if (index === -1) {

        return reply(res, 404, {
            message: "Member not found."
        });

    }

    const deleted = members.splice(index, 1);

    reply(res, 200, {
        success: true,
        deleted: deleted[0]
    });

}

// =====================================
// Server
// =====================================

const server = http.createServer((req, res) => {

    activityLogger.emit("activity", {
        method: req.method,
        url: req.url
    });

    if (req.method === "GET" && req.url === "/") {

        showHome(res);

    }
    else if (req.method === "GET" && req.url === "/members") {

        listMembers(res);

    }
    else if (req.method === "POST" && req.url === "/members") {

        addMember(req, res);

    }
    else if (
        req.method === "DELETE" &&
        req.url.startsWith("/members/")
    ) {

        removeMember(req, res);

    }
    else {

        reply(res, 404, {
            error: "Page or API endpoint not found."
        });

    }

});

// =====================================
// Start Server
// =====================================

const PORT = 3000;

server.listen(PORT, () => {

    console.log("=================================");
    console.log(`Server is running on Port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log("=================================");

});