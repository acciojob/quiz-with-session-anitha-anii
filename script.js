
    // Quiz questions
    const questions = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Mars", "Earth"],
        answer: "Jupiter"
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        answer: "Leonardo da Vinci"
      },
      {
        question: "Which country won the 2018 FIFA World Cup?",
        options: ["France", "Germany", "Brazil", "Argentina"],
        answer: "France"
      },
      {
        question: "What is the symbol for the chemical element iron?",
        options: ["Fe", "Ir", "In", "I"],
        answer: "Fe"
      }
    ];

    // Check if session storage is supported
    function isSessionStorageSupported() {
      try {
        sessionStorage.setItem("test", "test");
        sessionStorage.removeItem("test");
        return true;
      } catch (error) {
        return false;
      }
    }

    // Save progress in session storage
    function saveProgress() {
      if (isSessionStorageSupported()) {
        sessionStorage.setItem("progress", JSON.stringify(progress));
      }
    }

    // Load progress from session storage
    function loadProgress() {
      if (isSessionStorageSupported()) {
        const savedProgress = sessionStorage.getItem("progress");
        if (savedProgress) {
          progress = JSON.parse(savedProgress);
        }
      }
    }

    // Save score in local storage
    function saveScore(score) {
      localStorage.setItem("score", score);
    }

    // Load score from local storage
    function loadScore() {
      const savedScore = localStorage.getItem("score");
      if (savedScore) {
        return parseInt(savedScore);
      }
      return 0;
    }

    // Calculate the score
    function calculateScore() {
      let score = 0;
      questions.forEach((q, index) => {
        if (progress[index] === q.answer) {
          score++;
        }
      });
      return score;
    }

    // Initialize quiz
    function initQuiz() {
      const questionsDiv = document.getElementById("questions");
      const submitBtn = document.getElementById("submitBtn");

      let progress = [];

      // Load progress from session storage
      loadProgress();

      // Render questions
      questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        const questionText = document.createElement("p");
        const optionsDiv = document.createElement("div");

        questionText.textContent = `${index + 1}. ${q.question}`;

        q.options.forEach((option) => {
          const optionLabel = document.createElement("label");
          const optionInput = document.createElement("input");
          optionInput.type = "radio";
          optionInput.name = `question-${index}`;
          optionInput.value = option;
          optionInput.checked = progress[index] === option;

          optionInput.addEventListener("change", (event) => {
            const selectedOption = event.target.value;
            progress[index] = selectedOption;
            saveProgress();
          });

          optionLabel.appendChild(optionInput);
          optionLabel.append(option);

          optionsDiv.appendChild(optionLabel);
        });

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(optionsDiv);

        questionsDiv.appendChild(questionDiv);
      });

      // Load score from local storage
      const savedScore = loadScore();
      const scoreMessage = savedScore ? `Your score is ${savedScore} out of 5.` : "";

      // Display score
      const scoreDiv = document.createElement("div");
      scoreDiv.textContent = scoreMessage;
      document.body.appendChild(scoreDiv);

      // Submit button event handler
      submitBtn.addEventListener("click", () => {
        const score = calculateScore();
        saveScore(score);
        scoreDiv.textContent = `Your score is ${score} out of 5.`;
      });
    }

    // Initialize the quiz
    initQuiz();
  