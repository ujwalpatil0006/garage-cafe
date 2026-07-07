document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const toast = document.getElementById("toast");

  if (!form || !toast) return;

  const phoneNumber = "919967850378";

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  };

  const clearErrors = () => {
    form.querySelectorAll(".field").forEach((field) => field.classList.remove("error"));
    form.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });
  };

  const setError = (fieldName, message) => {
    const field = form.querySelector(`.field [name="${fieldName}"]`)?.closest(".field");
    const error = form.querySelector(`.error-message[data-for="${fieldName}"]`);
    if (field) field.classList.add("error");
    if (error) error.textContent = message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const guests = String(formData.get("guests") || "").trim();
    const preference = String(formData.get("preference") || "No Preference").trim();
    const request = String(formData.get("request") || "").trim();

    let hasError = false;

    if (!name) {
      setError("name", "Please enter your name.");
      hasError = true;
    }

    if (!phone) {
      setError("phone", "Phone number is required.");
      hasError = true;
    } else if (!/^\d+$/.test(phone)) {
      setError("phone", "Phone must contain only numbers.");
      hasError = true;
    }

    if (!date) {
      setError("date", "Please select a date.");
      hasError = true;
    } else {
      const selectedDate = new Date(`${date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setError("date", "Please choose a future date.");
        hasError = true;
      }
    }

    if (!time) {
      setError("time", "Please select a time.");
      hasError = true;
    }

    if (!guests) {
      setError("guests", "Please select guest count.");
      hasError = true;
    }

    if (hasError) {
      const firstError = form.querySelector(".field.error .error-message");
      if (firstError?.textContent) {
        showToast(firstError.textContent);
      }
      return;
    }

    const message = `Hi Garage Cafe,
I'd love to book a table.

Name: ${name}

Phone: ${phone}

Date: ${date}

Time: ${time}

Guests: ${guests}

Table Preference: ${preference}

Special Request:
${request || "None"}

Please confirm my reservation.
Thank you!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    showToast("Reservation request submitted! Opening WhatsApp...");

    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 1000);
  });
});
