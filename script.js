
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const heartsContainer = document.getElementById('hearts-container');

yesBtn.addEventListener('click', () => {
  window.location.href = 'love.html';
});

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = '❤️';
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = '0px';
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}
setInterval(createHeart, 700);

let lastMoveTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMoveTime < 300) return;

  const rect = noBtn.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const dx = mouseX - btnCenterX;
  const dy = mouseY - btnCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 100) {
    const moveX = -dx / distance * 80;
    const moveY = -dy / distance * 80;

    const currentLeft = noBtn.offsetLeft;
    const currentTop = noBtn.offsetTop;

    const container = document.querySelector('.buttons');
    const maxX = container.offsetWidth - noBtn.offsetWidth;
    const maxY = container.offsetHeight - noBtn.offsetHeight;

    let newLeft = Math.min(Math.max(0, currentLeft + moveX), maxX);
    let newTop = Math.min(Math.max(0, currentTop + moveY), maxY);

    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;

    lastMoveTime = now;
  }
});
