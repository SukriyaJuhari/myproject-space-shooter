//./Script/Player/mainPlayer.js
import { Objek, Thruster, Controller, WeaponCreate } from "./Index.js";

export default class Player {
  constructor(scene, x, y, spriteKey = 'PlayerShipLevel1', spriteTiltKey = 'PlayerShipLevel1Tilt') {
    this.scene = scene;

    //objek player
    this.objek = new Objek(scene, spriteKey, x, y);
    const ship = this.objek.Ship;
    const shipBox = this.objek.ShipBox;

    // thruster player
    this.thruster = new Thruster(scene, shipBox, 34, -34);
    const thrusterL = this.thruster.ThrusterL;
    const thrusterR = this.thruster.ThrusterR;
    
    // Weapon Player 
    this.weaponPlayer = new WeaponCreate(scene, shipBox);

    // controller Player (input Touch dan cursor )
    this.controller = new Controller(
      scene,
      ship,
      shipBox,
      thrusterR,
      thrusterL,
      spriteKey,
      spriteTiltKey,
      50, 50, 500
    );
    console.log("Player Ran>>✓")
    
  };//constructor())

  update(time,delta) {
    
    this.controller.update(time,delta); //controller update  
    this.weaponPlayer.update(time, delta); //weapon update
    
  };//update() 
  
};//export default class Player 




