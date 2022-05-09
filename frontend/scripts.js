let ListaProductos = [];
let carro_compra = []
let total = 0;

function añadir(ID_producto, precio) {
    const producto = ListaProductos.find(p => p.id === ID_producto);
    producto.stock--;

    console.log(ID_producto, precio);
    carro_compra.push(ID_producto);
    total = total + precio;
    document.getElementById("carrito").innerHTML = `PAGAR ${total}€`
    mostrarProductos();
}

async function pagar() {
    try {
        const ListaProductos = await (await fetch("/api/pagar", {
            method: "post",
            body: JSON.stringify(carro_compra),
            headers: {
                "Content-Type": "application/json"
            }
        })).json();
    }
    catch {
        window.alert("No hay stock");
    }

    carro_compra = [];
    total = 0;
    await traerProductos();
    document.getElementById("carrito").innerHTML = `PAGAR ${total}`
}

function mostrarProductos() {
    let productosHTML = '';
    ListaProductos.forEach(p => {
        let botonHTML = `<button class="boton_añadir" onclick="añadir(${p.id}, ${p.precio})">Agregar</button>`;

        if (p.stock <= 0) {
            botonHTML = `<button disabled class="boton_añadir disabled" onclick="añadir(${p.id}, ${p.precio})">Sin stock</button>`;
        }

        productosHTML +=
            `<div class="producto">
            <h3>${p.nombre}</h3>
            <img src="${p.imagen}" />
            <h1>$${p.precio}</h1>
            ${botonHTML}
        </div>`
    });
    document.getElementById('contenido_zapas').innerHTML = productosHTML;
}

async function traerProductos() {
    ListaProductos = await (await fetch("/api/productos")).json();
    mostrarProductos();
}

//CON ONLOAD PODEMOS EJECUTAR ACCIONES CUANDO SE HAN TERMINADO DE CARGAR TODOS LOS ELEMENTOS DE LA PÁGINA
window.onload = async () => {
    await traerProductos();
}







