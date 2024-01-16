class Action {
  isActive;
  constructor(data){
    this.data = data;
    this.isActive = isActive;
  }

  set activeState(state){
    this.isActive = state;
  }

  get activeState(){
    return this.isActive;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}