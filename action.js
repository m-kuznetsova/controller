class Action {
  isActive;
  constructor(data){
    this.data = data;
    this.isActive = isActive;
    this.enable = this.data.enable;
  }

  set activeState(state){
    if (state !== this.isActive) this.isActive = state;
  }

  get activeState(){
    return this.isActive;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}