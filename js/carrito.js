let cartProducts = [];      //inicializo el carrito
let cartProductsLS = localStorage.getItem("cartProducts");  //inicializo el array del carrito con el contenido del LocalStorage
if(cartProductsLS){         //confirmo que no sea null
    cartProducts = JSON.parse(cartProductsLS);
}

let datosCompra = "";      //inicializo el carrito
let datosCompraLS = localStorage.getItem("datosCompra");  //inicializo el array  con el contenido del LocalStorage
if(datosCompraLS){         //confirmo que no sea null
    datosCompra = JSON.parse(cartProductsLS);
}

let cartContainer = document.getElementById("cart-selection")

renderCarrito = () => {    //Función para renderizar los items del carrito
    cartContainer.innerHTML = "";
    const cuenta = document.querySelector("#cuenta")    
    if (cartProducts.length != 0) {
        cartProducts.forEach(producto => {
            const cart = document.createElement("div")
            cart.className = "cart-item";
            cart.innerHTML = `<img src="${producto.img}" alt="img ${producto.producto}">
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
        })
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
        finCompra.onclick = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Desea finalizar la compra?",
            html: `
                <h4>Total: $${total}</h4>
                <p>Ingrese sus datos de contacto</p>
                <label for="swal-input1">Nombre</label>
                <input id="swal-input1" class="swal2-input">
                <label for="swal-input2">Apellido</label>
                <input id="swal-input2" class="swal2-input">
                <label for="swal-input3">Email</label>
                <input id="swal-input3" class="swal2-input">
                `,
            showCancelButton: true,
            confirmButtonColor: "#333333",
            confirmButtonText: "Sí, finalizar compra",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById("swal-input1").value;
                const surname = document.getElementById("swal-input2").value;
                const email = document.getElementById("swal-input3").value;
                const formatoTexto = /^[a-zA-Z- ]+$/
                if (name == "" || !formatoTexto.test(name)) {
                    Swal.showValidationMessage("Ingrese un nombre válido");
                } else if (surname == "" || !formatoTexto.test(surname)) {
                    Swal.showValidationMessage("Ingrese un apellido válido");
                } else {
                    const formatoMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;     // Formato para validad el mail
                    if (!formatoMail.test(email)) {
                        Swal.showValidationMessage("Ingrese un email válido");
                    }
                }
                return [name, surname, email];
            }
        });
        if (formValues) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Compra realizada con éxito!",
                showConfirmButton: false,
                timer: 1500
            });
            datosCompra = JSON.stringify(formValues) + JSON.stringify(cartProducts);
            localStorage.setItem("datosCompra", JSON.stringify(datosCompra));       //En éste punto se enviarían los detalles de la compra a procesar
            artProducts = [];       //vacío el carrito
            localStorage.removeItem("cartProducts");
            renderCarrito();
        }
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

const restarProducto = async (id) => {
    const productoRestar = cartProducts.find((producto) => producto.id === id);  //busco el elemento del carrito clickeado
    if (productoRestar.cantidad > 1) {
        productoRestar.cantidad--;
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
        await Swal.fire({
            title: "Desea eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar"
          }).then((result) => {
            if (result.isConfirmed) {
                const nuevoCarrito = cartProducts.filter((producto) => producto.id !== productoRestar.id);   //filtro todos los elementos del carrito que no sean el del id clickeado
                cartProducts = nuevoCarrito;     //le asigno el valor de nuevoCarrito al carrito
                localStorage.clear()
                if (cartProducts.length != 0) {
                    localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                }
                Swal.fire({
                    title: "Producto eliminado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 750
                });
            }
          });
    }
    console.log("Arre")
    renderCarrito();
}

const eliminarProducto = async (id) => {      //función para eliminar productos completos
    await Swal.fire({
        title: "Desea eliminar el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
            const idProducto = cartProducts.find((producto) => producto.id === id);
            const nuevoCarrito = cartProducts.filter((producto) => producto.id !== idProducto.id);   //filtro todos los elementos del carrito que no sean el del id clickeado
            cartProducts = nuevoCarrito;

            localStorage.clear()
            if (cartProducts.length != 0) {
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            }
            Swal.fire({
                title: "Producto eliminado",
                icon: "success",
                showConfirmButton: false,
                timer: 750
            });
        }
      });
    renderCarrito();
}

const vaciarCarrito = async () => {
    await Swal.fire({
        title: "Seguro desea vaciar el carrito?",
        text: "Si hace esto, deberá cargar todo nuevamente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {
        if (result.isConfirmed) {
            cartProducts = [];
            localStorage.removeItem("cartProducts");
            renderCarrito();
            if (cartProducts.length != 0) {
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            }
            Swal.fire({
                title: "Carrito vacío",
                icon: "success",
                showConfirmButton: false,
                timer: 750
            });
        }
      });
    
}

renderCarrito();