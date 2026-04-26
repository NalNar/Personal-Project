const sourceSolution = document.getElementById("sourceSolution");
const similarProblems = document.getElementById("similarProblems");
const stepsList = document.getElementById("stepsList");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const promptForm = document.getElementById("promptForm");
const promptInput = document.getElementById("promptInput");
const questionText = document.getElementById("questionText");
const uploadedDocName = document.getElementById("uploadedDocName");
const docUpload = document.getElementById("docUpload");
const concepts = document.getElementById("concepts");

let completedSteps = 0;

const fallback = {
  question: "Solve for x: 2x + 5 = 17",
  source: "Linear Equations • Solve for x: 2x + 5 = 17",
  concepts: ["Linear Equations", "Solve for x", "Inverse Operations", "One-Step Equation"]
};

function parseLinearEquation(input) {
  const clean = input.replace(/\s+/g, "").toLowerCase();
  const match = clean.match(/^solvefor([a-z]):([+-]?\d*)\1([+-]\d+)=([+-]?\d+)$/);
  if (!match) return null;

  const variable = match[1];
  const aRaw = match[2];
  const b = Number(match[3]);
  const c = Number(match[4]);

  const a = aRaw === "" || aRaw === "+" ? 1 : aRaw === "-" ? -1 : Number(aRaw);
  if (a === 0 || Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) return null;

  const cMinusB = c - b;
  const answer = cMinusB / a;

  return {
    variable,
    a,
    b,
    c,
    cMinusB,
    answer
  };
}

function equationText({ a, b, c, variable }) {
  const aText = a === 1 ? "" : a === -1 ? "-" : a;
  const bText = b < 0 ? ` - ${Math.abs(b)}` : ` + ${b}`;
  return `${aText}${variable}${bText} = ${c}`;
}

function makeSteps(parsed) {
  const aText = parsed.a === 1 ? "" : parsed.a === -1 ? "-" : parsed.a;
  const bText = parsed.b < 0 ? `+ ${Math.abs(parsed.b)}` : `- ${parsed.b}`;
  const subtractText = parsed.b < 0 ? "add" : "subtract";

  return [
    {
      title: `Step 1: ${subtractText[0].toUpperCase()}${subtractText.slice(1)} ${Math.abs(parsed.b)} on both sides`,
      explain: `${aText}${parsed.variable} ${bText} = ${parsed.c} ${bText}  →  ${aText}${parsed.variable} = ${parsed.cMinusB}`
    },
    {
      title: `Step 2: Divide both sides by ${parsed.a}`,
      explain: `${aText}${parsed.variable}/${parsed.a} = ${parsed.cMinusB}/${parsed.a}  →  ${parsed.variable} = ${parsed.answer}`
    },
    {
      title: "Step 3: Check your answer",
      explain: `${parsed.a}(${parsed.answer}) ${parsed.b < 0 ? "-" : "+"} ${Math.abs(parsed.b)} = ${parsed.c} ✅`
    }
  ];
}

function makeSimilar(parsed) {
  const v = parsed.variable;
  return [
    `Solve for ${v}: ${parsed.a + 1}${v} ${parsed.b < 0 ? "-" : "+"} ${Math.abs(parsed.b) + 2} = ${parsed.c + 5}`,
    `Solve for ${v}: ${parsed.a + 2}${v} ${parsed.b < 0 ? "-" : "+"} ${Math.abs(parsed.b) + 4} = ${parsed.c + 8}`,
    `Solve for ${v}: ${parsed.a + 3}${v} ${parsed.b < 0 ? "-" : "+"} ${Math.abs(parsed.b) + 1} = ${parsed.c + 3}`
  ];
}

function updateProgress(total) {
  const pct = Math.round((completedSteps / total) * 100);
  progressFill.style.width = `${pct}%`;
  progressLabel.textContent = `${pct}%`;
}

function renderTags(items) {
  concepts.innerHTML = "";
  items.forEach((item) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = item;
    concepts.appendChild(span);
  });
}

function renderSteps(steps) {
  completedSteps = 0;
  stepsList.innerHTML = "";

  steps.forEach((step, idx) => {
    const li = document.createElement("li");
    li.className = "step";
    li.innerHTML = `<div class="step-title"><span class="step-index">${idx + 1}</span>${step.title}</div><div class="step-explain">${step.explain}</div>`;

    li.addEventListener("click", () => {
      if (li.classList.contains("done")) return;
      li.classList.add("done");
      completedSteps += 1;
      updateProgress(steps.length);
    });

    stepsList.appendChild(li);
  });

  updateProgress(steps.length);
}

function renderProblem(inputQuestion) {
  const parsed = parseLinearEquation(inputQuestion);

  if (!parsed) {
    questionText.textContent = `${inputQuestion} (Unsupported format — try: Solve for x: 2x + 5 = 17)`;
    sourceSolution.textContent = fallback.source;
    similarProblems.innerHTML = "<li>Solve for x: 3x - 4 = 11</li><li>Solve for y: 2y + 8 = 20</li><li>Solve for z: 5z - 6 = 14</li>";
    renderTags(fallback.concepts);
    renderSteps([
      { title: "Step 1: Rewrite in supported format", explain: "Use: Solve for x: ax + b = c" },
      { title: "Step 2: Isolate variable term", explain: "Move constant b to the right side." },
      { title: "Step 3: Divide by coefficient", explain: "Solve x and validate by substitution." }
    ]);
    return;
  }

  const question = `Solve for ${parsed.variable}: ${equationText(parsed)}`;
  questionText.textContent = question;
  sourceSolution.textContent = `Linear Equations • ${question}`;

  similarProblems.innerHTML = "";
  makeSimilar(parsed).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    similarProblems.appendChild(li);
  });

  renderTags(["Linear Equations", `Solve for ${parsed.variable}`, "Inverse Operations", "Check by substitution"]);
  renderSteps(makeSteps(parsed));
}

promptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = promptInput.value.trim();
  if (!question) return;
  renderProblem(question);
  promptInput.value = "";
});

docUpload.addEventListener("change", () => {
  const fileName = docUpload.files?.[0]?.name;
  uploadedDocName.textContent = fileName ? `Uploaded: ${fileName}` : "No document uploaded yet.";
});

renderProblem(fallback.question);
