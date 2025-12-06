// ./main.js
import BootScene from './core/BootScene.js';
import FullScreenBtnScene from './core/FullScreenBtnScene.js';
import PreloadScene from './core/PreloadScene.js';
import MainMenuScene from './Scenes/MainMenuScene.js';
import GamePlayScene from './Scenes/GamePlayScene.js';

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
   scene: [
      BootScene,
      PreloadScene,
      MainMenuScene,
      GamePlayScene,
      FullScreenBtnScene
   ],
   scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH // ✅ Pusatkan di layar
   }
};

const game = new Phaser.Game(config);