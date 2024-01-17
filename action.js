class Action {
  isActive;
  constructor(data){
    this.data = data;
    this.isActive = isActive;
    this.enable = this.data.enable;
    this.ACTION_EVENT = "action: event";
  }

  set activeState(state){
    if (state === this.isActive) return; 
    this.onChange();
    this.isActive = state;
  }

  get activeState(){
    this.addEventListener(this.ACTION_ACTIVATED, () => {}, false);
    return this.isActive;
  }

  onChange(){
    this.dispatchEvent(new CustomEvent(this.ACTION_EVENT));
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}