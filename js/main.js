let dolarHoy = "";

const dolarFunc = async () => {
    let dolarURL = "https://dolarapi.com/v1/dolares/blue"
    let valorDolar = "";
    try {
        let solicitud = await fetch(dolarURL);
        let response = await solicitud.json();
        valorDolar = response.venta;
    } catch (err) {
        console.error("Hubo un problema obteniendo el valor del dolar:", err);
        Swal.fire({
            icon: "info",
            title: "Error de respuesta",
            text: "El valor de los productos será expresado en dólares.",
            footer: '<a href="./index.html">recargar la página</a>'
          });
        valorDolar = 1
    } finally {
        dolarHoy = valorDolar;
    }
}
dolarFunc()

enPesos = (precio) => {
    return precio * dolarHoy
}

patentamiento = (precio) => {   //función para calcular el costo del patentamiento de la moto
    precio = precio * 0.09      //el costo del patentamiento es un 9% del valor en pesos
    return precio
};

const container = document.getElementById("product-container");
const mainMenu = document.getElementById("menu-principal");

let inicioMenu = document.getElementById("inicio")   //muestra el menú de inicio
inicioMenu.onclick = () => {
    renderInicio();
}

let motocicletasMenu = document.getElementById("motocicletas")      //muestra las motocicletas
motocicletasMenu.onclick = () => {
    renderMotos();
}

let accesoriosMenu = document.getElementById("accesorios")      //muestra los accesorios
accesoriosMenu.onclick = () => {
    renderAccesorios();
}

let contactoMenu = document.getElementById("contacto")      //tarjeta de contacto
contactoMenu.onclick = () => {
    renderContacto();
}

const itemsCart = document.querySelector("#carrito-counter")
//Inicializo el carrito y el almacenamiento del mismo
let cartProducts = [];
let cartProductsLS = localStorage.getItem("cartProducts");  //inicializo el array del carrito con el contenido del LocalStorage
if(cartProductsLS){
    cartProducts = JSON.parse(cartProductsLS);
    itemsCart.textContent = cartProducts.length;
}



renderInicio = () => {      //función de renderizado del menú de inicio
    container.innerHTML = "";
    mainMenu.innerHTML = "";
    mainMenu.style.backgroundImage = "url('./images/fondos/bg-main.jpg')";
    const titulo = document.createElement ("div");
    titulo.className = "menu";
    titulo.innerHTML = `<h2>Bienvenido a MotoShop</h2>
                        <p>Elija qué quiere buscar con los botones del menú.</p>`;
                        mainMenu.appendChild(titulo)
}

renderMotos = () => {     //función para renderizar accesorios
    mainMenu.innerHTML = "";
    container.innerHTML = "";
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
}

renderAccesorios = () => {     //función para renderizar motos
    mainMenu.innerHTML = "";
    container.innerHTML = "";
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
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
            mensajeAgregado("Añadido al carrito", "./carrito.html")
            itemsCart.textContent = cartProducts.length
        }
    })
};

function mensajeAgregado (mensaje, link) {
    Toastify({
        text: mensaje,
        duration: 1500,
        destination: link,
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #222222, #444444)",
        fontWeight: "650"
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

function consultButton (producto) {
    let consButton = document.querySelectorAll(".consulta")
    consButton.forEach (button => {
        button.onclick = async (e) => {
            const motoId = e.currentTarget.id;
            const motoElegida = producto.find(producto => producto.id == motoId)
            const { value: formValues } = await Swal.fire({
                title: "Elabore su consulta",
                html: `
                       <img id="swal-image" src="${motoElegida.img}" alt="img ${motoElegida.modelo}">
                       <p>Precio: $${enPesos(motoElegida.precio)}</p>
                       <p>Costo patentamiento: $${patentamiento(enPesos(motoElegida.precio))}</p>
                       <label for="swal-input1">Nombre:</label>
                       <input id="swal-input1" class="swal2-input" placeholder="Ingrese nombre"/>

                       <label for="swal-input2">Apellido:</label>
                       <input id="swal-input2" class="swal2-input" placeholder="Ingrese apellido"/>

                       <label for="swal-input3">Teléfono:</label>
                       <input id="swal-input3" class="swal2-input" placeholder="Ingrese solo números" maxlenght="20"/>

                       <label for="swal-input4">Email:</label>
                       <input id="swal-input4" class="swal2-input" placeholder="Ingrese email"/>

                       <label for="swal-input5">Consulta:</label>
                       <textarea id="swal-input5" class="swal2-textarea" placeholder="Ingrese su consulta"></textarea>
                      `,
                confirmButtonColor: "#333333",
                confirmButtonText: "Enviar consulta",
                showCancelButton: true,
                cancelButtonColor: "#ff4343",
                preConfirm: () => {
                    const name = document.getElementById("swal-input1").value;
                    const surname = document.getElementById("swal-input2").value;
                    const telefono = document.getElementById("swal-input3").value;
                    const email = document.getElementById("swal-input4").value;
                    const consulta = document.getElementById("swal-input5").value;
                    const formatoTexto = /^[a-zA-Z- ]+$/;
                    const formatoTelefono = /^[0-9-]+$/;
                    const formatoMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;     // Formato para validad el mail
                    if (name == "" || !formatoTexto.test(name)) {
                        Swal.showValidationMessage("Ingrese un nombre válido");
                    } else if (surname == "" || !formatoTexto.test(surname)) {
                        Swal.showValidationMessage("Ingrese un apellido válido");
                    }else  if (telefono == "" && email == "") {
                        Swal.showValidationMessage("Ingrese al menos su email");
                    } else if (telefono != "" && !formatoTelefono.test(telefono)) {
                        Swal.showValidationMessage("Ingrese solo números o deje este campo vacío");
                    } else {
                        if (!formatoMail.test(email)) {
                            Swal.showValidationMessage("Ingrese un email válido");
                        }
                    }
                    return [name, surname, telefono, email, consulta];
                }
            });
            if (formValues) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Consulta enviada!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                const datosConsulta = JSON.stringify(formValues);
                localStorage.setItem("datosConsulta", JSON.stringify(datosConsulta));       //En éste paso se enviaría la consulta al administrador
            }
        }
    })
}

renderContacto = () => {
    const datosContacto = {
        nombre: "Martín Perez",
        telefono: "11-2345-6789",
        email: "mperez.motoshop@gmail.com"
    };
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

renderInicio();