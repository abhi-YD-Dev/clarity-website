/* =========================================================
   Clarity — site behaviour
   ========================================================= */

/* Replace with your own endpoint (Formspree, Web3Forms, etc.)
   before the support form will actually send. */
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initStickyNav();
  initFaq();
  initGauge();
  initReveal();
  initYear();
  initContactForm();
});

/* ---------- Mobile navigation ---------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* ---------- Border appears once the page scrolls ---------- */
function initStickyNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const sync = () => nav.classList.toggle("is-stuck", window.scrollY > 8);
  sync();
  window.addEventListener("scroll", sync, { passive: true });
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");

      // Close any other open item
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        if (other === item) return;
        other.classList.remove("open");
        other.querySelector(".faq-answer").style.maxHeight = null;
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      item.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
    });
  });
}

/* ---------- Hero gauge ----------
   The score is fixed (it's a worked example); the slider moves
   the prediction so the visitor feels the gap rather than reads
   about it. */
function initGauge() {
  const slider = document.getElementById("confidence");
  if (!slider) return;

  const SCORE = 62;

  const els = {
    confidence: document.getElementById("confidenceOut"),
    score: document.getElementById("scoreOut"),
    bar: document.getElementById("scoreBar"),
    gap: document.getElementById("gapOut"),
    zone: document.getElementById("zoneLabel"),
    verdict: document.getElementById("verdictText"),
    card: document.querySelector(".gauge")
  };

  const ZONES = {
    over: {
      colour: "var(--warn)",
      label: "Overconfident",
      copy: "You felt surer than the answer earned. Retest this one."
    },
    calibrated: {
      colour: "var(--success)",
      label: "Well calibrated",
      copy: "Your sense of it matched reality. That's the goal."
    },
    under: {
      colour: "var(--cyan)",
      label: "Underconfident",
      copy: "You knew more than you gave yourself credit for."
    }
  };

  els.score.textContent = SCORE + "%";
  els.bar.style.setProperty("--score", SCORE + "%");

  function render() {
    const confidence = Number(slider.value);
    const gap = confidence - SCORE;

    slider.style.setProperty("--fill", confidence + "%");
    els.confidence.textContent = confidence + "%";
    els.gap.textContent = (gap > 0 ? "+" : "") + gap;

    const zone =
      Math.abs(gap) <= 10 ? ZONES.calibrated : gap > 0 ? ZONES.over : ZONES.under;

    els.card.style.setProperty("--zone", zone.colour);
    els.zone.textContent = zone.label;
    els.verdict.textContent = zone.copy;
  }

  slider.addEventListener("input", render);
  render();
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("shown"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("shown");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Footer year ---------- */
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Support contact form ---------- */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
      status.textContent =
        "This form isn't connected yet. Email us directly using the link above.";
      status.className = "form-status error";
      return;
    }

    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = "Sending…";
    status.textContent = "";
    status.className = "form-status";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      status.textContent = "Message sent. We'll reply to the address you gave.";
      status.className = "form-status success";
    } catch {
      status.textContent =
        "That didn't send. Try again, or email us using the link above.";
      status.className = "form-status error";
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
}
