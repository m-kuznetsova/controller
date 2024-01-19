class Action {
  _active = false;
  constructor(data, onChange){
    this.onChange = onChange;
    this.data = data; 
    this.enable = this.data.enable;
  }

  set active(state){
    // if (state === this._active) return; 
    console.log("staste ", this._active, state)
    this._active = state;
    this.count = this.count + 1;
    this.onChange(this); // pass function to construtor
  }
  get active(){
    return this._active;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}