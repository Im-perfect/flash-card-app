const flashCardContent0 = [
    {
        question:'1. Où passes-tu tes vacances?',
        answer:'1. Where do you spend your holidays?'
    },
    {
        question:'2. Je passe mes vacances ...',
        answer:'2. I spend my holidays ...'
    },
    {
        question:'3. Combien de temps restes-tu en vacances?',
        answer:'3. How long do you go for?'
    }
    ,    {
        question:'4. Avec qui vas-tu en vacances?',
        answer:'4. Who do you go on holiday with?'
    },
    {
        question:'5. Je vais en vacances avec ...',
        answer:'5. I go on holiday with ...'
    }
];
const flashCardContent1 = [
    {
        question:'1. 你在哪里度假?',
        answer:'1. Where do you spend your holidays?'
    },
    {
        question:'2. 我在...度假',
        answer:'2. I spend my holidays ...'
    },
    {
        question:'3. 你去了多久?',
        answer:'3. How long do you go for?'
    }
]
const flashCardCategories = [
    {
        subject: 'French',
        cards: flashCardContent0
    },
    {
        subject: 'Chinese',
        cards: flashCardContent1
    },
];

//initialize current flash card category
const flashCardContent = flashCardCategories[0].cards;

document.getElementById('numberOfCards').innerHTML = flashCardContent.length;

let currentIndexOfCards = 0; //Math.round(Math.random() * (flashCardContent.length - 1));
let previousIndexOfCards = null;
let currentCard = flashCardContent[currentIndexOfCards];
let currentCardContentElement = document.getElementById('flashCardContent');
const currentCardElement = document.getElementById('flashCard');

let isQuestion = true;

//generate a random card
const getCurrentCard = () => {
    currentIndexOfCards = Math.round(Math.random() * (flashCardContent.length - 1));
    currentCard = flashCardContent[currentIndexOfCards];
    currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].question;
}

//initialize
getCurrentCard();

//toggle card
currentCardElement.addEventListener('click', () => {
    if( isQuestion ) {
        currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].answer;
        isQuestion = false;
    }  else {
        currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].question;
        isQuestion = true;
    }
});

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

//click for next random card
nextButton.addEventListener('click', () => {
    previousIndexOfCards = currentIndexOfCards;
    getCurrentCard();
    if(currentIndexOfCards === previousIndexOfCards) {
        getCurrentCard();
    } else {
        currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].question;
    }
})

//click for the previous card, but only once...because the previous cards are all random, need to make an array to store all the previous card indexes.
previousButton.addEventListener('click', () => {
    if (previousIndexOfCards === null) {
        currentCardContentElement.innerHTML = '<em>There is no previous card.</em>';
    } else {
        currentCard = flashCardContent[previousIndexOfCards];
        currentIndexOfCards = previousIndexOfCards;
        currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].question;
    }
})

const submitNewCard = () => {
    const newQuestion = document.getElementById('newQuestion');
    const newAnswer = document.getElementById('newAnswer');

    if (!newQuestion.value.trim() || !newAnswer.value.trim()) {
        alert('Please fill in again.');
    } else {
        //add new content to flashcard pool
        flashCardContent.push( {question:newQuestion.value, answer:newAnswer.value} );

        previousIndexOfCards = currentIndexOfCards;
        currentIndexOfCards = flashCardContent.length-1;
        currentCard = flashCardContent[currentIndexOfCards];
        currentCardContentElement.innerHTML = currentCard.question;

        document.getElementById('numberOfCards').innerHTML = flashCardContent.length;

        newQuestion.value = null;
        newAnswer.value = null;
    }
}