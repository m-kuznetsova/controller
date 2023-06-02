const controllerActions = {
  "left": { 
    keys: [37, 65],
    enable: false
  },
  "right": {
    keys: [39, 68]
  },
  "top": {
    keys: [38, 87]
  },
  "bottom": {
    keys: [34, 83]
  },
  "space": {
    keys: [32] 

  }
} 

const screen = document.querySelector(".main__screen");
const controller = new InputController(controllerActions, screen);
const buttons = document.querySelectorAll(".main__button");
const block = document.querySelector(".main__block");
const activatedBlock = document.querySelector(".main__info");
let isSpace = false;

buttons.forEach( (item) => {
  item.addEventListener("click", onClick);
})

function onClick(e){
  e.target.blur();
  const id = e.target.id;
  if (id === "attach"){
    controller.attach(screen);
    changeClass("detach", e);
  }
  if (id === "detach"){
    controller.detach();
    changeClass("attach", e);
  }
  if (id === "activate"){
    controller.enabled = true;
    changeClass("deactivate", false);
  }
  if (id === "deactivate"){
    controller.enabled = false;
    changeClass(false, e);
  }
  if (id === "space"){
    if (!isSpace){
      isSpace = true;
      changeClass(false, e);
    } else {
      isSpace = false;
      changeClass("space", false);
    }
  }
}

function changeClass(id, e){
  if (id){
    buttons.forEach((item) => {
      item.id === id &&  item.classList.remove("main__button_active");
    })
  }
  if (e){
    e.target.classList.add("main__button_active");
  }
}

let y = 0;
let x = 0;
let colors = ["blue", "red", "green", "pink", "yellow", "purple"];

function random(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

setInterval( function(){ 
  if (controller.isActionActive("top")){
    y = y - 5;
  }
  if(controller.isActionActive("bottom")){
    y = y + 5;
  }
  if (controller.isActionActive("left")){
    x = x - 5;
  }
  if (controller.isActionActive("right")){
    x = x + 5;
  }
  if (isSpace && controller.isActionActive("space")){
    block.style.backgroundColor = colors[random(0, colors.length - 1)];
  }
  console.log(controller.ACTION_DEACTIVATED)
  // if (controller.ACTION_ACTIVATED) {
  //   activatedBlock.innerHTML = "input-controller:action-activated" ;
  // } else {
  //   activatedBlock.innerHTML = "" ;
  // }
  // if (controller.ACTION_DEACTIVATED) {
  //   activatedBlock.innerHTML = "input-controller:action-deactivated" ;
  // }
  block.style.transform = `translate(${x}%, ${y}%)`;
}, 100 );

