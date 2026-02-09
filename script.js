// script.js — TURBO COACH vCALIBRATED
// WITH INLINE GYM (NO MODULES, SAFE FOR GITHUB PAGES)

// ==============================
// GYM (INLINE, MINIMAL)
// ==============================
function runGym(focus, onPass) {

  if (focus !== "Missing verb") {
    onPass();
    return;
  }

  const out = document.getElementById("out");

  out.classList.remove("hidden");
  out.innerHTML = `
    <div class="score">Gym</div>
    <div class="focus">Add a verb</div>
    <p>Fix the sentence by adding a verb.</p>
    <p><em>Mi amigo alto.</em></p>
    <textarea id="gymInput" rows="2"></textarea>
    <button id="gymCheck">Check</button>
  `;

  document.getElementById("gymCheck").onclick = () => {
    const t = document.getElementById("gymInput").value.toLowerCase();
    if (t.includes(" es ") || t.startsWith("es ") || t.includes(" tiene ")) {
      onPass();
    } else {
      alert("Add a verb (es / tiene) and try again.");
    }
  };
}

// ==============================
// VERB ATTEMPT DETECTION
// ==============================
function hasVerb(text, lang) {
  const t = text.toLowerCase();

  if (lang === "es")
    return /\b(es|está|eres|soy|somos|tiene|tengo|vive|vives|vivo|gusta|gustas)\b/.test(t);

  if (lang === "fr")
    return /\b(est|suis|es|a|as|habite|habites|aime|aimes)\b/.test(t);

  if (lang === "de")
    return /\b(ist|bin|bist|hat|habe|hast|wohnt|wohnst|mag|magst)\b/.test(t);

  if (lang === "ga")
    return /\b(tá|is|táim|táimid)\b/.test(t);

  return false;
}

// ==============================
// BASIC STRUCTURE
// ==============================
function wordCount(text) {
  return text.trim().split(/\s+/).length;
}

function hasConnector(text) {
  return /\b(y|et|und|agus|pero|mais|aber|porque|parce que|weil)\b/i.test(text);
}

function hasOpinion(text, lang) {
  const t = text.toLowerCase();
  if (lang === "es") return /\b(creo que|pienso que|me parece que|porque)\b/.test(t);
  if (lang === "fr") return /\b(je pense que|à mon avis|parce que)\b/.test(t);
  if (lang === "de") return /\b(ich denke|meiner meinung nach|weil)\b/.test(t);
  if (lang === "ga") return /\b(sílim go|dar liom|mar go)\b/.test(t);
  return false;
}

// ==============================
// LOCAL COACH
// ==============================
function localCoach(answer, lang) {

  const words = wordCount(answer);

  if (!hasVerb(answer, lang)) {
    return {
      score: 0,
      focus: "Missing verb",
      msg:
        lang === "es" ? "Add a verb — start with **es** or **tiene**." :
        lang === "fr" ? "Add a verb — start with **est** or **a**." :
        lang === "de" ? "Add a verb — start with **ist** or **hat**." :
        "Add a verb — start with **tá sé…**."
    };
  }

  if (words <= 3) {
    return {
      score: 2,
      focus: "Fragment",
      msg: "That’s a start — write a full sentence about the person."
    };
  }

  if (!hasConnector(answer) && !hasOpinion(answer, lang)) {
    return {
      score: 5,
      focus: "Development / word choice",
      msg: "Add a clearer detail."
    };
  }

  if (!hasOpinion(answer, lang)) {
    return {
      score: 7,
      focus: "Development",
      msg: "Good answer. Add an opinion or reason."
    };
  }

  return {
    score: 8,
    focus: "Quality",
    msg: "Very good. Add one more specific detail."
  };
}

// ==============================
// UI LOGIC
// ==============================
document.addEventListener("DOMContentLoaded", () => {

  const runBtn = document.getElementById("runBtn");
  const out = document.getElementById("out");
  const answerBox = document.getElementById("answer");

  function reset() {
    answerBox.value = "";
    answerBox.disabled = false;
    runBtn.innerText = "Ask coach";
    answerBox.focus();
  }

  reset();

  runBtn.onclick = () => {
    const lang = document.getElementById("lang").value;
    const answer = answerBox.value.trim();

    runBtn.innerText = "Checking…";
    answerBox.disabled = true;

    const result = localCoach(answer, lang);
    const forceGym = result.score <= 3;

    out.classList.remove("hidden");
    out.innerHTML = `
      <div class="score">Score: ${result.score} / 10</div>
      <div class="focus">Focus: ${result.focus}</div>
      <div><strong>Do this:</strong> ${result.msg}</div>
      <button id="retryBtn" style="margin-top:12px;">Try again</button>
    `;

    document.getElementById("retryBtn").onclick = () => {
      if (forceGym) {
        runGym(result.focus, reset);
      } else {
        reset();
        out.classList.add("hidden");
      }
    };
  };
});
