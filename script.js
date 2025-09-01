const startButton = document.querySelector('#start-button');
const homeBody = document.querySelector('.home-body-container');
const secondBodyContainer = document.querySelector('.second-body-container');
const question = document.querySelector('.question-text');



startButton.addEventListener('click', () =>
{
    window.location.href = 'second.html';
    // makeHttpRequest('GET', 'https://opentdb.com/api.php?amount=24&category=18&difficulty=medium&type=multiple&encode=url3986');
    
    // question.innerText  = JSON.parse(localStorage.getItem('quizData')).results[0].question;
    
    

    // document.body.classList.add('second-body-container');

    // homeBody.style.display = 'none';
    // secondBodyContainer.style.display = 'block';
}, {once: true});

function makeHttpRequest(method, url){
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    console.log('helo');

    xhr.addEventListener('load', () => {
    localStorage.setItem('quizData', JSON.stringify(xhr.response))
    question.innerText  = JSON.parse(localStorage.getItem('quizData')).results[0].question;

    });
    
    xhr.open(method, url)
    xhr.send();
};


// xhr.addEventListener('load', () => {
//     if (xhr.response != null){
//         console.log(xhr.response);
//     }
//     else{
//         console.log("not loaded");
//     }
// }); 


// const quizData=localStorage.getItem('quizData');
// console.log(quizData)

// question.innerHTML = localStorage.getItem(`quizData.result[0].question`);


if(document.body.classList.contains('second-body')){
    makeHttpRequest('GET', 'https://opentdb.com/api.php?amount=24&category=18&difficulty=medium&type=multiple&encode=url3986');
    
}