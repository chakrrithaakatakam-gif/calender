const monthYearElement = document.getElementById("month-year");
const daysContainer = document.getElementById("days-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const todayBtn = document.getElementById("today-btn");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;

function renderCalendar(month, year) {
  daysContainer.innerHTML = "";

  monthYearElement.textContent = `${months[month]} ${year}`;

  // Get first day index of the month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Total days in current and previous months
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Previous month fill days
  for (let i = firstDayIndex; i > 0; i--) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day", "other-month");
    dayDiv.textContent = daysInPrevMonth - i + 1;
    daysContainer.appendChild(dayDiv);
  }

  // Current month active days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = day;

    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const isSelected =
      selectedDate &&
      day === selectedDate.day &&
      month === selectedDate.month &&
      year === selectedDate.year;

    if (isToday) dayDiv.classList.add("today");
    if (isSelected) dayDiv.classList.add("selected");

    dayDiv.addEventListener("click", () => {
      selectedDate = { day, month, year };
      renderCalendar(currentMonth, currentYear);
    });

    daysContainer.appendChild(dayDiv);
  }

  // Next month fill days to complete standard 7-column grid
  const totalRendered = firstDayIndex + daysInMonth;
  const remainingDays = 7 - (totalRendered % 7);

  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day", "other-month");
      dayDiv.textContent = i;
      daysContainer.appendChild(dayDiv);
    }
  }
}

// Controls
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

todayBtn.addEventListener("click", () => {
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  selectedDate = {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  };
  renderCalendar(currentMonth, currentYear);
});

// Initial load
renderCalendar(currentMonth, currentYear);