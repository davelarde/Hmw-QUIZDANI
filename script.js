const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
var timePara = document.querySelector("#timepara");
const questionContainerElement = document.querySelector("#question-container");
const questionElement = document.getElementById('question');
const answerBtnElement = document.querySelector("#answer-buttons");
const submitEl =document.querySelector('#getname');
const nameInput = document.querySelector('#name');
var submissionResponseEl = document.querySelector('#response');
let randomQuestions,currentQuestionIndex;
var timer;
var timeLeft= 10;


let quizScore = 0;


startButton.addEventListener("click",startGame)



nextButton.addEventListener('click',() => {
    currentQuestionIndex++
    setnextQuestion(); 
})

function showResponse(event){
    var response =" Thank you for playing the travel quiz! to play again click on the restart button" + nameInput.value
    submissionResponseEl.textContent = response;
    submitEl.addEventListener('click', submit);
    submitEl.preventDefault();
    localStorage.setItem("nameInput", name);
}
function startTimer(){
    timer= setInterval(function (){
timeLeft--;
timePara.textContent= timeLeft
if(timeLeft<=0){
    clearInterval(timer);
    alert('GAME OVER');

}
    },1000)
}

function startGame(){
    startButton.classList.add("hide");
    randomQuestions =questions.sort(() =>Math.random()-0.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    nextButton.classList.remove("hide");
    setnextQuestion();
    quizScore = 0;
    startTimer();
    localStorage.setItem("quizScore", quizScore);
}


function setnextQuestion(){
    resetState();
    showQuestion(randomQuestions[currentQuestionIndex])
}


function showQuestion(question){
 questionElement.innerText = question.question;
   question.answer.forEach((answer) => {
           const button = document.createElement('button');
           button.innerText = answer.text;
           button.classList.add("btn");
           if (answer.correct) {
               button.dataset.correct = answer.correct;
           }
           button.addEventListener('click', selectAnswer);
           answerBtnElement.appendChild(button);

       })
}



function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while(answerBtnElement.firstChild){
        answerBtnElement.removeChild(answerBtnElement.firstChild)
    }
}




function selectAnswer(e){
    const selectedButton = e.target
    const correct =selectedButton.dataset.correct

   setStatusClass(document.body,correct)
   Array.from(answerBtnElement.children).forEach((button) =>{
       setStatusClass(button,button.dataset.correct)
   })
   if(randomQuestions.length > currentQuestionIndex + 1){
     nextButton.classList.remove("hide")

   } else{
       startButton.innerText="Restart"
       startButton.classList.remove("hide")
   }
   if(selectedButton.dataset = correct){
       quizScore++
   }
   document.querySelector('#right-answers').innerText=quizScore

}



function setStatusClass(element,correct){
clearStatusClass(element)
if(correct){
    element.classList.add("correct")

} else {
    element.classList.add("wrong")
}
}



function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions =[
    {
        question: 'How many countries begin with letter A?',
        answer:[
            { text:'5', correct: false},
            { text:'9', correct: false},
            { text:'7', correct: false},
            { text:'11', correct: true},
        ],
    },
   
   { question: 'What country is home to the "blue mountain" also inspiration to one of the most famous singers?',
        answer:[
            { text:'Jamaica', correct: true},
            { text:'Australia', correct: false},
            { text:'Switzerland', correct: false},
            { text:'Canada', correct: false},

],
   },
   { question: 'How many countries are there in Central America?',
        answer:[
            { text:'6', correct: false},
            { text:'7', correct: true},
            { text:'8', correct: false},
            { text:'9', correct: false},

],
   },
 

   { question: 'What is the capital of Bolivia?',
        answer:[
            { text:'Sucre', correct: true},
            { text:'Cochabamba', correct: false},
            { text:'La Paz', correct: false},
            { text:'Tarija', correct: false},

],
   },

   { question: 'In which city do you find the Petrona Twin Towers?',
        answer:[
            { text:'Singapore', correct: false},
            { text:'Kuala Lumpur', correct: true},
            { text:'Jakarta', correct: false},
            { text:'Bangkok', correct: false},
        ],
    },
]