"use strict";

//Variables
var weatherAPIForecast = "http://api.openweathermap.org/data/2.5/forecast"


mapboxgl.accessToken = mapKey;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    zoom: 13,
    center: [-98.4916, 29.4252]
});


map.addControl(new mapboxgl.NavigationControl());


forecast([-98.4916, 29.4252]);


var marker1 = new mapboxgl.Marker({draggable: true, })
    .setLngLat([-98.4916, 29.4252])
    .addTo(map);


function forecast([lon, lat]) {
    $.get(weatherAPIForecast, {
        APPID: weatherKey,
        lon: lon,
        lat: lat,
        units: "imperial"
    }).done(function (data) {
        console.log(data);
        let reports = data.list;
        for (let i = 0; i < reports.length; i += 8) {
            var html = '<div class ="card text-center mb-4 ">';
            html += "<div id='date'><p class='mb-0'>" + reports[i].dt_txt.split(" ")[0] + "</p></div>";
            html += "<p id='info' class='fw-bold text-decoration-underline m-0'> Temperature:</p>";
            html += "<div id='currentWeather' class=' fs-3'> " + reports[i].main.temp.toFixed(0) + "&#8457 </div>";
            html += "<p id='info' class='fw-bold text-decoration-underline m-0'> Conditons:</p>";
            html += "<div class='mx-auto'>";
            html += "<img class='mx-5' src='https://openweathermap.org/img/wn/" + reports[i].weather[0].icon + "@2x.png'>";
            html += "<p class='fst-italic fs-4 text-capitalize'> " + reports[i].weather[0].description +"</p>";
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
                $('#cityName').html("Five Day Forecast: <br>" + data.city.name);

            }
        }

        function onDragEnd() {
            const lngLat = marker1.getLngLat();
            forecast([lngLat.lng, lngLat.lat]);
        }

        marker1.on('dragend', onDragEnd);

    });
}


$('#locationButton').click(function () {
    geocode($('#searchedLocation').val(), mapKey).then(function (results) {
        console.log(results);
        map.setCenter(results);
        map.setZoom(13);
        forecast(results);
        marker1.setLngLat(results);

    })
})



