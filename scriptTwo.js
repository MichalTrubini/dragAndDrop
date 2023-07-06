const eventStep = document.getElementById("eventStep");
const delayStep = document.getElementById("delayStep");
const decisionStep = document.getElementById("decisionStep");
const dropArea = document.querySelector(".dropArea");

let dragOffsetX = 0;
let dragOffsetY = 0;

eventStep.addEventListener("dragstart", dragStart);
delayStep.addEventListener("dragstart", dragStart);
decisionStep.addEventListener("dragstart", dragStart);
dropArea.addEventListener("dragover", dragOver);
dropArea.addEventListener("drop", drop);

function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.origin);

  const rect = e.target.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");

  // calculate the position of the drop
  const dropPositionX = e.clientX - dragOffsetX;
  const dropPositionY = e.clientY - dragOffsetY;
  if (data === "prime-event") {
    let clone = eventStep.cloneNode(true);
    console.log(clone);
    // update the position of the draggable element
    clone.style.position = "absolute";
    clone.style.left = dropPositionX + "px";
    clone.style.top = dropPositionY + "px";
    clone.dataset.origin = "clone-" + generateRandomString(10);
    dropArea.appendChild(clone);
    clone.addEventListener("dragstart", dragStart);
    return;
  }

  if (data === "prime-delay") {
    let clone = delayStep.cloneNode(true);

    // update the position of the draggable element
    clone.style.position = "absolute";
    clone.style.left = dropPositionX + "px";
    clone.style.top = dropPositionY + "px";
    clone.dataset.origin = "clone-" + generateRandomString(10);
    dropArea.appendChild(clone);
    clone.addEventListener("dragstart", dragStart);
    return;
  }

  if (data === "prime-decision") {
    let clone = decisionStep.cloneNode(true);

    // update the position of the draggable element
    clone.style.position = "absolute";
    clone.style.left = dropPositionX + "px";
    clone.style.top = dropPositionY + "px";
    clone.dataset.origin = "clone-" + generateRandomString(10);
    dropArea.appendChild(clone);
    clone.addEventListener("dragstart", dragStart);
    return;
  }
  
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.querySelector(`[data-origin='${id}']`);
  // update the position of the draggable element
  draggable.style.position = "absolute";
  draggable.style.left = dropPositionX + "px";
  draggable.style.top = dropPositionY + "px";
  dropArea.appendChild(draggable);
}
