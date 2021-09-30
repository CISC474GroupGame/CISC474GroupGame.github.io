var helpModal = document.getElementById("helpMenu");
var helpBtn = document.getElementById("helpButton");
var span = document.getElementsByClassName("close")[0];
function init(){
    helpBtn.onclick = function(){
        helpModal.style.display = "block";
    }
    
    span.onclick = function(){
        helpModal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == helpModal) {
          helpModal.style.display = "none";
        }
      }
    
}
window.onload = init();
