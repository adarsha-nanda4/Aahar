let BH = document.getElementById("BH");
let LH = document.getElementById("LH");


LH.addEventListener("click",function(){
localStorage.setItem("Hostel","LH")
window.location.reload();
})

BH.addEventListener("click",function(){
    localStorage.setItem("Hostel","BH")
    window.location.reload();
    })