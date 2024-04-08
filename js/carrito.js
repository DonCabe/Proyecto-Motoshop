let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage)

let cartContainer = document.getElementById("cart-selection")

function renderCarrito (cartItems) {    //Función para renderizar los items del carrito
    if (cartItems) {
        cartItems.forEach(producto => {
            const cart = document.createElement("div")
            cart.innerHTML = `<h3>${producto.producto}</h3>
                            <p>$${producto.precio}</p>
                            <button class="eliminar">eliminar</button>
                            <br>`
            cartContainer.appendChild(cart)
        });
    }
}

function cuenta (cartItems) {
    const cart = document.querySelector("#cuenta")
    if (cartItems){
        const total = cartItems.reduce((cont, producto) => cont+producto.precio,0)
        cart.innerHTML = `<h2>Total: $${total}</h2>
                          <button class="vaciar">Vaciar Carrito</button>`
    }else {
        cart.innerHTML = `<h4>El carrito está vacio.</h4>`;
    }
}

const eliminarProducto = (id) => {
    const idProducto = cartStorage.find((producto) => producto.id === id);  //busco el elemento del carrito clickeado
    console.log(idProducto);
    
    const nuevoCarrito = cartStorage.filter((producto) => producto.id !== idProducto);   //filtro todos los elementos del carrito que no sean el del id clickeado
    console.log(nuevoCarrito);

    cartStorage = nuevoCarrito;     //le asigno el valor de nuevoCarrito al carrito
}

const removeButton = cartContainer.querySelectorAll(".eliminar")
removeButton.onclick = () => {
    eliminarProducto(producto.id);
    
    renderCarrito(cartStorage);
    console.log();
    console.log("Item Eliminado");
}

renderCarrito(cartStorage);
cuenta(cartStorage);
console.log(cartStorage);