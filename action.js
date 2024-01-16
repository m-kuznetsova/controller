class Action {
  constructor(data){
    this.data = data;
    this.isActive = false;
  }

  setActive(state){
    this.setActive = state;
  }

  getActive(){
    return this.setActive;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}