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
  const option = `${currencies[code]} ${code}`;
  fromCurrency.innerHTML += `<option value="${code}">${option}</option>`;
  toCurrency.innerHTML += `<option value="${code}">${option}</option>`;
}

fromCurrency.value = "USD";
toCurrency.value = "GHS";

/* Convert Function */
async function convertCurrency() {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    resultDiv.innerText = "⚠️ Please enter a valid amount";
    return;
  }

  try {
    sound.play();

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${from}`
    );

    if (!response.ok) {
      throw new Error("Network error");
    }

    const data = await response.json();

    const rate = data.rates[to];
    const converted = amount * rate;

    resultDiv.innerText =
      `${currencies[from]} ${amount} ${from} = ` +
      `${currencies[to]} ${converted.toFixed(2)} ${to}`;

  } catch (error) {
    resultDiv.innerText =
      "❌ Unable to fetch live rates. Check internet connection.";
  }
}

/* Dark Mode */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* Slideshow */
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);
