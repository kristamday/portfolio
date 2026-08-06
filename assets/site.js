/* Krista Day — portfolio interactions */
(function () {
  // ---- mobile nav ----
  var burger = document.querySelector('.burger');
  var links = document.getElementById('navlinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  // ---- mark current page in nav ----
  var here = location.pathname.split('/').pop() || 'index.html';
  Array.prototype.forEach.call(document.querySelectorAll('.navlinks a'), function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === here) a.setAttribute('aria-current', 'page');
    if (here.indexOf('work-') === 0 && href === 'work.html') a.setAttribute('aria-current', 'page');
  });

  // ---- scroll reveal ----
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(els, function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    Array.prototype.forEach.call(els, function (e) { io.observe(e); });
  }

  // ---- count-up on big numbers ----
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && 'IntersectionObserver' in window && !reduce) {
    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        no.unobserve(en.target);
        var el = en.target, raw = el.textContent, m = raw.match(/-?\d+/);
        if (!m) return;
        var target = parseInt(m[0], 10),
          pre = raw.slice(0, m.index),
          post = raw.slice(m.index + m[0].length),
          start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 950, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + Math.round(target * eased) + post;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(nums, function (e) { no.observe(e); });
  }
})();
