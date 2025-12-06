// ./Script/Map/MapBackground.js
export default class MapBackground {
  constructor(scene) {
    this.scene = scene;
    this.gameW = scene.scale.width;

    // Membuat background pakai scene
    this.BGimage0 = scene.add.image(this.gameW / 2, 0, 'Background0');
    this.BGimage0Copy1 = scene.add.image(this.gameW / 2, -1920, 'Background0');
    this.BGimage0Copy2 = scene.add.image(this.gameW / 2, -1920 * 2, 'Background0');
    this.BGList = [
      this.BGimage0,
      this.BGimage0Copy1,
      this.BGimage0Copy2
    ];
    
    //Background function
    this.runBG = function(speed, Offset) {
      this.BGList.forEach(BGAll => {
        BGAll.setOrigin(0.5, 0).setDepth(0).setScale(1);
        BGAll.y += speed;
      });
      
      //Background logika
      if (this.BGList[0].y >= Offset) {
        this.BGList[0].y = -Offset;
      }
      if (this.BGList[1].y >= Offset) {
        this.BGList[1].y = -Offset;
      }
      if (this.BGList[2].y >= Offset) {
        this.BGList[2].y = -Offset * 2;
      }
    }
    //CREATE BACKGROUND
   
  }
  
  update () {
    this.runBG(5, this.BGList[0].height);
  }
}