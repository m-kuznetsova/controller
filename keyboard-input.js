class KeyboardPlugin {
  constructor({onChange, controller}) {
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.ACTION_ACTIVATED = "input-controller:action-activated";
    this.ACTION_DEACTIVATED = "input-controller:action-deactivated";
    this.actions = [];
    this.target = null;
    this.isKeyPressed = this.isKeyPressed.bind(this);
    this.enabled = false;
    this.pressed = [];
    this.onChange = onChange;
  }

  checkAction(action){
    return action.data.keys.some((item) => this.isKeyPressed(item));
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

  actionState(action, isActionActive, target){
    if (!action) {return};
    this.onChange();
    let actionEvent = isActionActive ? new CustomEvent(this.ACTION_ACTIVATED, {detail: {action: action}}) : new CustomEvent(this.ACTION_DEACTIVATED, {detail: {action: action}});
    target.dispatchEvent(actionEvent);
  }

  keyDown({keyCode}){
    if (!this.pressed.some((item) => item === keyCode)) this.pressed.push(keyCode);
    const item = this.actions.find((item) => item.data.keys.includes(keyCode));
    if (!item) return;
    this.actionState(item.data.name, true, this.target);
  }

  keyUp({keyCode}){
    this.pressed = this.pressed.filter( i => i !== keyCode);
    const item = this.actions.find((item) => item.data.keys.includes(keyCode));
    if (!item) return;
    this.actionState(item.data.name, false, this.target);
  }

  isKeyPressed(keyCode){
    return this.pressed.some((item) => item === keyCode);
  }

}