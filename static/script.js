let number = 0;
let displ = document.getElementById("gpaDisplay");
let template = document.querySelector(".clone");
function setDate(){
  let time = new Date();
  time = time.toLocaleString();
  document.getElementById("dateTime").innerText = time;
}


function calcWeighted() {
  let typeofclass = "";
  let gpaPoints = 0;
  let credits = 0;
  let grade = 0;
  let totalQual = 0;
  let totalCredits = 0;
  let outof = 0;
  let apCredits = {
    aPlus: 5.0,
    aNorm: 4.7,
    aMin: 4.5,
    bPlus: 4.3,
    bNorm: 4.0,
    bMin: 3.7,
    cPlus: 3.4,
    cNorm: 3.0,
    cMin: 2.7,
    d: 2.0,
    fail: 0.0
  }

  let honorsCredits = {
    aPlus: 4.5,
    aNorm: 4.2,
    aMin: 4.0,
    bPlus: 3.8,
    bNorm: 3.5,
    bMin: 3.2,
    cPlus: 2.9,
    cNorm: 2.5,
    cMin: 2.2,
    d: 1.5,
    fail: 0.0
  }

  let cpCredits = {
    aPlus: 4.0,
    aNorm: 3.7,
    aMin: 3.5,
    bPlus: 3.3,
    bNorm: 3.0,
    bMin: 2.7,
    cPlus: 2.4,
    cNorm: 2.0,
    cMin: 1.7,
    d: 1.0,
    fail: 0.0
  }

  let ext = "";
  let id = "";
  for (let i = 1; i <= number; i++) {
    ext = i.toString();
    id = "classType" + ext;
    typeofclass = document.getElementById(id).value;
    id = "credits" + ext;
    credits = Number(document.getElementById(id).value);
    id = "grade" + ext;
    grade = document.getElementById(id).value;

    let gradeLetter = findLetterGrade(typeofclass, grade);
    if (gradeLetter == "notIncluded") {
      gpaPoints = 0;
      credits = 0;
    } else if (typeofclass.toLowerCase() == "cp") {
      gpaPoints = credits * cpCredits[gradeLetter];
      outof += credits * cpCredits["aPlus"];
    } else if (typeofclass.toLowerCase() == "honors") {
      gpaPoints = credits * honorsCredits[gradeLetter];
      outof += credits * honorsCredits["aPlus"];
    } else if (typeofclass.toLowerCase() == "ap") {
      gpaPoints = credits * apCredits[gradeLetter];
      outof += credits * apCredits["aPlus"];
    }
    totalQual += gpaPoints;
    totalCredits += credits;
  }

  displ.style.display = "block";

  if (totalQual / totalCredits > 2.5) {
    displ.innerHTML = "Your weighted GPA is: " + ((totalQual / totalCredits).toFixed(4)).toString() + " out of " + ((outof / totalCredits).toFixed(4)).toString();
    document.getElementById("laughing").style.visibility = "hidden";
    document.getElementById("laughing1").style.visibility = "hidden";
  } else {
    displ.innerHTML = "Your weighted GPA is: " + ((totalQual / totalCredits).toFixed(4)).toString() + " out of " + ((outof / totalCredits).toFixed(4)).toString() + ". You are STUPID!!!";
    document.getElementById("laughing").style.visibility = "visible";
    document.getElementById("laughing1").style.visibility = "visible";
  }
}

function calcUnweighted() {
  let credits = {
    aPlus: 4.0,
    aNorm: 3.67,
    aMin: 3.33,
    bPlus: 3.00,
    bNorm: 2.67,
    bMin: 2.33,
    cPlus: 2.00,
    cNorm: 1.67,
    cMin: 1.33,
    dPlus: 1.0,
    dNorm: 0.67,
    dMin: 0.33,
    fail: 0.0
  }

  let grade = 0;
  let ext = "";
  let id = "";
  let typeofclass = "";
  let gpaPoints = 0;
  let divideby = 0;
  for (let i = 1; i <= number; i++) {
    ext = i.toString()
    id = "grade" + ext;
    grade = document.getElementById(id).value;
    id = "classType" + ext;
    typeofclass = document.getElementById(id).value;
    let gradeLetter = findLetterGrade(typeofclass, grade)
    if(gradeLetter != "notIncluded"){
      gpaPoints += credits[gradeLetter];
      divideby+=1;
    }
  }

  displ.style.display="block";
  if (gpaPoints / divideby > 2.5) {
    displ.innerHTML = "Your unweighted GPA is: " + ((gpaPoints / divideby).toFixed(4)).toString() + " out of 4.0.";
    document.getElementById("laughing").style.visibility = "hidden";
    document.getElementById("laughing1").style.visibility = "hidden";
  } else {
    displ.innerHTML = "Your unweighted GPA is: " + ((gpaPoints / divideby).toFixed(4)).toString() + " out of 4.0. You are STUPID!!!";
    document.getElementById("laughing").style.visibility = "visible";
    document.getElementById("laughing1").style.visibility = "visible";
  }
}

