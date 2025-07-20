//GamePlay Scane

import { Player } from '/Script/PlayerScript.js';

export default class GamePlay_Scene
extends Phaser.Scene {
  constructor() {
    super('GamePlay_Scene');
    
  }
  
  preload() {
    Player.preload(this); // load gambar PlayerScript
    
    
    this.load.image('fullscreenOff', '/assets/image/UI/FullscreenOff.png');
    this.load.image('fullscreenOn', '/assets/image/UI/FullscreenOn.png');
    
    // image Background/
    this.load.image('Background0', '/assets/image/Background/Background1.png');
    //audio load Backsound
    this.load.audio('BackSound0', '/assets/audio/sound/Backsound0.ogg');
    
    
  } //preload()
  
  
  
  
  create() {
    
    //Script modul 
    this.player = new Player(this, 100, 100);
    //this.enemy = new Enemy(this, 300, 100);
    
    
    //===============================================================
    //FULLSCREEN PROGRAM 
    const fsButton = this.add.image(this.scale.width - 20, 20, 'fullscreenOn')
      .setOrigin(1, 0)
      .setInteractive()
      .setScrollFactor(0)
      .setScale(0.1)
      .setDepth(99);
    
    fsButton.on('pointerup', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        fsButton.setTexture('fullscreenOn'); // icon fullscreenOn.
      } else {
        this.scale.startFullscreen();
        fsButton.setTexture('fullscreenOff'); // icon fullscreenOff.
      }
    });
    //FULLSCREEN PROGRAM 
    //===============================================================
    //
    //
    //
    //======================================================
    //CREATE VARIABEL
    
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;
    this.gameInfo = true;
    var SBGVol = 0.5
    this.SBGvolume = SBGVol;
    
    //CREATE VARIABEL
    //======================================================
    //
    //
    //
    //======================================================
    //TEXT CREATE
    
    //text info game untuk debugging melihat info.
    this.GameInfo = this.add.text(0, 0, '', { fontSize: '15px', fill: '#fff' })
      .setOrigin(0.3)
      .setDepth(2)
      .setAlpha(0);
    
    //TEXT CREATE
    //======================================================
    //
    //
    //
    //======================================================
    //CREATE GROUP
    
    this.RintanganGroup = this.physics.add.group({
      runChildUpdate: true
    });
    
    this.ExplosionEffectGroup = this.add.group({
      maxSize: Infinity,
      runChildUpdate: true
    });
    
    //CREATE GROUP
    //======================================================
    //
    //
    //
    //======================================================
    //CREATE BACKGROUND
    
    // Membuat background dan mengatur posisinya
    this.Background0 = this.add.image(this.gameWidth / 2, 0, 'Background0');
    this.Background1 = this.add.image(this.gameWidth / 2, -1920, 'Background0');
    this.Background2 = this.add.image(this.gameWidth / 2, -1920 * 2, 'Background0');
    this.BGimage = [
      this.Background0,
      this.Background1,
      this.Background2
    ];
    this.BGimage.forEach(setBG => {
      setBG.setOrigin(0.5, 0).setDepth(0).setScale(1);
    });
    
    //Background function
    this.runBG = function(speed, Offset) {
      this.BGimage.forEach(bg => {
        bg.y += speed;
      });
      
      //Background logika
      if (this.BGimage[0].y >= Offset) {
        this.BGimage[0].y = -Offset;
      }
      if (this.BGimage[1].y >= Offset) {
        this.BGimage[1].y = -Offset;
      }
      if (this.BGimage[2].y >= Offset) {
        this.BGimage[2].y = -Offset * 2;
        
      }
    }
    //CREATE BACKGROUND
    //======================================================
    //
    //
    //
    //======================================================
    //CREATE SOUND 
    
    //create Backsound0
    this.BackSound0 = this.sound.add('BackSound0');
    //play Backsound0
    this.BackSound0.play({
      loop: true,
      volume: this.SBGvolume //0.0 mute
    });
    
    //CREATE SOUND 
    //======================================================
    
    
    
    
  } //create() function
  
  
  update(time, delta) {
    this.player.update(time, delta);
    //this.enemy.update();
    
    /* Debugging info game
    
    this.GameInfo.setText(`
    GameSize = ${this.gameWidth}x${this.gameHeight}
    
    Background0 Size = ${ this.BGimage[0].width } ${ this.BGimage[0].height }
    Background0 Position = X : ${ this.BGimage[0].x } Y : ${this.BGimage[0].y }
    
    Background1 Size = ${ this.BGimage[1].width } ${ this.BGimage[1].height }
    Background1 Position = X : ${ this.BGimage[1].x } Y : ${ this.BGimage[1].y }

    `);
    
    var GInfoText = this.GameInfo.text.split('\n').length
    this.GameInfo
      .setPosition(50, GInfoText * 4)
      .setAlpha(1)
      .setDepth(99); // tampilkan penuh
    this.voll = 1;
    */
    
    
    //Menggerakkan Background dan mengulanginya.
    this.runBG(5, this.BGimage[0].height);
    
    
  } //update()
  
  
} //extends Phaser.Scene