//Variables
var weatherAPIForecast = "http://api.openweathermap.org/data/2.5/forecast"
var weatherAPIWeather = "http://api.openweathermap.org/data/2.5/weather"


mapboxgl.accessToken = mapKey;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    zoom: 6,
    center: [-98.4916, 29.4252]
});

forecast([-98.4916, 29.4252]);
var marker1 = new mapboxgl.Marker({draggable: true})
    .setLngLat([-98.4916, 29.4252])
    .addTo(map);


function forecast([lon, lat]) {
    $.get(weatherAPIForecast, {
        APPID: weatherKey,
        lon: lon,
        lat: lat,
        units: "imperial"
    }).done(function (data) {
        let reports = data.list;
        for (let i = 0; i < reports.length; i += 8) {
            var html = '<div class ="card">';
            html += "<div id='date' class='text-center '><p class='mb-0'>" + reports[i].dt_txt.split(" ")[0] + "</p></div>";
            html += "<p id='info' class='text-center mb-0 fw-bold'> Tempetature:</p>";
            html += "<div id='currentWeather' class='text-center'> " + reports[i].main.temp.toFixed(1) + "&#8457 </div>";
            html += "<p id='info' class='text-center mb-0 fw-bold'> conditons:</p>";
            html += "<div >";
            html += "<p id='info' class='text-center '> " + reports[i].weather[0].description + " </p>";
            html += "</div>";
            html += "</div>";

            if (i === 0) {
                $('#weatherCard1').html(html);
            } else if (i === 8) {
                $('#weatherCard2').html(html);
            } else if (i === 16) {
                $('#weatherCard3').html(html);
            } else if (i === 24) {
                $('#weatherCard4').html(html);
            } else if (i === 32) {
                $('#weatherCard5').html(html);
            }
        }

        function onDragEnd() {
            const lngLat = marker1.getLngLat();
            forecast([lngLat.lng , lngLat.lat]);
        }

        marker1.on('dragend', onDragEnd);

    });
}
    $('#locationButton').click(function () {
    geocode($('#searchedLocation').val(), mapKey).then(function (results) {
        map.setCenter(results);
        map.setZoom(13);
        forecast(results);
        marker1.setLngLat(results);
    })
})