function findLetterGrade(typeofclass, grade) {
  if (typeofclass != "none") {
    if (grade <= 100 && grade >= 98) {
      gradeLetter = "aPlus";
    } else if (grade <= 97 && grade >= 93) {
      gradeLetter = "aNorm";
    } else if (grade <= 92 && grade >= 90) {
      gradeLetter = "aMin";
    } else if (grade <= 89 && grade >= 87) {
      gradeLetter = "bPlus";
    } else if (grade <= 86 && grade >= 83) {
      gradeLetter = "bNorm";
    } else if (grade <= 82 && grade >= 80) {
      gradeLetter = "bMin";
    } else if (grade <= 79 && grade >= 77) {
      gradeLetter = "cPlus";
    } else if (grade <= 76 && grade >= 73) {
      gradeLetter = "cNorm";
    } else if (grade <= 72 && grade >= 70) {
      gradeLetter = "cMin";
    } else if (grade <= 69 && grade >= 65) {
      gradeLetter = "d";
    } else {
      gradeLetter = "fail";
    }
  } else {
    gradeLetter = "notIncluded";
  }
  return gradeLetter;
}

function addCourse(name, classType, grade, credits){
  number += 1;
  let clone = template.cloneNode(true);
  let children = clone.children;
  children[0].children[0].id = "name" + number.toString();
  children[1].children[0].id = "classType" + number.toString();
  children[2].children[0].id = "grade" + number.toString();
  children[3].children[0].id = "credits" + number.toString();
  clone.style.display="table-row";
  let newrow = document.getElementById("courses").insertRow(-1);
  cell0 = newrow.insertCell(0);
  cell1 = newrow.insertCell(1);
  cell2 = newrow.insertCell(2);
  cell3 = newrow.insertCell(3);
  cell0.innerHTML = children[0].innerHTML;
  cell1.innerHTML = children[1].innerHTML;
  cell2.innerHTML = children[2].innerHTML;
  cell3.innerHTML = children[3].innerHTML;
  document.getElementById("name" + number.toString()).value = name;
  document.getElementById("classType" + number.toString()).value = classType;
  document.getElementById("grade" + number.toString()).value = grade;
  document.getElementById("grade" + number.toString()).addEventListener("input", validation);
  document.getElementById("credits" + number.toString()).value = credits;
}

function showSU(){
  document.getElementById("signup").style.display = "block";
  document.getElementById("login").style.display = "none";
}

function showLI(){
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function saveCourses(){
  let ext = "";
  let id = "";
  let name="";
  let grade = 0;
  let typeofclass = "";
  let credits = 0;
  let table = [];
  for (let i = 1; i <= number; i++) {
    ext = i.toString()
    id = "name" + ext;
    name = document.getElementById(id).value;
    id = "grade" + ext;
    grade = document.getElementById(id).value;
    id = "credits" + ext;
    credits = document.getElementById(id).value;
    id = "classType" + ext;
    typeofclass = document.getElementById(id).value;
    let gradeLetter = findLetterGrade(typeofclass, grade)
    table.push([name, typeofclass, grade, credits])
  }
  
  fetch("/process", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({ data: table}),
  })
  .then(response => response.json())
  .then(data => {console.log("recieved");})
  .catch(error => {
    console.error("Error: ", error);
  });
}

function message(message){
  document.getElementById("message").innerHTML = message;
}

function welcome(user){
  document.getElementById("welcome").innerHTML = "Welcome, " + user.toString() + "!";
  setInterval(setDate, 1000);
}

function loadclasses(classesfetched){
  courseTable = document.getElementById("courses");
  for(let i=0; i < classesfetched.length; i++){
    addCourse(classesfetched[i][0], classesfetched[i][1], classesfetched[i][2], classesfetched[i][3]);
  }
}

let preVal;

function validation(e){
  let value = e.target.value;
  if(isNaN(value) != true){
  if(value > 101 || value < 0){
    if(typeof preVal != "undefined"){
      e.target.value=preVal;
    }else{
      e.target.value = value;
    }
  }
  }else{
    if(typeof preVal != "undefined"){
      e.target.value=preVal;
    }else{
      e.target.value = value;
    }
  }
  preVal = e.target.value;
}
