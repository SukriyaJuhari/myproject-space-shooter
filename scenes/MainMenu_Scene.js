export default class MainMenu_Scene
extends Phaser.Scene
{
   constructor() {
      super('MainMenu_Scene');
   }
   
   preload()
   {
      this.load.image('Background', '/assets/image/Background/Background1.png');
      
   };
   
   create()
   {
      this.Background = this.add.sprite(300, 400, 'Background')
         .setDepth(0)
         .setScale(0.6, 1);
      
      
      
      
      
      this.titleText = this.add.text(
         this.scale.width / 2,
         this.scale.height / 2,
         'Main Menu',
         {
            fontSize: '32px',
            color: '#ffffff'
         }
      ).setOrigin(0.5);
      
      
      
      this.TimeText = this.add.text(
         this.scale.width / 2,
         this.scale.height / 2 - 140,
         '',
         {
            fontSize: '40px',
            color: '#ffffff'
         }
      ).setOrigin(0.5);
      
      
      var ms = 0;
      
      
      this.StarTime = function() {
         ms++;
         if (ms > 100) {
            ms = 0;
            
            this.TimeText.setText(ms+'%');
            this.scene.start('GamePlay_Scene');
         }
      }
      
      
      
      this.input.once('pointerdown', () => {
         
         this.scene.start('GamePlay_Scene');
         
      });
      
      
      
      // Dengarkan event resize
      this.scale.on('resize', this.resize, this);
      
      
      
   };
   
   update()
   {
      
      this.StarTime();
      
      
      
      
      
   };
   
   
   
   
   resize(gameSize) { //resize menyesuaikan ukuran game responsif.
      const width = gameSize.width;
      const height = gameSize.height;
      
      // Atur ulang posisi objek jika perlu
      this.titleText.setPosition(width / 2, height / 2);
   };
   
   
}; //extends Phaser.Scene