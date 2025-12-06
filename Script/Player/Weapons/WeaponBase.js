// ./Script/Player/Weapons/WeaponBase.js
export default class WeaponBase extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, shipBox,x, y, textureKey) {
    super(scene,shipBox, x, y, textureKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this._spawnTime = 0;

    this.setActive(false);
    this.setVisible(false);
  }

  fire(x, y, speed) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(-speed);
    this._spawnTime = this.scene.time.now;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active && time - this._spawnTime > this.lifespan) {
      this.kill();
    }
  }

  kill() {
    this.setActive(false);
    this.setVisible(false);
    this.body.stop();
  }

  onHit(target) {
    if (target.takeDamage) target.takeDamage(this.damage);
    this.kill();
  }
}
