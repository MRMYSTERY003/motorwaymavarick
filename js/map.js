
class Map {
    constructor(id) {

        this.map = L.map(id).setView([12.924846, 80.092893], 10);

        this.title = "test";
        this.list = [];

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 50,
            minZoom: 2,
            tileSize: 512,
            zoomOffset: -1,
            zoomDelta: 1,
        }).addTo(this.map);

        this.iconOption = {
            iconUrl: './Images/t.png',
            iconSize: [50, 50]
        };

        this.ourCustomIcon = L.icon(this.iconOption);
        this.marker = L.marker([51.5, -0.09], { icon: this.ourCustomIcon }).addTo(this.map);

    }

    set(lat,long){
        this.marker.setLatLng([lat, long]);

            // this.map.flyTo([lat, long], zoom)

    }


    setpos(lat, long,) {
        L.marker([lat, long], { icon: this.ourCustomIcon }).addTo(this.map)
        this.map.flyTo([lat, long], 16);

    }

    locate(lat, long, zoom) {
        
        this.map.flyTo([lat, long], zoom);

    }

    updatelocation(data) {
        this.lat = data['lat'];
        this.long = data['long'];
        L.marker([this.lat, this.long], { icon: this.ourCustomIcon }).addTo(this.map)

    }

    deletemarker(){
        this.list.forEach((ele) =>{
            ele.remove();
        })
        this.list = [];
    }

    updatelocations(data) {
        this.deletemarker();
        data.forEach(element => {
            console.log(element)
            var lat = element['lat'];
            var long = element['long'];
            var mark = L.marker([lat, long], { icon: this.ourCustomIcon }).addTo(this.map)
            this.list.push(mark);
        });
    }

}

export default Map;