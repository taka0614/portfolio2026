// ▼ ランダムカウンター（スクロール量風）
let scrollLikeCount = 0;
let isCountingDown = false;

// ▼ カウンター更新関数（ランダムに増える）
function updateCount() {
  if (isCountingDown) return; // カウントダウン中は増やさない

  // 1〜20 のランダム増加
  const add = Math.floor(Math.random() * 20) + 1;

  scrollLikeCount += add;
  if (scrollLikeCount > 666) scrollLikeCount = 666;

  $('#count').text(scrollLikeCount);

  // 666 に到達したらカウントダウン開始
  if (scrollLikeCount >= 666) {
    startCountdown();
  }
}

// ▼ カウントダウン処理
function startCountdown() {
  isCountingDown = true;
  $('body').addClass('scroll_top');

  let current = scrollLikeCount;

  const timer = setInterval(() => {
    current--;
    $('#count').text(current);

    if (current <= 0) {
      clearInterval(timer);

      // TOP に戻す
      vertical.slideTo(0);

      // リセット
      scrollLikeCount = 0;
      $('#count').text(0);

      // 演出用に少し遅れてクラスを外す
      setTimeout(() => {
        $('body').removeClass('scroll_top');
        isCountingDown = false;
      }, 800);
    }
  }, 10); // カウントダウン速度（調整可）
}

// ▼ 縦スワイプ
const vertical = new Swiper('.vertical-swiper', {
  direction: 'vertical',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
});

// ▼ 横スワイプ（複数あるのでループで初期化）
document.querySelectorAll('.horizontal-swiper').forEach((el) => {
  new Swiper(el, {
    direction: 'horizontal',
    loop: true,
  });
});

// ▼ 縦スライドが変わったらカウント増加
vertical.on('slideChange', function () {
  updateCount();
});

// ▼ 横スライドが変わったらカウント増加
document.querySelectorAll('.horizontal-swiper').forEach((el) => {
  const swiper = el.swiper;

  swiper.on('slideChange', function () {
    updateCount();
  });
});

// ▼ クリックで横 → 最後なら縦へ（この動きでもカウント増加）
document.addEventListener('click', (e) => {
  if (isCountingDown) return; // カウントダウン中は操作禁止

  const horizontalEl = e.target.closest('.horizontal-swiper');

  if (horizontalEl) {
    const swiper = horizontalEl.swiper;
    const isLast = swiper.activeIndex === swiper.slides.length - 1;

    if (isLast) {
      vertical.slideNext();
    } else {
      swiper.slideNext();
    }

    updateCount();

  } else {
    vertical.slideNext();
    updateCount();
  }
});