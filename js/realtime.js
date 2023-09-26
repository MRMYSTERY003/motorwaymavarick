import Map from "./map.js";
import { onValue, ref, database } from "./fbase.js";

const urlParams = new URLSearchParams(window.location.search);
const url_id = urlParams.get('id');
console.log(url_id);


var throttle_datapoints = [10, 41, 35, 51, 49, 62, 69, 91, 148]
var airflow_datapoints = [10, 41, 35, 51, 49, 62, 69, 91, 148]

var acc_x = [1,3,4,2,1,23,3,14,12,23,12,4,8,6];
var acc_y = [3,4,2,2,4,5,6,4,2,3,3,3,4,6,];
var acc_z = [7,5,5,7,9,5,6,4,6,3,56,4,8,6];
var link = document.getElementById("realtime-tag")
var link2 = document.getElementById("vechicle-tag")



function user_info(){
  
  var userDataG = localStorage.getItem('MMG-user');
  var userData = localStorage.getItem('MM-user');
  var u_name = document.getElementById("name")
  var u_mail = document.getElementById("mail")
  
  if (userData) {
    var user = JSON.parse(userData);
    var userG = JSON.parse(userDataG);
    var usernameg = userG.displayName;
    var emailg = userG.email;
  
    var username = user.displayName;
    var email = user.email;
  
    try{
      if(username.length != 0 && email.length != 0){
  
        u_name.innerText = username;
        u_mail.innerText = email;
      }
    }
  catch{
      u_name.innerText = usernameg;
      u_mail.innerText = emailg;
    }
  
  
    // Access other user properties as needed
  } else {
    // User data not found, handle accordingly (e.g., redirect to login page) 
  }
  
  }
  
  // user_info();





