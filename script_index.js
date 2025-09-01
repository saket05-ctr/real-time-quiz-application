const startButton = document.querySelector('#start-button');
const highScore = document.querySelector('.high-score');
const highScoreValue = document.querySelector('.high-score-value');


function isEmpty(obj){
    return Object.keys(obj).length === 0;
}


let score =JSON.parse(localStorage.getItem('Scores')) || {};
if(!isEmpty(score)){
    highScoreValue.innerText = score.Hi_Score;
    highScore.style.display = 'block';
}




startButton.addEventListener('click',() =>{
    makeHttpRequest('GET', 'https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple');
});


function makeHttpRequest(method, url){
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        localStorage.setItem('quizData', JSON.stringify(xhr.response))

        window.location.href ='second.html';
    });
    
    xhr.open(method, url)
    xhr.send();
    console.log('request sent');
};



