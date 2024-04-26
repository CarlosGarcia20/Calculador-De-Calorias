$(document).ready(function() {
    setTimeout(() => {
        obtenerProductos();
    }, 500);
    
});

function obtenerProductos() {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Cargando...',
        showConfirmButton: false,
        background: '#fff linear-gradient(145deg, rgba(255,255,255,1) 30%, rgba(0,136,204,1) 100%',
        didOpen: () => {
            Swal.showLoading();
        }
    });

     $.ajax({
        url: 'scriptsPHP/productos.php',
        type: 'POST',
        dataType: "json",
        data: { 

        },
        success: function(data) {
            data.forEach((producto, index) => {
                console.log(index);

                // Crear un div para cada producto
                var productoDiv = $('<div class="producto"></div>');

                // Agregar imagen si existe URL válida
                if (producto.imagen && producto.imagen.trim() !== '') {
                    productoDiv.append(`<img src="${producto.imagen}" alt="${producto.nombre}">`);
                } else {
                    // Si no hay URL de imagen, mostrar un mensaje de "No image"
                    productoDiv.append('<p style="color: black">No image</p>');
                }

                // Agregar información del producto
                var infoDiv = $('<div class="producto-info"></div>');
                infoDiv.append(`<p>Tipo: ${producto.tipo}</p>`);
                infoDiv.append(`<p>Nombre: ${producto.nombre}</p>`);
                infoDiv.append(`<p>Tamaño(g): ${producto.tamaño}</p>`);
                infoDiv.append(`<p>Precio: ${producto.precio}</p>`);
                infoDiv.append(`<p>Stock: ${producto.stock}</p>`);
                infoDiv.append(`<label>Cantidad: </label><input type="number" min="0" max="${producto.stock}" id="cantidad${index}" value="0" style="width: 60px; float:right;"  />`);
                infoDiv.append(`<hr>`);
                infoDiv.append(`<button type="button" class="ejemplo" id="boton">Agregar al carrito</button>`);
                
                // Añadir información al div de producto
                productoDiv.append(infoDiv);

                // Añadir productoDiv al contenedor de la cuadrícula
                $('#productos-grid').append(productoDiv);
            });
            Swal.close();
        },
        fail: function(jqXHR, textStatus, errorThrown) {
            console.log("Error al cargar los datos. ", errorThrown);
        }
    });
}