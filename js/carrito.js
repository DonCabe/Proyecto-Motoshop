let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage)

let cartContainer = document.getElementById("cart-selection")

function renderCarrito (cartItems) {
    cartItems.forEach(producto => {
        const cart = document.createElement("div")
        cart.innerHTML = `<h3>${producto.producto}</h3>
                          <p>$${producto.precio}</p>
                          <br>`
        cartContainer.appendChild(cart)
    });
}

renderCarrito(cartStorage)