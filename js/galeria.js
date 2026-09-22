$(document).ready(function () {

    $.getJSON("galeria.json", function (fotos) {

        $.each(fotos, function (index, foto) {

            $("#galeria").append(
                '<div class="foto">' +
                    '<img src="' + foto.imagen + '" ' +
                    'alt="' + foto.titulo + '">' +
                    '<h3>' +
                        foto.titulo +
                    '</h3>' +
                '</div>'
            );

        });

    }).fail(function () {

        $("#galeria").html(
            "<p>No se pudo cargar la galería.</p>"
        );

    });

});