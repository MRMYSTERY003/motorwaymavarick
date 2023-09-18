import Map from "./map.js";
import { onValue, ref, database } from "./fbase.js";

const urlParams = new URLSearchParams(window.location.search);
const url_id = urlParams.get('id');
console.log(url_id);

var vechicle_id = document.getElementById("vechicle-id")
var status = document.getElementById("status")
var job = document.getElementById("job-id")
var driver = document.getElementById("driver")
var fuel = document.getElementById("fuel")
var speed_val = document.getElementById("speed-val")
var Performance = document.getElementById("Performance")
var Maintainance = document.getElementById("Maintainance")
var economy = document.getElementById("fuel-consum")
var cost = document.getElementById("cost")
var coolant_temp = document.getElementById("coolant-temp-val");
var battery_vlotage = document.getElementById("Battery-voltage");
var runtime  = document.getElementById("runtime")
var link = document.getElementById("realtime")
var link2 = document.getElementById("vechicle")


var more = document.getElementById("more");
console.log(more)


more.href = "realtime.html?id="+url_id;
const map = new Map('mymap')

var speed = new RadialGauge({
    renderTo: 'speed',
    width: 180,
    height: 180,
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

function parsedata(data){
    console.log(data[url_id])
    vechicle_id.innerText = data[url_id]["INFO"]["ID "]
    status.innerText = data[url_id]["STATUS"]   
    job.innerText = data[url_id]["INFO"]["JOB"]
    driver.innerText = data[url_id]["INFO"]["DRIVER"]
    fuel.innerText = data[url_id]["FUEL_LEVEL"] + "%"
    Performance.innerText = data[url_id]["INFO"]["PERFORMANCE"]
    Maintainance.innerText = data[url_id]["INFO"]["MAINTAINANCE"] 
    economy.innerText = data[url_id]["INFO"]["ECONOMY"] 
    cost.innerText = data[url_id]["INFO"]["COST"] 
    speed_val.innerText = data[url_id]["SPEED"] + "Km/H"
    speed.value = data[url_id]["SPEED"];
    coolant_temp.innerText = data[url_id]["COOLANT_TEMPERATURE"] + "°C";
    battery_vlotage.innerText = data[url_id]["BATTERY_VOLTAGE"] +"V";
    runtime.innerText = data[url_id]["RUN_TIME"] + "Hr";

   map.set(data[url_id]["GPS"]["LAT"], data[url_id]["GPS"]["LONG"])
   map.locate(data[url_id]["GPS"]["LAT"], data[url_id]["GPS"]["LONG"], 18)

  
  }




  function update_list(data){
    var vec_list_cont = document.getElementById("vechicle-List");
    vec_list_cont.innerHTML = "";
    const ul = document.createElement("ul");
    data.forEach((item) => {
      const li = document.createElement("li");

      var anchorElement = document.createElement("a");
      anchorElement.className = "no-underline"
      anchorElement.href = "vechicles.html?id=" +item ;

      li.textContent = item;
      anchorElement.appendChild(li)

      ul.appendChild(anchorElement);
    });
    
    vec_list_cont.appendChild(ul);
  }
  



onValue(ref(database, '/'), (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    const keys = Object.keys(data);
    console.log(link)
    // link.href = "realtime.html?id="+ keys[0];
    // link2.href = "vechicles.html?id="+ keys[0];
    


    update_list(keys)
    parsedata(data);

  
  });
  