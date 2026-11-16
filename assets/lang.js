// Язык страницы: ?lang= в адресе, затем прошлый выбор, затем язык браузера.
// Русский — для русского, белорусского и казахского браузера, остальным английский.
(function () {
  var langs = ['en', 'ru'];
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var query = new URLSearchParams(location.search).get('lang');
  var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  var lang = langs.indexOf(query) >= 0 ? query
    : langs.indexOf(saved) >= 0 ? saved
    : ['ru', 'be', 'kk'].indexOf(nav) >= 0 ? 'ru' : 'en';

  function apply(l) {
    root.setAttribute('data-show', l);
    root.lang = l;
    var title = root.getAttribute('data-title-' + l);
    if (title) document.title = title;
    var buttons = document.querySelectorAll('.langs button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set') === l));
    }
  }

  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var buttons = document.querySelectorAll('.langs button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        lang = this.getAttribute('data-set');
        try { localStorage.setItem('lang', lang); } catch (e) {}
        apply(lang);
      });
    }
  });
})();
