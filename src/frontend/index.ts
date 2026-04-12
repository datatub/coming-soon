/// <reference lib="dom" />

const form = document.querySelector<HTMLFormElement>("#notify-form")!;
const emailInput = document.querySelector<HTMLInputElement>("#email-input")!;
const message = document.querySelector<HTMLParagraphElement>("#notify-message")!;

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const email = emailInput.value;

	const response = await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    .then((result) => result.json())
    .catch(() => null);

  message.textContent = response && response.message || "Network error. Please try again.";
  message.className = response && response.type || "error";

  form.reset();
});
