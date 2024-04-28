let cartProducts = [];      //inicializo el carrito
let cartProductsLS = localStorage.getItem("cartProducts");  //inicializo el array del carrito con el contenido del LocalStorage
if(cartProductsLS){         //confirmo que no sea null
    cartProducts = JSON.parse(cartProductsLS);
}

let cartContainer = document.getElementById("cart-selection")

renderCarrito = () => {    //Función para renderizar los items del carrito
    cartContainer.innerHTML = "";
    const cuenta = document.querySelector("#cuenta")    
    if (cartProducts.length != 0) {
        cartProducts.forEach(producto => {
            const cart = document.createElement("div")
            cart.className = "cart-item";
            cart.innerHTML = `<!-- <img src="${producto.img}" alt="img ${producto.producto}"> -->
                              <h3>${producto.producto}</h3>
                              <p>$${producto.precio * producto.cantidad}</p>
                              <span id="cantidad"> Cantidad: 
                                <button class="restar">-</button> ${producto.cantidad} <button class="sumar">+</button> 
                                <span class="eliminar">❌</span>
                              </span>`
            cartContainer.appendChild(cart)

            let eliminar = cart.querySelector(".eliminar");
            eliminar.onclick = () => {
                eliminarProducto(producto.id)
            }

            let sumar = cart.querySelector(".sumar");
            sumar.onclick = () => {
                sumarProducto(producto.id)
            }

            let restar = cart.querySelector(".restar");
            restar.onclick = () => {
                restarProducto(producto.id)
            }
        });
    //renderización de la cuenta
    let total = cartProducts.reduce((cont, producto) => cont+(producto.precio * producto.cantidad),0)  //calculo el total

    cuenta.innerHTML = "";
    cuenta.innerHTML = `<h2>Total: $${total}</h2>
                        <button id="vaciar">Vaciar Carrito</button> <br>
                        <button id="fin-compra">Finalizar Compra</button>`
    const vaciar = document.querySelector("#vaciar")
    vaciar.onclick = () => {
        vaciarCarrito();
    }
    const finCompra = document.querySelector("#fin-compra")
    finCompra.onclick = () => {
        
    }
    
    } else {
        cuenta.innerHTML = `<h2>El carrito está vacio.</h2>`;
    }
}

const sumarProducto = (id) => {
    const productoSumar = cartProducts.find((producto) => producto.id === id);  //busco el elemento del carrito clickeado
    productoSumar.cantidad++;
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    renderCarrito();
}

const restarProducto = (id) => {
    const productoRestar = cartProducts.find((producto) => producto.id === id);  //busco el elemento del carrito clickeado
    if (productoRestar.cantidad > 1) {
        productoRestar.cantidad--;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
        const nuevoCarrito = cartProducts.filter((producto) => producto.id !== productoRestar.id);   //filtro todos los elementos del carrito que no sean el del id clickeado
        cartProducts = nuevoCarrito;     //le asigno el valor de nuevoCarrito al carrito
        localStorage.clear()
        if (cartProducts.length != 0) {
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }
    }
    renderCarrito();
}

const eliminarProducto = (id) => {
    const idProducto = cartProducts.find((producto) => producto.id === id);  //busco el elemento del carrito clickeado
    
    const nuevoCarrito = cartProducts.filter((producto) => producto.id !== idProducto.id);   //filtro todos los elementos del carrito que no sean el del id clickeado
    cartProducts = nuevoCarrito;     //le asigno el valor de nuevoCarrito al carrito
    
    localStorage.clear()
    if (cartProducts.length != 0) {
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
    }
    renderCarrito();
}

const vaciarCarrito = () => {
    cartProducts = [];
    localStorage.clear();
    renderCarrito();
}

renderCarrito();