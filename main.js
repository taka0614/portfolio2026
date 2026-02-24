let scrollTimer;

window.addEventListener('scroll', () => {
  document.body.classList.add('active');

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    document.body.classList.remove('active');
  }, 300);
});

// ▼ ランダム文字アニメーション
function applyRandomSpanToElement(el) {
  const originalText = el.textContent;
  const chars = [...originalText];

  const randomIndexes = [];
  while (randomIndexes.length < 3) {
    const r = Math.floor(Math.random() * chars.length);
    if (!randomIndexes.includes(r)) {
      randomIndexes.push(r);
    }
  }

  randomIndexes.forEach(i => {
    chars[i] = `<span class="rand">${chars[i]}</span>`;
  });

  el.innerHTML = chars.join('');
}

function updateAll() {
  const elements = document.querySelectorAll('.random_text');
  elements.forEach(el => applyRandomSpanToElement(el));
}

updateAll();
setInterval(updateAll, 1000);

// ▼ IntersectionObserver
const targets = document.querySelectorAll('.target');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0,
  rootMargin: '-10% 0px'
});

targets.forEach(target => observer.observe(target));

// ▼ hover クラス削除
$(".hover").mouseleave(function () {
  $(this).removeClass("hover");
});