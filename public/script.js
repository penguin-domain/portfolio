(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll reveal with stagger
  var items = document.querySelectorAll('.card, .chip, h2, .lead, .btns');
  items.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.setProperty('--d', (i % 6) * 0.08 + 's');
  });
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  // 3D tilt + cursor glow on cards
  if (reduce) return;
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var rx = ((y / r.height) - 0.5) * -8;
      var ry = ((x / r.width) - 0.5) * 8;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();
