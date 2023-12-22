import Map from "./map.js";
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
    { strokeStyle: "#FFDD00", min: 0, max: 300 }, // Yellow
    { strokeStyle: "#30B32D", min: 300, max: 1500 }, // Green
    { strokeStyle: "#FFDD00", min: 1500, max: 1600 }, // Yellow
    { strokeStyle: "#F03E3E", min: 1600, max: 1800 }  // Red
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
  staticZones: [
    // Red from 100 to 130
    { strokeStyle: "#FFDD00", min: 0, max: 50 }, // Yellow
    { strokeStyle: "#30B32D", min: 50, max: 400 }, // Green
    { strokeStyle: "#FFDD00", min: 400, max: 500 }, // Yellow
    { strokeStyle: "#F03E3E", min: 500, max: 600 }  // Red
  ],
  staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 50, 400, 500, 600],  // Print labels at these values
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
  staticZones: [
    // Red from 100 to 130
    { strokeStyle: "#F03E3E", min: 0, max: 20 }, // Red
    { strokeStyle: "#FFDD00", min: 20, max: 50 }, // Yellow
    { strokeStyle: "#30B32D", min: 50, max: 100 } // Green
  ],
  staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [0, 20, 50, 100],  // Print labels at these values
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

var rpm = document.getElementById('rpm');
var rpmgauge1 = new Gauge(rpm).setOptions(gauge1);
rpmgauge1.maxValue = 1800; // set max gauge value
rpmgauge1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
rpmgauge1.animationSpeed = 32; // set animation speed (32 is default value)
rpmgauge1.set(0); // set actual value

var transoil = document.getElementById('transoil');
var tempgauge1 = new Gauge(transoil).setOptions(gauge2);
tempgauge1.maxValue = 600; // set max gauge value
tempgauge1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
tempgauge1.animationSpeed = 32; // set animation speed (32 is default value)
tempgauge1.set(0); // set actual value

var fuellevel = document.getElementById('fuellevel');
var fuel1 = new Gauge(fuellevel).setOptions(gauge3);
fuel1.maxValue = 100; // set max gauge value
fuel1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
fuel1.animationSpeed = 32; // set animation speed (32 is default value)
fuel1.set(0); // set actual value

var egtlevel = document.getElementById('egtlevel');
var egt1 = new Gauge(egtlevel).setOptions(gauge2);
egt1.maxValue = 600; // set max gauge value
egt1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
egt1.animationSpeed = 32; // set animation speed (32 is default value)
egt1.set(0); // set actual value

var coollevel = document.getElementById('coollevel');
var cool1 = new Gauge(coollevel).setOptions(gauge2);
cool1.maxValue = 600; // set max gauge value
cool1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
cool1.animationSpeed = 32; // set animation speed (32 is default value)
cool1.set(0); // set actual value