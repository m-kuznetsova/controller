class InputController {
  constructor( actionsToBind, target ) {
    this.target = target;
    this.enabled = true;
    this.focused = false;
    this.ACTION_ACTIVATED;
    this.ACTION_DEACTIVATED;
    this.actions = {};
    if (actionsToBind) this.bindActions(actionsToBind);
  }


  bindActions(actionsToBind){
    this.actions = actionsToBind;
  }

  isActionActive(action){
    if (!this.enabled) {return}
    let result = false;
    const _actions = this.actions;
    if (_actions[action].enable === false) {return false}

    _actions[action].keys.forEach( (key) => {
      const isPressed = this.isKeyPressed(key);
      if (isPressed === true){
        result = true;
      }
    })
    return result;
  }

  enableAction(actionName){
    const actions = this.actions;
    if (actions[actionName].enable === false){
      actions[actionName].enable = true;
      this.bindActions(actions);
    }
  }

  disableAction(actionName){
    const actions = this.actions;
    actions[actionName].enable = false;
    this.bindActions(actions);
  }

  attach(target, dontEnable){
    if (dontEnable) return;
    this.target = target;
    this.keyPress = this.keyPress.bind(this);
    target.addEventListener("keyup", this.keyPress, false);
    target.addEventListener("keydown", this.keyPress, false);
  }

  detach(){
    const target = this.target;
    target.removeEventListener("keyup", this.keyPress, false);
    target.removeEventListener("keydown", this.keyPress, false);
  }

  keyPress(key){
    const keyCode = key.keyCode;
    const keyType = key.type;
    let _actions = this.actions;
    for (let action in _actions){
      _actions[action].keys.forEach( (key) => {
        if (key === keyCode){
          if (keyType === "keydown"){
            _actions[action].isPressed = true;
          } else {
            _actions[action].isPressed = false;
          }
        }
      })
    }
    this.bindActions(_actions);
  }


  isKeyPressed(keyCode){
    let result = null;
    let _actions = this.actions;
    for (let action in _actions){
      _actions[action].keys.forEach( (key) => {
        if (key === keyCode){
          if (_actions[action].isPressed === true){
            result = true;
          } else if (_actions[action].isPressed === false){
            result = false;
          }
        }
      })
    }
    return result;
  }
}