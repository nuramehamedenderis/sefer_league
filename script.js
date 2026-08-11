// ================================
// Sefer League App
// app.js
// ================================

// Welcome Message
window.addEventListener("load", function () {
    console.log("Welcome to Sefer League");

    setTimeout(function () {
        alert("እንኳን ወደ Sefer League በደህና መጡ!");
    }, 500);
});

// Button Animation
const buttons = document.querySelectorAll(".btn, .btn2");

buttons.forEach(button => {
    button.addEventListener("click", function () {

        this.style.transform = "scale(0.96)";

        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);

    });
});

// Logo Animation
const logo = document.querySelector(".logo");

if (logo) {

    setInterval(() => {

        logo.style.transform = "rotate(5deg)";

        setTimeout(() => {
            logo.style.transform = "rotate(-5deg)";
        }, 300);

        setTimeout(() => {
            logo.style.transform = "rotate(0deg)";
        }, 600);

    }, 3000);

}  <!DOCTYPE html>
<html lang="am">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sefer League - Home</title>

<link rel="stylesheet" href="css/style.css">

<style>

.menu{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:15px;
margin-top:20px;
}

.card{
background:#ffffff;
color:#0b6623;
padding:20px;
border-radius:15px;
text-align:center;
text-decoration:none;
font-weight:bold;
font-size:18px;
box-shadow:0 5px 15px rgba(0,0,0,.2);
transition:.3s;
}

.card:hover{
transform:scale(1.05);
}

.top{
text-align:center;
margin-bottom:20px;
}

.notice{
margin-top:20px;
padding:15px;
background:#ffd700;
color:#000;
border-radius:10px;
font-weight:bold;
text-align:center;
}

</style>

</head>

<body>

<div class="welcome">

<div class="top">

<img src="images/logo.png" class="logo">

<h2>Sefer League</h2>

<p>እንኳን ደህና መጡ</p>

</div>

<div class="menu">

<a href="clubs.html" class="card">
⚽<br>ክለቦች
</a>

<a href="players.html" class="card">
👤<br>ተጫዋቾች
</a>

<a href="league.html" class="card">
🏆<br>የሊግ ሰንጠረዥ
</a>

<a href="matches.html" class="card">
📅<br>የጨዋታ መርሃግብር
</a>

<a href="live.html" class="card">
🔴<br>Live Match
</a>

<a href="videos.html" class="card">
🎥<br>ቪዲዮዎች
</a>

<a href="profile.html" class="card">
👤<br>ፕሮፋይል
</a>

<a href="admin.html" class="card">
⚙️<br>Admin
</a>

</div>

<div class="notice">

📢 ማስታወቂያ ቦታ

</div>

</div>

<script src="js/app.js"></script>

</body>
</html> let homeScore=0;
let awayScore=0;


function updateScore(){

document.getElementById("score").innerHTML=
"Abeba FC "+homeScore+
" - "+
awayScore+
" Wello United";

}


function goalHome(){

homeScore++;
updateScore();

}


function goalAway(){

awayScore++;
updateScore();

} let likes = 0;


function uploadVideo(){

let file =
document.getElementById("videoFile").files[0];

if(file){

let url = URL.createObjectURL(file);


document.getElementById("videoArea").innerHTML = `

<video controls>
<source src="${url}">
</video>

<div class="actions">

<button onclick="likeVideo()">
❤️ Like <span id="likeCount">0</span>
</button>

<button onclick="commentVideo()">
💬 Comment
</button>

<button onclick="shareVideo()">
🔗 Share
</button>

</div>

<div id="comments"></div>

`;

}

}



function likeVideo(){

likes++;

document.getElementById("likeCount").innerHTML=likes;

}



function commentVideo(){

let text=prompt("Write Comment:");

if(text){

document.getElementById("comments").innerHTML +=
"<p>💬 "+text+"</p>";

}

}



function shareVideo(){

alert("Video Shared 🔗");

} let clubs=[];


function addClub(){

let name =
document.getElementById("adminClub").value;


clubs.push(name);


document.getElementById("adminList").innerHTML="";


clubs.forEach(function(club){

document.getElementById("adminList").innerHTML +=
"<li>⚽ "+club+"</li>";

});

}



function pay(){

document.getElementById("paymentStatus").innerHTML=
"Payment Successful ✅";

}



// Firebase Demo Status

