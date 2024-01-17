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
    this.onChange(this);
    this._active = state;
  }

  get active(){
    this.addEventListener(this.ACTION_ACTIVATED, () => {}, false);
    return this._active;
  }

  onChange(){
    this.dispatchEvent(new CustomEvent(this.ACTION_EVENT));
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}