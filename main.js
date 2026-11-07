/**
 * Общее поведение страниц: мобильное меню.
 * Скрипт не хранит тексты — только открывает и закрывает навигацию.
 */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("site-header");
    var button = header.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!button || !nav) {
      return;
    }

    button.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        header.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
