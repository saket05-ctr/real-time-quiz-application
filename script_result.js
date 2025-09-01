const Score = document.querySelector(".your-score-text");
const ResultValue = document.querySelector(".result-value");
const retryBtn = document.querySelector("#retry-btn");
const resultQuote = document.querySelector(".result-quote");



const currentScore =JSON.parse(localStorage.getItem('Scores')).Crnt_Score ;
// Score.innerText = currentScore
for(let i=0; i<=currentScore; i++){
    if(Score.innerText <= i){
        
        Score.innerText = i;
        ResultValue.style.width = `${(i/25) * 100}%`;
        
        // break;
    }
    else{
        break
    }
    
}

// ResultValue.style.width = `${(currentScore/25) * 100}%`;



if(currentScore>=21 && currentScore<=25){
    resultQuote.innerText = "Outstanding! You're a true quiz champion!"
}
else if (currentScore>=16 && currentScore<=20){
    resultQuote.innerText = "Impressive performance – just a little more to reach the top."
}
else if (currentScore>=11 && currentScore<=15){
    resultQuote.innerText = `Not bad – a bit more practice will get you higher`
}
else if (currentScore>=6 && currentScore<=10){
    resultQuote.innerText = "Keep trying! Learning never stops."
}
else if (currentScore>=0 && currentScore<=5){
    resultQuote.innerText = "Don’t worry – every expert was once a beginner."
}


retryBtn.addEventListener('click', () => {
    window.location.href ='index.html';
})