function liveDate() {
  const today = new Date(); // Get today's date
  const year = today.getFullYear(); // Get the full year (e.g., 2025)
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Get the month (0-11) and add leading zero
  const day = String(today.getDate()).padStart(2, "0"); // Get the day of the month and add leading zero

  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(`${year}-${month}-${day}`).toLocaleDateString(
    "en-GB",
    options
  ); // 'en-GB' ensures the format is like '12 Jan 2025'
}

module.exports = { liveDate };
