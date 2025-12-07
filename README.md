# 🚀 MyProject Space Shooter

Ini adalah game **Space Shooter 2D** berbasis **Phaser.js** dan **HTML5**, yang sedang dikembangkan sebagai latihan coding dan prototipe untuk game **Play-to-Earn** masa depan.

---

## 🎯 Fitur Game (Rencana & Implementasi)

### 🎮 GameMenu_Scene
- Matrial (Coin In-Game): ⏳ Belum terdefinisi
- Token (Coin Crypto): ⏳ Belum terdefinisi
- Player Exp: ⏳ Belum terdefinisi
- Energi: ⏳ Belum terdefinisi
- UI Navigasi & Kontrol: ⏳ Belum terdefinisi
- Indikator Exp & Energi: ⏳ Belum terdefinisi

### 🚀 GamePlay_Scene (`/scenes/GamePlay_Scene.js`)

#### UI:
- ✅ Fullscreen Toggle (On/Off)
- ⏳ Indikator: HP, EXP Skill, Amunisi, Boom Amunisi, Nyawa
- ⏳ Tombol: Boom, Skill Pesawat

#### Text:
- ✅ Game Info (Debugging)
- ⏳ HP, Weapon Level, Amunisi, Boom, Score
- ⏳ Score Material (Coin In-Game)

#### Objek:
- ✅ Background 1
- ⏳ Background 2 & 3
- ⏳ Item upgrade: Weapon, HP, EXP Skill
- ⏳ Material Coin (In-Game)

#### Sound:
- ✅ Backsound 0
- ⏳ Backsound 1 & 2

---

## 🔧 Teknologi yang Digunakan

- 🎮 **Phaser 3** – game framework HTML5
- 🧠 **JavaScript**
- 📄 HTML5 + CSS3
- 🎵 Sound effects & backsound (MP3)
- 🎨 Aset visual (PNG)

---


## 📂 Diagram Struktur File (Modular)

```
📦 ProjectRoot
│
├─ main.js                  # Entry point Phaser config
│
├─ core/                    # Scene dasar (boot, preload, UI global)
│   ├─ BootScene.js
│   ├─ PreloadScene.js
│   └─ FullScreenBtnScene.js
│
├─ Scenes/                  # Scene utama game
│   ├─ MainMenuScene.js
│   └─ GamePlayScene.js
│
├─ Script/
│   ├─ Map/
│   │   └─ MapBackground.js   # Background scrolling
│   │
│   └─ Player/
│       ├─ Objek.js           # Ship container & physics
│       ├─ Thruster.js        # Animasi thruster
│       ├─ Controller.js      # Input & gerakan player
│       ├─ Index.js           # Re-export modul player
│       ├─ mainPlayer.js      # Class Player gabungan
│       │
│       └─ Weapons/
│           ├─ WeaponBase.js
│           ├─ Bullet.js
│           └─ WeaponCreate.js
│
└─ assets/                   # Gambar, audio, spritesheet
    ├─ image/
    ├─ spritesheet/
    └─ audio/
```

---





## 🔗 Diagram Hubungan Antar File.js

```
main.js
 ├─▶ core/BootScene.js
 │     └─▶ core/PreloadScene.js
 │             └─▶ Scenes/MainMenuScene.js
 │                     └─▶ Scenes/GamePlayScene.js
 │                             ├─▶ Script/Map/MapBackground.js
 │                             └─▶ Script/Player/mainPlayer.js
 │                                      ├─▶ Script/Player/Index.js
 │                                      │     ├─▶ Objek.js
 │                                      │     ├─▶ Thruster.js
 │                                      │     ├─▶ Controller.js
 │                                      │     └─▶ Weapons/WeaponCreate.js
 │                                      │              └─▶ Weapons/Bullet.js
 │                                      │                       └─▶ Weapons/WeaponBase.js
 │                                      │
 │                                      └─▶ (semua komponen Player digabung di mainPlayer.js)
 │
 └─▶ core/FullScreenBtnScene.js
```

---

## 📖 Penjelasan Alurnya

1. **main.js** → titik awal game, load semua `Scene`:

   * BootScene
   * PreloadScene
   * MainMenuScene
   * GamePlayScene
   * FullScreenBtnScene

2. **BootScene** → langsung ke PreloadScene.
   **PreloadScene** → load asset → ke MainMenuScene.
   **MainMenuScene** → klik “Tap to Play” → ke GamePlayScene.

3. **GamePlayScene**:

   * Buat **MapBackground** (scrolling background).
   * Buat **Player** (pakai `mainPlayer.js`).

4. **Player (mainPlayer.js)**:

   * Import `Objek` (ship & container).
   * Import `Thruster` (animasi thruster).
   * Import `Controller` (kontrol input).
   * Import `WeaponCreate` (buat senjata).

     * `WeaponCreate` pakai `Bullet`.
     * `Bullet` pakai `WeaponBase`.

5. **FullScreenBtnScene** → berdiri sendiri, UI fullscreen toggle.

---

## 🧩 Analogi Sederhana

* `main.js` itu **sutradara** 🎬.
* `Scene` itu **stage** / panggung.
* `MapBackground` & `Player` itu **aktor utama** di stage gameplay.
* `Objek`, `Thruster`, `Controller`, `Weapon` itu **atribut aktor Player**.
* `WeaponBase` → blueprint dasar peluru, dipakai `Bullet`, lalu dipakai `WeaponCreate`.

---

# space-shooter-pwa
# space-shooter-pwa
