const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const button = document.querySelector(".btn");
const resultDiv = document.getElementById("result");

let rates = {};

fetch("https://cdn.moneyconvert.net/api/latest.json")
  .then((r) => r.json())
  .then((data) => {
    rates = data.rates;
    const currencyCodes = Object.keys(rates);

    button.addEventListener("click", () => {
      const amount = amountInput.value;
      const from = fromCurrency.value;
      const to = toCurrency.value;

      const rateFrom = rates[from];
      const rateTo = rates[to];

      const result = (amount / rateFrom) * rateTo;
      resultDiv.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
      resultDiv.classList.add("active");
    });

    currencyCodes.forEach((code) => {
      const optionFrom = document.createElement("option");
      optionFrom.value = code;
      optionFrom.textContent = code;
      fromCurrency.appendChild(optionFrom);

      const optionTo = document.createElement("option");
      optionTo.value = code;
      optionTo.textContent = code;
      toCurrency.appendChild(optionTo);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "PLN";
  })
  .catch((err) => console.error("Błąd API:", err));
