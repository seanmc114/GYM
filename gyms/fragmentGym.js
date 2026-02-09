export function fragmentGym(app, done) {
  app.innerHTML = `
    <h3>Gym: Build a full sentence</h3>
    <p>Write ONE clear sentence (7+ words).</p>
    <textarea id="ans"></textarea>
    <button>Check</button>
  `;

  app.querySelector("button").onclick = () => {
    if (app.querySelector("#ans").value.trim().split(/\s+/).length >= 7) done();
  };
}
