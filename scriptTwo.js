const rectangle = document.getElementById("rectangle");
const dropArea = document.querySelector(".dropArea");

let dragOffsetX = 0;
let dragOffsetY = 0;

rectangle.addEventListener("dragstart", dragStart);
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
  if (data === "prime") {
    const clone = rectangle.cloneNode(true);

    // update the position of the draggable element
    clone.style.position = "absolute";
    clone.style.left = dropPositionX + "px";
    clone.style.top = dropPositionY + "px";
    clone.dataset.origin = "clone-" + generateRandomString(10);
    dropArea.appendChild(clone);
    clone.addEventListener("dragstart", dragStart);
  }

  if (data !== "prime") {
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.querySelector(`[data-origin='${id}']`);
    // update the position of the draggable element
    draggable.style.position = "absolute";
    draggable.style.left = dropPositionX + "px";
    draggable.style.top = dropPositionY + "px";
    dropArea.appendChild(draggable);
  }
}


let lineElem;
let fromXY, toXY;
let isDrawing = false;

function drawLineXY(fromXY, toXY) {
  if (!lineElem) {
    lineElem = document.createElement('canvas');
    lineElem.style.position = "absolute";
    lineElem.style.zIndex = -100;
    document.body.appendChild(lineElem);
  }
  let leftpoint, rightpoint;
  if (fromXY.x < toXY.x) {
    leftpoint = fromXY;
    rightpoint = toXY;
  } else {
    leftpoint = toXY;
    rightpoint = fromXY;
  }

  let lineWidthPix = 4;
  let gutterPix = 10;
  let origin = {x: leftpoint.x - gutterPix, y: Math.min(fromXY.y, toXY.y) - gutterPix};
  lineElem.width = Math.max(rightpoint.x - leftpoint.x, lineWidthPix) + 2.0 * gutterPix;
  lineElem.height = Math.abs(fromXY.y - toXY.y) + 2.0 * gutterPix;
  lineElem.style.left = origin.x + "px";
  lineElem.style.top = origin.y + "px";
  let ctx = lineElem.getContext('2d');
  // Use the identity matrix while clearing the canvas
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, lineElem.width, lineElem.height);
  ctx.restore();
  ctx.lineWidth = lineWidthPix;
  ctx.strokeStyle = '#09f';
  ctx.beginPath();
  ctx.moveTo(fromXY.x - origin.x, fromXY.y - origin.y);
  ctx.lineTo(toXY.x - origin.x, toXY.y - origin.y);
  ctx.stroke();
}

document.querySelectorAll('.circle').forEach(function(circle) {
    circle.addEventListener('mousedown', function(e) {
      isDrawing = true;
      fromXY = {x: e.clientX, y: e.clientY};
    });
    circle.addEventListener('mousemove', function(e) {
      if (isDrawing) {
        toXY = {x: e.clientX, y: e.clientY};
        drawLineXY(fromXY, toXY);
      }
    });
    circle.addEventListener('mouseup', function(e) {
      isDrawing = false;
      toXY = {x: e.clientX, y: e.clientY};
      drawLineXY(fromXY, toXY);
    });
  });