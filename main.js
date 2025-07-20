//import MainMenu_Scene from './scenes/MainMenu_Scene.js';
import GamePlay_Scene from '/scenes/GamePlay_Scene.js';
//import GameOver_Scene from './scenes/GameOver_Scene.js';

const isMobile = window.innerWidth <= 640;
const config = {
   type: Phaser.AUTO,
   width: isMobile ? window.innerWidth : 640,
   height: isMobile ? window.innerHeight : 1280,
   parent: 'game',
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 0 },
         debug: false
      }
   },
   scene: [GamePlay_Scene],
   scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH // ✅ Pusatkan di layar
   }
};

const game = new Phaser.Game(config);