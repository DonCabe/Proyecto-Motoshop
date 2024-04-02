//const opcMenuPrinc = 3;    //cantidad de opciones en el menú principal
//const txtMenuPrincipal = 'Ingrese el número de la opción que desea. \n 1 - Motos \n 2 - Accesorios \n 0 - Finalizar'; //Texto del menú principal
const dolarHoy = 1010

class Moto {
    static id = 0
    constructor (marca, modelo, precio) {
        this.id = ++Moto.id,
        this.producto = marca + " - " + modelo,
        this.precio = precio * dolarHoy
    }
};

// class Accesorio {
//     static id = 0
//     constructor (producto, precio)
//     {
//         this.id = ++Accesorio.id,
//         this.producto = producto
//         this.precio = precio * dolarHoy
//     }
// };

patentamiento = (precio) => {   //función para calcular el costo del patentamiento de la moto
    precio = precio * 0.09      //el costo del patentamiento es un 9% del valor en pesos
    return precio
};

const moto1 = new Moto ('Honda','Wave',1700)
const moto2 = new Moto ('Honda','XR250',5500)
const moto3 = new Moto ('Yamaha','FZ X',2400)
const moto4 = new Moto ('Yamaha','YBR125',2600)
const moto5 = new Moto ('Suzuki','GN125',2600)
const moto6 = new Moto ('Suzuki','GSX125',2600)

const motos = [moto1, moto2, moto3, moto4, moto5, moto6];

// const accesorio1 = new Accesorio ('Casco Hawk',50)
// const accesorio2 = new Accesorio ('Casco LS2',150)
// const accesorio3 = new Accesorio ('Baulera',70)
// const accesorio4 = new Accesorio ('Piloto Lluvia',30)
// const accesorio5 = new Accesorio ('Campera Ref.',300)
// const accesorio6 = new Accesorio ('Guantes Ref.',30)
// const accesorio7 = new Accesorio ('Cadena',15)
// const accesorio8 = new Accesorio ('Traba Disco',30)

// const accesorios = [accesorio1, accesorio2, accesorio3, accesorio4, accesorio5, accesorio6, accesorio7, accesorio8];

let motocicletasMenu = document.getElementById("motocicletas")
motocicletasMenu.onclick = () => {
    renderMotos(motos)
}

let accesoriosMenu = document.getElementById("accesorios")
accesoriosMenu.onclick = () => {
    alert("Proximamente.")      //aún no me dió el tiempo
}

let cartProducts
let cartProductsLS = localStorage.getItem("cartProducts")  //inicializo el array del carrito con el contenido del LocalStorage
if(cartProducts){
    cartProducts = JSON.parse(cartProductsJS)
} else {
    cartProducts = []
}

let productsContainer = document.getElementById("producto-lista")   //

function renderMotos(productsArray) {    //Función para renderizar las motos
    productsArray.forEach (producto => {
        const card = document.createElement ("div")
        card.innerHTML = `<div class="producto">
                          <img src="FotoMoto.jpg" alt="FotoMoto">
                          <h2>${producto.producto}</h2>
                          <p>Precio: $${producto.precio}</p>
                          <p>Patentamiento: $${patentamiento(producto.precio)}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>
                          </div>`        
        productsContainer.appendChild(card) 
    });
    AddToCartButton(productsArray)
};

//Función para agregar items de un array(lista) al carrito
function AddToCartButton () {
    let addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach (button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = motos.find (producto => producto.id == productId)
            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    })
};

console.log('Gracias por utilizar Motoshop.');  //saludo cordial