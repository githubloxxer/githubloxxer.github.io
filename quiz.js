document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        // Example questions (replace with your full list of 218 questions)
        { question: "Can a paradox be resolved?", answers: ["Yes", "No", "Only in specific cases", "Not sure"], correct: 0 },
        { question: "If a statement is both true and false, can it be true?", answers: ["Yes", "No", "Only in specific systems", "Not sure"], correct: 2 },
        // Add more questions here...
    ];

    let currentQuestionIndex = 0;
    let lives = 3;

    function displayQuestion(index) {
        if (index >= questions.length) {
            // End of questions
            return;
        }
        const q = questions[index];
        document.getElementById('question').innerText = q.question;
        document.getElementById('answer1').innerText = q.answers[0];
        document.getElementById('answer2').innerText = q.answers[1];
        document.getElementById('answer3').innerText = q.answers[2];
        document.getElementById('answer4').innerText = q.answers[3];

        // Add click event listeners for answers
        document.getElementById('answer1').onclick = () => handleAnswer(0);
        document.getElementById('answer2').onclick = () => handleAnswer(1);
        document.getElementById('answer3').onclick = () => handleAnswer(2);
        document.getElementById('answer4').onclick = () => handleAnswer(3);
    }

    function handleAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].correct;
        if (selectedIndex === correctIndex) {
            currentQuestionIndex++;
            if (currentQuestionIndex === questions.length) {
                alert("Congratulations! You've completed all questions.");
                return;
            }
            displayQuestion(currentQuestionIndex);
        } else {
            lives--;
            document.getElementById('life-count').innerText = lives;
            if (lives <= 0) {
                // Show game over screen
                document.getElementById('game').classList.add('hidden');
                document.getElementById('game-over').classList.remove('hidden');
                return;
            }
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    }

    // Start the game
    displayQuestion(currentQuestionIndex);
});

