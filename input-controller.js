class InputController {
  constructor( actionsToBind, target, registerPlugin ) {
    this.target = target;
    this.enabled = true;
    this.focused;
    this.actions = {};
    if (actionsToBind) this.actions = actionsToBind;
    if (registerPlugin) this.registerPlugin = registerPlugin;
    this.ACTION_ACTIVATED = this.registerPlugin.ACTION_ACTIVATED;
    this.ACTION_DEACTIVATED = this.registerPlugin.ACTION_DEACTIVATED;
    this.setActionsAndTarget();
  }

  setActionsAndTarget(){
    this.registerPlugin.setActionsAndTarget(this.actions, this.target)
  }

  isActionActive(action){
    return this.registerPlugin.isActionActive(action);
  }

  setEnabled(state){
    this.enabled = state;
    this.registerPlugin.setEnabled(state);
  }

  enableAction(actionName){
    const actions = this.actions;
    if (actions[actionName].enable === false){
      actions[actionName].enable = true;
    }
  }

  disableAction(actionName){
    const actions = this.actions;
    actions[actionName].enable = false;
  }

  attach(target, dontEnable){
    if (dontEnable) return;
    this.target = target;
    this.registerPlugin.setListeners(true, target);
  }

  detach(){
    const target = this.target;
    this.registerPlugin.setListeners(false, target);
    this.target = null;
  }
}

