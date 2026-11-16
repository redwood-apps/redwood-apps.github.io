// Язык страницы: ?lang= в адресе, затем прошлый выбор, затем языки браузера по порядку,
// иначе английский. Доступные языки — те, что есть в списке выбора на странице.
(function () {
  var root = document.documentElement;

  function available() {
    var select = document.getElementById('lang');
    if (!select) return ['en'];
    return Array.prototype.map.call(select.options, function (o) { return o.value; });
  }

  function pick(langs) {
    var query = new URLSearchParams(location.search).get('lang');
    if (langs.indexOf(query) >= 0) return query;
    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    if (langs.indexOf(saved) >= 0) return saved;
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).slice(0, 2).toLowerCase();
      if (langs.indexOf(code) >= 0) return code;
      // белорусский и казахский браузер скорее поймёт русский, чем английский
      if ((code === 'be' || code === 'kk') && langs.indexOf('ru') >= 0) return 'ru';
    }
    return 'en';
  }

  function apply(l) {
    root.lang = l;
    var parts = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < parts.length; i++) parts[i].hidden = parts[i].getAttribute('data-lang') !== l;
    var select = document.getElementById('lang');
    if (select) select.value = l;
    var sub = document.querySelector('.sub [data-lang="' + l + '"]');
    if (sub) document.title = 'Grace — ' + sub.textContent;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('lang');
    apply(pick(available()));
    if (select) {
      select.addEventListener('change', function () {
        try { localStorage.setItem('lang', select.value); } catch (e) {}
        apply(select.value);
      });
    }
  });
})();
