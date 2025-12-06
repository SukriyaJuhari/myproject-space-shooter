//./Script/Player/Objek.js
export default class Objek {
  constructor(scene, SpriteKey, x, y, setCircle = 50,setOffsetX = 5,setOffsetY = 15,) {
    
    //==============================================================================
    // Membuat objek player
    this.Ship = scene.add.sprite(0, 0, SpriteKey).setScale(0.60);
    //==============================================================================
    
    //==============================================================================
    // add container Player
    this.ShipBox = scene.add.container(x, y, this.Ship, ).setDepth(4);
    //add physics existing this.PlayerBox container
    scene.physics.add.existing(this.ShipBox);
    this.ShipBox.body.setCollideWorldBounds(true);
    this.ShipBox.body.setCircle(setCircle)
      .setOffset(
        -this.ShipBox.body.x / setOffsetX,
        -this.ShipBox.body.y / setOffsetY
      );
        
    //==============================================================================
    
console.log('PlayerShip Ok✓   ' + 'x :' + this.ShipBox.body.x + '   y :' + this.ShipBox.body.y);

  }
}