const Question = document.querySelector('.question-text');
const nextBtn = document.querySelector('#next-btn');
const optionContainers = document.querySelectorAll('.options');
const totalQuestion = document.querySelector('.total-question');
const currentQuestion = document.querySelector('.current-question');
const timeSeconds = document.querySelector('.time-seconds');
const timerContainer = document.querySelector('.timer-container');
const timer = document.querySelector('.timer');
const audio = document.querySelector('#game-audio');
const micControl = document.querySelector('#mic-control');
const crrtAnsAudio = document.querySelector('#correct-answer');
const WrngAnsAudio = document.querySelector('#wrong-answer');

audio.volume=0.5;
let score =JSON.parse(localStorage.getItem('Scores')) || {};

// Fisher-Yates (Knuth) Shuffle Algorithm
function shuffleArray(array){
    for (let i = array.length - 1; i>=0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        // swapiing the elements 
         [array[i], array[j]] = [array[j], array[i]];
    
    }
    return array;
}

function isEmpty(obj){
    return Object.keys(obj).length ===0;
}





const quizDataObject =JSON.parse(localStorage.getItem('quizData')) || {};
// console.log(decodeURIComponent(quizDataObject.results[0].question));

Question.innerHTML = decodeURIComponent(quizDataObject.results[0].question);
totalQuestion.innerText = quizDataObject.results.length;

let AllQuestions =[];
for(let i= 0; i< quizDataObject.results.length; i++){
    AllQuestions.push(decodeURIComponent(quizDataObject.results[i].question))

    // console.log(decodeURIComponent(quizDataObject.results[i].question));
}


let nextBtnClickCount = 0;
nextBtn.addEventListener('click', () => {
    nextBtnClickCount = nextBtnClickCount + 1;
    timeSeconds.innerText = 30;
    clicked = 0;
    // audio.currentTime = 0;
    for (const option of optionContainers) {
        option.classList.remove('correct','incorrect');
    }


    if (nextBtnClickCount <= quizDataObject.results.length - 1 ){

        Question.innerHTML = AllQuestions[nextBtnClickCount];
        currentQuestion.innerText = nextBtnClickCount + 1;
        console.log('nextBtn clicked');

        const AllOptions = [quizDataObject.results[nextBtnClickCount].correct_answer, ...quizDataObject.results[nextBtnClickCount].incorrect_answers];
        const shuffledOptions = shuffleArray(AllOptions);
        let i= 0;
        for (const element of optionContainers){
            element.innerText = shuffledOptions[i];
            i=i+1;
        }
    }
    else{
        if (currentScore > score.Hi_Score || isEmpty(score)){
            console.log('New High Score');
            score.Crnt_Score = currentScore;
            score.Hi_Score = currentScore;
        }
        else{
            score.Crnt_Score = currentScore;
        }

        localStorage.setItem('Scores', JSON.stringify(score));
        window.location.href = 'result.html';
    }
});




// loading options and shuffling them

// spread can't be used for string, it causes problem of splitting the string into characters
const AllOptions = [quizDataObject.results[0].correct_answer, ...quizDataObject.results[0].incorrect_answers];
const shuffledOptions = shuffleArray(AllOptions);


let i= 0;
for (const element of optionContainers){
    // console.log(element);
    element.innerText = shuffledOptions[i];
    i=i+1;
}

setInterval(() => {
    timeSeconds.innerText = timeSeconds.innerText - 1;
    if(timeSeconds.innerText == 0){
        nextBtn.click();
        timeSeconds.innerText = 30;
        document.body.style.backgroundColor = '#CCE2C2'
        timer.style.backgroundColor = '#02A4096E'
        timerContainer.style.backgroundColor = '#02A4096E'
          
    }
    else if(timeSeconds.innerText ==15){
        document.body.style.backgroundColor = '#D4D69F8C'
        timer.style.backgroundColor = '#C5B1006E'
        timerContainer.style.backgroundColor = '#d1bd0a6e'
        // document.body.classList.add('half-time');
        
    }
    else if(timeSeconds.innerText ==5){
        document.body.style.backgroundColor = '#DBADAD'
        timer.style.backgroundColor = '#C50C006E'
        timerContainer.style.backgroundColor = '#e5180a6e'
    }
},1000)






// handling option click event

// let allOptionsClass=[];
// for (const opt of optionContainers){
//     allOptionsClass.push(opt.classList);
// }
let clicked = 0;
let currentScore = 0;
optionContainers.forEach(option => {
    
    option.addEventListener('click', () => {
        console.log(option)
        const correctAnswer = quizDataObject.results[nextBtnClickCount].correct_answer;
        if (clicked == 0){
            if(option.innerText == correctAnswer ){
                option.classList.add('correct');
                crrtAnsAudio.play();
                currentScore = currentScore + 1;

                // localStorage.setItem('currentScore',currentScore );

            }
            else{
                option.classList.add('incorrect');
                WrngAnsAudio.play();
                optionContainers.forEach((Opt) =>{
                    if(Opt.innerText == correctAnswer){
                        Opt.classList.add('correct');
                    }
                });
            }
            console.log(clicked);
            clicked = 1;
        }
    
    });

});



micControl.addEventListener('click', () =>{
    if(micControl.classList.contains('playing')){
        audio.pause()
        micControl.classList.add('paused')
        micControl.classList.remove('playing')
    }
    else{
        audio.play()
        micControl.classList.add('playing')
        micControl.classList.remove('paused')
    }
})