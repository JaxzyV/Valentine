let count = 0;
const runawayBtn = document.getElementById("runaway-btn");
const countDisplay = document.getElementById("count");
const bgMusic = document.getElementById("bgMusic");

// 1. GAME LOGIC (RUNAWAY BUTTON)
runawayBtn.addEventListener("touchstart", moveButton);
runawayBtn.addEventListener("mouseover", moveButton);

function moveButton() {
  if (count < 10) {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    runawayBtn.style.position = "absolute";
    runawayBtn.style.left = x + "px";
    runawayBtn.style.top = y + "px";
  }
}

runawayBtn.addEventListener("click", () => {
  count++;
  countDisplay.innerText = count;
  createHearts(); // Hujan hati kecil tiap klik

  if (count === 1)
    bgMusic.play().catch(() => console.log("User interaction required"));

  if (count >= 10) {
    runawayBtn.style.position = "static";
    runawayBtn.innerText = "Buka Sekarang! ✨";
    runawayBtn.onclick = startSlowLoading;
  }
});

// 2. ANNOYING LOADING
function startSlowLoading() {
  document.getElementById("loading-annoying").classList.remove("hidden");
  runawayBtn.style.display = "none";

  setTimeout(() => {
    showPhotoRain();
  }, 10000); // 10 detik menunggu "menyebalkan"
}

// 3. PHOTO RAIN & PROGRESS BAR
function showPhotoRain() {
  document.getElementById("welcome-page").classList.add("hidden");
  document.getElementById("loading-screen").classList.remove("hidden");

  let progress = 0;
  const fill = document.querySelector(".progress-fill");

  const interval = setInterval(() => {
    progress += 1;
    fill.style.width = progress + "%";

    if (progress % 10 === 0) createFallingPhoto();

    if (progress >= 100) {
      clearInterval(interval);
      showLetter();
    }
  }, 70); // Total durasi loading ~7 detik
}

function createFallingPhoto() {
  const img = document.createElement("img");
  const photoID = Math.floor(Math.random() * 7) + 1;
  img.src = `assets/photo${photoID}.jpg`;
  img.className = "falling-photo";
  img.style.left = Math.random() * 90 + "vw";
  img.style.animationDuration = Math.random() * 2 + 2 + "s";
  document.getElementById("photo-rain-container").appendChild(img);
  setTimeout(() => img.remove(), 4000);
}

// 4. LETTER & GALLERY
function showLetter() {
  document.getElementById("loading-screen").classList.add("hidden");
  document.getElementById("letter-page").classList.remove("hidden");
}

document.getElementById("btn-to-gallery").onclick = () => {
  document.getElementById("letter-page").classList.add("hidden");
  document.getElementById("gallery-page").classList.remove("hidden");
};

// 5. HELPER: HEART PARTICLES
function createHearts() {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.transition = "transform 3s linear";
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
    }, 50);
    setTimeout(() => heart.remove(), 3000);
  }
}

// MODAL FUNCTIONS
function openModal(src, title, desc) {
  createHearts();
  document.getElementById("photoModal").classList.remove("hidden");
  document.getElementById("modalImg").src = src;
  document.getElementById("caption").innerHTML =
    `<h3>${title}</h3><p>${desc}</p>`;
}

function closeModal() {
  document.getElementById("photoModal").classList.add("hidden");
}

const gameContainer = document.getElementById("game-container");

function moveButton() {
  if (count < 10) {
    // Mendapatkan ukuran area kontainer
    const containerRect = gameContainer.getBoundingClientRect();
    const btnRect = runawayBtn.getBoundingClientRect();

    // Hitung batas maksimal (lebar kontainer - lebar tombol)
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    // Tentukan posisi acak hanya di dalam range maxX dan maxY
    const randomX = Math.max(0, Math.floor(Math.random() * maxX));
    const randomY = Math.max(0, Math.floor(Math.random() * maxY));

    // Terapkan posisi baru
    runawayBtn.style.left = randomX + "px";
    runawayBtn.style.top = randomY + "px";
    runawayBtn.style.margin = "0"; // Reset margin jika ada
  }
}
