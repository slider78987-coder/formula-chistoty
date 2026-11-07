/**
 * Условные цены. На главной пока не выводятся.
 * Числа демонстрационные, их можно заменить целиком.
 */
(function () {
  window.SITE_CONTENT = window.SITE_CONTENT || {};

  window.SITE_CONTENT.prices = {
    note: "Цены демонстрационные и не являются предложением реальной компании.",
    items: [
      { id: "flat-small", title: "Квартира до 40 м²", amount: "2 900 ₽", comment: "условная цена" },
      { id: "flat-medium", title: "Квартира 40–70 м²", amount: "4 500 ₽", comment: "условная цена" },
      { id: "office", title: "Офис, почасово", amount: "от 1 800 ₽", comment: "условная цена" },
      { id: "windows", title: "Окно, одна створка", amount: "от 600 ₽", comment: "условная цена" }
    ]
  };
})();
