const flashCardContent = [
    {
        question:'Où passes-tu tes vacances?',
        answer:'Where do you spend your holidays?'
    },
    {
        question:'Je passe mes vacances ...',
        answer:'I spend my holidays ...'
    },
    {
        question:'Combien de temps restes-tu en vacances?',
        answer:'How long do you go for?'
    }
    ,    {
        question:'Avec qui vas-tu en vacances?',
        answer:'Who do you go on holiday with?'
    },
    {
        question:'Je vais en vacances avec ...',
        answer:'I go on holiday with ...'
    }
];
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
    currentCardContentElement.innerHTML = currentCard.question;
}

getCurrentCard();

currentCardElement.addEventListener('click', () => {
    if( isQuestion ) {
        currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].answer;
        isQuestion = false;
    }  else {
        currentCardContentElement.innerHTML = flashCardContent[currentIndexOfCards].question;
        isQuestion = true;
    }
});




