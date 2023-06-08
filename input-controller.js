class InputController {
  constructor( actionsToBind, target ) {
    this.target = target;
    this.enabled = true;
    this.focused;
    // this.ACTION_ACTIVATED = false;
    this.ACTION_ACTIVATED = "input-controller:action-activated";
    this.ACTION_DEACTIVATED = "input-controller:action-deactivated";
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
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    target.addEventListener("keyup", this.keyUp, false);
    target.addEventListener("keydown", this.keyDown, false);
  }

  detach(){
    const target = this.target;
    target.removeEventListener("keyup", this.keyUp, false);
    target.removeEventListener("keydown", this.keyDown, false);
    this.target = null;
  }

  actionState(action, isActionActive, target){
    if (!action || !target || !isActionActive) {return};
    let actionEvent;
    if (isActionActive){
      actionEvent = new CustomEvent(this.ACTION_ACTIVATED, {action: action});
    } else {
      actionEvent = new CustomEvent(this.ACTION_DEACTIVATED, {action: action});
    }
    target.dispatchEvent(actionEvent);
  }

  keyUp(key){
    const keyCode = key.keyCode;
    const keyType = key.type;
    let _actions = this.actions;
    let currentAction;
    for (let action in _actions){
      _actions[action].keys.forEach( (key) => {
        if (!_actions[action].isPressed){
          _actions[action].isPressed = []
        }
        if (key === keyCode){
          let isNewCode = false;
          _actions[action].isPressed.forEach((item) => {
            if (item === keyCode){
              isNewCode = true;
            }
          })
          if (!isNewCode){
            _actions[action].isPressed.push(keyCode);
              currentAction = action;
          }
        }
      })
    }
    this.bindActions(_actions);
    this.actionState(currentAction, true, this.target)
  }

  keyDown(key){
    const keyCode = key.keyCode;
    const keyType = key.type;
    let _actions = this.actions;
    let currentAction;
    for (let action in _actions){
      _actions[action].keys.forEach( (key) => {
        if (key === keyCode){ 
          currentAction = action;
          let code = _actions[action].isPressed;
          code?.forEach((item, index) => {
            if (item === keyCode){
              _actions[action].isPressed.splice(index)
            }
          })
        }
      })
    }
    this.bindActions(_actions);
    this.actionState(currentAction, false, this.target)
  }

  isKeyPressed(keyCode){
    let result = null;
    let _actions = this.actions;
    for (let action in _actions){
      _actions[action].keys.forEach( (key) => {
        if (key === keyCode){
          if (_actions[action].isPressed?.length > 0){
            result = true;
          } else {
            result = false;
          }
        }
      })
    }
    return result;
  }
}