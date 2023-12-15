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
    if (_actions[action].enable === false) {return false}
    return _actions[action].keys.find( key => this.isKeyPressed(key)) ? true : false;
  }

  actionState(action, isActionActive, target){
    if (!action) {return};
    let actionEvent = isActionActive ? new CustomEvent(this.ACTION_ACTIVATED, {detail: {action: action}}) : new CustomEvent(this.ACTION_DEACTIVATED, {detail: {action: action}});
    target.dispatchEvent(actionEvent);
  }

  keyDown(key){
    const keyCode = key.keyCode;
    let _actions = this.actions;
    let currentAction;
    for (let action in _actions){
      if (_actions[action].keys.includes(keyCode)){
        if (!_actions[action].isPressed){
          _actions[action].isPressed = [];
        }
        if (!_actions[action].isPressed.includes(keyCode)){
          _actions[action].isPressed.push(keyCode);
        }
        currentAction = action;
      }
    }
    this.actionState(currentAction, true, this.target);
  }

  keyUp(key){
    const keyCode = key.keyCode;
    let _actions = this.actions;
    let currentAction;
    for (let action in _actions){
      if (_actions[action].keys.includes(keyCode)){
        _actions[action].isPressed = _actions[action].isPressed.filter( i => i != keyCode);
        currentAction = action;
      }
    }
    this.actionState(currentAction, false, this.target);
  }

  isKeyPressed(keyCode){
    let result = null;
    let _actions = this.actions;
    for (let action in _actions){
      if (_actions[action].keys.includes(keyCode)){
        result = _actions[action].isPressed?.length > 0 ? true : false;
      }
    }
    return result;
  }

}