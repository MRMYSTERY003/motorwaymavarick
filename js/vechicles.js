import Map from "./map.js";
import { onValue, ref, database } from "./fbase.js";


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
    console.log(data)
    vechicle_id.innerText = data["INFO"]["ID "]
    status.innerText = data["STATUS"]   
    job.innerText = data["INFO"]["JOB"]
    driver.innerText = data["INFO"]["DRIVER"]
    fuel.innerText = data["FUEL_LEVEL"] + "%"
    Performance.innerText = data["INFO"]["PERFORMANCE"]
    Maintainance.innerText = data["INFO"]["MAINTAINANCE"] 
    economy.innerText = data["INFO"]["ECONOMY"] 
    cost.innerText = data["INFO"]["COST"] 
    speed_val.innerText = data["SPEED"] + "Km/H"
    speed.value = data["SPEED"];
    coolant_temp.innerText = data["COOLANT_TEMPERATURE"] + "°C";
    battery_vlotage.innerText = data["BATTERY_VOLTAGE"] +"V";
    runtime.innerText = data["RUN_TIME"] + "Hr";

   map.set(data["GPS"]["LAT"], data["GPS"]["LONG"])
   map.locate(data["GPS"]["LAT"], data["GPS"]["LONG"], 18)

  
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
  


  onValue(ref(database, '/VECHICLES/'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    const keys = Object.keys(data);

    update_list(keys);

  }, {
  });
  





onValue(ref(database, '/VECHICLES/'+url_id), (snapshot) => {
    const data = snapshot.val();
    console.log(data)

    
    // update_list(keys);
    parsedata(data);

  
  });
  