/**
 * Общие сведения и тексты главной страницы.
 * Позже эти данные сможет отдавать сервер.
 * Телефон, почта, адрес и часы пустые, пока нет настоящих контактов.
 */
(function () {
  window.SITE_CONTENT = window.SITE_CONTENT || {};

  window.SITE_CONTENT.meta = {
    isDemo: true,
    demoNotice: ""
  };

  window.SITE_CONTENT.company = {
    name: "Формула чистоты",
    slogan: "Чистота, которая меняет пространство",
    phoneDisplay: "",
    phoneHref: "",
    email: "",
    address: "",
    hours: ""
  };

  window.SITE_CONTENT.navigation = [
    { href: "index.html", id: "home", label: "Главная", ready: true },
    { href: "services.html", id: "services", label: "Услуги", ready: false },
    { href: "prices.html", id: "prices", label: "Цены", ready: false },
    { href: "about.html", id: "about", label: "О компании", ready: false },
    { href: "gallery.html", id: "gallery", label: "Галерея", ready: false },
    { href: "news.html", id: "news", label: "Акции и новости", ready: false, menu: false },
    { href: "contacts.html", id: "contacts", label: "Контакты", ready: false }
  ];

  window.SITE_CONTENT.home = {
    documentTitle: "Формула чистоты — профессиональная уборка",
    hero: {
      slogan: "Чистота, которая меняет пространство",
      title: "Профессиональная уборка квартир и офисов",
      text: "Убираем квартиры и офисы. До начала работ согласуем стоимость и перечень.",
      primaryLabel: "Заказать уборку",
      primaryHref: "#request",
      secondaryLabel: "К услугам",
      secondaryHref: "#services"
    },
    panel: {
      title: "Закажите уборку",
      text: "Подберём удобный день и заранее согласуем, что входит в работу.",
      button: "Заказать уборку",
      href: "#request"
    },
    servicesTitle: "Услуги",
    servicesLead: "Квартиры, офисы и уборка после ремонта.",
    advantagesTitle: "Преимущества",
    advantagesLead: "",
    advantages: [
      {
        title: "Понятная стоимость",
        text: "Цена согласовывается до начала работ."
      },
      {
        title: "Профессиональная техника",
        text: "Необходимое оборудование и средства для уборки."
      },
      {
        title: "Чёткий перечень работ",
        text: "Клиент заранее знает, что входит в услугу."
      },
      {
        title: "Удобное время",
        text: "Согласование подходящего дня и времени."
      }
    ],
    reviewsTitle: "Отзывы",
    reviewsLead: "",
    cta: {
      title: "Заказать уборку",
      text: "Согласуем удобное время, перечень работ и стоимость до начала.",
      button: ""
    }
  };
})();
