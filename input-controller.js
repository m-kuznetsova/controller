class InputController {
  constructor( actionsToBind, target) {
    this.target = target;
    this.enabled = false;
    this.focused;
    this.actions = {};
    if (actionsToBind) this.actions = actionsToBind;
    this.plugins = [];
    this.ACTION_ACTIVATED;
    this.ACTION_DEACTIVATED;
  }

  registerPlugin(plugin){
    this.plugins.push(plugin);
    this.plugins.forEach((item) => {
      this.ACTION_ACTIVATED = item.ACTION_ACTIVATED;
      this.ACTION_DEACTIVATED = item.ACTION_DEACTIVATED;
    })
    this.setActionsAndTarget();
  }

  setActionsAndTarget(){
    this.plugins.forEach((item) => {item.setActionsAndTarget(this.actions, this.target)})
  }

  onPluginChange(){
    // console.log("1111", this);
    // console.log("1111", this.plugins.some((plugin) => plugin.checkAction(action)));
    if (!this.enabled) return;
    this.actions.forEach((action) => action.active = this.plugins.some((plugin) => plugin.checkAction(action)));
  }

  isActionActive(action){
    // if ( this.actions.find((item) => item.data.name === action).enable === false) return;
    // console.log(this.actions);
    return this.actions.find((item) => item.data.name === action).active;
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

