class Action {
  constructor(data){
    this.data = data;
  }

  emptyPressed(){
    this.data.isPressed = [];
  }

  addPressed(item){
    this.data.isPressed.push(item);
  }

  removePressed(item){
    this.data.isPressed = this.data.isPressed.filter( i => i != item);
  }

  getPressedLength(){
    return this.data.isPressed ? this.data.isPressed.length : 0 ;
  }

  toggleEnable(state){
    this.data.enable === state;
  }
}

// const list = [{a:2}, {b:3}]
// class Item{
//     constructor(data){
//         this.data = data;
//     }
// }
// const itemsList = list.map((data) => new Item(data))