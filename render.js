/**
 * Подставляет тексты из window.SITE_CONTENT в готовую разметку.
 *
 * Сейчас данные приходят из файлов папки data — так страница открывается
 * двойным щелчком, без сервера.
 * Позже эту функцию можно заменить на загрузку с сервера, например:
 *   fetch("/api/content").then(function (r) { return r.json(); })
 * Разметку страниц при этом менять не нужно: скрипт по-прежнему заполняет те же блоки.
 */
(function () {
  var ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 13.8 9H20l-5 3.8 1.9 6.2L12 15.8 7.1 19l1.9-6.2L4 9h6.2L12 2.5Z"/></svg>',
    brush: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3.5 20.5 9.5l-8.8 8.8a4 4 0 0 1-2.2 1.1l-4.2.7.7-4.2a4 4 0 0 1 1.1-2.2l7.4-7.4Z"/><path d="M4 20.5h7"/></svg>',
    building: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20.5h16M6 20.5V5.5A1 1 0 0 1 7 4.5h6a1 1 0 0 1 1 1v15M14 9.5h3.5a1 1 0 0 1 1 1v10"/><path d="M8.5 8h2M8.5 11.5h2M8.5 15h2"/></svg>',
    window: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M12 3.5v17M4 12h16"/></svg>'
  };

  function getContent() {
    if (!window.SITE_CONTENT || !window.SITE_CONTENT.company) {
      throw new Error("Не найдены данные сайта. Проверьте файлы в папке data.");
    }
    return window.SITE_CONTENT;
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function icon(name) {
    return ICONS[name] || ICONS.spark;
  }

  function renderNav(content, pageId) {
    return content.navigation.filter(function (item) {
      return item.menu !== false;
    }).map(function (item) {
      var current = item.id === pageId;
      if (!item.ready && !current) {
        return (
          '<span class="nav-link is-soon">' +
          esc(item.label) +
          "</span>"
        );
      }
      return (
        '<a class="nav-link' + (current ? " is-current" : "") + '" href="' + esc(item.href) + '"' +
        (current ? ' aria-current="page"' : "") + ">" +
        esc(item.label) +
        "</a>"
      );
    }).join("");
  }

  function phoneLink(company) {
    if (!company.phoneDisplay) {
      return "";
    }
    var href = company.phoneHref || "#";
    return '<a class="header-phone" href="' + esc(href) + '">' + esc(company.phoneDisplay) + "</a>";
  }

  function contactBlock(company) {
    var lines = [];
    if (company.address) {
      lines.push("<p>" + esc(company.address) + "</p>");
    }
    if (company.hours) {
      lines.push("<p>" + esc(company.hours) + "</p>");
    }
    if (company.phoneDisplay) {
      var href = company.phoneHref || "#";
      lines.push('<p><a href="' + esc(href) + '">' + esc(company.phoneDisplay) + "</a></p>");
    }
    if (company.email) {
      lines.push("<p>" + esc(company.email) + "</p>");
    }
    if (!lines.length) {
      return "";
    }
    return "<div><p>Контакты</p>" + lines.join("") + "</div>";
  }

  function renderChrome(content, pageId) {
    var company = content.company;
    var banner = document.getElementById("demo-banner");
    var notice = content.meta && content.meta.demoNotice;
    banner.hidden = !notice;
    banner.textContent = notice || "";

    var note = company.nameNote
      ? "<small>" + esc(company.nameNote) + "</small>"
      : "";

    document.getElementById("site-header").innerHTML =
      '<div class="header-inner">' +
        '<a class="logo" href="index.html">' +
          '<span class="logo-mark" aria-hidden="true"></span>' +
          "<span><strong>" + esc(company.name) + "</strong>" + note + "</span>" +
        "</a>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Меню</button>' +
        '<nav class="nav" id="site-nav">' + renderNav(content, pageId) + "</nav>" +
        phoneLink(company) +
      "</div>";

    document.getElementById("site-footer").innerHTML =
      '<div class="footer-inner">' +
        "<div><strong>" + esc(company.name) + "</strong><p>" + esc(company.slogan || "") + "</p></div>" +
        contactBlock(company) +
      "</div>";
  }

  function renderHome(content) {
    var home = content.home;
    document.title = home.documentTitle;

    var panel = home.panel || {};
    document.getElementById("hero").innerHTML =
      '<div class="hero-copy">' +
        '<p class="eyebrow">' + esc(home.hero.slogan) + "</p>" +
        "<h1>" + esc(home.hero.title) + "</h1>" +
        "<p>" + esc(home.hero.text) + "</p>" +
        '<div class="hero-actions">' +
          '<a class="button" href="' + esc(home.hero.primaryHref) + '">' + esc(home.hero.primaryLabel) + "</a>" +
          '<a class="button button-ghost" href="' + esc(home.hero.secondaryHref) + '">' + esc(home.hero.secondaryLabel) + "</a>" +
        "</div>" +
      "</div>" +
      '<aside class="hero-panel">' +
        "<strong>" + esc(panel.title) + "</strong>" +
        "<p>" + esc(panel.text) + "</p>" +
        '<a class="button button-light" href="' + esc(panel.href) + '">' + esc(panel.button) + "</a>" +
      "</aside>";

    var services = content.services.filter(function (item) { return !item.hideOnHome; });
    document.getElementById("services").innerHTML =
      '<div class="section-head"><h2>' + esc(home.servicesTitle) + "</h2>" +
        (home.servicesLead ? "<p>" + esc(home.servicesLead) + "</p>" : "") +
      "</div>" +
      '<div class="card-grid">' +
        services.map(function (item) {
          return (
            '<article class="card">' +
              '<span class="icon">' + icon(item.icon) + "</span>" +
              "<h3>" + esc(item.title) + "</h3>" +
              "<p>" + esc(item.summary) + "</p>" +
            "</article>"
          );
        }).join("") +
      "</div>";

    document.getElementById("advantages").innerHTML =
      '<div class="section-head"><h2>' + esc(home.advantagesTitle) + "</h2>" +
        (home.advantagesLead ? "<p>" + esc(home.advantagesLead) + "</p>" : "") +
      "</div>" +
      '<ol class="advantage-list">' +
        home.advantages.map(function (item, index) {
          var number = index + 1 < 10 ? "0" + (index + 1) : String(index + 1);
          return "<li><span>" + number + "</span><h3>" + esc(item.title) + "</h3><p>" + esc(item.text) + "</p></li>";
        }).join("") +
      "</ol>";

    var reviews = document.getElementById("reviews");
    if (!content.reviews || !content.reviews.length) {
      reviews.hidden = true;
      reviews.innerHTML = "";
    } else {
      reviews.hidden = false;
      reviews.innerHTML =
        '<div class="section-head"><h2>' + esc(home.reviewsTitle) + "</h2>" +
          (home.reviewsLead ? "<p>" + esc(home.reviewsLead) + "</p>" : "") +
        "</div>" +
        '<div class="card-grid">' +
          content.reviews.map(function (item) {
            return (
              '<blockquote class="quote">' +
                "<p>" + esc(item.text) + "</p>" +
                "<footer><strong>" + esc(item.author) + "</strong>" +
                  (item.label ? "<span>" + esc(item.label) + "</span>" : "") +
                "</footer>" +
              "</blockquote>"
            );
          }).join("") +
        "</div>";
    }

    document.querySelector("#request .cta-inner").innerHTML =
      "<h2>" + esc(home.cta.title) + "</h2>" +
      "<p>" + esc(home.cta.text) + "</p>" +
      (home.cta.button ? '<span class="button button-quiet">' + esc(home.cta.button) + "</span>" : "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var pageId = document.body.getAttribute("data-page");
    var content = getContent();
    renderChrome(content, pageId);
    if (pageId === "home") {
      renderHome(content);
    }
  });
})();
