// Define global variables
let currentQuestion = 0;
let lives = 3;
let totalQuestionsAnswered = 0;
let isGeoGuessr = false;

// Question pools
const advancedLogicQuestions = [
    { q: "A man is in a room with two doors. One door leads to certain death, while the other leads to freedom. Each door has a sign: one sign says 'Death', and the other says 'Freedom'. However, the sign on the door to freedom is written in such a way that you can’t read it directly. The man is allowed to ask only one question to the person guarding the doors. What question should he ask?", a: "He should ask, 'Which door would the other guard say leads to freedom?'" },
    { q: "In a game, you have to identify a hidden pattern of numbers. The pattern starts as follows: 1, 11, 21, 1211, 111221. What is the next number in the pattern?", a: "312211" },
    { q: "What is the next number in the series: 3, 5, 9, 17, 33, ?", a: "65" },
    { q: "If you rearrange the letters 'CIFAICCTT', you get the name of a well-known company. What is it?", a: "Pacific IT" },
    { q: "A man has to cross a bridge at night. The bridge is guarded by a thief who will only let him pass if he answers a riddle correctly. The thief’s riddle is: 'I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?'", a: "Fire" },
    { q: "A sequence is defined as follows: a(n) = a(n-1) + a(n-2) + 1, with a(1) = 1 and a(2) = 1. What is a(5)?", a: "7" },
    { q: "What is the next number in the sequence 2, 4, 8, 16, 32, ?", a: "64" },
    { q: "In a game, you have to solve the following: (6 × 4) - 7 × 2 + (12 ÷ 3) = ?", a: "16" },
    { q: "Find the next term in this sequence: 1, 1, 2, 6, 24, 120, ?", a: "720" },
    { q: "What is the answer to this riddle: 'I have keys but open no locks. I have space but no room. You can enter, but you can't go outside. What am I?'", a: "Keyboard" }
];

const advancedTriviaQuestions = [
    { q: "What is the name of the smallest unit of a chemical element that retains the properties of that element and is composed of protons, neutrons, and electrons?", a: "Atom" },
    { q: "In which year did the French mathematician Évariste Galois die, having made significant contributions to group theory and abstract algebra?", a: "1832" },
    { q: "Which element has the chemical symbol 'Au'?", a: "Gold" },
    { q: "What is the longest river in the world?", a: "Nile" },
    { q: "Which famous physicist developed the theory of relativity?", a: "Albert Einstein" },
    { q: "What is the capital city of Australia?", a: "Canberra" },
    { q: "Who wrote 'To Kill a Mockingbird'?", a: "Harper Lee" },
    { q: "What is the hardest natural substance on Earth?", a: "Diamond" },
    { q: "In which year did the Titanic sink?", a: "1912" },
    { q: "Who is known as the 'Father of Modern Physics'?", a: "Isaac Newton" }
];

const complexPatternQuestions = [
    { q: "What is the next term in the sequence: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ?", a: "31 (the next prime number)" },
    { q: "What is the next number in the Fibonacci-like sequence where each term is the sum of the two preceding terms plus 1: 1, 2, 4, 7, 12, 20, ?", a: "33" },
    { q: "Find the next number in the pattern: 1, 1, 2, 3, 5, 8, 13, ?", a: "21 (Fibonacci sequence)" },
    { q: "What is the result of the following expression: 3^2 + 2 × 4 - (6 ÷ 3)?", a: "13" },
    { q: "What is the missing term in the following sequence: 1, 2, 4, 8, 16, ?", a: "32 (powers of 2)" },
    { q: "Determine the next term in the series: 1, 4, 9, 16, 25, 36, ?", a: "49 (perfect squares)" },
    { q: "What is the next number in this pattern: 1, 4, 9, 16, 25, ?", a: "36 (squares of integers)" },
    { q: "Find the missing term in the sequence: 2, 6, 12, 20, 30, ?", a: "42" },
    { q: "What is the next number in the series: 1, 1, 2, 6, 24, 120, ?", a: "720 (factorial of 6)" },
    { q: "What is the next number in the series: 2, 3, 5, 8, 12, ?", a: "17" }
];

