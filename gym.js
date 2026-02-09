import { missingVerbGym } from "./gyms/missingVerbGym.js";
import { fragmentGym } from "./gyms/fragmentGym.js";
import { developmentGym } from "./gyms/developmentGym.js";

const app = document.getElementById("app");

export function launchGym(focus, done) {
  if (focus === "Missing verb") missingVerbGym(app, done);
  else if (focus === "Fragment") fragmentGym(app, done);
  else developmentGym(app, done);
}
