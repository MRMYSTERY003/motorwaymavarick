
import Map from "./map.js";



var lat = 12.924846;
var long = 80.092893;

const map = new Map(lat,long , 16, 'sriam')

map.updatelocation({'lat':lat, 'long':long, 'name' : 'kulam'})
map.locate()



const ctx = document.getElementById('myChart');





var gauge = new RadialGauge({
    renderTo: 'gu',
    width: 300,
    height: 300,
    units: "Km/h",
    minValue: 0,
    maxValue: 220,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100",
        "120",
        "140",
        "160",
        "180",
        "200",
        "220"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 160,
            "to": 220,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
}).draw();

gauge.animatedValue = true;
gauge.value = 50;




var temp = new LinearGauge({
    renderTo: 'temp',
    width: 120,
    height: 400,
    units: "°C",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 220,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100",
        "120",
        "140",
        "160",
        "180",
        "200",
        "220"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 100,
            "to": 220,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: 'none',
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    barWidth: 10,
    value: 35
}).draw();

temp.value = 100;




var preasure = new LinearGauge({
    renderTo: 'preasure',
    width: 400,
    height: 150,
    units: "°C",
    title: "Temperature",
    minValue: -50,
    maxValue: 50,
    majorTicks: [
        -50,
        -40,
        -30,
        -20,
        -10,
        0,
        10,
        20,
        30,
        40,
        50
    ],
    minorTicks: 5,
    strokeTicks: true,
    ticksWidth: 15,
    ticksWidthMinor: 7.5,
    highlights: [
        {
            "from": -50,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 0,
            "to": 50,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    colorMajorTicks: "#ffe66a",
    colorMinorTicks: "#ffe66a",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "#2465c0",
    colorPlateEnd: "#327ac0",
    borderShadowWidth: 0,
    borders: false,
    borderRadius: 10,
    needleType: "arrow",
    needleWidth: 3,
    animationDuration: 1500,
    animationRule: "linear",
    colorNeedle: "#222",
    colorNeedleEnd: "",
    colorBarProgress: "#327ac0",
    colorBar: "#f5f5f5",
    barStroke: 0,
    barWidth: 8,
    barBeginCircle: false
}).draw();

preasure.value = 69;


console.log(gauge)


const DATA_COUNT = 10;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
labels.push(i.toString());
}
const datapoints = [ 20, 60, 60, 120,34, 180, 120, 125, 105, 110];
const data = {
labels: labels,
datasets: [
  {
    label: 'Carbon dioxide conectration',
    data: datapoints,
    fill: false,
    cubicInterpolationMode: 'monotone',
    tension: 0.4
  }
]};
    
const chart =  new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Plot of Co2 over time'
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'concentration'
          },
          suggestedMin: 10,
          suggestedMax: 200
        }
      }
    },
});




function update_chart(chart, data){
    console.log(datapoints);
    datapoints.shift();
    datapoints.push(data);
    chart.data.datasets[0].data = datapoints;
    chart.update();
  }

  update_chart(chart,0);
  update_chart(chart,10);
  update_chart(chart,100);