export function developmentGym(app, done) {
  app.innerHTML = `
    <h3>Gym: Add detail</h3>
    <p>Add a detail using <strong>y</strong>, <strong>pero</strong> or <strong>porque</strong>.</p>
    <textarea id="ans"></textarea>
    <button>Check</button>
  `;

  app.querySelector("button").onclick = () => {
    if (/\b(y|pero|porque)\b/i.test(app.querySelector("#ans").value)) done();
  };
}
