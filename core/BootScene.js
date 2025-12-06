// ./core/BootScene.js
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }
  preload() {
    //Background image load/
    this.load.image('Background0', 'assets/image/Background/Background1.png');


  }

  create() {
    
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    console.log("Booting Successfully!!");

    // Setelah siap, langsung ke Preload
    this.scene.start("PreloadScene");
  }
}