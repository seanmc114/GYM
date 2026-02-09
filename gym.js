// gym.js — MINIMAL GYM OVERLAY (v1)
// This file adds practice WITHOUT touching the Coach logic.

export function runGym(focus, onPass) {

  // Only one Gym in v1: Missing verb
  if (focus !== "Missing verb") {
    onPass(); // nothing to train yet
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
    const t = document
      .getElementById("gymInput")
      .value
      .toLowerCase();

    // Very forgiving on purpose
    if (
      t.includes(" es ") ||
      t.startsWith("es ") ||
      t.includes(" tiene ")
    ) {
      onPass(); // unlock retry
    } else {
      alert("Add a verb (es / tiene) and try again.");
    }
  };
}

