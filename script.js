/* draggable element */
const item = document.querySelector('.item');
item.addEventListener('dragstart', dragStart);

let dragOffsetX = 0;
let dragOffsetY = 0;

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);

    const rect = e.target.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

/* full-screen drop target */
const fullScreenDropTarget = document.querySelector('.dropArea');
fullScreenDropTarget.addEventListener('dragover', dragOver);
fullScreenDropTarget.addEventListener('drop', drop);

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    draggable.classList.remove('hide');

    // calculate the position of the drop
    const dropPositionX = e.clientX - dragOffsetX;
    const dropPositionY = e.clientY - dragOffsetY;

    // update the position of the draggable element
    draggable.style.position = 'absolute';
    draggable.style.left = dropPositionX + 'px';
    draggable.style.top = dropPositionY + 'px';
    e.preventDefault();
}