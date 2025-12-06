//./Script/Player/Thruster.js
export default class Thruster {
  constructor(scene, container, OffsetXR, OffsetXL) {
        //==============================================================================
    // add sprite thruster untuk Objek player
    this.ThrusterR = scene.add.sprite(OffsetXR, 60, 'PlayerShipThruster_Sprsheet').setDepth(4).setScale(0.10);
    this.ThrusterL = scene.add.sprite(OffsetXL, 60, 'PlayerShipThruster_Sprsheet').setDepth(4).setScale(0.10);
    // Membuat animasi untuk thruster
    scene.anims.create({
      key: 'PlayAnim_PlayerShipThruster',
      frames: scene.anims.generateFrameNumbers('PlayerShipThruster_Sprsheet', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1,
    });
    // play animasi PlayerShipThruster
    this.ThrusterR.play('PlayAnim_PlayerShipThruster');
    this.ThrusterL.play('PlayAnim_PlayerShipThruster');
    // tambahkan ke container
    container.add([this.ThrusterR, this.ThrusterL]);
    //==============================================================================
console.log('Thruster script Ok✓');
  }
}










