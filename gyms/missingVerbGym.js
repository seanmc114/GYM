export function missingVerbGym(app, done) {
  app.innerHTML = `
    <h3>Add a verb</h3>
    <p>Translate: <strong>I am tall</strong></p>
    <input id="a">
    <button>Check</button>
  `;
  app.querySelector("button").onclick = () => {
    if (app.querySelector("#a").value.toLowerCase().includes("soy")) done();
  };
}
