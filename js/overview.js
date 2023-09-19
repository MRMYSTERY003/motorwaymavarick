import Map from "./map.js";
import { onValue, ref, database } from "./fbase.js";


var online_vec = document.getElementById("online-vechicle")
var offline_vec = document.getElementById("offline-vechicle")
var total_vec = document.getElementById("total-vechicle")
var problem_vec = document.getElementById("problem-vechicle")
var link = document.getElementById("realtime-tag")
var link2 = document.getElementById("vechicle-tag")


const map = new Map("mymap")



function parsedata(data, keys){
  var offline = 0;
  var online = 0;
  var prop_c = 0;
  var list = [];
  var loc = [];
  for(var i = 0; i < keys.length; i++){
    var temp = {}
    var loc_temp = {};
    temp["number"] = keys[i];
    console.log(keys)
    temp["status"] = data["VECHICLES"][keys[i]]["STATUS"];
    loc_temp["lat"] = data["VECHICLES"][keys[i]]["GPS"]["LAT"];
    loc_temp["long"] = data["VECHICLES"][keys[i]]["GPS"]["LONG"];
    list.push(temp);
    loc.push(loc_temp);


    if (data["VECHICLES"][keys[i]]["STATUS"].toLowerCase() == "offline"){
      offline += 1;
    }else{
      online += 1;
    }
    if(data["VECHICLES"][keys[i]]["INFO"]["MAINTAINANCE"].toLowerCase() == "No Need"){
        prop_c += 1;
    }
  }
  console.log(loc)

  return {"offline" :offline, "online": online, "problem" : prop_c, "total" : offline + online, "status-list" : list, 'loc' :loc}
}



function update_list(data){
  var vec_list_cont = document.getElementById("vehicle-list");
  vec_list_cont.innerHTML = "";
  const ul = document.createElement("ul");
  data.forEach((item) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    var anchorElement = document.createElement("a");
    anchorElement.className = "no-underline"
    anchorElement.href = "vechicles.html?id=" +item.number ;
    div.className = "list-info";
    const h4LicensePlate = document.createElement("h4");
    h4LicensePlate.textContent = item.number;
    anchorElement.appendChild(h4LicensePlate)
      const h4Status = document.createElement("h4");
    h4Status.textContent = item.status;
    div.appendChild(anchorElement);
    div.appendChild(h4Status);  
    li.appendChild(div);  
    // anchorElement.appendChild(li)
    ul.appendChild(li);
  });
  
  vec_list_cont.appendChild(ul);
}





onValue(ref(database, '/'), (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  const keys = Object.keys(data["VECHICLES"]);
  link.href = "realtime.html?id="+ keys[0];
  link2.href = "vechicles.html?id="+ keys[0];

  var count_res = parsedata(data,keys);
  offline_vec.innerText = count_res["offline"];
  online_vec.innerText = count_res["online"];
  problem_vec.innerText = count_res["problem"];
  total_vec.innerText = count_res["total"];
  update_list(count_res["status-list"])
  map.updatelocations(count_res["loc"])

});



