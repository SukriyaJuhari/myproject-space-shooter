//./Script/Player/Controller.js
export default class PlayerController {
  constructor(scene, ship, shipBox, thrusterR, thrusterL, ShipKey = 'PlayerShipLevel1', ShipTiltKey = 'PlayerShipLevel1Tilt', tolerTouch = 50, minSpeed = 50, maxSpeed = 300) {
    this.scene = scene;
    // optional sprites (boleh di-set dari luar)
    this.ship = ship ?? null;
    this.shipBox = shipBox ?? null;
    this.thrusterR = thrusterR ?? null;
    this.thrusterL = thrusterL ?? null;
    
    this.ShipKey = ShipKey;
    this.ShipTiltKey = ShipTiltKey;
    this.tolerTouch = tolerTouch;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    
    this.touchActive = false;
    this.touchPoint = null;
    this.distance = 0;
    this.accel = 0;
    
    
    // bound handlers supaya bisa di-off()
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    
    scene.input.on('pointerdown', this._onPointerDown);
    scene.input.on('pointermove', this._onPointerMove);
    scene.input.on('pointerup', this._onPointerUp);
    
    // cleanup otomatis saat scene shutdown/destroy
    scene.events.on('shutdown', this.destroy, this);
    scene.events.on('destroy', this.destroy, this);
  
    console.log('Controller Ran>>✓');
  }
  
  _getPointerPos(pointer) {
    // gunakan worldX/worldY bila ada camera
    return {
      x: Math.round(pointer.worldX ?? pointer.x),
      y: Math.round(pointer.worldY ?? pointer.y)
    };
  }
  
  _onPointerDown(pointer) {
    this.touchActive = true;
    this.touchPoint = this._getPointerPos(pointer);
  }
  _onPointerMove(pointer) {
    if (!this.touchActive) return;
    this.touchPoint = this._getPointerPos(pointer);
  }
  _onPointerUp(pointer) {
    this.touchActive = false;
  }
  
  update() {
    if (!this.shipBox || !this.shipBox.body) return;

    
    if (this.touchActive && this.touchPoint) {
      this.distance = Phaser.Math.Distance.Between(this.shipBox.x, this.shipBox.y, this.touchPoint.x, this.touchPoint.y);
      if (this.distance > this.tolerTouch / 4) {
        this.accel = Phaser.Math.Clamp(this.distance * 5, this.minSpeed, this.maxSpeed);
        this.scene.physics.moveTo(this.shipBox, this.touchPoint.x, this.touchPoint.y, this.accel);
        
        // tilt
        if (this.touchPoint.x < this.shipBox.x - this.tolerTouch) {
          this.ship?.setTexture(this.ShipTiltKey);
          this.ship?.setFlipX(false);
        } else if (this.touchPoint.x > this.shipBox.x + this.tolerTouch) {
          this.ship?.setTexture(this.ShipTiltKey);
          this.ship?.setFlipX(true);
        } else {
          this.ship?.setTexture(this.ShipKey);
        }
        
        // thrust visual
        if (this.touchPoint.y < this.shipBox.y) {
          if (this.thrusterR) { this.thrusterR.setScale(0.20, 0.25);
            this.thrusterR.y = 80; }
          if (this.thrusterL) { this.thrusterL.setScale(0.20, 0.25);
            this.thrusterL.y = 80; }
        } else {
          if (this.thrusterR) { this.thrusterR.setScale(0.15);
            this.thrusterR.y = 60; }
          if (this.thrusterL) { this.thrusterL.setScale(0.15);
            this.thrusterL.y = 60; }
        }
      } else {
        // dekat => berhenti
        this.shipBox.body.setVelocity(0);
        this.ship?.setTexture(this.ShipKey);
        if (this.thrusterR) { this.thrusterR.setScale(0.20);
          this.thrusterR.y = 70; }
        if (this.thrusterL) { this.thrusterL.setScale(0.20);
          this.thrusterL.y = 70; }
      }
    } else {
      // tidak ada input
      this.shipBox.body.setVelocity(0);
      this.ship?.setTexture(this.ShipKey);
      if (this.thrusterR) { this.thrusterR.setScale(0.20);
        this.thrusterR.y = 70; }
      if (this.thrusterL) { this.thrusterL.setScale(0.20);
        this.thrusterL.y = 70; }
    }
  }
  
  destroy() {
    // lepaskan semua listener
    if (!this.scene) return;
    this.scene.input.off('pointerdown', this._onPointerDown);
    this.scene.input.off('pointermove', this._onPointerMove);
    this.scene.input.off('pointerup', this._onPointerUp);
    this.scene.events.off('shutdown', this.destroy, this);
    this.scene.events.off('destroy', this.destroy, this);
    // dereference
    this.shipBox = null;
    this.ship = null;
    this.thrusterR = null;
    this.thrusterL = null;
    this.scene = null;
  }
}
