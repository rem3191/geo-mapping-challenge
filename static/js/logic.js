var earthquakesLayer=new L.LayerGroup();

var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(earthquakes_url, function (earthquakesdata) {
  function generateColor(){
    return "#fbff00"
  }
  function generateRadius(magnitude){
    console.log(magnitude)
    if (magnitude<1.0){
      return 1
    }
    else{
      return magnitude*10
    }
    
  }
  L.geoJson(earthquakesdata, {
    pointToLayer: function (earthquake, coordinate) {
      return L.circle(coordinate)
    },
    style: function (earthquake, coordinate) {
      return {
        stroke: true,
        fillOpacity: 0.75,
        color: generateColor(),
        fillColor: generateColor(),
        radius:generateRadius(earthquake.properties.mag)      }
    },
    onEachFeature: function (earthquake, earthquakeCircle) {
      earthquakeCircle.bindPopup("pop successful")
    }
  }).addTo(earthquakesLayer)
})



// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Define a map object
var myMap = L.map("map", {
  center: [0,0],
  zoom: 3,
  layers: [darkmap, earthquakesLayer]
});
earthquakesLayer.addTo(myMap)

// Create an overlay object
var overlayMaps = {
  "Earthquakes": earthquakesLayer,
  
};



// Function to determine marker size based on population
function markerSize(population) {
  return population / 40;
}

// NEED TO ADD CODE WHERE MAP WILL GENERATE CITIBIKE DATA!!!

// An array containing all of the information needed to create city and state markers

// // Loop through locations and create city and state markers
// for (var i = 0; i < earthquake.length; i++) {

//   // Setting the marker radius for the state by passing population into the markerSize function
//   stateMarkers.push(
//     L.circle(locations[i].coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "white",
//       radius: markerSize(locations[i].state.population)
//     })
//   );

//   // Setting the marker radius for the city by passing population into the markerSize function
//   cityMarkers.push(
//     L.circle(locations[i].coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "purple",
//       fillColor: "purple",
//       radius: markerSize(locations[i].city.population)
//     })
//   );
// }

// Create base layers

// Create two separate layer groups: one for cities and one for states
// var states = L.layerGroup(stateMarkers);
// var cities = L.layerGroup(cityMarkers);

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};
// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);