// ./Scenes/MainMenuScene.js
export default class MainMenuScene
extends Phaser.Scene
{
   constructor() {
      super('MainMenuScene');
   }

   
   create()
   {
      this.Background0 = this.add.image(
  this.scale.width / 2,
  this.scale.height / 2,
  'Background0'
);
     
      this.titleText = this.add.text(
         this.scale.width / 2,
         this.scale.height / 2,
         'Tap To Play',
         {
            fontSize: '32px',
            color: '#ffffff'
         }
      ).setOrigin(0.5).setInteractive();
      
      this.titleText.on('pointerdown', () => {
         
         this.scene.start('GamePlayScene');
         
      });
      
      console.log('MainMenuScene Ok✓')
   }
   
   
   
   update()
   {
      
   };
   
   
   
}; //extends Phaser.Scene