var helpModal = document.getElementById("helpMenu");
var helpBtn = documet.getElementById("helpButton");
var span = document.getElementsByClassName("close")[0];

function openHelp(){
    modal.style.display = "block";
}

function closeHelp(){
    modal.style.display = "none";
}

helpBtn.onclick = openHelp();
span.onclick = closeHelp();

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }