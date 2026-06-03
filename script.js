const sparkleField = document.querySelector(".sparkle-field");
const confettiButton = document.querySelector("#confettiButton");
const noteButton = document.querySelector("#noteButton");
const loveNote = document.querySelector("#loveNote");
const themeToggle = document.querySelector("#themeToggle");
const heroThemeButton = document.querySelector("#heroThemeButton");
const sparkleSoundButton = document.querySelector("#sparkleSoundButton");
const revealElements = document.querySelectorAll(".reveal");
const moonlightSection = document.querySelector(".moonlight-section");

const notes = [
  "Kesane, you are the kind of person who makes ordinary moments feel like they are wrapped in ribbon.",
  "If kindness were a subject in medicine faculty, you would already be the professor.",
  "You have puppy-level happiness, sheep-cloud softness, and main-character sparkle all at once.",
  "Every future patient will be lucky to meet the doctor with such a gentle heart.",
  "You are proof that soft people can still be incredibly strong.",
  "Some people light up a room. You make it feel like home.",
  "Your study era is cute, brave, and absolutely worth cheering for.",
  "Kesane, you are sweeter than a tiny sheep taking a nap under pink clouds."
];

const floatingSymbols = ["&#9825;", "&#10022;", "&#8902;", "&#8728;"];
const storageKey = "kesane-theme";

function getStoredTheme() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // The toggle should still work if browser privacy settings block storage.
  }
}

const storedTheme = getStoredTheme();

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function setTheme(isDark, shouldScroll = false) {
  document.body.classList.toggle("dark-theme", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light day mode" : "Switch to dark moon mode"
  );
  if (heroThemeButton) {
    heroThemeButton.textContent = isDark ? "Sunrise mode" : "Moonlight mode";
  }
  storeTheme(isDark ? "dark" : "light");

  if (isDark && moonlightSection) {
    moonlightSection.classList.add("is-visible");
  }

  if (isDark && shouldScroll && moonlightSection) {
    window.setTimeout(() => {
      moonlightSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 180);
  }
}

function toggleTheme(event) {
  event?.preventDefault();
  setTheme(!document.body.classList.contains("dark-theme"), true);
}

function createSparkles() {
  if (!sparkleField) return;

  for (let index = 0; index < 34; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.style.left = `${randomBetween(0, 100)}%`;
    sparkle.style.animationDelay = `${randomBetween(-9, 0)}s`;
    sparkle.style.animationDuration = `${randomBetween(7, 13)}s`;
    sparkle.style.opacity = randomBetween(0.32, 0.82).toFixed(2);
    sparkle.style.transform = `scale(${randomBetween(0.55, 1.35)})`;
    sparkleField.appendChild(sparkle);
  }
}

function launchHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.innerHTML = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${randomBetween(18, 34)}px`;
  heart.style.color = Math.random() > 0.5 ? "#ff8fb8" : "#c291ff";
  document.body.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 1700);
}

function burstHearts() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.62;

  for (let index = 0; index < 24; index += 1) {
    window.setTimeout(() => {
      launchHeart(
        centerX + randomBetween(-180, 180),
        centerY + randomBetween(-80, 100)
      );
    }, index * 35);
  }
}

function showNextNote() {
  if (!loveNote) return;

  const currentNote = loveNote.textContent.trim();
  const availableNotes = notes.filter((note) => note !== currentNote);
  const nextNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];

  loveNote.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(12px)" }
    ],
    { duration: 180, easing: "ease-out" }
  ).onfinish = () => {
    loveNote.textContent = nextNote;
    loveNote.animate(
      [
        { opacity: 0, transform: "translateY(-12px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 220, easing: "ease-out" }
    );
  };
}

function playSparkleSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();
  const notesToPlay = [659.25, 783.99, 987.77, 1318.51];

  notesToPlay.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime + index * 0.11;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.13, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.46);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  });
}

function revealOnScroll() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

setTheme(storedTheme === "dark");
createSparkles();
revealOnScroll();

confettiButton?.addEventListener("click", burstHearts);
sparkleSoundButton?.addEventListener("click", () => {
  playSparkleSound();
  burstHearts();
});
noteButton?.addEventListener("click", () => {
  showNextNote();
  burstHearts();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("#themeToggle, #heroThemeButton")) {
    toggleTheme(event);
    return;
  }

  const isButton = event.target.closest("button, a");
  if (!isButton && Math.random() > 0.55) {
    launchHeart(event.clientX, event.clientY);
  }
});
