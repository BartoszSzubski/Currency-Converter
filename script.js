const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertButton = document.querySelector(".convert-btn");
const resultDiv = document.getElementById("result");
const swapButton = document.querySelector(".swap-btn");
const clearButton = document.querySelector(".clear-btn");

let rates = {};

fetch("https://cdn.moneyconvert.net/api/latest.json")
  .then((r) => r.json())
  .then((data) => {
    rates = data.rates;
    const currencyCodes = Object.keys(rates);

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

    function convert(e) {
      const amount = amountInput.value;
      const from = fromCurrency.value;
      const to = toCurrency.value;

      if ((!amount || isNaN(amount)) && e.target === convertButton) {
        const tooltip = document.querySelector(".tooltip");
        tooltip.style.display = "block";

        setTimeout(() => {
          tooltip.style.display = "none";
        }, 3000);

        return;
      }

      const rateFrom = rates[from];
      const rateTo = rates[to];

      const result = (amount / rateFrom) * rateTo;
      resultDiv.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
      resultDiv.classList.add("active");

      setTimeout(() => {
        clearButton.style.display = "inline-block";
      }, 1000);
    }

    function clearConverter() {
      amountInput.value = "";
      resultDiv.textContent = "";
      resultDiv.classList.remove("active");
      clearButton.style.display = "none";
    }

    convertButton.addEventListener("click", (e) => convert(e));

    amountInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") convert();
    });

    swapButton.addEventListener("click", () => {
      let temp = fromCurrency.value;
      fromCurrency.value = toCurrency.value;
      toCurrency.value = temp;

      convert();
    });

    clearButton.addEventListener("click", clearConverter);

    fromCurrency.value = "USD";
    toCurrency.value = "PLN";
  })
  .catch((err) => console.error("Błąd API:", err));
