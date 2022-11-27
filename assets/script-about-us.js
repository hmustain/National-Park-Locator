let lydiaModal = document.getElementById("lydiaModal");
let hunterModal = document.getElementById("hunterModal");
let abranModal = document.getElementById("abranModal");

let lydiaBtn = document.getElementById("lydiaBtn");
let hunterBtn = document.getElementById("hunterBtn");
let abranBtn = document.getElementById("abranBtn");

let lydiaSpan = document.getElementsByClassName("close")[0];
let hunterSpan = document.getElementsByClassName("close")[1];
let abranSpan = document.getElementsByClassName("close")[2];

lydiaBtn.onclick = function() {
    lydiaModal.style.display = "block";
}

hunterBtn.onclick = function() {
    hunterModal.style.display = "block";
}

abranBtn.onclick = function() {
    abranModal.style.display = "block";
}

lydiaSpan.onclick = function() {
    lydiaModal.style.display = "none";
}

hunterSpan.onclick = function() {
    hunterModal.style.display = "none";
}

abranSpan.onclick = function() {
    abranModal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == lydiaModal || event.target == hunterModal || event.target == abranModal) {
        modal.style.display = "none";
    }
}