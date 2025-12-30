const currencies = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CNY: "🇨🇳",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  INR: "🇮🇳",
  NGN: "🇳🇬",
  ZAR: "🇿🇦",
  GHS: "🇬🇭"
};

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const sound = document.getElementById("sound");

/* Populate dropdowns */
for (let code in currencies) {
  fromCurrency.innerHTML += `<option value="${code}">${currencies[code]} ${code}</option>`;
  toCurrency.innerHTML += `<option value="${code}">${currencies[code]} ${code}</option>`;
}

fromCurrency.value = "USD";
toCurrency.value = "GHS";

/* Convert using Frankfurter API */
async function convertCurrency() {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    resultDiv.innerText = "⚠️ Please enter a valid amount";
    return;
  }

  resultDiv.innerText = "⏳ Converting...";
  sound.play();

  try {
    const from = fromCurrency.value;
    const to = toCurrency.value;

    const response = await fetch(`https://api.frankfurter.app/latest?from=${from}`);
    const data = await response.json();

    if (!data.rates[to]) throw new Error("Unsupported currency");

    const converted = amount * data.rates[to];
    resultDiv.innerText = `${currencies[from]} ${amount} ${from} = ${currencies[to]} ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    console.error(error);
    resultDiv.innerText = "❌ Failed to fetch live rates. Try again.";
  }
}

/* Dark Mode */
function toggleDarkMode() { document.body.classList.toggle("dark"); }

/* Slideshow */
let slides = document.querySelectorAll(".slide");
let index = 0;
setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);
