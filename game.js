import { localCoach } from "./script.js";
import { launchGym } from "./gym.js";

const app = document.getElementById("app");

start();

function start() {
  app.innerHTML = `
    <h2>Junior Cycle Writing</h2>
    <p>Describe your best friend (3–4 sentences).</p>
    <textarea id="answer" rows="6"></textarea>
    <button id="go">Ask Coach</button>
  `;
  document.getElementById("go").onclick = run;
}

function run() {
  const text = document.getElementById("answer").value;
  const result = localCoach(text, "es");

  app.innerHTML = `
    <p><strong>Focus:</strong> ${result.focus}</p>
    <p>${result.msg}</p>
    <button id="continue">Continue</button>
  `;

  document.getElementById("continue").onclick = () => {
    if (result.score < 7) {
      launchGym(result.focus, start);
    } else {
      start();
    }
  };
}
