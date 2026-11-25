const ui = document.getElementById('ui');
const particlesContainer = document.getElementById('particles');
const colorDots = document.querySelectorAll('.color-dot');

// Elemen Custom Text
const textModal = document.getElementById('textModal');
const customTextInput = document.getElementById('customTextInput');
const applyTextBtn = document.getElementById('applyTextBtn');
const toggleEditBtn = document.getElementById('toggleEditBtn');

// 1. Generate Teks Hati Utama (80 baris x 250ms = 20000ms pas tanpa celah)
const totalWords = 80;
let currentText = 'I love you';

for (let i = 1; i <= totalWords; i++) {
  const love = document.createElement('div');
  love.className = 'love';
  love.style.setProperty('--i', i);

  love.innerHTML = `
    <div class="love_horizontal">
      <div class="love_vertical">
        <div class="love_word">${currentText}</div>
      </div>
    </div>
  `;

  ui.appendChild(love);
}

// 2. Generate Partikel Hati & Kilauan Melayang di Latar Belakang
const particleCount = 30;
const symbols = ['♥', '✦', '♥', '·'];

for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  const leftPos = Math.random() * 100;
  const size = Math.random() * 12 + 10;
  const duration = Math.random() * 8 + 7;
  const delay = Math.random() * 10;

  particle.style.left = `${leftPos}vw`;
  particle.style.fontSize = `${size}px`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `-${delay}s`;

  particlesContainer.appendChild(particle);
}

// 3. Logika Ganti Warna Tema Neon
colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    colorDots.forEach(btn => btn.classList.remove('active'));
    dot.classList.add('active');

    const selectedColor = dot.getAttribute('data-color');
    document.documentElement.style.setProperty('--main-color', selectedColor);
  });
});

// 4. Logika Buka/Tutup & Ubah Custom Teks
function toggleTextModal() {
  textModal.classList.toggle('show');
  if (textModal.classList.contains('show')) {
    customTextInput.value = currentText;
    customTextInput.focus();
    customTextInput.select();
  }
}

function updateHeartText() {
  const newText = customTextInput.value.trim();
  if (newText !== '') {
    currentText = newText;
    const allWords = document.querySelectorAll('.love_word');
    allWords.forEach(word => {
      word.textContent = currentText; // Aman dari XSS karena pakai textContent
    });
  }
  textModal.classList.remove('show');
}

// Klik ikon pensil atau klik animasi hati untuk memunculkan kotak input
toggleEditBtn.addEventListener('click', toggleTextModal);
ui.addEventListener('click', toggleTextModal);

// Klik tombol "Ubah" atau tekan Enter untuk menerapkan teks baru
applyTextBtn.addEventListener('click', updateHeartText);
customTextInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    updateHeartText();
  } else if (e.key === 'Escape') {
    textModal.classList.remove('show');
  }
});