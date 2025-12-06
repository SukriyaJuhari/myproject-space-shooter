// ./Script/Player/Weapons/WeaponCreate.js
import Bullet from './Bullet.js';

export default class WeaponCreate {
  constructor(scene, shipBox) {
    this.scene = scene;
    this.ShipBox = shipBox;
    
    // pengaturan level senjata dan jenisnya
    this.weaponLevel = 1;
    
    //===================================================================================================================
    //Bullet Program.
    this.bulletLeve = Math.min(this.weaponLevel, 3);
    this.lastShotTime = 0; //menyimpan waktu tembakan terakhir
    this.fireRate = 200; // tembakan 200ms per/bullet
    // pool peluru (bulletGroup)
    this.bulletGroup = scene.physics.add.group({
      classType: Bullet,
      maxSize: 1000,
      runChildUpdate: true
    });
    
    this.shootBullet = function(time) {
      if (time - this.lastShotTime < this.fireRate) return;
      this.lastShotTime = time;
      // posisi spawn berdasarkan level Bullet
      const postPoin = {
        1: [0],
        2: [-25, 25],
        3: [-25, 0, 25]
      } [this.bulletLeve] || [];
      postPoin.forEach((offsetX, i) => {
        this.scene.time.delayedCall(this.fireRate / 3 * i, () => {
          let x = this.ShipBox.x + offsetX;
          let y = this.ShipBox.y;
          // ambil bullet dari pool
          const bullet = this.bulletGroup.get(x, y);
          if (bullet) {
            bullet.fire(this.ShipBox, x, y - 160, offsetX);
          }
        });
      });
    }
    //Bullet Program.
    //===================================================================================================================
    
  } //constructor
  
  update(time, delta) {
    
    
    this.shootBullet(time); //update function Bullet shoot
    
  }; //update()
  
} //export default class WeaponCreate 