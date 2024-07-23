// Define global variables
let currentQuestion = 0;
let lives = 3;
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
    { q: "Find the next term in this sequence: 1, 4, 9, 16, 25, ?", a: "36" },
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
    { q: "Find the next number in the pattern: 1, 4, 9, 16, 25, ?", a: "36" },
    { q: "What is the next term in the sequence 2, 6, 12, 20, 30, ?", a: "42" },
    { q: "Determine the next number: 1, 2, 4, 8, 16, ?", a: "32" },
    { q: "Identify the next term in the series: 1, 1, 2, 3, 5, 8, ?", a: "13" },
    { q: "What is the next number in this sequence: 1, 2, 4, 7, 11, 16, ?", a: "22" },
    { q: "Find the next term in the sequence: 1, 4, 10, 20, ?", a: "35" },
    { q: "What is the next number in the sequence: 1, 3, 6, 10, 15, ?", a: "21" },
    { q: "Determine the next term in this sequence: 1, 2, 4, 8, 16, ?", a: "32" }
];

const intricateWordplayQuestions = [
    { q: "What five-letter word becomes shorter when you add two letters to it?", a: "Short" },
    { q: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", a: "Echo" },
    { q: "What has keys but can’t open locks?", a: "Piano" },
    { q: "What is always in front of you but can’t be seen?", a: "Future" },
    { q: "What has a heart that doesn’t beat?", a: "Artichoke" },
    { q: "What can travel around the world while staying in a corner?", a: "Stamp" },
    { q: "What gets wetter as it dries?", a: "Towel" },
    { q: "What has a thumb and four fingers but is not alive?", a: "Glove" },
    { q: "What can you catch but not throw?", a: "Cold" },
    { q: "What has a neck but no head?", a: "Bottle" }
];

const geoGuessrQuestions = [
    { image: 'https://via.placeholder.com/800x400?text=Paris', location: 'Paris, France' },
    { image: 'https://via.placeholder.com/800x400?text=Tokyo', location: 'Tokyo, Japan' },
    { image: 'https://via.placeholder.com/800x400?text=New+York', location: 'New York, USA' },
    { image: 'https://via.placeholder.com/800x400?text=London', location: 'London, UK' },
    { image: 'https://via.placeholder.com/800x400?text=Berlin', location: 'Berlin, Germany' },
    { image: 'https://via.placeholder.com/800x400?text=Sydney', location: 'Sydney, Australia' },
    { image: 'https://via.placeholder.com/800x400?text=Rio+de+Janeiro', location: 'Rio de Janeiro, Brazil' },
    { image: 'https://via.placeholder.com/800x400?text=Rome', location: 'Rome, Italy' },
    { image: 'https://via.placeholder.com/800x400?text=Dubai', location: 'Dubai, UAE' },
    { image: 'https://via.placeholder.com/800x400?text=Moscow', location: 'Moscow, Russia' }
];

function startGame() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    loadQuestion();
}

function generateRandomQuestion() {
    const categories = ['Advanced Logic', 'Advanced Trivia', 'Complex Pattern', 'Intricate Wordplay', 'GeoGuessr'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    if (category === 'GeoGuessr') {
        isGeoGuessr = true;
        return generateGeoGuessrQuestion();
    } else {
        isGeoGuessr = false;
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
        answers: shuffle([questionData.location, 'Incorrect1', 'Incorrect2', 'Incorrect3'])
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
    if (currentQuestion >= 10 || lives <= 0) {
        showGameOver();
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
        const answers = shuffle([questionData.a, 'Incorrect1', 'Incorrect2', 'Incorrect3']);
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'button';
            button.innerText = answer;
            button.onclick = () => checkAnswer(answer, questionData.a);
            answersContainer.appendChild(button);
        });
    }
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        currentQuestion++;
        loadQuestion();
    } else {
        lives--;
        document.getElementById('lives').innerText = `Lives: ${lives}`;
        if (lives <= 0) {
            showGameOver();
        } else {
            currentQuestion++;
            loadQuestion();
        }
    }
}

function checkGeoGuessrAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        currentQuestion++;
        loadQuestion();
    } else {
        lives--;
        document.getElementById('lives').innerText = `Lives: ${lives}`;
        if (lives <= 0) {
            showGameOver();
        } else {
            currentQuestion++;
            loadQuestion();
        }
    }
}

function showGameOver() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('grade').innerText = `Your grade: ${calculateGrade()}`;
}

function calculateGrade() {
    if (lives > 0) {
        return 'A';
    } else {
        return 'F';
    }
}

function restartGame() {
    lives = 3;
    currentQuestion = 0;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
}

// Initialize game
document.getElementById('intro').style.display = 'block';
