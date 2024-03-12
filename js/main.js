alert('Bienvenido a Motoshop!');

const opcMenuPrinc = 3;    //cantidad de opciones en el menú principal
const txtMenuPrincipal = 'Ingrese el número de la opción que desea. \n 1 - Motos \n 2 - Accesorios \n 0 - Finalizar'; //Texto del menú principal

const moto1 = {
    marca:'honda',
    modelo:'wave',
    precio:1700,
}
const moto2 = {
    marca:'honda',
    modelo:'xr250',
    precio:5500,
}
const moto3 = {
    marca:'yamaha',
    modelo:'fz x',
    precio:2400,
}
const moto4 = {
    marca:'yamaha',
    modelo:'ybr125',
    precio:2600,
}
const moto5 = {
    marca:'suzuki',
    modelo:'ax100',
    precio:1600,
}
const moto6 = {
    marca:'suzuki',
    modelo:'gn125',
    precio:2600,
}
const moto7 = {
    marca:'suzuki',
    modelo:'gsx125',
    precio:2600,
}


const motos = [moto1, moto2, moto3, moto4, moto5, moto6, moto7];
//const accesorios = ['casco','baul','piloto','guantes','cadena','traba disco'];
let carrito = [];       //inicializo el array carrito
let costoTotal = 0;     //inicializo la variable costo total para mostrarla al final

const validarMenu = function(txt,i){        //siendo opcion la opción elegida e i el número de opciones en el menú
    let opcion = '';
    do{
        opcion = parseInt(prompt(txt))
        if(!(opcion >= 0 && opcion < i)){ 
            alert('Opción invalida');
        }else return opcion;
        console.log(opcion);                //control de lo que ingresó el usuario
    }while(!(opcion >= 0 && opcion < i))
}

let opcionMenu;
console.table(motos)        //muestra las opciones y precios en consola
while (opcionMenu != 0){
    opcionMenu = validarMenu(txtMenuPrincipal,opcMenuPrinc)
    let bandera = 0;        //utilizo una variable numerica para identificar si se encontró la marca buscada
    switch(opcionMenu){
        case 1:
            let marca = prompt('Ingrese el nombre de la marca que está buscando.').toLowerCase();
            console.log(marca);
            for (const moto of motos){
                if(moto.marca == marca){
                    console.log(moto.modelo);
                    bandera++;          //cuando encuentra la moto, bandera suma 1
                }
            }
            
            if(bandera != 0){
                console.log('Se encontraron ' + bandera + ' modelos.');
                let modelo = prompt('Ingrese el modelo que está buscando.').toLowerCase();
                bandera = 0;            //devuelvo el valor de bandera a 0 para poder volver identificar si se encontró el modelo buscado
                for (const moto of motos){
                    if (moto.modelo == modelo){
                        carrito.push(moto);
                        costoTotal = costoTotal + moto.precio;
                        console.log(carrito);                   //control del contenido del carrito
                        console.log('$' + costoTotal);          //control del costo total
                        alert('La moto fue agregada al carrito! Si quiere comprar otra moto, repita este proceso.')
                        bandera++;      //si se encuentra el modelo, bandera suma 1
                        
                        // console.log(accesorios.join(' - '))      //será agregado más adelante
                        // let accesorio = prompt('Elija un accesorio gratis con su compra! (escriba el número del producto)')                  
                    }
                }
                if (bandera == 0){
                    alert('El modelo ' + modelo + ' no fue encontrado.');
                }
            }else{
                alert('La moto ' + marca + ' no fue encontrada.');
            }
            break;
        case 2:
            //let accesorio = prompt('Ingrese el nombre del accesorio que está buscando');
            //console.log(accesorio);
            alert ('Próximamente agregaremos una tienda para accesorios!');
            break;
        case 0:
            let confirmar = confirm('Desea finalizar la compra?');
            if (confirmar == false){
                opcionMenu = -1;        //devuelve -1 para que siga dentro del ciclo while
            }
            break;
    }
}

if(costoTotal != 0){
    alert('El total de su compra es de $' + costoTotal)
}
console.log('Gracias por utilizar Motoshop.');