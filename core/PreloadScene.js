// ./core/PreloadScene.js
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }
  
  preload() {
    this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      'Background0'
    );
    
    
    
    
    // Memuat gambar kapal pemain level 1
    this.load.image('PlayerShipLevel1', 'assets/image/PlayerShipLevel1/PlayerShipLevel1.png');
    // Memuat gambar kapal miring
    this.load.image('PlayerShipLevel1Tilt', 'assets/image/PlayerShipLevel1/PlayerShipLevel1Tilt.png');
    
    //=======================================================================================
    // Memuat spritesheet untuk thruster Player
    this.load.spritesheet('PlayerShipThruster_Sprsheet', 'assets/spritesheet/PlayerShipThruster_Sprsheet/PlayerShipThruster_Sprsheet.png', {
      frameWidth: 188,
      frameHeight: 319
    });
    // Memuat spritesheet untuk animasi emisi peluru
    this.load.spritesheet('PlayerBulletEmit_Sprsheet', 'assets/spritesheet/PlayerBulletEmit_Sprsheet/PlayerBulletEmit_Sprsheet.png', {
      frameWidth: 337,
      frameHeight: 308
    });
    // Memuat spritesheet untuk animasi thruster peluru
    this.load.spritesheet('PlayerBullet_Sprsheet', 'assets/spritesheet/PlayerBullet_Sprsheet/PlayerBullet_Sprsheet.png', {
      frameWidth: 274,
      frameHeight: 343
    });
    //=============================================================================
    
    //audio load BulletSound SFX_PlayerShip_BulletFire1
    this.load.audio('SFXBulletFire1', 'assets/audio/SFX/SFX_PlayerShip_BulletFire1.wav');
    
    //================================================
    //audio load Backsound
    this.load.audio('BackSound0', 'assets/audio/sound/Backsound0.ogg');
    
    //================================================
    
    
    
    
    
    
    // 🟦 Background loading
    this.cameras.main.setBackgroundColor("#1a1a1a");
    
    // 🟦 Progress bar graphic
    let progressBox = this.add.graphics();
    let progressBar = this.add.graphics();
    
    // Kotak luar (background bar)
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(0, 280, this.scale.width, 5);
    
    // Text loading
    let loadingText = this.add.text(this.scale.width / 2, 250, "Loading...", {
      font: "20px Arial",
      fill: "#ffffff"
    }).setOrigin(0.5);
    
    // Text persen
    let percentText = this.add.text(this.scale.width / 2, 305, "0%", {
      font: "18px Arial",
      fill: "#ffffff"
    }).setOrigin(0.5);
    
    // Text asset yang sedang dimuat
    let assetText = this.add.text(this.scale.width / 2, 360, "", {
      font: "16px Arial",
      fill: "#ffffff"
    }).setOrigin(0.5);
    
    // Event progress (0–1)
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, 290, this.scale.width * value, 5);
      percentText.setText(parseInt(value * 100) + "%");
    });
    
    // Event file progress
    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading: " + file.key);
    });
    
    // Event complete
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      console.log("Loading Successfully!!")
      
      // Setelah selesai → ke MainMenuScene (atau langsung GameplayScene)
      this.scene.start("MainMenuScene");
    });
    
    
    
  }
  
  
}