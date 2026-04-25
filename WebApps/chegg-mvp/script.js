const fileInput = document.getElementById('fileInput');
const fileStatus = document.getElementById('fileStatus');
const progressRange = document.getElementById('progressRange');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const sourceList = document.getElementById('sourceList');
const promptChips = document.querySelectorAll('.prompt-chip');

const cheggLikeSources = [
  {
    title: 'Algebra: Solve 2x + 5 = 17',
    tags: ['algebra', 'equation', 'solve', 'x'],
    summary: 'Isolate x by subtracting and dividing.',
    link: 'https://www.chegg.com/'
  },
  {
    title: 'Calculus: Derivative of x^3 + 2x',
    tags: ['calculus', 'derivative', 'differentiate'],
    summary: 'Apply power rule term-by-term.',
    link: 'https://www.chegg.com/'
  },
  {
    title: 'Physics: Find acceleration from force and mass',
    tags: ['physics', 'newton', 'force', 'mass', 'acceleration'],
    summary: 'Use a = F / m and keep units consistent.',
    link: 'https://www.chegg.com/'
  },
  {
    title: 'Chemistry: Balance a combustion equation',
    tags: ['chemistry', 'balance', 'equation', 'combustion'],
    summary: 'Balance atoms in order C, H, then O.',
    link: 'https://www.chegg.com/'
  }
];

function addMessage(text, type = 'bot') {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function tokenize(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function rankSources(question) {
  const tokens = tokenize(question);

  const scored = cheggLikeSources
    .map((source) => {
      const score = source.tags.reduce((acc, tag) => (tokens.includes(tag) ? acc + 1 : acc), 0);
      return { source, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  sourceList.innerHTML = '';

  scored.forEach(({ source, score }) => {
    const li = document.createElement('li');
    const confidence = score >= 2 ? 'High match' : score === 1 ? 'Medium match' : 'Low match';
    li.innerHTML = `<strong>${source.title}</strong> · ${confidence}<br>${source.summary} · <a href="${source.link}" target="_blank" rel="noopener noreferrer">source</a>`;
    li.innerHTML = `<strong>${source.title}</strong> (match: ${score})<br>${source.summary} · <a href="${source.link}" target="_blank" rel="noopener noreferrer">source</a>`;
    sourceList.appendChild(li);
  });
}

function stepsForTopic(question) {
function generateStepByStep(question) {
  const lower = question.toLowerCase();

  if (lower.includes('derivative') || lower.includes('differentiate')) {
    return [
      'Step 1: Identify each term and its exponent.',
      'Step 2: Apply the power rule d/dx(x^n) = n*x^(n-1) to each term.',
      'Step 3: Add derivatives together and simplify.',
      'Step 4: Verify constants become 0 and linear terms become constants.'
    ].join('\n');
  }

  if (lower.includes('equation') || lower.includes('solve')) {
    return [
      'Step 1: Move constants to one side and variable terms to the other side.',
      'Step 2: Combine like terms carefully.',
      'Step 3: Isolate the variable using inverse operations.',
      'Step 4: Substitute your answer back to check it satisfies the original equation.'
    ].join('\n');
  }

  if (lower.includes('physics') || lower.includes('force') || lower.includes('acceleration')) {
    return [
      'Step 1: List known values with units (F, m, etc.).',
      'Step 2: Pick the core formula (for example, F = m*a).',
      'Step 3: Rearrange formula to isolate the unknown variable.',
      'Step 4: Plug in numbers with units and compute.',
      'Step 5: Sanity-check magnitude and units.'
    ].join('\n');
  }

  return [
    'Step 1: Read the problem and mark what is given vs. what is asked.',
    'Step 2: Choose a relevant concept/formula.',
    'Step 3: Break the solution into small transformations.',
    'Step 4: Compute carefully and show each intermediate step.',
    'Step 5: Validate the final answer by checking assumptions and units.'
  ].join('\n');
}

function buildGuidance(question) {
  const steps = stepsForTopic(question).split('\n').map((line) => `• ${line.replace(/^Step \d+:\s*/, '')}`);
  return [
    'Great question — let’s make this manageable.',
    '',
    '1) Understand the target',
    '• Identify exactly what the question asks you to find.',
    '',
    '2) Plan your approach',
    '• Pick the formula/rule that best fits the problem type.',
    '',
    '3) Work the problem in clear mini-steps',
    ...steps,
    '',
    '4) Final check',
    '• Re-check units/signs and substitute your answer back when possible.',
    '',
    'If you paste the exact problem statement, I can tailor these steps line-by-line.'
  ].join('\n');
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    fileStatus.textContent = 'No file uploaded yet.';
    return;
  }

  fileStatus.textContent = `Uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)`;
  addMessage(`I can see your uploaded file: ${file.name}. Ask me how to approach the problem inside it.`, 'bot');
});

progressRange.addEventListener('input', () => {
  const value = Number(progressRange.value);
  progressBar.style.width = `${value}%`;
  progressLabel.textContent = `Progress: ${value}%`;
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const question = chatInput.value.trim();
  if (!question) {
    return;
  }

  addMessage(question, 'user');
  const guidance = buildGuidance(question);
  addMessage(guidance, 'bot');
  const steps = generateStepByStep(question);
  addMessage(`Here is a step-by-step approach:\n${steps}`, 'bot');

  rankSources(question);

  chatInput.value = '';
});

promptChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chatInput.value = chip.dataset.prompt;
    chatInput.focus();
  });
});

addMessage(
  'Hi! I am your study assistant.\nUpload a file, then ask your question.\nI will break it into a friendly step-by-step plan.'
);
addMessage('Hi! I am your study assistant. Share your question and I will guide you step-by-step.');
rankSources('equation');
