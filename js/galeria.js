$(document).ready(function () {

    let fotosGaleria = [];
    let indiceActual = 0;

    // Carga las imágenes desde galeria.json mediante AJAX.
    $.getJSON("galeria.json", function (fotos) {

        fotosGaleria = fotos;

        $.each(fotosGaleria, function (index, foto) {

            const tarjeta = $(
                '<div class="foto" data-indice="' + index + '">' +
                    '<img src="' + foto.imagen + '" alt="' + foto.titulo + '">' +
                    '<h3>' + foto.titulo + '</h3>' +
                '</div>'
            );

            $("#galeria").append(tarjeta);
        });

    }).done(function () {

        // El comportamiento dinámico se activa después de cargar las imágenes.
        crearVisor();

        $("#galeria").on("click", ".foto", function () {
            indiceActual = Number($(this).attr("data-indice"));
            mostrarImagen(indiceActual);
        });

    }).fail(function () {

        $("#galeria").html(
            "<p>No se pudo cargar la galería.</p>"
        );

    });


    // Crea el visor de imágenes dinámicamente con JavaScript.
    function crearVisor() {

        if ($("#visor").length > 0) {
            return;
        }

        const visor = $(
            '<div id="visor" role="dialog" aria-modal="true" aria-label="Visor de imágenes">' +
                '<button id="cerrar" type="button" aria-label="Cerrar">&times;</button>' +
                '<button id="anterior" type="button" aria-label="Imagen anterior">&#10094;</button>' +
                '<img id="imagen-grande" src="" alt="">' +
                '<button id="siguiente" type="button" aria-label="Imagen siguiente">&#10095;</button>' +
                '<p id="contador-galeria"></p>' +
            '</div>'
        );

        $("body").append(visor);

        $("#cerrar").on("click", cerrarVisor);
        $("#anterior").on("click", mostrarAnterior);
        $("#siguiente").on("click", mostrarSiguiente);

        $("#visor").on("click", function (event) {
            if (event.target === this) {
                cerrarVisor();
            }
        });

        $(document).on("keydown", function (event) {

            if ($("#visor").css("display") !== "flex") {
                return;
            }

            if (event.key === "Escape") {
                cerrarVisor();
            } else if (event.key === "ArrowLeft") {
                mostrarAnterior();
            } else if (event.key === "ArrowRight") {
                mostrarSiguiente();
            }
        });
    }


    function mostrarImagen(indice) {

        if (!fotosGaleria.length) {
            return;
        }

        indiceActual = (indice + fotosGaleria.length) % fotosGaleria.length;

        const foto = fotosGaleria[indiceActual];

        $("#imagen-grande")
            .attr("src", foto.imagen)
            .attr("alt", foto.titulo);

        $("#contador-galeria").text(
            (indiceActual + 1) + " / " + fotosGaleria.length + " — " + foto.titulo
        );

        $("#visor").css("display", "flex");
        $("body").css("overflow", "hidden");
    }


    function mostrarAnterior() {
        mostrarImagen(indiceActual - 1);
    }


    function mostrarSiguiente() {
        mostrarImagen(indiceActual + 1);
    }


    function cerrarVisor() {
        $("#visor").css("display", "none");
        $("body").css("overflow", "");
    }

});
