`this.time.addEvent` adalah **fitur timer** milik Phaser (bukan JavaScript murni), yang digunakan untuk **menjalankan sesuatu secara terjadwal**, baik **sekali** atau **berulang**.

---

### 📌 Fungsi `this.time.addEvent` digunakan saat:

* Kamu ingin menunda eksekusi sebuah fungsi (`delay`).
* Kamu ingin menjalankan fungsi berulang setiap beberapa waktu (`loop`).
* Kamu ingin mengatur durasi tertentu untuk sesuatu (contohnya animasi, cooldown, dll).

---

### 📜 Contoh Lengkap Syntax `this.time.addEvent`

```javascript
// Tambahkan di dalam scene, misalnya di create()
this.time.addEvent({
  delay: 1000,               // Waktu jeda 1000ms (1 detik)
  callback: () => {          // Fungsi yang dijalankan setelah delay
    console.log("1 detik telah berlalu!");
    // Bisa juga menjalankan animasi, membuat peluru, dll
  },
  callbackScope: this,       // Supaya 'this' merujuk ke scene (penting!)
  loop: true                 // true = akan berjalan berulang terus
});
```

---

### 💡 Penjelasan Setiap Properti

| Properti        | Fungsi                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| `delay`         | Waktu tunggu sebelum callback dijalankan (dalam ms)                    |
| `callback`      | Fungsi yang akan dijalankan setelah delay                              |
| `callbackScope` | Objek yang digunakan sebagai konteks `this` dalam callback             |
| `loop`          | Jika `true`, callback akan terus diulang dengan interval `delay`       |
| `repeat`        | Alternatif `loop`, menentukan berapa kali callback diulang             |
| `startAt`       | Mulai countdown dari waktu tertentu (misal `startAt: 500` = 0.5 detik) |

---

### 🧪 Contoh Simulasi Peluru Otomatis Setiap 0.3 Detik

```javascript
this.time.addEvent({
  delay: 300, // setiap 0.3 detik
  callback: () => {
    this.createAnimsBullet(30, this.Player.x, this.Player.y);
    this.PlayerBullet.setVelocityY(-600);
    console.log("Tembak!");
  },
  callbackScope: this,
  loop: true
});
```

---

### 🔄 Jika hanya ingin sekali:

```javascript
this.time.addEvent({
  delay: 2000, // Tunggu 2 detik
  callback: () => {
    console.log("Boom! 2 detik berlalu");
  },
  callbackScope: this
  // loop tidak ditulis, maka otomatis hanya sekali
});
```

---

### 🧠 Kapan dibutuhkan?

* Cooldown tembakan senjata
* Countdown mundur (timer UI)
* Event delay (ledakan muncul setelah 2 detik)
* Spawn musuh berkala (tiap 5 detik)
* Efek visual sementara (hilang dalam 3 detik)

---