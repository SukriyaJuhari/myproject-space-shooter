export default class GameScene
extends Phaser.Scene
{ // Mendefinisikan kelas GameScene yang merupakan turunan dari Phaser.Scene
   constructor() {
      super({ key: 'GameScene' }); // Memanggil constructor dari Phaser.Scene dengan parameter key 'GameScene'
      
   }
   
   preload() {
      //================================================
      // image load Open 
      //===============================================
      // image Background/
      this.load.image('Background0', '/assets/image/Background/Background1.png');
      
      //=======================================
      //Image Load Player Dan atribut open 
      //=======================================
      // Memuat gambar kapal pemain level 1
      this.load.image('PlayerShipLevel1', '/assets/image/PlayerShipLevel1/PlayerShipLevel1.png');
      // Memuat gambar kapal miring
      this.load.image('PlayerShipLevel1Tilt', '/assets/image/PlayerShipLevel1/PlayerShipLevel1Tilt.png');
      // Memuat gambar power-up (item)
      this.load.image('PowerUp', '/assets/image/Item/PowerUp.png');
      //=======================================
      //Image Load Player Dan atribut close 
      //=======================================
      
      
      
      
      
      
      
      
      
      
      //================================================
      // image load Close 
      //===============================================
      
      
      
      
      
      
      
      //================================================
      // image spritesheet (animasi) load open 
      //================================================
      // Memuat spritesheet untuk thruster player
      this.load.spritesheet('PlayerShipThruster_Sprsheet', '/assets/spritesheet/PlayerShipThruster_Sprsheet/PlayerShipThruster_Sprsheet.png', { frameWidth: 188, frameHeight: 319 });
      // Memuat spritesheet untuk animasi emisi peluru
      this.load.spritesheet('PlayerBulletEmit_Sprsheet', '/assets/spritesheet/PlayerBulletEmit_Sprsheet/PlayerBulletEmit_Sprsheet.png', { frameWidth: 337, frameHeight: 308 });
      // Memuat spritesheet untuk animasi thruster peluru
      this.load.spritesheet('PlayerBullet_Sprsheet', '/assets/spritesheet/PlayerBullet_Sprsheet/PlayerBullet_Sprsheet.png', { frameWidth: 274, frameHeight: 343 });
      
      //=======================================
      //spritesheet Load musuh Dan rintangan 
      //======= rintangan Asteroids ========
      this.load.spritesheet('asteroids_large1_rock_sprsheet', '/assets/spritesheet/Rintangan/asteroids/asteroids_large1_rock_sprsheet.png', { frameWidth: 320, frameHeight: 318 });
      this.load.spritesheet('asteroids_large2_rock_sprsheet', '/assets/spritesheet/Rintangan/asteroids/asteroids_large2_sprsheet_rock.png', { frameWidth: 315, frameHeight: 315 });
      this.load.spritesheet('asteroids_medium1_rock_sprsheet', '/assets/spritesheet/Rintangan/asteroids/asteroids_medium1_rock_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      this.load.spritesheet('asteroids_medium2_rock_sprsheet', '/assets/spritesheet/Rintangan/asteroids/asteroids_medium2_rock_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      this.load.spritesheet('asteroids_small1_rock_sprsheet', '/assets/spritesheet/Rintangan/asteroids/asteroids_small1_rock_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      this.load.spritesheet('asteroids_small2_rock_sprsheet', '/assets/spritesheet/Rintangan/asteroids/asteroids_small2_rock_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      //======= rintangan Asteroids ========
      //spritesheet Load musuh Dan rintangan END 
      //=======================================
      
      
      
      //=========================================
      //spritesheet load Effects.
      
      //====== Effect Explosion ========//
      //explosion_small.
      this.load.spritesheet('explosion_small_sprsheet', '/assets/spritesheet/Effects/Explosion/explosion_small_sprsheet.png', { frameWidth: 803, frameHeight: 800 });
      //explosion_medium.
      this.load.spritesheet('explosion_med_sprsheet', '/assets/spritesheet/Effects/Explosion/explosion_med_sprsheet.png', { frameWidth: 803, frameHeight: 800 });
      //explosion_large.
      this.load.spritesheet('explosion_large0_sprsheet', 'assets/spritesheet/Effects/Explosion/explosion_large_sprsheet.png', { frameWidth: 803, frameHeight: 800 });
      //explosion_large1
      this.load.spritesheet('explosion_large1_sprsheet', '/assets/spritesheet/Effects/Explosion/explosion_large1_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      //explosion_large2
      this.load.spritesheet('explosion_large2_sprsheet', '/assets/spritesheet/Effects/Explosion/explosion_large2_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      //explosion_large2_hijau
      this.load.spritesheet('explosion_large2_hijau_sprsheet', '/assets/spritesheet/Effects/Explosion/explosion_large2_hijau_sprsheet.png', { frameWidth: 315, frameHeight: 315 });
      
      //====== Effect Explosion ========//
      
      
      
      //spritesheet load Effects END.
      //=========================================
      
      
      
      //================================================
      // image spritesheet (animasi) load close 
      //================================================
      
      
      
      //================================================
      //audio load open 
      //================================================
      //audio load Backsound
      this.load.audio('BackSound0', '/assets/audio/sound/Backsound0.ogg');
      //audio load BulletSound SFX_PlayerShip_BulletFire1
      this.load.audio('SFXBulletFire1', '/assets/audio/SFX/SFX_PlayerShip_BulletFire1.wav');
      //================================================
      //audio load close 
      //================================================
      
   }; //preload(close);
   
   
   create() {
      
      
      //================================================
      //create variabel open 
      //================================================
      this.touchActive = false; // Menyimpan status apakah layar disentuh
      this.touchX = false; // Menyimpan koordinat X dari titik sentuhan
      this.touchY = false; // Menyimpan koordinat Y dari titik sentuhan
      this.TTy = 60; // ToleranceTouchY, mengatur jarak objek (player) dengan kursor atau sentuhan
      this.TBSx = 0.20; // ThrusterBoostScaleX
      this.TBSy = 0.20; // ThrusterBoostScaleY
      this.TNPy = 60; // ThrusterNormalPositionsY
      this.TSPy = 75; // ThrusterSinkronPositionsY
      this.Acceleration; // Variabel untuk 
      this.speedBackground = 1.5; // Kecepatan background
      this.speed = 5; // Kecepatan dasar player
      this.maxSpeed = 5; // Kecepatan maksimum player
      
      this.gameWidth = this.scale.width;
      this.gameHeight = this.scale.height;
      this.gameInfo = true;
      
      //=======================================================================
      // MUTE Program. (TAP sebanyak mungkin dengan cepat untuk mengaktifkan dan nonaktifkan MUTE) 
      var SBGVol = 0.3
      var SFXVol = 0.1;
      this.SBGvolume = SBGVol;
      this.SFXvolume = SFXVol;
      var muteTab = 0;
      var timerTap = 0;
      var MUTE = false;
      
      this.input.on('pointerup', () => {
         muteTab++;
      });
      
      this.mutesound = function() {
         
         if (this.touchActive) {
            timerTap++;
         }
         else {
            timerTap--;
         }
         if (timerTap >= 100 || timerTap <= 0) {
            timerTap = 0;
            muteTab = 0;
         }
         
         if (MUTE) {
            if (muteTab >= 5) {
               muteTab = 0;
               this.SBGvolume = SBGVol;
               this.SFXvolume = SFXVol;
               this.BackSound0.setVolume(this.SBGvolume);
               this.SFXBulletFire1.setVolume(this.SFXvolume);
               MUTE = false;
            }
         } else {
            if (muteTab >= 5) {
               muteTab = 0;
               this.SBGvolume = 0.0;
               this.SFXvolume = 0.0;
               this.BackSound0.setVolume(this.SBGvolume);
               this.SFXBulletFire1.setVolume(this.SFXvolume);
               MUTE = true;
            }
         }
      };
      
      // MUTE Program (TAP sebanyak mungkin dengan cepat untuk mengaktifkan dan nonaktifkan MUTE) 
      //=======================================================================      
      
      
      
      
      
      
      //================================================
      //create variabel close 
      //================================================
      
      
      
      
      
      
      
      
      
      
      
      
      //================================================
      //create text open
      //================================================
      
      this.GameInfo = this.add.text(0, 0, '', { fontSize: '15px', fill: '#fff' })
         .setOrigin(0.3)
         .setDepth(2)
         .setAlpha(0);
      
      //================================================
      //create text close 
      //================================================
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      //================================================
      // open create event untuk mendeteksi sentuhan layar
      //================================================
      this.input.on('pointerdown', (pointer) => {
         this.touchActive = true; // Menandai bahwa layar sedang disentuh
         this.touchX = Math.floor(pointer.x); // Menyimpan posisi X sentuhan
         this.touchY = Math.floor(pointer.y); // Menyimpan posisi Y sentuhan
         
      });
      this.input.on('pointermove', (pointer) => {
         if (this.touchActive) {
            this.touchX = Math.floor(pointer.x); // Memperbarui posisi X sentuhan jika sedang aktif
            this.touchY = Math.floor(pointer.y); // Memperbarui posisi Y sentuhan jika sedang aktif
         }
      });
      this.input.on('pointerup', () => {
         this.touchActive = false; // Menandai bahwa sentuhan layar telah selesai
      });
      
      //================================================
      // close create event untuk sentuhan layar
      //================================================
      
      
      
      
      
      
      
      
      
      
      
      
      
      //================================================
      // open create image.
      //================================================
      
      // Membuat background dan mengatur posisinya
      this.Background0 = this.add.sprite(300, 400, 'Background0').setDepth(1).setScale(0.6, 1);
      this.Background0Copy = this.add.sprite(300, -1400, 'Background0').setDepth(0).setScale(0.6, 1);
      // Membuat objek player dan mengatur properti seperti skala, kedalaman, dan lingkaran hitbox
      this.Player = this.physics.add.sprite(this.gameWidth / 2, 800, 'PlayerShip_Level1');
      this.Player.setDepth(10).setScale(0.60).setCircle(80).setOffset(50, 50);
      //================================================
      // close create image.
      //================================================
      
      
      
      
      //================================================
      // open add sound.
      //================================================
      //create Backsound0
      this.BackSound0 = this.sound.add('BackSound0');
      //play Backsound0
      this.BackSound0.play({
         loop: true,
         volume: this.SBGvolume //0.0 mute
      });
      
      //================================================
      // close add sound.
      //================================================
      
      
      
      
      
      
      
      
      
      
      //================================================
      // open create physics group
      //================================================
      
      // Membuat group untuk peluru pemain dan mengatur properti seperti jumlah maksimum dan pembaruan otomatis
      
      
      // create physics group item player Item
      this.ItemGroup = this.physics.add.group({
         runChildUpdate: true
      });
      
      this.RintanganGroup = this.physics.add.group({
         runChildUpdate: true
      });
      
      this.ExplosionEffectGroup = this.add.group({
         maxSize: Infinity,
         runChildUpdate: true
      });
      
      //================================================
      // close create physics group
      //================================================
      
      
      
      
      
      
      
      
      
      
      
      //================================================
      // open create anims {Player dan atribut}
      //================================================

      
      
      
      
      

      
      //================================================
      // close create anims {Player dan atribut}
      //================================================
      
      
      
      
      
      
      
      
      // =====================================================
      // Logika Weapon Player start
      // =====================================================
      

      // =====================================================
      // Logika Weapon Player end
      // =====================================================
      
      
      
      
      
      
      // =====================================================
      // create item Item Open
      //======================================================
      this.ObjectHancur = 0;
      
      this.createItemPowerUp = function() {
         // add PowerUp in game
         this.TargetObject = this.WeaponLevel * 10 + 10;
         if (this.ObjectHancur == this.TargetObject) {
            this.ObjectHancur = 0;
            // Buatt item power up.
            this.PowerUp = this.ItemGroup.create(
               this.AnimAsteroidsSmall2.x,
               -10,
               'PowerUp'
            ).setVelocityY(200 + this.LevelRintangan / 10);
         }
         
         this.ItemGroup.getChildren().forEach(function(PowerUp) {
            if (PowerUp.active) {
               PowerUp.setDepth(10).setScale(0.60).setCircle(55).setOffset(35, 35)
               
            }
         });
      }
      
      //=====================================================
      //======================================================
      
      
      
      
      
      
      
      //================================================
      // Open create anims {Rintangan dan Musuh}
      //================================================
      
      
      
      //=======Create anims (AnimAsteroidsLarge1)========================
      this.createAsteroidsLarge1 = function(x, y, scale, depth, circle, setX, setY, velocity)
      {
         this.AnimAsteroidsLarge1 = this.RintanganGroup
            .create(x, y, 'asteroids_large1_rock_sprsheet')
            .setScale(scale)
            .setDepth(depth)
            .setCircle(circle)
            .setOffset(setX, setY)
            .setVelocityY(velocity);
         //Create anims AnimAsteroidsLarge1
         this.anims.create({
            key: 'AnimPlay_AsteroidsLarge1',
            frames: this.anims.generateFrameNumbers('asteroids_large1_rock_sprsheet', { start: 0, end: 19 }),
            frameRate: 8,
            repeat: -1,
         });
         this.AnimAsteroidsLarge1.anims.play('AnimPlay_AsteroidsLarge1');
      };
      //=======Create anims (AnimAsteroidsLarge1)========================
      //========================================================================
      
      
      
      
      
      
      //=======Create anims (AnimAsteroidsLarge2)========================
      this.createAsteroidsLarge2 = function(x, y, scale, depth, circle, setX, setY, velocity)
      {
         this.AnimAsteroidsLarge2 = this.RintanganGroup
            .create(x, y, 'asteroids_larg2_rock_sprsheet')
            .setScale(scale)
            .setDepth(depth)
            .setCircle(circle)
            .setOffset(setX, setY)
            .setVelocityY(velocity);
         //Create anims AnimAsteroidsLarge2
         if (!this.anims.exists('AnimPlay_AsteroidsLarge2')) {
            this.anims.create({
               key: 'AnimAsteroidsLarge2',
               frames: this.anims.generateFrameNumbers('asteroids_large2_rock_sprsheet', { start: 0, end: 19 }),
               frameRate: 8,
               repeat: -1,
            });
         }
         this.AnimAsteroidsLarge2.anims.play('AnimPlay_AsteroidsLarge2');
      };
      //=======Create anims (AnimAsteroidsLarge2)========================
      //=============================================================
      
      
      
      
      
      
      //=======Create anims (AnimAsteroidsMedium1)========================
      this.createAsteroidsMedium1 = function(x, y, scale, depth, circle, setX, setY, velocity)
      {
         this.AnimAsteroidsMedium1 = this.RintanganGroup
            .create(x, y, 'asteroids_medium1_rock_sprsheet')
            .setScale(scale)
            .setDepth(depth)
            .setCircle(circle)
            .setOffset(setX, setY)
            .setVelocityY(velocity);
         //Create anims AnimAsteroidsMedium1
         if (!this.anims.exists('AnimPlay_AsteroidsMedium1')) {
            this.anims.create({
               key: 'AnimPlay_AsteroidsMedium1',
               frames: this.anims.generateFrameNumbers('asteroids_medium1_rock_sprsheet', { start: 0, end: 19 }),
               frameRate: 8,
               repeat: -1,
            });
         }
         this.AnimAsteroidsMedium1.anims.play('AnimPlay_AsteroidsMedium1');
      };
      //=======Create anims (AnimAsteroidsMedium1)========================
      //============================================================
      
      
      
      
      
      
      
      //=======Create anims (AnimAsteroidsMedium2)========================
      this.createAsteroidsMedium2 = function(x, y, scale, depth, circle, setX, setY, velocity)
      {
         this.AnimAsteroidsMedium2 = this.RintanganGroup
            .create(x, y, 'asteroids_medium2_rock_sprsheet')
            .setScale(scale)
            .setDepth(depth)
            .setCircle(circle)
            .setOffset(setX, setY)
            .setVelocityY(velocity);
         
         //Create anims AnimAsteroidsMedium1
         if (!this.anims.exists('AnimPlay_AsteroidsMedium2')) {
            this.anims.create({
               key: 'AnimPlay_AsteroidsMedium2',
               frames: this.anims.generateFrameNumbers('asteroids_medium2_rock_sprsheet', { start: 0, end: 19 }),
               frameRate: 8,
               repeat: -1,
            });
         }
         this.AnimAsteroidsMedium2.anims.play('AnimPlay_AsteroidsMedium2');
      };
      //=======Create anims (AnimAsteroidsMedium2)========================
      //============================================================
      
      
      
      
      
      
      //=======Create anims (AnimAsteroidsSmall1)========================
      this.createAsteroidsSmall1 = function(x, y, scale, depth, circle, setX, setY, velocity)
      {
         this.AnimAsteroidsSmall1 = this.RintanganGroup
            .create(x, y, 'asteroids_small1_rock_sprsheet')
            .setScale(scale)
            .setDepth(depth)
            .setCircle(circle)
            .setOffset(setX, setY)
            .setVelocityY(velocity);
         //Create anims AnimAsteroidsSmall1
         if (!this.anims.exists('AnimPlay_AsteroidsSmall1')) {
            this.anims.create({
               key: 'AnimPlay_AsteroidsSmall1',
               frames: this.anims.generateFrameNumbers('asteroids_small1_rock_sprsheet', { start: 0, end: 19 }),
               frameRate: 8,
               repeat: -1,
            });
         }
         this.AnimAsteroidsSmall1.anims.play('AnimPlay_AsteroidsSmall1');
      };
      //=======Create anims (AnimAsteroidsSllmall1)========================
      //============================================================
      
      
      
      
      
      //=======Create anims (AnimAsteroidsSmall2)========================
      this.createAsteroidsSmall2 = function(x, y, scale, depth, circle, setX, setY, velocity, HP)
      {
         this.AnimAsteroidsSmall2 = this.RintanganGroup
            .create(x, y, 'asteroids_small2_rock_sprsheet')
            .setScale(scale)
            .setDepth(depth)
            .setCircle(circle)
            .setOffset(setX, setY)
            .setVelocityY(velocity);
         // Tambahkan HP ke asteroid
         this.AnimAsteroidsSmall2.HP = HP;
         //Create anims AnimAsteroidsSmall2
         if (!this.anims.exists('AnimPlay_AsteroidsSmall2')) {
            this.anims.create({
               key: 'AnimPlay_AsteroidsSmall2',
               frames: this.anims.generateFrameNumbers('asteroids_small2_rock_sprsheet', { start: 0, end: 19 }),
               frameRate: 8,
               repeat: -1,
            });
            
         }
         this.AnimAsteroidsSmall2.anims.play('AnimPlay_AsteroidsSmall2');
      }
      //=======Create anims (AnimAsteroidsSmall2)========================
      //===========================================================
      
      
      // menjalankan dan fungsi createAsteroids
      /*this.createAsteroidsLarge1(300, 300, 1.5, 2, 80, 80, 70,50);
      this.createAsteroidsLarge2(400, 560, 1, 1, 80, 70, 85, 50);
      this.createAsteroidsMedium1(200, 100, 1, 2, 55, 105, 100, 50);
      this.createAsteroidsMedium2(200, 200, 1, 2, 50, 120, 120, 50);
      this.createAsteroidsSmall1(350, 400, 0.5, 2, 60, 100, 100, 50);*/
      
      
      
      //================================================
      // Close create anims {Rintangan dan Musuh}
      //================================================
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      //=========================================================
      // Create Anims Effects
      //=========================================================
      this.Create_AES = function(FrameRate, Repeat, X, Y) {
         if (!this.anims.exists('AnimPlay_explosion_small')) {
            this.anims.create({
               key: 'AnimPlay_explosion_small',
               frames: this.anims.generateFrameNumbers('explosion_small_sprsheet', { start: 0, end: 11 }),
               frameRate: FrameRate,
               repeat: Repeat,
            });
         }
         
         const explosion = this.ExplosionEffectGroup.create(X, Y, 'explosion_small_sprsheet')
            .setDepth(99)
            .setScale(0.3);
         
         explosion.anims.play('AnimPlay_explosion_small');
         
         // Opsional: hancurkan otomatis saat animasi selesai
         explosion.on('animationcomplete', () => {
            explosion.destroy();
         });
      }
      
      
      
      
      
      this.Create_AEM = function(FrameRate, Repeat, X, Y) {
         this.AnimsExplosionMed = this.add.sprite(X, Y, 'explosion_med_sprsheet').setDepth(99).setScale(0.3);
         this.anims.create({
            key: 'AnimPlay_explosion_med',
            frames: this.anims.generateFrameNumbers('explosion_med_sprsheet', { start: 0, end: 11 }),
            frameRate: FrameRate,
            repeat: Repeat,
         });
         this.AnimsExplosionMed.anims.play('AnimPlay_explosion_med');
         
      }
      
      
      
      
      
      
      this.Create_AEL0 = function(FrameRate, Repeat, X, Y) {
         this.AnimsExplosionLarge0 = this.add.sprite(X, Y, 'explosion_large0_sprsheet').setDepth(99).setScale(0.3);
         this.anims.create({
            key: 'AnimPlay_explosion_large0',
            frames: this.anims.generateFrameNumbers('explosion_large0_sprsheet', { start: 0, end: 11 }),
            frameRate: FrameRate,
            repeat: Repeat,
         });
         this.AnimsExplosionLarge0.anims.play('AnimPlay_explosion_large0');
         
      }
      
      //=========================================================
      // Create Anims Effects END.
      //=========================================================
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      // =====================================================
      //program Level, Rintangan dan musuh.
      // =====================================================
      this.LevelRintangan = 0;
      let i = 0;
      this.addAsteroidsSmall2 = function(interval, minX, maxX, Y, speed)
      {
         
         //pembatasan Interval 10ms.
         let intervalAsteroids = interval - this.LevelRintangan / 5;
         if (intervalAsteroids == 30 || intervalAsteroids < 31) {
            intervalAsteroids = 30;
         }
         
         //pembatasan speedAsteroid 1000 Velocity.
         let speedAsteroid = speed + this.LevelRintangan;
         if (speedAsteroid > 1000) {
            speedAsteroid = 1000;
         }
         
         i++;
         let RandomPostX = Math.floor(Math.random() * (maxX - minX + 2)) + minX;
         if (i > intervalAsteroids)
         {
            i = 0;
            this.createAsteroidsSmall2(RandomPostX, Y, 0.5, 2, 60, 120, 110, speedAsteroid, 100);
         }
         
         this.RintanganGroup.getChildren().forEach(function(AnimAsteroidsSmall2, ) {
            if (AnimAsteroidsSmall2) {
               if (AnimAsteroidsSmall2.y > 1500) {
                  AnimAsteroidsSmall2.destroy();
               }
            }
         });
      }
      
      // =====================================================
      //program Level Rintangan dan musuh End.
      // =====================================================
      
      
      
      // ====================================================
      //create physics collider
      //======================================================
      // create asteroids merespon tabrakan dengan peluru 
      this.physics.add.overlap(this.RintanganGroup, this.PlayerBulletGroup, this.collectRintangan, null, this);
      
      
      // create Item merespon tabrakan dengan Player
      this.physics.add.collider(this.Player, this.ItemGroup, this.collectItem, null, this);
      
      //======================================================
      //======================================================
      
   }; //create()function
   
   
   
   
   
   
   
   // ====================================================
   // Program tabrakan 
   //======================================================
   
   // destroy Item in game
   collectItem(player, ItemGroup) {
      ItemGroup.destroy();
      this.WeaponLevel += 1;
   };
   
   
   
   
   collectRintangan(AnimAsteroidsSmall2, PlayerBulletGroup) {
      this.ObjectHancur += 1;
      this.LevelRintangan += 1;
      AsteroidsSmall2.HP -= 30;
      PlayerBulletGroup.destroy();
      
      if (AsteroidsSmall2.HP <= 0) {
         
         // Pakai posisi asteroid yang kena, bukan this.AnimAsteroidsSmall2
         this.Create_AES(30, 0, AnimAsteroidsSmall2.x, AnimAsteroidsSmall2.y);
         AnimAsteroidsSmall2.destroy();
      }
   }
   
   
   // ====================================================
   // Program tabrakan 
   //======================================================
   
   
   
   update()
   {
      
      
      
      //==============================================================
      //============ Update function =================================
      // function create asteroids Small2
      this.addAsteroidsSmall2(100, 30, 500, 0, 200);
      
      //tap sebayak 3 kali dengan cepat untuk mute
      this.mutesound();
      
      this.createItemPowerUp();
      
      //============ Update function End =================================
      //==============================================================
      
      
      
      
      
      
      
      
      
      
      //==============================================================
      //==============================================================
      //Menggerakkan Background dan mengulanginya.
      this.Background0.y += this.speedBackground;
      this.Background0Copy.y += this.speedBackground;
      if (this.Background0.y > 2200) {
         this.Background0.y = -1400;
      }
      if (this.Background0Copy.y > 2200) {
         this.Background0Copy.y = -1400;
      }
      
      //END
      //==============================================================
      //==============================================================
      
      
      
      
      
      
      
      
      //==============================================================
      //================================================================
      //Index semua animasi PlayerBulletEmit.
      this.PlayerBulletGroup.getChildren().forEach(function(PlayerBulletEmit)
      {
         //saat animasi telah selesai.
         PlayerBulletEmit.on('animationcomplete', (animation, frame) => {
            //destroy animasi setelah selesai.
            PlayerBulletEmit.destroy();
         });
      });
      
      
      //Index semua animasi (objek) PlayerBullet
      this.PlayerBulletGroup.getChildren().forEach(function(PlayerBullet) {
         //destroy PlayerBullet jika pos Y kurang dari 0
         if (PlayerBullet.y < 0) {
            PlayerBullet.destroy();
         }
      });
      
      this.ExplosionEffectGroup.getChildren().forEach(function(AnimsExplosionSmall) {
         AnimsExplosionSmall.on('animationcomplete', (animation, frame) => {
            //destroy animasi setelah selesai.
            AnimsExplosionSmall.destroy();
         });
      });
      
      
      
      //==============================================================
      //==============================================================
      
      
      
      
      
      
      
      
      
      // algoritma menggerakkan Player berdasarkan sentuhan
      if (this.touchActive) { // jika sentuhan aktif
         
         
         
         
         //Debugging testing menampilkan lokasi sentuhan
         if (this.gameInfo) {
            this.GameInfo.setText(`
         = TOUCH POSITION =
         Horizontal  X : ${this.touchX}
         Vertikal    Y : ${this.touchY}
         = GAME =
         Game Size = ${Math.round(this.scale.width)}x${Math.round(this.scale.height)}
         Screen Size = ${window.innerWidth}x${window.innerHeight}
         = OBJECT =
         Background Size = ${this.Background0.width}x${this.Background0.height}
         Background Scale = ${this.Background0.scale}
         Background Speed = ${this.speedBackground}
         Create Item = ${this.ItemGroup.getChildren().length}
         = Player ===
         Player Size = ${this.Player.width}x${this.Player.height}
         Player Scale = ${this.Player.scale}
         Player Position = X:${Math.round(this.Player.x)} Y:${Math.round(this.Player.y)}
         Player Acceleration = ${Math.round(this.Acceleration)}
         Player Speed = ${this.speed} : X:${Math.round(this.speedX)} Y:${Math.round(this.speedY)}
         Player Distance = ${Math.round(this.distance)}
         Player Weapon = Level ${this.WeaponLevel}
         Player Weapon = BulletLevel ${this.BulletLevel}
         Player Weapon = Bullet print ${this.PlayerBulletGroup.getChildren().length}
         = Rintangan ==
         LevelRintangan = ${this.LevelRintangan}
         Target Object = ${this.TargetObject}
         Object Di Hancurkan = ${this.ObjectHancur}
           `);
            
            var GInfoText = this.GameInfo.text.split('\n').length
            this.GameInfo
               .setPosition(30, GInfoText * 4)
               .setAlpha(1)
               .setDepth(99); // tampilkan penuh
            this.voll = 1;
         }
         
         
         // Fungsi untuk menembakkan peluru saat sentuhan aktif.
         this.shootBullet(3, 10);
         
         
         
         //========================================================================================================================
         //Control Pergerakan.
         //========================================================================================================================
         // saat sentuhan aktif Percepatan Player berdasarkan jarak sentuhan.
         this.distance = Phaser.Math.Distance.Between(this.touchX, this.touchY, this.Player.x, this.Player.y);
         this.Acceleration = this.speed * Math.round(this.distance);
         this.Acceleration = Math.max(this.speed, Math.min(this.maxSpeed, this.Acceleration));
         this.speedX = this.Acceleration;
         this.speedY = this.Acceleration;
         
         // Control Pergerakan Player (KIRI)
         if (this.touchX < this.Player.x) {
            // posisi x player dikurangi speedX
            this.Player.x -= this.speedX;
            this.Anims_PSTR.x -= this.speedX;
            this.Anims_PSTL.x -= this.speedX;
            if (this.touchX + 1 < this.Player.x) {
               this.Player.setTexture('PlayerShipLevel1Tilt');
               this.Player.setFlipX(false);
            } else {
               this.Player.setTexture('PlayerShipLevel1');
            }
         }
         
         // Control Pergerakan Player (KANAN)
         if (this.touchX > this.Player.x) {
            this.Player.x += this.speedX;
            this.Anims_PSTR.x += this.speedX;
            this.Anims_PSTL.x += this.speedX;
            if (this.touchX - 1 > this.Player.x) {
               this.Player.setTexture('PlayerShipLevel1Tilt');
               this.Player.setFlipX(true);
            } else {
               this.Player.setTexture('PlayerShipLevel1');
            }
         }
         
         // Control Pergerakan Player (BAWAH)
         if (this.touchY - this.TTy < this.Player.y) {
            this.Player.y -= this.speedY;
            this.Anims_PSTR.y = this.Player.y + this.TSPy;
            this.Anims_PSTL.y = this.Player.y + this.TSPy;
            this.Anims_PSTR.setScale(this.TBSx, this.TBSy);
            this.Anims_PSTL.setScale(this.TBSx, this.TBSy);
            this.Anims_PSTR.y -= this.speedY;
            this.Anims_PSTL.y -= this.speedY;
         }
         
         // Control Pergerakan Player (ATAS)
         if (this.touchY - this.TTy > this.Player.y) {
            this.Player.y += this.speedY;
            this.Anims_PSTR.y = this.Player.y + 60;
            this.Anims_PSTL.y = this.Player.y + 60;
            this.Anims_PSTR.setScale(0.10);
            this.Anims_PSTL.setScale(0.10);
            this.Anims_PSTR.y += this.speedY;
            this.Anims_PSTL.y += this.speedY;
         }
         
      } else { // jika sentuh tidak aktif
         if (this.GameInfo && this.GameInfo.alpha > 0) {
            this.voll -= 0.01;
            this.GameInfo.setAlpha(this.voll);
            
            if (this.voll <= 0) {
               this.GameInfo.setText('');
               this.GameInfo.setAlpha(0);
            }
         }
         
         this.Player.setTexture('PlayerShipLevel1');
         this.Anims_PSTR.setScale(0.10);
         this.Anims_PSTL.setScale(0.10);
         this.Anims_PSTL.y = this.Player.y + 60;
         this.Anims_PSTR.y = this.Player.y + 60;
      }
      
      //========================================================================================================================
      //Control Pergerakan. END
      //========================================================================================================================
      
      
   }; //update()
   
   resize(gameSize)
   { //resize menyesuaikan ukuran game responsif.
      const width = gameSize.width;
      const height = gameSize.height;
   };
   
}; //extends Phaser.Scene