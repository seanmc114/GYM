export function fragmentGym(app, done) {
  app.innerHTML = `
    <h3>Complete the sentence</h3>
    <textarea></textarea>
    <button>Check</button>
  `;
  app.querySelector("button").onclick = () => {
    if (app.querySelector("textarea").value.split(" ").length > 6) done();
  };
}
