/* eslint no-extend-native: ["error", {"exceptions": ["Number"]}] */
if (!Number.hasOwnProperty("currency")) {
  Number.prototype.currency = function () {
    const currency = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: "IDR",
    });

    return currency.format(this);
  };
}
