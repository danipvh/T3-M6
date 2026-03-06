let productos = [];

async function cargarProductos() {

    const res = await fetch("/productos");

    productos = await res.json();

    mostrarProductos();
}

function mostrarProductos() {

    const orden = document.getElementById("orden").value;

    let lista = [...productos];

    if (orden === "nombre") {

        lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    } else {

        lista.sort((a, b) => a.precio - b.precio);

    }

    const contenedor = document.getElementById("lista");

    contenedor.innerHTML = "";

    lista.forEach(p => {

        const item = document.createElement("div");

        item.innerHTML = `<b>${p.nombre}</b> - $${p.precio.toLocaleString()}`;

        contenedor.appendChild(item);

    });

}

async function agregarProducto() {

    const nombre = document.getElementById("nombre").value;

    const precio = document.getElementById("precio").value;

    await fetch("/productos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre,
            precio
        })

    });

    cargarProductos();

}