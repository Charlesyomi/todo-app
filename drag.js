import { swapPositionInItemRef } from "./store.js";

function listenForDrag(target) {
  target.addEventListener("dragstart", handleDragStart);
  target.addEventListener("dragenter", handleDragEnter);
  target.addEventListener("dragover", handleDragOver);
  target.addEventListener("dragleave", handleDragLeave);
  target.addEventListener("drop", handleDrop);
  target.addEventListener("dragend", handleDragEnd);
}

function swapNodePositions(elem1, elem2) {
  const afterElem2 = elem2.nextElementSibling;
  const parent = elem2.parentNode;

  if (afterElem2 === elem1) parent.insertBefore(elem1, elem2);
  else {
    elem1.replaceWith(elem2);
    parent.insertBefore(elem1, afterElem2);
  }
}
// function swapInItemsRef(ref, item1, item2) {
//   [ref[item1], ref[item2]] = [ref[item2], ref[item1]];
// }

let dragSrcEl;

function handleDragStart(ev) {
  console.log("event: ", ev);
  dragSrcEl = ev.target;

  ev.dataTransfer.effectAllowed = "move";
}

function handleDragOver(ev) {
  ev.preventDefault();
  return false;
}

function handleDragEnter(ev) {
  // console.log("event: ", ev);
}

function handleDragLeave(ev) {
  // console.log("event: ", ev);
}

function handleDrop(ev) {
  ev.stopPropagation();
  console.log("event: ", ev);

  if (dragSrcEl !== this) {
    const dropSrcEl = this;

    console.log(dropSrcEl);

    swapNodePositions(dragSrcEl, dropSrcEl);
    swapPositionInItemRef(dragSrcEl, dropSrcEl);
  }
  return false;
}

function handleDragEnd(ev) {}

export { listenForDrag };
