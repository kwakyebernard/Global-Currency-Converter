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

for (let code in currencies) {
  fromCurrency.innerHTML += `<option value="${code}">${currencies[code]} ${code}</option>`;
  toCurrency.innerHTML += `<option value="${code}">${currencies[code]} ${code}</option>`;
}

fromCurrency.value = "USD";
toCurrency.value = "GHS";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  if (!amount || amount <= 0) {
    result.innerText = "Enter a valid amount";
    return;
  }

  document.getElementById("sound").play();

  const from = fromCurrency.value;
  const to = toCurrency.value;

  const res = await fetch(`https://api.exchangerate.host/latest?base=${from}`);
  const data = await res.json();

  const converted = amount * data.rates[to];

  document.getElementById("result").innerText =
    `${currencies[from]} ${amount} ${from} = ${currencies[to]} ${converted.toFixed(2)} ${to}`;
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
