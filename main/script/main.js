const cards = document.querySelectorAll(".card__inner");

let user = sessionStorage.getItem('currentUser');
let userData = JSON.parse(user);
let currentUserText = document.getElementById("currentUser");

let currentUser = {
  username: userData.username,
  password: userData.password,
  cards: userData.cards
}

let card={
  question: null,
  answer: null
}

cards.forEach(function (card) {
  card.addEventListener("click", function (e) {
    card.classList.toggle("is-flipped");
  });
});

//show current user
currentUserText.innerText = currentUser.username;

/**
 * Should  initialize all declared cards when the site is started
 */
currentUser.cards.forEach(insert);

/**
 * This function proceeds the insert of a new user input for a flashcard
 */
function insertNewCard()
{
  let newQuestion=document.getElementById("questionInsert").value;
  let newAnswer=document.getElementById("answerInsert").value;
  let tempCard=Object.create(card);
  tempCard.question=newQuestion;
  tempCard.answer=newAnswer;
  insert(tempCard);
  saveCardData(newQuestion,newAnswer);

  return false;
}

/**
 * This function saves the given answer and question of the user into the local and sessionstorage of the active user
 * @param question is the inserted question of the user
 * @param answer is the inserted answer of the user
 */
function saveCardData(question,answer)
{
  let tempCard = Object.create(card);
  tempCard.question = question;
  tempCard.answer = answer;
  currentUser.cards.push(tempCard);
  sessionStorage.setItem("currentUser",JSON.stringify(currentUser));
  localStorage.setItem(currentUser.username,JSON.stringify(currentUser));
}

function deleteCardData(question,answer)
{
  let tempCurrentUserCards = Object.create(currentUser).cards;
  let clearedData = tempCurrentUserCards.filter(function (allCards)
      {
    return allCards.question!==question;

  }
  );
  currentUser.cards = clearedData;
  sessionStorage.setItem("currentUser",JSON.stringify(currentUser));
  localStorage.setItem(currentUser.username,JSON.stringify(currentUser));
}
/**
 * function to build a new card object with the correct definition of the contained DOM elements
 * it contains a card object which wraps the needed information of the question and answer
 */
function  insert(card)
{
  let newDiv = document.createElement("div"); //creates the outer space div for the card construct
  newDiv.classList.add('card');
  let newInner = document.createElement("div"); //creates the inner div for the card inside
  newInner.classList.add('card__inner');

  let innerSide = document.createElement("div"); //creates the front div for the card sides
  innerSide.classList.add('card__face')
  innerSide.classList.add('card__face--front');
  let deleteBtnFront = document.createElement("span");
  deleteBtnFront.classList.add("material-symbols-outlined");
  deleteBtnFront.onclick = function (){
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode); //creates a button with a reference to the card div and deletes it´s clicked
    deleteCardData(card.question,card.answer);
  };
  deleteBtnFront.innerHTML = "delete";
  let headlineIn = document.createElement("h2");
  let headlineInContent = document.createTextNode(card.question);
  headlineIn.appendChild(headlineInContent);
  innerSide.appendChild(deleteBtnFront);
  deleteBtnFront.parentNode.insertBefore(headlineIn,deleteBtnFront.nextSibling);

  let backSide=document.createElement("div"); //creates the back div for the card sides
  backSide.classList.add('card__face');
  backSide.classList.add('card__face--back');
  backSide.classList.add('card__header');
  let deleteBtnBack=document.createElement("span");
  deleteBtnBack.classList.add("material-symbols-outlined");
  deleteBtnBack.onclick = function (){
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode); //creates a button with a reference to the card div and deletes it´s clicked
    deleteCardData(card.question,card.answer);
  };
  deleteBtnBack.innerHTML = "delete";
  let headlineAnswer = document.createElement("h2");
  let answerText = document.createTextNode(card.answer);
  headlineAnswer.appendChild(answerText);
  backSide.appendChild(deleteBtnBack);
  deleteBtnBack.parentNode.insertBefore(headlineAnswer,deleteBtnBack.nextSibling);

  newInner.appendChild(innerSide);
  innerSide.parentNode.insertBefore(backSide,innerSide.nextSibling);
  newInner.addEventListener("click", function (e) {
    newInner.classList.toggle("is-flipped");
  });
  newDiv.appendChild(newInner);
  let targetClass=document.getElementsByClassName("grid-cards")[0];
  targetClass.insertBefore(newDiv,null);
}

/**
 * This function proceeds the logout to the login/register Screen and resets the sessionstorage to empty
 */
function logout()
{
  sessionStorage.clear();
  window.location.href="/index.html";
}