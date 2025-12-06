// ./Script/Player/Weapons/Bullet.js
import WeaponBase from './WeaponBase.js';

export default class Bullet extends WeaponBase {
  constructor(scene, x, y) {
    super(scene, x, y, 'PlayerBullet_Sprsheet');
    
    // properti khusus bullet
    this.speed = 1200;
    this.damage = 1;
    this.lifespan = 1500;
    this.SFXvolume = 0.5;
    
    this.setDepth(6).setScale(0.1, 0.5);
    
    // animasi peluru
    if (!scene.anims.exists('PlayAnim_PlayerBullet')) {
      scene.anims.create({
        key: 'PlayAnim_PlayerBullet',
        frames: scene.anims.generateFrameNumbers('PlayerBullet_Sprsheet', { start: 0, end: 4 }),
        frameRate: 50,
        repeat: -1,
      });
    }
    this.play('PlayAnim_PlayerBullet');
  }
  
  fire(shipBox, x, y, offsetX) {
    super.fire(x, y, this.speed);
    
    // efek muzzle flash
    if (!this.scene.anims.exists('PlayAnim_PlayerBulletEmit')) {
      this.scene.anims.create({
        key: 'PlayAnim_PlayerBulletEmit',
        frames: this.scene.anims.generateFrameNumbers('PlayerBulletEmit_Sprsheet', { start: 0, end: 3 }),
        frameRate: 70,
        repeat: 0,
      });
    }
    
    let muzzle = this.scene.add.sprite(offsetX, - 80, 'PlayerBulletEmit_Sprsheet').setScale(0.3);
    muzzle.play('PlayAnim_PlayerBulletEmit');
    if (shipBox) shipBox.add([muzzle]); // contoh kalau playerBox ada
    muzzle.on('animationcomplete', () => muzzle.destroy());
    
    // suara
    this.scene.sound.play('SFXBulletFire1', { volume: this.SFXvolume });
  }
}