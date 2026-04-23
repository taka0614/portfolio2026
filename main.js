let scrollTimer;

window.addEventListener('scroll', () => {
  document.body.classList.add('active');

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    document.body.classList.remove('active');
  }, 300);
});



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

setInterval(updateAll, 2000);

var cursor = document.getElementById('cursor');

document.addEventListener('mousemove', function (e) {
  cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});


var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
  link[i].addEventListener('mouseover', function (e) {
    cursor.classList.add('cursor--hover');
  });
  link[i].addEventListener('mouseout', function (e) {
    cursor.classList.remove('cursor--hover');
  });
}

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

let isScrolling = false;

$(function () {
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    $('#count').text(scroll);

    if (isScrolling) return;

    if (scroll >= 6666) {
      isScrolling = true;

      $('body').addClass('scrolling-to-top');

      $('html, body').animate({ scrollTop: 0 }, 6666, function () {
        isScrolling = false;
        $('body').removeClass('scrolling-to-top');
      });
    }
  });
});



$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);


