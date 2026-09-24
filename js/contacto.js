// Coordenadas aproximadas de Ferretería Dávila
const latitudNegocio = 28.4268;
const longitudNegocio = -16.4886;


// Crear mapa
const mapa = L.map("mapa").setView(
    [latitudNegocio, longitudNegocio],
    14
);


// Mapa de OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    }
).addTo(mapa);


// Marcador del negocio
const marcadorNegocio = L.marker([
    latitudNegocio,
    longitudNegocio
]).addTo(mapa);

marcadorNegocio.bindPopup(
    "<strong>Ferretería Dávila</strong><br>" +
    "Santa Úrsula, Carretera provincial 34"
).openPopup();


// Variable para guardar la ruta
let rutaActual = null;


// Botón de ubicación
document
    .getElementById("btnUbicacion")
    .addEventListener("click", function () {

        const informacion =
            document.getElementById("informacionRuta");

        informacion.textContent =
            "Obteniendo tu ubicación...";


        if (!navigator.geolocation) {

            informacion.textContent =
                "Tu navegador no permite obtener la ubicación.";

            return;
        }


        navigator.geolocation.getCurrentPosition(

            function (posicion) {

                const latitudCliente =
                    posicion.coords.latitude;

                const longitudCliente =
                    posicion.coords.longitude;


                const marcadorCliente = L.marker([
                    latitudCliente,
                    longitudCliente
                ]).addTo(mapa);

                marcadorCliente.bindPopup(
                    "<strong>Tu ubicación</strong>"
                );


                const urlRuta =
                    "https://router.project-osrm.org/route/v1/driving/" +
                    longitudCliente +
                    "," +
                    latitudCliente +
                    ";" +
                    longitudNegocio +
                    "," +
                    latitudNegocio +
                    "?overview=full&geometries=geojson";


                fetch(urlRuta)
                    .then(function (respuesta) {
                        return respuesta.json();
                    })
                    .then(function (datos) {

                        if (datos.code !== "Ok") {

                            informacion.textContent =
                                "No se ha podido calcular la ruta.";

                            return;
                        }


                        const ruta =
                            datos.routes[0];

                        const coordenadas =
                            ruta.geometry.coordinates.map(
                                function (coordenada) {
                                    return [
                                        coordenada[1],
                                        coordenada[0]
                                    ];
                                }
                            );


                        if (rutaActual !== null) {
                            mapa.removeLayer(rutaActual);
                        }


                        rutaActual =
                            L.polyline(
                                coordenadas,
                                {
                                    weight: 5
                                }
                            ).addTo(mapa);


                        mapa.fitBounds(
                            rutaActual.getBounds()
                        );


                        const distanciaKm =
                            (
                                ruta.distance / 1000
                            ).toFixed(2);

                        const minutos =
                            Math.round(
                                ruta.duration / 60
                            );


                        informacion.innerHTML =
                            "<strong>Ruta calculada:</strong><br>" +
                            "Distancia aproximada: " +
                            distanciaKm +
                            " km<br>" +
                            "Tiempo aproximado en coche: " +
                            minutos +
                            " minutos";

                    })
                    .catch(function (error) {

                        console.error(error);

                        informacion.textContent =
                            "Ha ocurrido un error al calcular la ruta.";

                    });

            },

            function (error) {

                const informacion =
                    document.getElementById(
                        "informacionRuta"
                    );


                if (error.code === 1) {

                    informacion.textContent =
                        "Has rechazado el permiso para obtener tu ubicación.";

                } else {

                    informacion.textContent =
                        "No se ha podido obtener tu ubicación.";

                }

            }
        );

    });
