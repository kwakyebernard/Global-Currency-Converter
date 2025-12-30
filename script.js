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

/* Convert using ExchangeRate.host convert endpoint */
async function convertCurrency() {
  const amount = Number(amountInput.value);
  if (!amount || amount <= 0) {
    resultDiv.innerText = "⚠️ Enter a valid amount";
    return;
  }

  resultDiv.innerText = "⏳ Converting...";
  sound.play();

  try {
    const from = fromCurrency.value;
    const to = toCurrency.value;

    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();

    if (!data.result) throw new Error("Conversion failed");

    resultDiv.innerText = `${currencies[from]} ${amount} ${from} = ${currencies[to]} ${data.result.toFixed(2)} ${to}`;
  } catch (err) {
    console.error(err);
    resultDiv.innerText = "❌ Cannot fetch live rates. Try again.";
  }
}

/* Dark mode */
function toggleDarkMode() { document.body.classList.toggle("dark"); }

/* Slideshow */
let slides = document.querySelectorAll(".slide");
let index = 0;
setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);
