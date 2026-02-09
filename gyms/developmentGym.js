export function developmentGym(app, done) {
  app.innerHTML = `
    <h3>Add detail</h3>
    <textarea></textarea>
    <button>Check</button>
  `;
  app.querySelector("button").onclick = () => {
    if (/y|porque|pero/.test(app.querySelector("textarea").value)) done();
  };
}