document.getElementById("firebaseStatus").innerHTML=
"Firebase Ready 🔥"; function champion(){

let teams=[
"Team A",
"Team B",
"Team C",
"Team D",
"Team E",
"Team F",
"Team G",
"Team H"
];

let random=
Math.floor(Math.random()*teams.length);

document.getElementById("winner").innerHTML=
"🏆 Champion : "+teams[random];

} function saveProfile(){

const file =
document.getElementById("photoInput").files[0];

const image =
file ? URL.createObjectURL(file)
: "https://via.placeholder.com/150";

const name =
document.getElementById("playerName").value;

const team =
document.getElementById("playerTeam").value;

const position =
document.getElementById("playerPosition").value;

const number =
document.getElementById("playerNumber").value;

const goals =
document.getElementById("playerGoals").value;

const assists =
document.getElementById("playerAssists").value;

document.getElementById("profileCard").innerHTML=`

<img src="${image}">

<h3>${name}</h3>

<p>🏆 Team: ${team}</p>

<p>⚽ Position: ${position}</p>

<p>👕 Jersey: ${number}</p>

<p>🥅 Goals: ${goals}</p>

<p>🎯 Assists: ${assists}</p>

`;

} let scorers=[];

function addScorer(){

const name=document.getElementById("scorerName").value;
const team=document.getElementById("scorerTeam").value;
const goals=parseInt(document.getElementById("goalCount").value);

if(!name || !team || isNaN(goals)){
alert("Fill all fields");
return;
}

scorers.push({
name:name,
team:team,
goals:goals
});

scorers.sort((a,b)=>b.goals-a.goals);

let tbody=document.querySelector("#scorerTable tbody");

tbody.innerHTML="";

scorers.forEach((player,index)=>{

tbody.innerHTML+=`
<tr>
<td>${index+1}</td>
<td>${player.name}</td>
<td>${player.team}</td>
<td>${player.goals}</td>
</tr>
`;

});

document.getElementById("scorerName").value="";
document.getElementById("scorerTeam").value="";
document.getElementById("goalCount").value="";

} function updateStat(id){

let cell=document.getElementById(id);

let value=parseInt(cell.innerHTML);

cell.innerHTML=value+1;

} function addEvent(eventName){

const now = new Date();

const time =
now.getHours() + ":" +
String(now.getMinutes()).padStart(2,"0");

const li = document.createElement("li");

li.innerHTML =
"<strong>"+time+"</strong> - "+eventName;

document.getElementById("eventList")
.prepend(li);

} const playersAndTeams = [

{
type:"👤 Player",
name:"Abebe",
team:"Abeba FC"
},

{
type:"👤 Player",
name:"Kebede",
team:"Wello United"
},

{
type:"👤 Player",
name:"Mohammed",
team:"Kemise City"
},

{
type:"🏆 Team",
name:"Abeba FC"
},

{
type:"🏆 Team",
name:"Wello United"
},

{
type:"🏆 Team",
name:"Kemise City"
}

];

function searchData(){

const keyword =
document.getElementById("searchInput")
.value.toLowerCase();

const result =
document.getElementById("searchResults");

result.innerHTML="";

playersAndTeams.forEach(item=>{

if(
item.name.toLowerCase().includes(keyword) ||
(item.team &&
item.team.toLowerCase().includes(keyword))
){

result.innerHTML += `
<li>

<strong>${item.type}</strong><br>

Name: ${item.name}

${item.team ?
"<br>Team: "+item.team : ""}

</li>
`;

}

});

if(result.innerHTML===""){
result.innerHTML =
"<li>❌ No Results Found</li>";
}

} function followTeam(){

let team =
document.getElementById("teamSelect").value;

if(team==""){
alert("Please select a team");
return;
}

document.getElementById("favoriteTeam").innerHTML =
"⭐ Favorite Team: " + team;

document.getElementById("teamNews").innerHTML = `
<h4>Latest News</h4>

<p>⚽ ${team} will play tomorrow.</p>

<p>🏆 ${team} is preparing for the next match.</p>

<p>📢 New players have joined ${team}.</p>
`;

localStorage.setItem("favoriteTeam",team);

}

window.onload=function(){

let savedTeam =
localStorage.getItem("favoriteTeam");

if(savedTeam){

document.getElementById("favoriteTeam").innerHTML =
"⭐ Favorite Team: " + savedTeam;

}

} function loadVideo(){

const file =
document.getElementById("videoInput").files[0];

if(file){

const url = URL.createObjectURL(file);

document.getElementById("liveVideo").src = url;

}

}

function sendMessage(){

const input =
document.getElementById("chatInput");

if(input.value.trim()=="") return;

const chat =
document.getElementById("chatBox");

chat.innerHTML +=
`
<div class="message">
👤 ${input.value}
</div>
`;

chat.scrollTop = chat.scrollHeight;

input.value = "";

}  const bookedSeats=[];