const intricateWordplayQuestions = [
    { q: "What is the longest English word that can be typed using only the top row of a standard QWERTY keyboard?", a: "Typewriter" },
    { q: "Which word is an anagram of 'listen' and also a word used to describe a type of chemical bond?", a: "Silent" },
    { q: "What is the term for a word or phrase that is spelled the same backward as forward?", a: "Palindrome" },
    { q: "What is the term for a word that is formed by rearranging the letters of another word, such as 'cinema' and 'iceman'?", a: "Anagram" },
    { q: "What do you call a word that is pronounced the same as another word but has a different meaning and/or spelling?", a: "Homophone" },
    { q: "What is the term for a word that sounds like what it represents, such as 'buzz' or 'clang'?", a: "Onomatopoeia" },
    { q: "What is the word for a sentence that contains all the letters of the alphabet at least once?", a: "Pangram" },
    { q: "Which word is a synonym for 'abandon' and an anagram of 'no bear'?", a: "Barren" },
    { q: "What is the term for a type of word puzzle where you create a new word by removing or rearranging letters?", a: "Cryptogram" },
    { q: "Which word means to change the form of something by rearranging its parts or letters?", a: "Rearrange" }
];

const geoGuessrQuestions = [
    { image: 'https://via.placeholder.com/800x400?text=Map1', location: 'Paris', options: ['Paris', 'Berlin', 'London', 'Rome'] },
    { image: 'https://via.placeholder.com/800x400?text=Map2', location: 'New York', options: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { image: 'https://via.placeholder.com/800x400?text=Map3', location: 'Tokyo', options: ['Tokyo', 'Seoul', 'Beijing', 'Shanghai'] },
    { image: 'https://via.placeholder.com/800x400?text=Map4', location: 'Sydney', options: ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide'] },
    { image: 'https://via.placeholder.com/800x400?text=Map5', location: 'Rio de Janeiro', options: ['Rio de Janeiro', 'Sao Paulo', 'Buenos Aires', 'Lima'] },
    { image: 'https://via.placeholder.com/800x400?text=Map6', location: 'Cape Town', options: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'] },
    { image: 'https://via.placeholder.com/800x400?text=Map7', location: 'Toronto', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'] },
    { image: 'https://via.placeholder.com/800x400?text=Map8', location: 'Istanbul', options: ['Istanbul', 'Athens', 'Cairo', 'Dubai'] },
    { image: 'https://via.placeholder.com/800x400?text=Map9', location: 'Dubai', options: ['Dubai', 'Doha', 'Abu Dhabi', 'Manama'] },
    { image: 'https://via.placeholder.com/800x400?text=Map10', location: 'Mexico City', options: ['Mexico City', 'Guadalajara', 'Monterrey', 'Tijuana'] }
];

function startGame() {
    resetGame();
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('game-over').style.display = 'none';
    loadQuestion();
}

function generateRandomQuestion() {
    const categories = ['Advanced Logic', 'Advanced Trivia', 'Complex Pattern', 'Intricate Wordplay'];
    const category = getRandomElement(categories);
    isGeoGuessr = Math.random() < 0.3; // 30% chance to be a GeoGuessr question

    if (isGeoGuessr) {
        return generateGeoGuessrQuestion();
    } else {
        switch (category) {
            case 'Advanced Logic':
                return getRandomElement(advancedLogicQuestions);
            case 'Advanced Trivia':
                return getRandomElement(advancedTriviaQuestions);
            case 'Complex Pattern':
                return getRandomElement(complexPatternQuestions);
            case 'Intricate Wordplay':
                return getRandomElement(intricateWordplayQuestions);
            default:
                return getRandomElement(advancedLogicQuestions); // Default to Logic if something goes wrong
        }
    }
}

function generateGeoGuessrQuestion() {
    const questionData = getRandomElement(geoGuessrQuestions);

    document.getElementById('map').style.backgroundImage = `url(${questionData.image})`;
    document.getElementById('map-info').innerText = 'Guess the location';

    return {
        text: 'Guess the location of the map shown above',
        correctAnswer: questionData.location,
        answers: shuffle(questionData.options)
    };
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    if (currentQuestion >= 10) {
        showCrashScreen();
        return;
    }

    const questionData = generateRandomQuestion();

    if (isGeoGuessr) {
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('answers-container').style.display = 'block';
        document.getElementById('map-container').style.display = 'block';
        document.getElementById('question-number').innerText = `Question: ${currentQuestion + 1}`;
        document.getElementById('map-info').innerText = questionData.text;
        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';
        questionData.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'button';
            button.innerText = answer;
            button.onclick = () => checkGeoGuessrAnswer(answer, questionData.correctAnswer);
            answersContainer.appendChild(button);
        });
    } else {
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('answers-container').style.display = 'block';
        document.getElementById('map-container').style.display = 'none';
        document.getElementById('question').innerText = questionData.q;
        document.getElementById('question-number').innerText = `Question: ${currentQuestion + 1}`;

        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';
        const answers = shuffle([questionData.a, generateFakeAnswer(), generateFakeAnswer(), generateFakeAnswer()]);
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'button';
            button.innerText = answer;
            button.onclick = () => checkAnswer(answer, questionData.a);
            answersContainer.appendChild(button);
        });
    }
}

