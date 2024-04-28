const dolarHoy = 1010
// fetch("/https://dolarapi.com/v1dolares/blue")
//   .then(response => response.json())
//   .then(data => console.log(data));

enPesos = (precio) => {
    return precio * dolarHoy
}

const datosContacto = {
    nombre: "Martín Perez",
    telefono: "11-2345-6789",
    email: "mperez.motoshop@gmail.com"
};

patentamiento = (precio) => {   //función para calcular el costo del patentamiento de la moto
    precio = precio * 0.09      //el costo del patentamiento es un 9% del valor en pesos
    return precio
};

const container = document.getElementById("product-container");
const mainMenu = document.getElementById("menu-principal");

//muestra el menú de inicio
let inicioMenu = document.getElementById("inicio")
inicioMenu.onclick = () => {
    renderInicio();
}

//muestra las motocicletas
let motocicletasMenu = document.getElementById("motocicletas")
motocicletasMenu.onclick = () => {
    renderProductos(true);
}

//muestra los accesorios
let accesoriosMenu = document.getElementById("accesorios")
accesoriosMenu.onclick = () => {
    // imagen.src
    renderProductos(false);
}

//Inicializo el carrito y el almacenamiento del mismo
let cartProducts = [];
let cartProductsLS = localStorage.getItem("cartProducts");  //inicializo el array del carrito con el contenido del LocalStorage
if(cartProductsLS){
    cartProducts = JSON.parse(cartProductsLS);
}

//Inicializo el array de motos que le interesaron al usuario.
let consultedBikes = [];

renderInicio = () => {      //función de renderizado del menú de inicio
    container.innerHTML = "";
    mainMenu.innerHTML = "";
    mainMenu.style.backgroundImage = "url('./images/fondos/bg-main.jpg')";
    const titulo = document.createElement ("div");
    titulo.className = "menu";
    titulo.innerHTML = `<h2>Bienvenido a MotoShop</h2>
                        <p>Elija qué quiere buscar con los botones del menú.</p>`;
                        mainMenu.appendChild(titulo)
    const card = document.createElement ("div");
    card.className = "ventanas";
    card.innerHTML = `<span><h3 id="acces">Accesorios</h3></span>
                      <span><h3 id="motos">Motocicletas</h3></span>`
    container.appendChild(card)
}

//tarjeta de contacto
let contactoMenu = document.getElementById("contacto")
contactoMenu.onclick = () => {
    mainMenu.innerHTML = "";
    mainMenu.style.backgroundImage = "url('./images/fondos/bg-consulta.jpg')";
    container.innerHTML = "";
    const card = document.createElement ("div");
    card.className = "contacto";
    card.innerHTML = `<h2>${datosContacto.nombre}</h2>
                      <h3>Tel.: ${datosContacto.telefono}</h3>
                      <h3>Mail: ${datosContacto.email}</h3>`;
    container.appendChild(card)
}

function renderProductos(bandera) {     //función para renderizar las motos o accesorios
    mainMenu.innerHTML = "";
    container.innerHTML = "";
    if (bandera) {                      //recibe un booleano y en base a eso renderiza motos o accesorios
        mainMenu.style.backgroundImage = "url('./images/fondos/bg-motos.jpg')";
        fetch('./db/motos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
                const card = document.createElement ("div");
                card.className = "card";
                card.innerHTML = `<h2>${producto.marca}</h2>
                                  <img src="${producto.img}" alt="img ${producto.modelo}">
                                  <h3>${producto.modelo}</h3>
                                  <p>Precio: $${enPesos(producto.precio)}</p>
                                  <button class="consulta" id="${producto.id}">Consultar</button>`
                container.appendChild(card)
            })
            consultButton(data)
        })
        .catch(error => {
            console.log('Error fetching products:', error);
        });
    } else {
        mainMenu.style.backgroundImage = "url('./images/fondos/bg-accesorios.jpg')";
        fetch('./db/accesorios.json')
        .then(response => response.json())
        .then(data => {
            data.forEach (producto => {
                const card = document.createElement ("div");
                card.className = "card";
                card.innerHTML = `<img src="${producto.img}" alt="img ${producto.producto}">
                                    <h2>${producto.producto}</h2>
                                    <p>Precio: $${enPesos(producto.precio)}</p>
                                    <button class="productoAgregar" id="${producto.id}">Agregar</button>`
                    container.appendChild(card)
            });
            addToCartButton(data) 
        })
        .catch(error => {
            console.log('Error fetching products:', error);
        });
    }
}

function addToCartButton (producto) {           //Función para agregar items de un array(lista) al carrito
    let addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach (button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            if (cartProducts.some((carrito) => carrito.id == productId)) {
                cartProducts.find((carrito) => carrito.id == productId).cantidad++;
            } else {
                const selectedProduct = producto.find((p) => p.id == productId);
                selectedProduct.cantidad = 1;
                selectedProduct.precio = enPesos(selectedProduct.precio)
                cartProducts.push(selectedProduct);
            }
            //toastify agregado al carrito!
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
};

function consultButton (producto) {
    let addButton = document.querySelectorAll(".consulta")
    addButton.forEach (button => {
        button.onclick = (e) => {
            const bikeId = e.currentTarget.id;
            const selectedBike = producto.find(producto => producto.id == bikeId)
            //mejorar con SweetAlert HTML TextBox
            consultedBikes.push(selectedBike);
            console.log(prompt("Ingrese datos bla bla bla"))
            console.log(consultedBikes)
        }
    })
}

renderInicio();