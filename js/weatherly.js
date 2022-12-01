mapboxgl.accessToken = mapKey;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 15,
    center: [-87.96028, 42.30528]
});


$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    q:     "Virginia Beach, US",
    units: "imperial"
}).done(function(data) {
    console.log(data);
});