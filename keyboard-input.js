class KeyboardPlugin {
  constructor() {
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.ACTION_ACTIVATED = "input-controller:action-activated";
    this.ACTION_DEACTIVATED = "input-controller:action-deactivated";
    this.actions = [];
    this.target = null;
    this.isKeyPressed = this.isKeyPressed.bind(this);
    this.enabled = false;
    this.pressed = [];
  }

  checkAction(action){
    const item = this.actions.find((item) => item.data.name === action).data;
    return item.enable !== false && item.isPressed && item.isPressed.length > 0;
  }

  setActionsAndTarget(actions, target){
    this.actions = actions;
    this.target = target;
  }

  setEnabled(state){
    this.enabled = state;
  }

  setListeners(state, target){
    this.target = target;
    if (state){
      target.addEventListener("keydown", this.keyDown, false);
      target.addEventListener("keyup", this.keyUp, false);
    } else {
      target.removeEventListener("keydown", this.keyDown, false);
      target.removeEventListener("keyup", this.keyUp, false);
      this.target = null;
    }
  }

  isActionActive(action){
    if (!this.enabled) {return}
    const _actions = this.actions;
    if (_actions.find((item) => item.data.name === action).data.enable === false) {return false}
    return _actions.find((item) => item.data.name === action).data.keys.find( key => this.isKeyPressed(key)) ? true : false;
  }

  actionState(action, isActionActive, target){
    if (!action) {return};
    let actionEvent = isActionActive ? new CustomEvent(this.ACTION_ACTIVATED, {detail: {action: action}}) : new CustomEvent(this.ACTION_DEACTIVATED, {detail: {action: action}});
    target.dispatchEvent(actionEvent);
  }

  keyDown({keyCode}){
    this.pressed.push(keyCode);
    const item = this.actions.find((item) => item.data.keys.includes(keyCode));
    if (!item.data.isPressed){
      item.emptyPressed();
    }
    if (!item.data.isPressed.includes(keyCode)){
      item.addPressed(keyCode);
    }
    this.actionState(item.data.name, true, this.target);
  }

  keyUp({keyCode}){
    this.pressed.filter( i => i !== keyCode);
    const item = this.actions.find((item) => item.data.keys.includes(keyCode));
    item.removePressed(keyCode);
    this.actionState(item.data.name, false, this.target);
  }

  isKeyPressed(keyCode){
    return this.pressed.find((item) => item === keyCode);
  }

}