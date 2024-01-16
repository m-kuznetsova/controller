class InputController {
  constructor( actionsToBind, target, registerPlugin ) {
    this.target = target;
    this.enabled = false;
    this.focused;
    this.actions = {};
    if (actionsToBind) this.actions = actionsToBind;
    if (registerPlugin) this.plugins = registerPlugin;
    this.plugins.forEach((item) => {
      this.ACTION_ACTIVATED = item.ACTION_ACTIVATED;
      this.ACTION_DEACTIVATED = item.ACTION_DEACTIVATED;
    })
    this.setActionsAndTarget();
  }

  setActionsAndTarget(){
    this.plugins.forEach((item) => {item.setActionsAndTarget(this.actions, this.target)})
  }

  isActionActive(action){
    if (!this.enabled) return;
    return this.plugins.find((item) => item.checkAction(action));
  }

  setEnabled(state){
    this.enabled = state;
    this.plugins.forEach((item) => {item.setEnabled(state)})
  }

  enableAction(actionName){
    const actions = this.actions;
    const item = actions.find((item) => item.data.name === actionName);
    if (item.enable === false){
      item.toggleEnable(true);
    }
  }

  disableAction(actionName){
    const actions = this.actions;
    const item = actions.find((item) => item.data.name === actionName);
    item.toggleEnable(false);
  }

  attach(target, dontEnable){
    if (dontEnable) return;
    this.target = target;
    this.plugins.forEach((item) => {item.setListeners(true, target)})
  }

  detach(){
    const target = this.target;
    this.plugins.forEach((item) => {item.setListeners(false, target)})
    this.target = null;
  }
}

