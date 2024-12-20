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


    // Select all items that have a submenu
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
