export default class GameOver_Scene
extends Phaser.Scene 
{
    constructor() {
        super({ key: 'GameOver_Scene' });
    }

    preload() {
        // Muat aset
    }

    create() {
        this.add.text(400, 300, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu_Scene');
        });
    }
}


