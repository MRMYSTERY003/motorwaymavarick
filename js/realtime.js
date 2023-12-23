// import Map from "./map.js";
import { onValue, ref, database } from "./fbase.js";

// const urlParams = new URLSearchParams(window.location.search);
// const url_id = urlParams.get('id');
// console.log(url_id);


// var throttle_datapoints = [10, 41, 35, 51, 49, 62, 69, 91, 148]
// var airflow_datapoints = [10, 41, 35, 51, 49, 62, 69, 91, 148]

// var acc_x = [1, 3, 4, 2, 1, 23, 3, 14, 12, 23, 12, 4, 8, 6];
// var acc_y = [3, 4, 2, 2, 4, 5, 6, 4, 2, 3, 3, 3, 4, 6,];
// var acc_z = [7, 5, 5, 7, 9, 5, 6, 4, 6, 3, 56, 4, 8, 6];
// var link = document.getElementById("realtime-tag")
// var link2 = document.getElementById("vechicle-tag")

var table_body = document.getElementById("tb")


var vec_id = document.getElementById("vehid");
var model = document.getElementById("modelname");
var status = document.getElementById("status");
var drivername = document.getElementById("drivername");
var driveid = document.getElementById("driverid");
var driverage = document.getElementById("driverage");
var driveexp = document.getElementById("driverexp");

var payload = document.getElementById("payload");
var trip = document.getElementById("trip");
var status = document.getElementById("status");
var temppayload = document.getElementById("temppayload");
var humidity = document.getElementById("humidity");

var rpmnumber = document.getElementById("rpmnumber");
var iat = document.getElementById("iat");
var fuel = document.getElementById("fuel");
var transoil = document.getElementById("transoil");
var map = document.getElementById("map");
var cool = document.getElementById("cool1");
var alternator = document.getElementById("alternator");
var fuelrate = document.getElementById("fuelrate");
var torque = document.getElementById("torque");
var load = document.getElementById("load");
var oilpress = document.getElementById("oilpress");

var hp1 = document.getElementById("hp1");
var hp2 = document.getElementById("hp2");
var hp3 = document.getElementById("hp3");
var hp4 = document.getElementById("hp4");
var hp5 = document.getElementById("hp5");


var gauge1 = {
  angle: 0.01, // The span of the gauge arc
  lineWidth: 0.25, // The line thickness
  radiusScale: 1,
  pointer: {
    length: 0.54, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  staticZones: [
    // Red from 100 to 130
    // Yellow
    { strokeStyle: "#30B32D", min: 0, max: 1400 }, // Green
    { strokeStyle: "#FFDD00", min: 1400, max: 1800 }, // Yellow
    { strokeStyle: "#F03E3E", min: 1800, max: 2000 }  // Red
  ],
  staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 300, 1500, 1800],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0,
    formatter: function (value) {
      // Use a simple function to remove commas from the number
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
    }
    // Optional: Numerical precision. 0=round off.
  },
  // renderTicks is Optional
  renderTicks: {
    divisions: 6,
    divWidth: 0.7,
    divLength: 1,
    divColor: '#333333',
    subDivisions: 5,
    subLength: 0.45,
    subWidth: 0.9,
    subColor: '#30663D'
  }

};
var gauge2 = {
  angle: 0.01, // The span of the gauge arc
  lineWidth: 0.25, // The line thickness
  radiusScale: 1,
  pointer: {
    length: 0.54, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support

  staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0,
    formatter: function (value) {
      // Use a simple function to remove commas from the number
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
    }
    // Optional: Numerical precision. 0=round off.
  },
  // renderTicks is Optional
  renderTicks: {
    divisions: 6,
    divWidth: 0.7,
    divLength: 1,
    divColor: '#333333',
    subDivisions: 5,
    subLength: 0.45,
    subWidth: 0.9,
    subColor: '#30663D'
  }

};
var gauge3 = {
  angle: 0.01, // The span of the gauge arc
  lineWidth: 0.25, // The line thickness
  radiusScale: 1,
  pointer: {
    length: 0.54, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support

  staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 20, 40, 60, 80, 100, 120, 140, 160],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0,
    formatter: function (value) {
      // Use a simple function to remove commas from the number
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
    }
    // Optional: Numerical precision. 0=round off.
  },
  // renderTicks is Optional
  renderTicks: {
    divisions: 6,
    divWidth: 0.7,
    divLength: 1,
    divColor: '#333333',
    subDivisions: 5,
    subLength: 0.45,
    subWidth: 0.9,
    subColor: '#30663D'
  }

};

// var gauge3 = {
//   angle: 0.01, // The span of the gauge arc
//   lineWidth: 0.25, // The line thickness
//   radiusScale: 1,
//   pointer: {
//     length: 0.54, // // Relative to gauge radius
//     strokeWidth: 0.035, // The thickness
//     color: '#000000' // Fill color
//   },
//   limitMax: false,     // If false, max value increases automatically if value > maxValue
//   limitMin: false,     // If true, the min value of the gauge will be fixed
//   // to see which ones work best for you
//   generateGradient: true,
//   highDpiSupport: true,     // High resolution support
//   staticZones: [
//     // Red from 100 to 130
//     { strokeStyle: "#F03E3E", min: 0, max: 20 }, // Red
//     { strokeStyle: "#FFDD00", min: 20, max: 50 }, // Yellow
//     { strokeStyle: "#30B32D", min: 50, max: 100 } // Green
//   ],
//   staticLabels: {
//     font: "10px sans-serif",  // Specifies font
//     labels: [0, 20, 50, 100],  // Print labels at these values
//     color: "#000000",  // Optional: Label text color
//     fractionDigits: 0,
//     formatter: function (value) {
//       // Use a simple function to remove commas from the number
//       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
//     }
//     // Optional: Numerical precision. 0=round off.
//   },
//   // renderTicks is Optional
//   renderTicks: {
//     divisions: 6,
//     divWidth: 0.7,
//     divLength: 1,
//     divColor: '#333333',
//     subDivisions: 5,
//     subLength: 0.45,
//     subWidth: 0.9,
//     subColor: '#30663D'
//   }