function bookSeat(){

const name=document.getElementById("fanName").value;
const seat=document.getElementById("seatSelect").value;

if(name==""||seat==""){
alert("Please enter your name and choose a seat.");
return;
}

if(bookedSeats.includes(seat)){
alert("This seat is already booked.");
return;
}

bookedSeats.push(seat);

const ticketId="SL-"+Math.floor(Math.random()*1000000);

document.getElementById("ticket").innerHTML=`
<h3>✅ Ticket Confirmed</h3>

<p>👤 Name: ${name}</p>

<p>💺 Seat: ${seat}</p>

<p>🏟 Match: Sefer League</p>

<p class="ticket-code">🎫 ${ticketId}</p>
`;

} function generateTicket(){

let name=document.getElementById("ticketName").value;
let seat=document.getElementById("ticketSeat").value;

if(name=="" || seat==""){
alert("Fill all fields");
return;
}

let id="SL"+Math.floor(Math.random()*1000000);

let qr="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="+encodeURIComponent(id);

document.getElementById("ticketCard").innerHTML=`

<h3>🏆 SEFER LEAGUE</h3>

<p>👤 ${name}</p>

<p>💺 Seat : ${seat}</p>

<p>🎟 Ticket ID : ${id}</p>

<img src="${qr}">

<br><br>

<button id="printBtn" onclick="window.print()">
🖨 Print Ticket
</button>

`;

}import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const db = getFirestore(app);window.saveClub = async function(){

const clubName =
document.getElementById("clubName").value;

const clubCity =
document.getElementById("clubCity").value;

try{

await addDoc(collection(db,"clubs"),{

name:clubName,

city:clubCity,

createdAt:new Date()

});

alert("✅ Club Saved");

}catch(error){

alert(error.message);

}

}import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const storage = getStorage(app);window.uploadVideo = async function(){

const file =
document.getElementById("videoFile").files[0];

if(!file){
alert("Select a video");
return;
}

const storageRef =
ref(storage,"videos/"+Date.now()+"_"+file.name);

try{

await uploadBytes(storageRef,file);

const url =
await getDownloadURL(storageRef);

document.getElementById("videoPlayer").src=url;

document.getElementById("uploadStatus").innerHTML=
"✅ Video Uploaded Successfully";

}catch(error){

document.getElementById("uploadStatus").innerHTML=
error.message;

}

} window.uploadImage = async function(){

const file =
document.getElementById("imageFile").files[0];

if(!file) return;

const imageRef =
ref(storage,"images/"+Date.now()+"_"+file.name);

await uploadBytes(imageRef,file);

const url =
await getDownloadURL(imageRef);

document.getElementById("previewImage").src=url;

} import {
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const db = getFirestore(app);window.sendMessage = async function(){

const name =
document.getElementById("userName").value;

const message =
document.getElementById("chatMessage").value;

if(name=="" || message=="") return;

await addDoc(collection(db,"chat"),{

name:name,

message:message,

time:serverTimestamp()

});

document.getElementById("chatMessage").value="";

}import {
doc,
setDoc,
onSnapshot
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"; window.updateScore = async function(){

const home =
parseInt(document.getElementById("homeScore").value)||0;

const away =
parseInt(document.getElementById("awayScore").value)||0;

await setDoc(
doc(db,"live","match1"),
{

home:home,

away:away

}

);

}onSnapshot(
doc(db,"live","match1"),

(snapshot)=>{

if(snapshot.exists()){

const data =
snapshot.data();

document.getElementById("liveScore").innerHTML=

`${data.home} - ${data.away}`;

}

}
);import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

window.loadDashboard = async function(){

const clubs =
await getDocs(collection(db,"clubs"));

document.getElementById("clubsCount").innerHTML=
clubs.size;


const players =
await getDocs(collection(db,"players"));

document.getElementById("playersCount").innerHTML=
players.size;


const matches =
await getDocs(collection(db,"matches"));

document.getElementById("matchesCount").innerHTML=
matches.size;


const videos =
await getDocs(collection(db,"videos"));

document.getElementById("videosCount").innerHTML=
videos.size;


const users =
await getDocs(collection(db,"users"));

document.getElementById("usersCount").innerHTML=
users.size;


const payments =
await getDocs(collection(db,"payments"));

document.getElementById("paymentsCount").innerHTML=
payments.size;

}const CACHE_NAME = "seferleague-v1";

const urlsToCache = [

"/",

"index.html",

"style.css",

"app.js"

];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(urlsToCache))

);

});

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);

}); if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("service-worker.js")

.then(()=>{

console.log("✅ Service Worker Registered");

})

.catch(error=>{

console.log(error);

});

});

}let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

installBtn.hidden=false;

});

installBtn.addEventListener("click",async()=>{

deferredPrompt.prompt();

await deferredPrompt.userChoice;

installBtn.hidden=true;

});
