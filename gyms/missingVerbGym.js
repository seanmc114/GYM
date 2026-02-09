export function missingVerbGym(app, done) {
  app.innerHTML = `
    <h3>Gym: Add a verb</h3>
    <p>Write a sentence starting with <strong>Es…</strong> or <strong>Tiene…</strong></p>
    <textarea id="ans"></textarea>
    <button>Check</button>
  `;

  app.querySelector("button").onclick = () => {
    const t = app.querySelector("#ans").value.toLowerCase();
    if (t.includes(" es ") || t.startsWith("es ") || t.includes(" tiene ")) done();
  };
}
