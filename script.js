// TURBO COACH — ENGINE ONLY

function hasVerb(text, lang) {
  const t = text.toLowerCase();
  if (lang === "es")
    return /\b(es|está|eres|soy|somos|tiene|tengo|vive|vives|vivo|gusta|gustas)\b/.test(t);
  return false;
}

function wordCount(text) {
  return text.trim().split(/\s+/).length;
}

function hasConnector(text) {
  return /\b(y|pero|porque)\b/i.test(text);
}

function hasOpinion(text, lang) {
  const t = text.toLowerCase();
  return /\b(creo que|pienso que|porque)\b/.test(t);
}

export function localCoach(answer, lang) {
  const words = wordCount(answer);

  if (!hasVerb(answer, lang)) {
    return { score: 0, focus: "Missing verb", msg: "Add a verb." };
  }
  if (words <= 3) {
    return { score: 2, focus: "Fragment", msg: "Write a full sentence." };
  }
  if (!hasConnector(answer) && !hasOpinion(answer, lang)) {
    return { score: 5, focus: "Development", msg: "Add a clear detail." };
  }
  if (!hasOpinion(answer, lang)) {
    return { score: 7, focus: "Development", msg: "Add an opinion or reason." };
  }
  return { score: 8, focus: "Quality", msg: "Very good. Add one more detail." };
}
