let map = L.map('mymap').setView([19.5937, 78.9629], 5);
let ourData = [];

// L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	//attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
//     maxZoom: 20,
//     minZoom: 2,
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(map);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 20,
    minZoom: 2,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
 
let iconOption = {
    iconUrl: './lib/location-marker.svg',
    iconSize: [30, 30]
};
let ourCustomIcon = L.icon(iconOption);

class Map{
    constructor(latitude, longitude, zoom, title){
        this.lat =latitude;
        this.long = longitude;        
        this.zoom = zoom;
        this.title = title; 
    }

    setpos(lat, long, title){
        L.marker([this.lat, this.long], {icon: ourCustomIcon}).bindPopup(`<h3> ${this.title} </h3>`).addTo(map);
    }

    locate(){
        map.flyTo([this.lat, this.long], this.zoom);
    }

    updatelocation(data){
        var lat = data['lat'];
        var long = data['long'];
        var name = data['name'];
        L.marker([lat, long], {icon : ourCustomIcon}).bindPopup(`<h3> ${name} </h3>`).addTo(map)
    }

    updatelocations(data){
        data.forEach(element => {
            console.log(element)
            var lat = element['lat'];
            var long = element['long'];
            var name = element['name'];
            L.marker([lat, long], {icon : ourCustomIcon}).bindPopup(`<h3> ${name} </h3>`).addTo(map)
        });
    }

}

export default Map;