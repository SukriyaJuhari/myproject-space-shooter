// PlayerScript.js
export class Player {
  
  static preload(scene) {
    
    // Memuat gambar kapal pemain level 1
    scene.load.image('PlayerShipLevel1', '/assets/image/PlayerShipLevel1/PlayerShipLevel1.png');
    // Memuat gambar kapal miring
    scene.load.image('PlayerShipLevel1Tilt', '/assets/image/PlayerShipLevel1/PlayerShipLevel1Tilt.png');
    
    //=======================================================================================
    // Memuat spritesheet untuk thruster Player
    scene.load.spritesheet('PlayerShipThruster_Sprsheet',
      '/assets/spritesheet/PlayerShipThruster_Sprsheet/PlayerShipThruster_Sprsheet.png', { frameWidth: 188, frameHeight: 319 });
    // Memuat spritesheet untuk animasi emisi peluru
    scene.load.spritesheet('PlayerBulletEmit_Sprsheet', '/assets/spritesheet/PlayerBulletEmit_Sprsheet/PlayerBulletEmit_Sprsheet.png', {
      frameWidth: 337,
      frameHeight: 308
    });
    // Memuat spritesheet untuk animasi thruster peluru
    scene.load.spritesheet('PlayerBullet_Sprsheet', '/assets/spritesheet/PlayerBullet_Sprsheet/PlayerBullet_Sprsheet.png', {
      frameWidth: 274,
      frameHeight: 343
    });
    //=============================================================================
    
    //audio load BulletSound SFX_PlayerShip_BulletFire1
    scene.load.audio('SFXBulletFire1', '/assets/audio/SFX/SFX_PlayerShip_BulletFire1.wav');
    
    
  } //static preload(scene)
  
  
  constructor(scene, x, y) {
    this.scene = scene;
    
    this.touchActive = false; // Menyimpan status apakah layar disentuh
    this.touchX = false; // Menyimpan koordinat X dari titik sentuhan
    this.touchY = false; // Menyimpan koordinat Y dari titik sentuhan
    this.TTy = 60; // ToleranceTouchY, mengatur jarak objek (player) dengan kursor atau sentuhan
    this.TBSx = 0.20; // ThrusterBoostScaleX, mengatur sekali X turbo-jet
    this.TBSy = 0.20; // ThrusterBoostScaleY, mengatur sekali y turbo-jet
    this.TNPy = 60; // ThrusterNormalPositionsY
    this.TSPy = 75; // ThrusterSinkronPositionsY
    this.Acceleration; // menyimpan percepatan player.
    this.speed = 0.15; // Kecepatan dasar player
    this.maxSpeed = 0.35; // Kecepatan maksimum player
    this.gameW = scene.scale.width;
    this.gameH = scene.scale.height;
    
    var SFXVol = 0.1;
    this.SFXvolume = SFXVol;
    
    //================================================
    // open create event untuk mendeteksi sentuhan layar
    //================================================
    scene.input.on('pointerdown', (pointer) => {
      this.touchActive = true; // Menandai bahwa layar sedang disentuh
      this.touchX = Math.floor(pointer.x); // Menyimpan posisi X sentuhan
      this.touchY = Math.floor(pointer.y); // Menyimpan posisi Y sentuhan
      
    });
    scene.input.on('pointermove', (pointer) => {
      if (this.touchActive) {
        this.touchX = Math.floor(pointer.x); // Memperbarui posisi X sentuhan jika sedang aktif
        this.touchY = Math.floor(pointer.y); // Memperbarui posisi Y sentuhan jika sedang aktif
      }
    });
    scene.input.on('pointerup', () => {
      this.touchActive = false; // Menandai bahwa sentuhan layar telah selesai
    });
    
    //================================================
    // close create event untuk sentuhan layar
    //================================================
    
    
    
    
    
    // Membuat objek player dan mengatur properti seperti skala, kedalaman, dan lingkaran hitbox
    this.Player = scene.physics.add.sprite(this.gameW / 2, this.gameH / 1.25, 'PlayerShipLevel1')
      .setDepth(4)
      .setScale(0.60)
      .setCircle(80)
      .setOffset(50, 50);
    //==============================================================================
    // add sprite thruster untuk kapal player
    this.PlayerShipThrusterR = scene.add.sprite(this.Player.x + 36, this.Player.y + 60, 'PlayerShipThruster_Sprsheet').setDepth(5).setScale(0.10);
    this.PlayerShipThrusterL = scene.add.sprite(this.Player.x - 36, this.Player.y + 60, 'PlayerShipThruster_Sprsheet').setDepth(5).setScale(0.10);
    
    // Membuat animasi untuk thruster
    scene.anims.create({
      key: 'PlayAnim_PlayerShipThruster',
      frames: scene.anims.generateFrameNumbers('PlayerShipThruster_Sprsheet', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1,
    });
    // play animasi PlayerShipThruster
    
    this.Anims_PSTR = this.PlayerShipThrusterR.anims.play('PlayAnim_PlayerShipThruster');
    this.Anims_PSTL = this.PlayerShipThrusterL.anims.play('PlayAnim_PlayerShipThruster');
    
    //==============================================================================
    
    // Membuat group untuk peluru pemain dan mengatur properti seperti jumlah maksimum dan pembaruan otomatis
    
    this.PlayerBulletGroup = scene.physics.add.group({
      
      maxSize: 20,
      runChildUpdate: true
    });
    
    
    // Membuat fungsi untuk animasi peluru
    this.createAnimsBullet = function(FrameRate, X, Y) {
      // add animasi emisi peluru
      this.PlayerBulletEmit = this.PlayerBulletGroup.create(X, Y - 80, 'PlayerBulletEmit_Sprsheet').setDepth(5).setScale(0.30);
      // add animasi Thruster peluru
      this.PlayerBullet = this.PlayerBulletGroup.create(X, Y - 100, 'PlayerBullet_Sprsheet').setDepth(6).setScale(0.15, 0.5).setActive(true);
      
      // Membuat animasi peluru dan emisi jika belum ada
      if (!scene.anims.exists('PlayAnim_PlayerBulletEmit')) {
        
        //create anims PlayerBulletEmit
        scene.anims.create({
          key: 'PlayAnim_PlayerBulletEmit',
          frames: scene.anims.generateFrameNumbers('PlayerBulletEmit_Sprsheet', { start: 0, end: 3 }),
          frameRate: FrameRate + 10,
          repeat: 0,
        });
        
        //create anims ThrusterAnims peluru
        scene.anims.create({
          key: 'PlayAnim_PlayerBullet',
          frames: scene.anims.generateFrameNumbers('PlayerBullet_Sprsheet', { start: 0, end: 4 }),
          frameRate: FrameRate - 10,
          repeat: -1,
        });
        
      }
      
      
      // play animasi emisi peluru
      this.PlayerBulletEmit.anims.play('PlayAnim_PlayerBulletEmit');
      // play animasi peluru
      this.PlayerBullet.anims.play('PlayAnim_PlayerBullet');
      
    }; //this.createAnimsBullet();
    
    //create audio sound Bullet
    this.bulletSounds = scene.sound.add('SFXBulletFire1');

    
    // Menginisialisasi level peluru dan status waktu
    this.WeaponLevel = 1; // Level peluru awal
    this.BulletLevel = Math.min(this.WeaponLevel, 3);
    this.lastShotTime = 0;
    this.fireRate = 100; // dalam milidetik
    
    let timer = 0;
    
    this.shootBullet = function(time, delta, BulletSpeed) {
      const now = time;
      if (now - this.lastShotTime < this.fireRate) return;
      
      this.lastShotTime = now;
      
      BulletSpeed *= 100;
      let x = this.Player.x;
      let y = this.Player.y;
      
      
      
      const patterns = {
        1: [0],
        2: [-25, 25],
        3: [-25, 0, 25]
      } [this.BulletLevel] || [];
      
      
            
      for (let i = 0; i < patterns.length; i++) {
        const BulletOffsetX = patterns[i];
        let offsetX = BulletOffsetX;
      
            // Mainkan suara peluru
            this.bulletSounds.play({ volume: this.SFXvolume, rate: 1 });
                        
            // Buat peluru
            this.createAnimsBullet(60, x + offsetX, y);
            
            this.PlayerBullet.setVelocityY(-BulletSpeed); // (ganti ke grup jika ingin banyak peluru aktif!)
            
            
          

      }
    };
    
    
    
    
  } //constructor(Close)
  
  
  
  update(time, delta) {
    
    
    var TIME = time;
    var DELTA = delta;
    
    
    this.prevPlayerX = this.prevPlayerX || this.Player.x;
    this.playerDir = this.Player.x > this.prevPlayerX ? 'right' :
      this.Player.x < this.prevPlayerX ? 'left' : 'still';
    this.prevPlayerX = this.Player.x;
    
    
    
    //Index semua animasi PlayerBulletEmit.
    this.PlayerBulletGroup.getChildren().forEach(function(PlayerBulletEmit,PlayerBullet)
    {
      //saat animasi telah selesai.
      PlayerBulletEmit.once('animationcomplete', (animation, frame) => {
        //destroy animasi.
        PlayerBulletEmit.destroy();
      });
    });
    
    //Index semua animasi PlayerBullet
    this.PlayerBulletGroup.getChildren().forEach(function(PlayerBullet) {
      //destroy PlayerBullet jika pos Y kurang dari 0 'keluar game'
      if (PlayerBullet.y < 0) {
        PlayerBullet.destroy(); //PlayerBullet dihilangkan.
      }
    });
    
    
    
    // algoritma menggerakkan Player berdasarkan sentuhan
    if (this.touchActive) { // jika sentuhan aktif algoritma akan di jalankan.
      
      
      // Fungsi untuk menembakkan peluru saat sentuhan aktif.
      this.shootBullet(TIME, DELTA, 20); //shootBullet(ms, /px)
      
      
      //========================================================================================================================
      //Control Pergerakan.
      //========================================================================================================================
      // saat sentuhan aktif Percepatan Player berdasarkan jarak sentuhan.
      this.distance = Phaser.Math.Distance.Between(this.touchX, this.touchY, this.Player.x, this.Player.y);
      this.Acceleration = this.speed * Math.round(this.distance);
      this.Acceleration = Math.max(this.speed, Math.min(this.maxSpeed, this.Acceleration));
      this.speedX = this.Acceleration;
      this.speedY = this.Acceleration;
      
      
      //======Control Pergerakan Player (KIRI)========//
      if (this.touchX < this.Player.x) {
        // posisi x player dikurangi speedX
        this.Player.x -= this.speedX * delta; //Pergerakan Player ke (KIRI)
        //Mengatur posisi jet..
        this.Anims_PSTR.x -= this.speedX * delta;
        this.Anims_PSTL.x -= this.speedX * delta;
        //Membuat effect miring
        if (this.touchX + 1 < this.Player.x) {
          //Textur di ubah dengan effect miring di buat
          this.Player.setTexture('PlayerShipLevel1Tilt');
          this.Player.setFlipX(false);
        } else {
          //kembalikan Textur seperti semula.
          this.Player.setTexture('PlayerShipLevel1');
        }
      }
      
      // Control Pergerakan Player (KANAN)
      if (this.touchX > this.Player.x) {
        this.Player.x += this.speedX * delta; //Pergerakan Player ke (KANAN)
        this.Anims_PSTR.x += this.speedX * delta;
        this.Anims_PSTL.x += this.speedX * delta;
        if (this.touchX - 1 > this.Player.x) {
          this.Player.setTexture('PlayerShipLevel1Tilt');
          this.Player.setFlipX(true);
        } else {
          this.Player.setTexture('PlayerShipLevel1');
        }
      }
      
      // Control Pergerakan Player (BAWAH)
      if (this.touchY - this.TTy < this.Player.y) {
        this.Player.y -= this.speedY * delta; //Pergerakan Player ke (BAWAH);
        this.Anims_PSTR.y = this.Player.y + this.TSPy;
        this.Anims_PSTL.y = this.Player.y + this.TSPy;
        this.Anims_PSTR.setScale(this.TBSx, this.TBSy);
        this.Anims_PSTL.setScale(this.TBSx, this.TBSy);
        this.Anims_PSTR.y -= this.speedY * delta;
        this.Anims_PSTL.y -= this.speedY * delta;
      }
      
      // Control Pergerakan Player (ATAS)
      if (this.touchY - this.TTy > this.Player.y) {
        this.Player.y += this.speedY * delta; //Pergerakan Player ke (ATAS)
        this.Anims_PSTR.y = this.Player.y + 60;
        this.Anims_PSTL.y = this.Player.y + 60;
        this.Anims_PSTR.setScale(0.10);
        this.Anims_PSTL.setScale(0.10);
        this.Anims_PSTR.y += this.speedY * delta;
        this.Anims_PSTL.y += this.speedY * delta;
      }
      
    } else { // jika sentuh tidak aktif
      
      this.Player.setTexture('PlayerShipLevel1');
      this.Anims_PSTR.setScale(0.10);
      this.Anims_PSTL.setScale(0.10);
      this.Anims_PSTL.y = this.Player.y + 60;
      this.Anims_PSTR.y = this.Player.y + 60;
    }
    
    
  }
}