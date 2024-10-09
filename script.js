const sections = document.querySelectorAll(".section");

const skills_meters = document.querySelectorAll(".skills .meter > span");

const sec_events = document.querySelector(".events");
const events_timer_days = document.querySelector(".events .timer .lable-days");
const events_timer_hours = document.querySelector(
  ".events .timer .lable-hours"
);
const events_timer_mins = document.querySelector(".events .timer .lable-mins");
const events_timer_sec = document.querySelector(".events .timer .lable-sec");

const sec_stats = document.querySelector(".stats");
const stat_lable_clients = document.querySelector(".label-clients");
const stat_lable_projects = document.querySelector(".label-projects");
const stat_lable_countries = document.querySelector(".label-countries");
const stat_lable_money = document.querySelector(".label-money");

// Section Scroll Effect

const goToIn = function (To = 0, In, counter) {
  if (+In.textContent === To - 1) clearInterval(counter);

  To = In.dataset.stat;

  let count = +In.textContent;
  In.textContent = ++count;
};

const observeSections = new IntersectionObserver(
  (entries, observeSections) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.remove("section");

      if (entry.target.classList.contains("stats")) {
        const counter1 = setInterval(
          () => goToIn(150, stat_lable_clients, counter1),
          10
        );
        const counter2 = setInterval(
          () => goToIn(135, stat_lable_projects, counter2),
          10
        );
        const counter3 = setInterval(
          () => goToIn(50, stat_lable_countries, counter3),
          40
        );
        const counter4 = setInterval(
          () => goToIn(500, stat_lable_money, counter4),
          1
        );
      }

      observeSections.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.1,
  }
);
sections.forEach((section) => {
  observeSections.observe(section);
});

// Meters Increasing on Scroll
const observeMeters = new IntersectionObserver((entries, observeMeters) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const meterWidth = entry.target.dataset.width;
    entry.target.style.width = meterWidth;

    observeMeters.unobserve(entry.target);
  });
});
skills_meters.forEach((meter) => {
  observeMeters.observe(meter);
});

// Events Timer
let time = 365 * 24 * 60 * 60; // 365 days in seconds

const tick = function () {
  if (time === 0) {
    clearInterval(timer);
  }

  const days = String(Math.trunc(time / 24 / 60 / 60)).padStart(3, 0);
  const hours = String(Math.trunc(time / 60 / 60) % 24).padStart(2, 0);
  const mins = String(Math.trunc(time / 60) % 60).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  events_timer_days.textContent = days;
  events_timer_hours.textContent = hours;
  events_timer_mins.textContent = mins;
  events_timer_sec.textContent = sec;
  // console.log(`${days}:${hours}:${mins}:${sec}`);

  time--;
};
const timer = setInterval(() => {
  tick();
}, 1000);
