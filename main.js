const apiKey = "API KEY HERE";
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

const amountForm = document.getElementById("amount");
amountForm.addEventListener("input", (event) => {
  const amount = getValues()[0];
  const fromCurrency = getValues()[1];
  const toCurrency = getValues()[2];
  getExchangeRate(fromCurrency, toCurrency, amount);
});

const fromCurrencySelect = document.getElementById("from-currency");
fromCurrencySelect.addEventListener("change", (event) => {
  const amount = getValues()[0];
  const fromCurrency = getValues()[1];
  const toCurrency = getValues()[2];
  getExchangeRate(fromCurrency, toCurrency, amount);
});

const toCurrencySelect = document.getElementById("to-currency");
toCurrencySelect.addEventListener("change", (event) => {
  const amount = getValues()[0];
  const fromCurrency = getValues()[1];
  const toCurrency = getValues()[2];
  getExchangeRate(fromCurrency, toCurrency, amount);
});

const populateFromCurrency = () => {
  fetch(`${baseUrl}/${"GBP"}`)
    .then((res) => res.json())
    .then((data) => Object.keys(data.conversion_rates))
    .then((data) => {
      data.forEach((element) => {
        const option = document.createElement("option");
        option.textContent = element;
        option.value = element;
        document.getElementById("from-currency").appendChild(option);
      });
    });
};

const populateToCurrency = () => {
  fetch(`${baseUrl}/${"USD"}`)
    .then((res) => res.json())
    .then((data) => Object.keys(data.conversion_rates))
    .then((data) => {
      data.forEach((element) => {
        const option = document.createElement("option");
        option.textContent = element;
        option.value = element;
        document.getElementById("to-currency").appendChild(option);
      });
    });
};

const getExchangeRate = (fromCurrency, toCurrency, amount) => {
  fetch(`${baseUrl}/${fromCurrency}`)
    .then((res) => res.json())
    .then((data) => {
      const toCurrencyRate = data.conversion_rates[toCurrency];
      const exchangeRate = (amount * toCurrencyRate).toFixed(2);
      document.getElementById("amount-converting").innerHTML = `${amount}`;
      document.getElementById(
        "from-currency-code"
      ).innerHTML = `${fromCurrency} `;
      document.getElementById("result").innerHTML = `is ${exchangeRate} `;
      document.getElementById("to-currency-code").innerHTML = `${toCurrency}`;
    });
};

const getValues = () => {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  return [Number(amount).toFixed(2), fromCurrency, toCurrency];
};

populateFromCurrency();
populateToCurrency();
