document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60000).toISOString().split("T")[0];
    dateInput.min = localDate;
    dateInput.value = localDate;
  }
});
