// Adjustment constants ==========================
const stages = ["Tanking", "QD Disconnect", "Go/No go"];
const circleRadius = 164;
const degreeRange = 130;

// Render Stages ==========================
const offset = (180-degreeRange)/2;
let htmlRender = "";
for (let i = 0; i < stages.length; i++) {
    let xDisp, yDisp;
    xDisp = circleRadius*Math.cos((offset+(degreeRange/(stages.length-1))*i) * Math.PI / 180);
    yDisp = circleRadius*Math.sin((offset+(degreeRange/(stages.length-1))*i) * Math.PI / 180);

    htmlRender+=`<div name="${stages[i]}" class="stage" style="top:${circleRadius-yDisp}px; left:${circleRadius-xDisp}px"><div class="stage-desc">${stages[i]}</div></div>`;

}

document.getElementById("inner").innerHTML = htmlRender;

// Render Buttons ==========================
htmlRender = "";
for (let i = 0; i < stages.length; i++) {
    htmlRender+=`<button onclick="setStage(${i})">${stages[i]}</button>`;
}
document.getElementById("buttons").innerHTML = htmlRender;

// Button click function ==========================
function setStage(stageIndex) {
    document.getElementById("line-rot").style = `transform: rotate(${offset+(degreeRange/(stages.length-1))*stageIndex}deg);`;
    document.getElementsByName(stages[stageIndex]).style = `background-color: #C71313`;

    for (let i = 0; i < stages.length; i++) {
        if (i <= stageIndex) {
            setTimeout(()=>{
                document.getElementsByName(stages[i])[0].classList.add('active');
            },300);
        } else {
            document.getElementsByName(stages[i])[0].classList.remove('active');
        }

        
    }
}
setStage(0);

// Clock ==========================
function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }
  currentTime();