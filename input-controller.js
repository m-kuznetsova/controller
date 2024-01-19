class InputController {
  constructor(target) {
    this.target = target;
    this.enabled = false;
    this.focused;
    this.actions;
    this.plugins = [];
    this.ACTION_ACTIVATED = "input-controller:action-activated";
    this.ACTION_DEACTIVATED = "input-controller:action-deactivated";
    this.onPluginChange = this.onPluginChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(target){
    // console.log("onchange ", target._active);
    let actionEvent = target._active ? new CustomEvent(this.ACTION_ACTIVATED, {detail: {action: target.data.name}}) : new CustomEvent(this.ACTION_DEACTIVATED, {detail: {action: target.data.name}});
    this.target.dispatchEvent(actionEvent);
  }

  bindActions(actions){
    this.actions = actions;
  }

  registerPlugin(plugin){
    this.plugins.push(plugin);
    this.setActionsAndTarget();
  }

  setActionsAndTarget(){
    this.plugins.forEach((item) => {item.setActionsAndTarget(this.actions, this.target)})
  }

  onPluginChange(){
    if (!this.enabled) return;
    this.actions.forEach((action) => {
      if (action.enable != false) {
        // console.log("1111 ", action.active, this.plugins.some((plugin) => plugin.checkAction(action)))
        action.active = this.plugins.some((plugin) => plugin.checkAction(action));
        // console.log("2222 ", action.active)
      }
    });
  }

  isActionActive(action){
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

