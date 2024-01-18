const screen = document.querySelector(".main__screen");
const actionsList = actionsSettings.arr.map((data) => new Action(data));
// const keyboardPlugin = new KeyboardPlugin();
// const controller = new InputController(actionsList, screen, [keyboardPlugin]);

const controller = new InputController(actionsList, screen);
const keyboardPlugin = new KeyboardPlugin({onChange: controller.onPluginChange, controller: controller});
controller.registerPlugin(keyboardPlugin);

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
    controller.setEnabled(true);
    changeClass("deactivate", e, ["attach"]);
  }
  if (id === "deactivate"){
    controller.setEnabled(false);
    changeClass("activate", e, ["attach"]);
  }
  if (id === "space"){
    if (!isSpace){
      isSpace = true;
      changeClass(false, e);
    } else {
      isSpace = false;
      changeClass("space", false, ["attach", "activate", "deactivate"]);
    }
  }
}

function changeClass(id, e, exclude){
  if (id){
    buttons.forEach((item) => {
       !exclude || !exclude.find(i => item.id === i) && item.classList.remove("main__button_active");
    })
  }
  if (e){
    e.target.id === "attach" && document.querySelector(".main__buttons").classList.remove("main__buttons_noAttached");
    e.target.id === "detach" && document.querySelector(".main__buttons").classList.add("main__buttons_noAttached");
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

function moving(e){
  if (controller.isActionActive("top")){
    y = y - 5;
  }
  if (controller.isActionActive("bottom")){
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
  block.style.transform = `translate(${x}px, ${y}px)`;

}

screen.addEventListener(controller.ACTION_ACTIVATED, moving, false);
screen.addEventListener(controller.ACTION_DEACTIVATED, () => {}, false);