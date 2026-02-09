// Gym controller — listens to existing script.js output
// Does NOT modify the Coach

export function shouldTriggerGym(result) {
  return result.score < 7;
}
