import Map from "./map.js";
import { onValue, ref, database } from "./fbase.js";


var online_vec = document.getElementById("online-vehicle")
var offline_vec = document.getElementById("offline-vehicle")
var total_vec = document.getElementById("total-vehicle")
var problem_vec = document.getElementById("problem-vehicle")
var link = document.getElementById("realtime-tag")
var link2 = document.getElementById("vehicle-tag")

const map = new Map("mymap")

function parsedata(data, keys) {
  var offline = 0;
  var online = 0;
  var prop_c = 0;
  var list = [];
  var loc = [];
  for (var i = 0; i < keys.length; i++) {
    var temp = {}
    var loc_temp = {};
    temp["number"] = keys[i];
    console.log(keys)
    temp["status"] = data["NEW_VEHICLES"][keys[i]]["VEHICLE_DETAILS"]["STATUS"];

    // temp["status"] = data["NEW_VEHICLES"][keys[i]]["STATUS"];
    // loc_temp["lat"] = data["NEW_VEHICLES"][keys[i]]["GPS"]["LAT"];
    // loc_temp["long"] = data["NEW_VEHICLES"][keys[i]]["GPS"]["LONG"];
    list.push(temp);
    // loc.push(loc_temp);
    console.log(data["NEW_VEHICLES"][keys[i]]["VEHICLE_DETAILS"]["MAINTAIN"])

    if (data["NEW_VEHICLES"][keys[i]]["VEHICLE_DETAILS"]["STATUS"].toLowerCase() == "offline") {
      offline += 1;
    } else {
      online += 1;
      loc_temp['lat']= data["NEW_VEHICLES"][keys[i]]["VEHICLE_DETAILS"]["GPS"]["LAT"]
      loc_temp['long'] = data["NEW_VEHICLES"][keys[i]]["VEHICLE_DETAILS"]["GPS"]["LONG"];
      loc.push(loc_temp);

    }
    if (data["NEW_VEHICLES"][keys[i]]["VEHICLE_DETAILS"]["MAINTAIN"].toLowerCase() == "no need") {
      prop_c += 1;
    }
  }
  console.log(loc)

  return { "offline": offline, "online": online, "problem": prop_c, "total": offline + online, "status-list": list, 'loc': loc }
}

function update_list(data) {
  var vec_list_cont = document.getElementById("vehicle-list");
  vec_list_cont.innerHTML = "";

  // Create a div to hold the headings
  const headingsDiv = document.createElement("div");
  headingsDiv.className = "headings";

  // Column headings
  const columns = ["S.no", "Vehicle License Numbers", "Vehicle Status"];
  columns.forEach((column) => {
    const heading = document.createElement("h3");
    heading.textContent = column;
    headingsDiv.appendChild(heading);
  });

  vec_list_cont.appendChild(headingsDiv);

  // Display the list of vehicles (similar to your original code)
  const ul = document.createElement("ul");
  data.forEach((item, index) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    var anchorElement = document.createElement("a");
    anchorElement.className = "no-underline";
    anchorElement.href = "vechicles.html?id=" + item.number;
    div.className = "list-info";

    // Adding Serial Number
    const serialNumber = document.createElement("span");
    serialNumber.textContent = (index + 1) + ". "; // Serial number starts from 1
    serialNumber.className = "serial-number";
    div.appendChild(serialNumber);

    const h4LicensePlate = document.createElement("h4");
    h4LicensePlate.textContent = item.number;
    anchorElement.appendChild(h4LicensePlate);
    const h4Status = document.createElement("h4");
    h4Status.textContent = item.status;
    div.appendChild(anchorElement);
    div.appendChild(h4Status);
    li.appendChild(div);
    ul.appendChild(li);
  });

  vec_list_cont.appendChild(ul);
}



onValue(ref(database, '/'), (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  const keys = Object.keys(data["NEW_VEHICLES"]);
  link.href = "realtime.html?id=" + keys[0];


  var count_res = parsedata(data, keys);
  offline_vec.innerText = count_res["offline"];
  online_vec.innerText = count_res["online"];
  problem_vec.innerText = count_res["problem"];
  total_vec.innerText = count_res["total"];
  update_list(count_res["status-list"])
  map.updatelocations( count_res["loc"])

});
