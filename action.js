class Action {
  _active = false;
  constructor(data, onChange){
    this.onChange = onChange;
    this.data = data; 
    this.enable = this.data.enable;
    this.ACTION_EVENT = "action: event";
  }

  set active(state){
    if (state === this._active) return; 
    this.onChange(this); // pass function to construtor
    this._active = state;
  }

  get active(){
    return this._active;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}