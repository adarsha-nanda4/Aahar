let BH = document.getElementById("BH");
let LH = document.getElementById("LH");



LH.addEventListener("click",function(){
localStorage.setItem("Hostel","LH")

})

BH.addEventListener("click",function(){
    localStorage.setItem("Hostel","BH")
    })


const menuItems = document.querySelectorAll('.menu .item');

// Add click event listeners to toggle the submenu
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
      submenu.classList.toggle('show'); // Toggle the "show" class
    }
  });
});



let htl= localStorage.getItem("Hostel")

console.log(htl)

const currentPage = window.location.pathname;

if (!htl) {
  // If no hostel is selected, redirect to the default page (index.html)
  if (!currentPage.includes("index.html")) {
    window.location = "index.html";
  }
} else if (htl === "LH" && !currentPage.includes("LHpage.html")) {
  // Redirect to LHpage.html if selected and not already there
  window.location = "LHpage.html";
} else if (htl === "BH" && !currentPage.includes("index.html")) {
  // Redirect to BHpage.html if selected and not already there
  window.location = "BHpage.html";
}