// };



var rpm = document.getElementById('rpm');
var rpmgauge1 = new Gauge(rpm).setOptions(gauge1);
rpmgauge1.maxValue = 2000; // set max gauge value
rpmgauge1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
rpmgauge1.animationSpeed = 32; // set animation speed (32 is default value)
rpmgauge1.set(0); // set actual value

var oilpl = document.getElementById('oilpl');
var oilgauge1 = new Gauge(oilpl).setOptions(gauge3);
oilgauge1.maxValue = 160; // set max gauge value
oilgauge1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
oilgauge1.animationSpeed = 32; // set animation speed (32 is default value)
oilgauge1.set(0); // set actual value

var maplevel = document.getElementById('maplevel');
var map1 = new Gauge(maplevel).setOptions(gauge2);
map1.maxValue = 200; // set max gauge value
map1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
map1.animationSpeed = 32; // set animation speed (32 is default value)
map1.set(0); // set actual value


const urlParams = new URLSearchParams(window.location.search);

// Get the value of a specific parameter
const ID = urlParams.get('id');
console.log(ID)


function parsedata(data) {
  driverage.innerText = data["DRIVER_DETAILS"]["AGE"]
  driveexp.innerText = data["DRIVER_DETAILS"]["EXP"]
  driveid.innerText = data["DRIVER_DETAILS"]["ID"]
  drivername.innerText = data["DRIVER_DETAILS"]["NAME"]

  vec_id.innerText = data["VEHICLE_DETAILS"]["ID"]
  model.innerText = data["VEHICLE_DETAILS"]["MODEL"]

  status.innerText = data["VEHICLE_DETAILS"]["STATUS"]
  payload.innerText = data["PAYLOAD_DETAILS"]["PAYLOAD"]
  humidity.innerText = data["PAYLOAD_DETAILS"]["HUMID"]
  temppayload.innerText = data["PAYLOAD_DETAILS"]["TEMP"]
  trip.innerText = data["PAYLOAD_DETAILS"]["TRIP"]


  rpmnumber.innerText = data["ENGINE_PARAMETERS"]["RPM"]
  rpmgauge1.set(data["ENGINE_PARAMETERS"]["RPM"]);

  map.innerText = data["ENGINE_PARAMETERS"]["MAP"]
  map1.set(data["ENGINE_PARAMETERS"]["MAP"]) // used egt for map

  oilpress.innerText = data["ENGINE_PARAMETERS"]["OIL_PRESSURE"]
  oilgauge1.set(data["ENGINE_PARAMETERS"]["OIL_PRESSURE"]);

  iat.innerText = data["ENGINE_PARAMETERS"]["IAT"]

  cool.innerText = data["ENGINE_PARAMETERS"]["OIL_TEMP"]

  transoil.innerText = data["ENGINE_PARAMETERS"]["OIL_TEMP"]


  console.log('done')

  transoilnumber.innerText = data["ENGINE_PARAMETERS"]["BREAK_TEMP"]
  tempgauge1.set(data["ENGINE_PARAMETERS"]["BREAK_TEMP"])




  cool.innerText = data["ENGINE_PARAMETERS"]["OIL_TEMP"]
  cool1.set(data["ENGINE_PARAMETERS"]["OIL_TEMP"]);







}



function update_list(data) {

  // Display the list of vehicles (similar to your original code)

  while (table_body.firstChild) {
    table_body.removeChild(table_body.firstChild);
  }

  data.forEach(mid => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    td1.textContent = mid[0];
    td2.textContent = mid[1];

    var anchorElement = document.createElement("a");
    anchorElement.className = "no-underline";
    anchorElement.href = "realtime.html?id=" + mid[0];
    anchorElement.appendChild(td1)

    tr.appendChild(anchorElement);
    tr.appendChild(td2);

    table_body.appendChild(tr)

  })

}








onValue(ref(database, '/NEW_VEHICLES'), (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  const keys = Object.keys(data);
  var list = []
  for (let i = 0; i < keys.length; i++) {
    var temp = [];
    temp.push(keys[i]);
    temp.push(data[keys[i]]["VEHICLE_DETAILS"]["MODEL"])
    list = [...list, temp]
  }

  console.log(list)

  update_list(list)
  parsedata(data[ID])


});


var coolant_temperature = new LinearGauge({
  renderTo: 'temperature-gauge',
  width: (window.innerWidth - 360) / 2,
  height: 150,
  units: "°C",
  title: "Temperature",
  minValue: 0,
  maxValue: 50,
  majorTicks: [
    0,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100,
    110,
    120
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
  colorPlate: "#bc5090",
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
