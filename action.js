class Action {
  constructor(data){
    this.data = data;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}