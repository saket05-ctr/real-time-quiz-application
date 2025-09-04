const startButton = document.querySelector('#start-button');
const highScore = document.querySelector('.high-score');
const highScoreValue = document.querySelector('.high-score-value');
const AllCategories = document.querySelectorAll('.items');
const errorElement = document.querySelector('.error');

let requestUrl = ""
function isEmpty(obj){
    return Object.keys(obj).length === 0;
}

// function selectCategory (){
//     let Url= ""
//     for(const item of AllCategories){
//         if(item.classList.contains('active')){
//             Url = AllUrl.${item.innerText}
//             console.log(Url);
//         } 
//         return Url
        
//     }
    
// }


// let requestUrl = selectCategory()

let score =JSON.parse(localStorage.getItem('Scores')) || {};
if(!isEmpty(score)){
    highScoreValue.innerText = score.Hi_Score;
    highScore.style.display = 'block';
}




startButton.addEventListener('click',() =>{
    if(requestUrl == ""){
        errorElement.style.display= "block"
    }
    else{
        makeHttpRequest('GET', requestUrl);
    }
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

let AllUrl = {
    "General Knowledge": "https://opentdb.com/api.php?amount=25&category=9&type=multiple",
    "Computer-Science":"https://opentdb.com/api.php?amount=25&category=18&difficulty=easy&type=multiple",
    "Sports":"https://opentdb.com/api.php?amount=24&category=21&type=multiple",
    "Science & Nature": "https://opentdb.com/api.php?amount=24&category=17&type=multiple"
}

let clicked = 0;
for(const item of AllCategories){
    item.addEventListener('click',() =>{
        console.log(item);
        console.log(clicked);
        if(clicked == 0){
            item.classList.add("active");
            clicked = 1;
        }
        
        if(item.classList.contains('active')){
            requestUrl = AllUrl[item.innerText]
            console.log(requestUrl);
        } 
    });
    

    
}


