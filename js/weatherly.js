//Variables
var weatherAPIForecast = "http://api.openweathermap.org/data/2.5/forecast"
var weatherAPIWeather = "http://api.openweathermap.org/data/2.5/weather"
var homeLocation = "Virginia Beach, US"



mapboxgl.accessToken = mapKey;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [-98.4916, 29.4252]
});

forecast( [-98.4916, 29.4252]);



function forecast( [lon ,lat ] ) {
    $.get(weatherAPIForecast, {
        APPID: weatherKey,
        lon:lon,
        lat:lat,
        units: "imperial"
    }).done(function (data) {
        let reports = data.list;
        console.log(data);
        for(let i = 0; i < reports.length; i += 8) {
            // should get 5 objects back
            console.log(reports[i]);
            // card info
            var html ='<div class ="card">';
            html += "<div id='date'><p>"+ reports[i].dt_txt + "</p></div>";
            html += "<div id='currentWeather' class='text-center'> " + reports[i].main.temp + " </div>";
            html += "<div id='info'>";
            html += "<p class='text-center '> " +reports[i].weather[0].description + " </p>";
            html += "</div>";
            html += "</div>";

            if( i === 0){
                $('#weatherCard1').html(html);
            }
            else if ( i === 8){
                $('#weatherCard2').html(html);
            }
            else if( i === 16){
                $('#weatherCard3').html(html);
            }
            else if( i === 24){
                $('#weatherCard4').html(html);
            }
            else if (i === 32){
                $('#weatherCard5').html(html);
            }
        }

    });
}


$('#locationButton').click(function(){
    geocode($('#searchedLocation').val(),mapKey).then(function(results){
        console.log(results);
        map.setCenter(results);
        map.setZoom(13);
        var marker = new mapboxgl.Marker()
            .setLngLat(results)
            .addTo(map);
        forecast(results)
    })

})