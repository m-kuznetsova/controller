class Action {
  constructor(data){
    this.data = data;
    this.isActive = false;
  }

  setActive(state){
    this.isActive = state;
  }

  getActive(){
    return this.isActive;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}