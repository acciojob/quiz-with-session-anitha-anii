// Your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const userAnswers = [];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener("change", function (event) {
        userAnswers[i] = event.target.value;
      });
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Save user's answers in session storage
function saveProgress() {
  sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}

// Load user's answers from session storage
function loadProgress() {
  const savedAnswers = sessionStorage.getItem("userAnswers");
  if (savedAnswers) {
    userAnswers = JSON.parse(savedAnswers);
  }
}

// Calculate the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Display the score on the page
function displayScore() {
  const score = calculateScore();
  const scoreElement = document.createElement("p");
  scoreElement.textContent = "Your score is " + score + " out of 5.";
  questionsElement.appendChild(scoreElement);

  // Store the score in local storage
  localStorage.setItem("score", score);
}

// Render the questions
renderQuestions();

// Load the user's progress
loadProgress();

// Save the progress when the radio button changes
questionsElement.addEventListener("change", saveProgress);

// Display the score
displayScore();

// renderQuestions();
