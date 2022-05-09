//REQUIERE EXPRESS, EL FRAMEWORK DE NODE
const express = require("express");

const bodyParser = require("body-parser");

//INICIALIZA LA APP
const app = express();

//USA EL PUERTO 3000
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let productos = [
    {
        id: 1, nombre: "ZOOM SEPARATE", precio: 149 + "€", imagen: "img/separate.jpg", stock: 30,
    },
    {
        id: 2, nombre: "JORDAN 36", precio: 189 + "€", imagen: "img/jordan36.jpg", stock: 50,
    },
    {
        id: 3, nombre: "WHY NOT.5", precio: 139 + "€", imagen: "img/whynot.jpg", stock: 30,
    },
    {
        id: 4, nombre: "ZION 1", precio: 129 + "€", imagen: "img/zion1.jpg", stock: 50,
    },
    {
        id: 5, nombre: "ONE TAKE 3", precio: 89 + "€", imagen: "img/onetake3.jpg", stock: 30,
    },
    {
        id: 6, nombre: "KD 14", precio: 149 + "€", imagen: "img/kd14.jpg", stock: 50,
    },
    {
        id: 7, nombre: "KYRIE 8", precio: 129 + "€", imagen: "img/kyrie8.jpg", stock: 50,
    },
    {
        id: 8, nombre: "LEBRON 19", precio: 189 + "€", imagen: "img/lebron19.jpg", stock: 50,
    },
    {
        id: 9, nombre: "GIANNIS INMORTALITY", precio: 79 + "€", imagen: "img/inmortality.jpg", stock: 50,
    },
    {
        id: 10, nombre: "PG6", precio: 99 + "€", imagen: "img/pg6.jpg", stock: 50,
    },
    {
        id: 11, nombre: "TRAE YOUNG 1", precio: 109 + "€", imagen: "img/trae1.jpg", stock: 30,
    },
    {
        id: 12, nombre: "TRAE YOUNG 1", precio: 109 + "€", imagen: "img/trae1_2.jpg", stock: 30,
    },
    {
        id: 13, nombre: "DON ISSUE 3", precio: 149 + "€", imagen: "img/donissue3.jpg", stock: 20,
    },
    {
        id: 14, nombre: "DAME 8", precio: 109 + "€", imagen: "img/dame8.jpg", stock: 20,
    },
    {
        id: 15, nombre: "HARDEN VOL.6", precio: 149 + "€", imagen: "img/harden6.jpg", stock: 50,
    },
    {
        id: 10, nombre: "CURRY ", precio: 159 + "€", imagen: "img/curry9.jpg", stock: 50,
    },
    {
        id: 10, nombre: "SC 3ZERO IV", precio: 59 + "€", imagen: "img/sc3zero.jpg", stock: 20,
    },
    {
        id: 10, nombre: "FLOW FUTR X", precio: 79 + "€", imagen: "img/flowfutr.jpg", stock: 20,
    },
    {
        id: 10, nombre: "SPAWN LOW 3", precio: 69 + "€", imagen: "img/spawn3.jpg", stock: 20,
    },
    {
        id: 10, nombre: "SPAWN LOW 4", precio: 99 + "€", imagen: "img/spawn4.jpg", stock: 20,
    }
]

//RETORNA LA LISTA DE PRODUCTOS
app.get("/api/productos", (req, res) => {
    res.send(productos)
})

app.post("/api/pagar", (req, res) => {
    const ids = req.body;
    const prod = productos.map((p) => ({ ...p }));
    ids.forEach((id) => {
        const producto = prod.find((p) => p.id === id);
        if (producto.stock > 0) {
            producto.stock--;
        } else {
            throw "No hay stock";
        }
    });
    productos = prod;
    res.send(productos);
});

//
app.use("/", express.static("frontend"));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});