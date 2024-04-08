//const opcMenuPrinc = 3;    //cantidad de opciones en el menú principal
//const txtMenuPrincipal = 'Ingrese el número de la opción que desea. \n 1 - Motos \n 2 - Accesorios \n 0 - Finalizar'; //Texto del menú principal
const dolarHoy = 1010

class Moto {
    static id = 0
    constructor (marca, modelo, precio, img) {
        this.id = ++Moto.id,
        this.producto = marca + " - " + modelo,
        this.precio = precio * dolarHoy,
        this.img = img
    }
};

// class Accesorio {
//     static id = 0
//     constructor (producto, precio, img)
//     {
//         this.id = ++Accesorio.id,
//         this.producto = producto
//         this.precio = precio * dolarHoy,
//         this.img = img
//     }
// };

const datosContacto = {
    nombre: "Martín Perez",
    telefono: "11-2345-6789",
    correo: "mperez.motoshop@gmail.com"
};

patentamiento = (precio) => {   //función para calcular el costo del patentamiento de la moto
    precio = precio * 0.09      //el costo del patentamiento es un 9% del valor en pesos
    return precio
};

const moto1 = new Moto ('Honda','Wave',1700,"");
const moto2 = new Moto ('Honda','XR250',5500,"");
const moto3 = new Moto ('Yamaha','FZ X',2400,"");
const moto4 = new Moto ('Yamaha','YBR125',2600,"");
const moto5 = new Moto ('Suzuki','GN125',2600,"");
const moto6 = new Moto ('Suzuki','GSX125',2600,"");

const motos = [moto1, moto2, moto3, moto4, moto5, moto6];

// const accesorio1 = new Accesorio ('Casco Hawk',50,"");
// const accesorio2 = new Accesorio ('Casco LS2',150,"");
// const accesorio3 = new Accesorio ('Baulera',70,"");
// const accesorio4 = new Accesorio ('Piloto Lluvia',30,"");
// const accesorio5 = new Accesorio ('Campera Ref.',300,"");
// const accesorio6 = new Accesorio ('Guantes Ref.',30,"");
// const accesorio7 = new Accesorio ('Cadena',15,"");
// const accesorio8 = new Accesorio ('Traba Disco',30,"");

// const accesorios = [accesorio1, accesorio2, accesorio3, accesorio4, accesorio5, accesorio6, accesorio7, accesorio8];


//muestra los accesorios
let motocicletasMenu = document.getElementById("motocicletas")
motocicletasMenu.onclick = () => {
    renderProductos(motos);
}

//muestra los accesorios
let accesoriosMenu = document.getElementById("accesorios")
accesoriosMenu.onclick = () => {
    // renderProductos(accesorios);
    alert("Próximamente.")
}

//tarjeta de contacto
let contactoMenu = document.getElementById("contacto")
contactoMenu.onclick = () => {
    let limpiar = document.getElementById("producto-lista");
    limpiar.innerHTML = "";
    const card = document.createElement ("div");
    card.className = "card";
    card.innerHTML = `<h2>${datosContacto.nombre}</h2>
                      <h3>Tel.: ${datosContacto.telefono}</h3>
                      <h3>Mail: ${datosContacto.correo}</h3>`        
    productsContainer.appendChild(card)
}


let cartProducts = [];
let cartProductsLS = localStorage.getItem("cartProducts");  //inicializo el array del carrito con el contenido del LocalStorage
if(cartProductsLS){
    cartProducts = JSON.parse(cartProductsLS);
} else {
    cartProducts = [];
}

let productsContainer = document.getElementById("producto-lista");   //

function renderProductos(productsArray) {    //Función para renderizar las motos o accesorios
    let limpiar = document.getElementById("producto-lista");
    limpiar.innerHTML = "";
    productsArray.forEach (producto => {
        const card = document.createElement ("div");
        card.className = "card";
        card.innerHTML = `<img src="${producto.img}" alt="img ${producto.producto}">
                          <h2>${producto.producto}</h2>
                          <p>Precio: $${producto.precio}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`
        productsContainer.appendChild(card)
    });
    addToCartButton(productsArray)
};

//Función para agregar items de un array(lista) al carrito
function addToCartButton (producto) {
    let addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach (button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = producto.find (producto => producto.id == productId)
            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
};

console.log('Gracias por utilizar Motoshop.');      //saludo cordial