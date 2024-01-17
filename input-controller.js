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

  onPluginChange(){
    console.log(this, this.plugins)
    const plugin = this.plugins.find((item) => item.checkAction(this.actions.find((item) => item._active === true)));
    const actions = plugin.actions.find((item) => item._active === true);
    console.log(this.actions.find((item) => item._active === true));
    return {plugin, actions}
  }

  setActionsAndTarget(){
    this.plugins.forEach((item) => {item.setActionsAndTarget(this.actions, this.target)})
  }

  isActionActive(action){
    if (!this.enabled) return;
    console.log(this, this.plugins)
    // const plugin = this.plugins.find((item) => item.checkAction(this.actions.find((item) => item.data.name === action)));
    // console.log(this.onPluginChange());
    return this.onPluginChange().actions._active;
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

