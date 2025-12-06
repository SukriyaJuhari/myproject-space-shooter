// ./core/FullScreenBtnScene.js
export default class FullScreenBtnScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FullScreenBtnScene', active: true }); // <- aktif langsung
  }
  preload()
  {
    //UI image fullscreenOff
    this.load.image('fullscreenOn', 'assets/image/UI/FullscreenOn.png');
    this.load.image('fullscreenOff', 'assets/image/UI/FullscreenOff.png');
    
  }
  create() {
    const fsButton = this.add.image(this.scale.width - 20, 20, 'fullscreenOn')
      .setOrigin(1, 0)
      .setInteractive()
      .setScrollFactor(0)
      .setScale(0.1)
      .setDepth(99);
    
    fsButton.on('pointerup', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        fsButton.setTexture('fullscreenOn');
      } else {
        this.scale.startFullscreen();
        fsButton.setTexture('fullscreenOff');
      }
    });
  }
}