function generateFakeAnswer() {
    return `FakeAnswer${Math.floor(Math.random() * 1000)}`;
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        currentQuestion++;
        totalQuestionsAnswered++;
        loadQuestion();
    } else {
        lives--;
        document.getElementById('lives').innerText = `Lives: ${lives}`;
        if (lives <= 0) {
            showGameOver();
        } else {
            showIncorrectAnswerScreen();
        }
    }
}

function checkGeoGuessrAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        currentQuestion++;
        totalQuestionsAnswered++;
        loadQuestion();
    } else {
        lives--;
        document.getElementById('lives').innerText = `Lives: ${lives}`;
        if (lives <= 0) {
            showGameOver();
        } else {
            showIncorrectAnswerScreen();
        }
    }
}

function showIncorrectAnswerScreen() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over').innerHTML = `<h1>Incorrect ${3 - lives}</h1>
    <p>Your answer was incorrect. You have ${lives} lives left.</p>
    <button class="button" onclick="loadQuestion()">Try Again</button>`;
    document.getElementById('game').style.display = 'none';
}

function showGameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over').innerHTML = `<h1>Game Over</h1>
    <p>Unfortunately, you have run out of lives.</p>
    <p>Total Questions Answered: ${totalQuestionsAnswered}</p>
    <p>Grade: ${getGrade()}</p>
    <button class="button" onclick="restartGame()">Restart Game</button>`;
    document.getElementById('game').style.display = 'none';
}

function showCrashScreen() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over').innerHTML = `<h1>Crashed</h1>
    <div>:(</div>
    <p>The game has crashed due to an answer contradicting the code in an illegal way for the system. Error code: A04</p>
    <p>Please check the game's code or restart the game.</p>
    <div id="grade">Grade: ${getGrade()}</div>
    <button class="button" onclick="restartGame()">Restart Game</button>`;
    document.getElementById('game').style.display = 'none';
}

function getGrade() {
    if (totalQuestionsAnswered >= 10) {
        return 'A';
    } else if (totalQuestionsAnswered >= 8) {
        return 'B';
    } else if (totalQuestionsAnswered >= 6) {
        return 'C';
    } else if (totalQuestionsAnswered >= 4) {
        return 'D';
    } else {
        return 'F';
    }
}

function restartGame() {
    currentQuestion = 0;
    lives = 3;
    totalQuestionsAnswered = 0;
    document.getElementById('intro').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
}
