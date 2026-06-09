/*Hacemos una variable para el carrito, que es un arreglo(un areglo es una lista de cosas)
 donde se almacenan los productos */
    let carrito = [];
    
// Esta funcion se encarga de agregar un producto al carrito.   
    function   agregarProducto(carrito, producto){
// la funcion recibe el carrito y el producto que se quiere agragar, y devuelve un nuevo arreglo con el producto agregado al carrito.        
        return [...carrito, producto];
    }
/* Esta funcion nos ayuda a eliminar un producto del carrito,
    va a recibir el carrito y el producto que queremos eliminar,
    y va a devolver un nuevo arreglo con el producto eliminado del carrito. */
    function eliminarProducto(carrito, id, Producto) {
        /*En esta linea con filter nos ayuda a
        filtrar los productos id que no coinciden con el id del producto a eliminar */ 
        return carrito.filter(producto => producto.id !== id);
        /*!==id significa "no es estrictamente igual" */
    }
// Esta funcion nos ayuda a calcular el total del carrito, va a recibir el carrito y va a devolver la suma de los precios de los productos en el carrito.
    function calcularTotal(carrito){
        /*En esta linea con reduce nos ayuda a reducir el carrito
        a un solo valor, que sera la suma de los precios de los productos en el carrito.*/
        return carrito.reduce((total, producto)=> total + producto.precio, 0);

    }
/*Esta funcion nos ayuda a aplicar un descuento al  total del carrito, 
lo que hace es recibir el carrito y el descuento */
    function aplicarDescuento(carrito, descuento){
        /*Esta linea nos ayida a hacer el descuento del carrito */
        return calcularTotal(carrito) * (1 - descuento);
        //1 - descuento es para calcular el precio final despues de aplicar el descuento
    }
// Esta funcion nos ayuda a mostrar el contenido del carrito, el producto y el precio de cada producto en el carrito, y el total del carrito.
    function mostrarCarrito(carrito){
        /*En esta linea se mostrara los productos del carrito */
        document.getElementById("carrito").innerHTML = "";
        /*En esta linea se muestra el total del carrito */
        document.getElementById("total").innerHTML = `Total: ${calcularTotal(carrito)}`;
        /*En esta linea se muestra el descuento del carrito */
        document.getElementById("descuento").innerHTML = `Total con descuento: ${aplicarDescuento(carrito, 0.1)}`;
        /*En esta linea se muestra el producto y el precio de cada producto en el carrito */    
        carrito.forEach(producto => {
            document.getElementById("carrito").innerHTML += `producto: ${producto.nombre} - precio: ${producto.precio} `
        })
    }    

//esta linea usa el localStorage para guardar el carrito en el navegador, lo que permite que el carrito se mantenga incluso si se recarga la pagina o se cierra el navegador.    
    localStorage.setItem("carrito", JSON.stringify(carrito));
/*Esta linea nos ayuda a cargar el carrito desde el localStorage, lo que permite que el carrito se mantenga incluso si se recarga la pagina o se cierra el navegador. */
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // EL || [] es para que si el carrito esta vacio, se inicialice como un arreglo vacio en lugar de null
/*Esta linea nos ayuda a mostrar el carrito al cargar la pagina, lo que permite que el carrito se mantenga incluso si se recarga la pagina o se cierra el navegador. */
    mostrarCarrito(carrito);   
