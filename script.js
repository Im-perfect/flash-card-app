const flashCardPool = [
  {
    question: "1. Où passes-tu tes vacances?",
    answer: "1. Where do you spend your holidays?",
    category: "French"
  },
  {
    question: "2. Je passe mes vacances ...",
    answer: "2. I spend my holidays ...",
    category: "French"
  },
  {
    question: "3. Combien de temps restes-tu en vacances?",
    answer: "3. How long do you go for?",
    category: "French"
  },
  {
    question: "4. Avec qui vas-tu en vacances?",
    answer: "4. Who do you go on holiday with?",
    category: "French"
  },
  {
    question: "5. Je vais en vacances avec ...",
    answer: "5. I go on holiday with ...",
    category: "French"
  },
  {
    question: "1. 你在哪里度假?",
    answer: "1. Where do you spend your holidays?",
    category: "Chinese"
  },
  {
    question: "2. 我在...度假",
    answer: "2. I spend my holidays ...",
    category: "Chinese"
  },
  {
    question: "3. 你去了多久?",
    answer: "3. How long do you go for?",
    category: "Chinese"
  }
];

//initialize current flash card category
let flashCardContent = flashCardPool.filter(e => e.category === "French");
let currentIndexOfCards = 0; //Math.round(Math.random() * (flashCardContent.length - 1));
const previousHistory = [];
let previousIndexOfCards = null;
let currentCard = flashCardContent[currentIndexOfCards];
let currentCardContentElement = document.getElementById("flashCardContent");
const currentCardElement = document.getElementById("flashCard");
let language = "French";

//function to control which card to show, flip cards, previous, next cards
const showCards = flashCardContent => {
  console.log("showCards", flashCardContent);
  console.log(previousHistory, previousHistory.length);

  let isQuestion = true;

  //generate a random card
  const getRandomCard = () => {
    currentIndexOfCards = Math.round(
      Math.random() * (flashCardContent.length - 1)
    );
    currentCard = flashCardContent[currentIndexOfCards];
    currentCardContentElement.innerHTML =
      flashCardContent[currentIndexOfCards].question;
  };

  //initialize
  getRandomCard();

  //toggle card
  currentCardElement.addEventListener("click", () => {
    if (isQuestion) {
      currentCardContentElement.innerHTML =
        flashCardContent[currentIndexOfCards].answer;
      isQuestion = false;
    } else {
      currentCardContentElement.innerHTML =
        flashCardContent[currentIndexOfCards].question;
      isQuestion = true;
    }
  });

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");

  //click for next random card
  nextButton.addEventListener("click", () => {
    previousIndexOfCards = currentIndexOfCards;
    getRandomCard();
    //if same card, do it again
    if (currentIndexOfCards === previousIndexOfCards) {
      getRandomCard();
    } else {
      previousHistory.push(currentIndexOfCards);
      console.log(previousHistory);
      currentCardContentElement.innerHTML =
        flashCardContent[currentIndexOfCards].question;
    }
  });

  //click for the previous card, but only once...because the previous cards are all random, need to make an array to store all the previous card indexes.
  previousButton.addEventListener("click", () => {
    // if (previousIndexOfCards === null) {
    //   currentCardContentElement.innerHTML =
    //     "<em>There is no previous card.</em>";
    // } else {
    //   currentCard = flashCardContent[previousIndexOfCards];
    //   currentIndexOfCards = previousIndexOfCards;
    //   currentCardContentElement.innerHTML =
    //     flashCardContent[currentIndexOfCards].question;
    // }
    if (previousHistory.length === 1 || previousHistory.length === 0) {
      currentCardContentElement.innerHTML =
        "<em>There is no previous card.</em>";
      previousHistory.pop();
    } else {
      previousHistory.pop();
      previousIndexOfCards = previousHistory.length - 1;

      console.log(previousHistory, previousHistory.length);

      currentCard = flashCardContent[previousIndexOfCards];
      currentIndexOfCards = previousIndexOfCards;
      currentCardContentElement.innerHTML =
        flashCardContent[currentIndexOfCards].question;
    }
  });
};

//add a new card to the current category
const submitNewCard = () => {
  console.log("new card called");
  const newQuestion = document.getElementById("newQuestion");
  const newAnswer = document.getElementById("newAnswer");

  if (!newQuestion.value.trim() || !newAnswer.value.trim()) {
    alert("Please fill in again.");
  } else {
    pushCard(language);

    previousIndexOfCards = currentIndexOfCards;
    currentIndexOfCards = flashCardContent.length - 1;
    currentCard = flashCardContent[currentIndexOfCards];
    currentCardContentElement.innerHTML = currentCard.question;

    totalOfCards();

    newQuestion.value = null;
    newAnswer.value = null;
  }
};

//show the total number of cards in the current category
const totalOfCards = () => {
  document.getElementById("numberOfCards").innerHTML = flashCardContent.length;
};

//add the new card to the card pool
const pushCard = language => {
  flashCardPool.push({
    question: newQuestion.value,
    answer: newAnswer.value,
    category: language
  });

  flashCardContent.push({
    question: newQuestion.value,
    answer: newAnswer.value,
    category: language
  });
};

showCards(flashCardContent);
totalOfCards();

document.getElementById("French").addEventListener("click", () => {
  language = "French";
  flashCardContent = flashCardPool.filter(e => e.category === language);
  console.log("current cards", flashCardContent);
  totalOfCards();
  showCards(flashCardContent);
});

document.getElementById("Chinese").addEventListener("click", () => {
  language = "Chinese";
  flashCardContent = flashCardPool.filter(e => e.category === language);
  console.log("current cards", flashCardContent);
  totalOfCards();
  showCards(flashCardContent);
});