var throttle_options = {
    series: [{
      name: "Position",
      data: throttle_datapoints
  }],
    chart: {
    height: 300,
    width : window.innerWidth-400,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2

  },
  title: {
    text: 'Throttle Position',
    align: 'center'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  };

  var airflow_options = {
    series: [{
      name: "Flow rate",
      data: airflow_datapoints
  }],
    chart: {
    height: 300,
    width : window.innerWidth-400,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2

  },
  title: {
    text: 'Air Flow Rate',
    align: 'center'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  };

  var acceleration_options = {
    series: [{
      name: "Acc X",
      data: acc_x
  },
  {
    name: "Acc Y",
    data: acc_y
    },
    {
        name: "Acc Z",
        data: acc_z
    }],
    chart: {
    height: 300,
    width : window.innerWidth-400,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 1.5
  },
  title: {
    text: 'Accelerations on 3 Axis',
    align: 'center'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  };





var fuel = new RadialGauge({
    renderTo: 'fuel-gauge',
    width: 180,
    height: 180,
    units: "Liter",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 100,
    majorTicks: [
        "0",
        "25","50","75","100"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 0,
            "to": 25,
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
    animationDuration: 1000,
    animationRule: "linear"
}).draw();


var speed = new RadialGauge({
    renderTo: 'speed',
    width: 250,
    height: 250,
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


var b_pressure = new LinearGauge({
    renderTo: 'pressure-gauge',
    width: (window.innerWidth-480)/2,
    units: "pascal ",
    title: "Barometric Pressure",
    height: 150,
    minValue: 0,
    maxValue: 100,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100"
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

var intake_temeperature = new RadialGauge({
    renderTo: 'intake-temperature-gauge',
    width: 300,
    height: 300,
    units: "Km/h",
    minValue: 0,
    startAngle: 0,
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
    animationRule: "linear",
    animationTarget: "plate"
}).draw();

var rail_gauge_pressure = new LinearGauge({
    renderTo: 'rail-gauge-pressure-gauge',
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
    colorPlate: "#fff",
    colorNeedle: "#000",
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


var coolant_temperature = new LinearGauge({
    renderTo: 'temperature-gauge',
    width: (window.innerWidth-480)/2,
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





var throttle = new ApexCharts(document.querySelector("#throt-pos"), throttle_options);
throttle.render();

var air_flow = new ApexCharts(document.querySelector("#air-flow-rate"), airflow_options);
air_flow.render();

var acceleration = new ApexCharts(document.querySelector("#acceleration"), acceleration_options);
acceleration.render();


function update_throttle(data){
    throttle_datapoints.shift();
    throttle_datapoints.push(data);
    throttle.updateSeries([{
        data: throttle_datapoints
      }])
}

function update_air_flow(data){
    airflow_datapoints.shift();
    airflow_datapoints.push(data);
    air_flow.updateSeries([{
        data: airflow_datapoints
      }])
}

function update_acceleration(x,y,z){
    acc_x.shift();
    acc_x.push(x);

    acc_y.shift();
    acc_y.push(y);

    acc_z.shift();
    acc_z.push(z);
    acceleration.updateSeries([{
        data: acc_x
      },{
        data: acc_y
      },{
        data: acc_z
      },
    ])
}
var map = new Map('mymap');


class update_values{
    constructor(id, data, fuel, b_pressure, coolant_temperature, intake_temeperature, rail_gauge_pressure, map){
        this.id= id;
        this.data = data
        this.img = document.getElementById("car-img");
        this.model = document.getElementById("model");
        this.number_plate = document.getElementById("number-plate");
        this.driver = document.getElementById("driver");
        this.status = document.getElementById("status");
        this.fuel = fuel;
        this.speed = speed;
        this.rpm = document.getElementById("rpm-val");
        this.coolant_temp = document.getElementById("temperature-val");
        this.battery = document.getElementById("battery-val");
        this.avg_fuel = document.getElementById("avg-fuel-val");
        this.run_time = document.getElementById("run-time-val");
        this.barometric_pressure = b_pressure;
        this.coolant_temperature = coolant_temperature;
        this.intake_temeperature = intake_temeperature;
        this.rail_gauge_pressure = rail_gauge_pressure;
        // this.map.updatelocation({"lat" : 12.9245279, "long" : 80.1150525, "name" : this.id}["VECHICLES"])
        this.map = map;


    }

    update(){
        var imglink = this.data["INFO"]["IMG"];
        this.img.src = imglink;
        this.model.textContent = this.data["INFO"]["MODEL"];
        this.number_plate.textContent = this.data["INFO"]["ID "];
        this.driver.textContent = this.data["INFO"]["DRIVER"];
        this.status.textContent = this.data["STATUS"];
        this.fuel.value = this.data["FUEL_LEVEL"];
        this.speed.value = this.data["SPEED"];
        this.rpm.innerText = this.data["RPM"];
        this.coolant_temp.innerText = this.data["COOLANT_TEMPERATURE"] + "°C";
        this.battery.innerText = this.data["BATTERY_VOLTAGE"] + "V";
        this.avg_fuel.innerText = this.data["AVG_FUEL"] + "%";
        this.run_time.innerText = this.data["RUN_TIME"] + "Hr";
        this.barometric_pressure.value =  this.data["ABSOLULTE_BAROMETRIC_PRESSURE"];
        this.coolant_temperature.value =  this.data["COOLANT_TEMPERATURE"];

        this.intake_temeperature.value =  this.data["AIR_INTAKE_TEMPERATURE"];
        this.rail_gauge_pressure.value =  this.data["FUEL_RAIL_GAUGE_PRESSURE"];
        console.log(this.data["GPS"]["LAT"])
        console.log(this.data["GPS"]["LONG"])
        // var res = this.map.updatelocation({"lat" : this.data["GPS"]["LAT"], "long" :  this.data["GPS"]["LAT"]});
        // this.map.locate(this.data["GPS"]["LAT"], this.data["GPS"]["LONG"], 16, res);
        this.map.setpos(this.data["GPS"]["LAT"], this.data["GPS"]["LONG"]);
        // this.map.locate(this.data["GPS"]["LAT"], this.data["GPS"]["LONG"], this.data, 13);
        update_throttle(this.data["THROTTLE_POSITION"]);
        update_air_flow(this.data["AIR_FLOW_RATE"]);
        update_acceleration(this.data["ACC"]['X'],this.data["ACC"]['Y'],this.data["ACC"]['Z']);
    }
}





onValue(ref(database, '/VECHICLES/'+url_id), (snapshot) => {
    const data = snapshot.val();
    const keys = Object.keys(data);
    link.href = "realtime.html?id="+ url_id;
    link2.href = "vechicles.html?id="+ url_id;


    console.log(data)
    try{
    const temp = new update_values(url_id, data, fuel, b_pressure, coolant_temperature, intake_temeperature, rail_gauge_pressure, map);
    temp.update()
    }catch{
      console.log("error")
    }

});