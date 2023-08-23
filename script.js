let typeBox = document.getElementById("typeBox");
let finishBox = document.getElementById("finishBox");
let input = document.getElementById("input");
const newPbModalElement = document.getElementById('newPbModal');
const newPbModal = new bootstrap.Modal('#newPbModal', {});
// const signInModal = doc

let onFinishScreen = false;
let timerStartTime = 0;
let personalBest = 0;

window.onload = () => {
  openTypeBox();

  input.focus();
  
  input.addEventListener("input", handleChangeInInput);
  window.addEventListener("keypress", handleGlobalKeypress);
  window.addEventListener("click", handleGlobalClick);
  
}

function handleGlobalClick() {
  input.focus();
}

function openTypeBox() {
  typeBox.classList.remove("d-none");
  finishBox.classList.add("d-none");
  onFinishScreen = false;
}

function openFinishBox() {
  typeBox.classList.add("d-none");
  finishBox.classList.remove("d-none");
  onFinishScreen = true;
}

function getPBinSeconds() {
  return localStorage.getItem("personalBest") ? localStorage.getItem("personalBest") / 1000 : null;
}

function getPBinMillseconds() {
  return localStorage.getItem("personalBest");
}

function setPBinMillseconds(ms) {
  localStorage.setItem("personalBest", ms);
}

function updateTimeWithNewTime(time) {
  document.getElementById("seconds").innerText = time / 1000;

  if (document.getElementById("pb").innerText == "") {
    if (getPBinMillseconds() == null) {
      document.getElementById("pb").innerText = time / 1000;
      setPBinMillseconds(time);
    } else {
      document.getElementById("pb").innerText = getPBinSeconds();
    }
  }

  console.log(getPBinMillseconds());
  console.log(time);
  
  if (getPBinMillseconds() > time) {
    setPBinMillseconds(time);
    openNewPbModal();
    document.getElementById("pb").innerText = getPBinSeconds();
  }
}

function handleChangeInInput(e) {
  console.log(input.value.length);
  if (input.value.toLowerCase().trim() == "abcdefghijklmnopqrstuvwxyz") {
    openFinishBox();
    updateTimeWithNewTime(Date.now() - timerStartTime)
  }

  if (input.value.length == 1) {
    timerStartTime = Date.now();
  }
}

function handleGlobalKeypress(e) {
  if (e.key == "Enter") {
    resetTypeBox();
    if (onFinishScreen) {
      openTypeBox();
      input.focus();
    }
  }
}

function resetTypeBox() {
  input.value = "";
}

function openNewPbModal() {
  console.log("me");
  newPbModal.show();
  // newPbModal.addEventListener('shown.bs.modal', () => {
  //   myInput.focus()
  // })
}

function openSignInModal() {
  
}

document.addEventListener("load", () => {
  openSignInModal();
});