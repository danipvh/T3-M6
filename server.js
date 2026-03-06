const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;
const FILE = "productos.txt";

const server = http.createServer(async (req, res) => {

    // SERVIR ARCHIVOS DEL CLIENTE
    if (req.method === "GET" && req.url === "/") {

        const html = await fs.readFile("./public/index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(html);

    }

    if (req.method === "GET" && req.url === "/script.js") {

        const js = await fs.readFile("./public/script.js");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        return res.end(js);

    }

    if (req.method === "GET" && req.url === "/style.css") {

        const css = await fs.readFile("./public/style.css");
        res.writeHead(200, { "Content-Type": "text/css" });
        return res.end(css);

    }

    if (req.method === "GET" && req.url === "/producto.jpg") {

        const img = await fs.readFile("./public/producto.jpg");
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        return res.end(img);

    }

    // API REST GET
    if (req.method === "GET" && req.url === "/productos") {

        try {

            const data = await fs.readFile(FILE, "utf8");

            const productos = data
                .trim()
                .split("\n")
                .map(linea => {

                    const [nombre, precio] = linea.split(",");

                    return {
                        nombre: nombre.trim(),
                        precio: Number(precio)
                    };

                });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(productos));

        } catch (error) {

            res.writeHead(500);
            res.end(JSON.stringify({ error: "Error leyendo archivo" }));

        }

        return;
    }

    // API REST POST
    if (req.method === "POST" && req.url === "/productos") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            try {

                const producto = JSON.parse(body);

                if (!producto.nombre || !producto.precio) {

                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Datos inválidos" }));

                }

                const linea = `\n${producto.nombre},${producto.precio}`;

                await fs.appendFile(FILE, linea);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ mensaje: "Producto agregado" }));

            } catch {

                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "JSON inválido" }));

            }

        });

        return;
    }

    // MÉTODO NO PERMITIDO
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Método no permitido" }));

});

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});