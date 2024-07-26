let container = document.querySelector(".container");
let showScore = document.getElementById("SScore");
let score = document.getElementById("score");
let countScore=0;
let lft =0;
let gravity = 0;
let board = document.getElementById("board");
let jery = document.getElementById("jery");
let fruit = document.getElementById("fruit");
let boardPosition;
let fruitPosition;
let jeryPosition;
let isGameOver = false;


const allFruits = ["fruit1", "fruit2", "fruit3", "fruit4", "fruit5","fruit6"];
window.onload = function() {
    updateGame();
    lft = jeryPosition.left - boardPosition.left;
   
}
function updateGame(){
    requestAnimationFrame(updateGame);
    boardPosition = board.getBoundingClientRect();
    jeryPosition = jery.getBoundingClientRect();
    fruitPosition = fruit.getBoundingClientRect();
     
    if(gravity >= boardPosition.height +2 ){
        isGameOver = true;
        showScore.innerText = countScore;
        container.style.display = 'block';
        gravity =-20;
  }

    if(!isGameOver){
    fruit.style.top = gravity + "px";
    gravity += 2;
   if(lft < -jeryPosition.width){
     lft = boardPosition.width;
   }
   if(lft > boardPosition.width){
     lft = -jeryPosition.width;
   }
  if(jeryPosition.top <= fruitPosition.top &&
     jeryPosition.left <= fruitPosition.left + fruitPosition.width &&
     jeryPosition.left + jeryPosition.width >= fruitPosition.left ){
       if(jeryPosition.top +8 < fruitPosition.top){
            gravity = -20;
            let ramdomIndext = Math.floor(Math.random() * allFruits.length);// 0-5 random index
            fruit.src = allFruits[ramdomIndext] +".png";
            fruit.style.left = Math.floor(Math.random() *  250)+"px";
            countScore += 50;
            score.innerText = countScore;
       }
    }
}

}

document.addEventListener('keydown', function(event) {
    if(event.code == "ArrowLeft") {
       lft -= 8;
    }
    if(event.code == "ArrowRight") {
      lft += 8;
    }
    if(event.code == "Space" && isGameOver) {
        isGameOver = false;
        countScore = 0;
        gravity = -20;
        container.style.display = 'none';
    }
    document.getElementById("jery").style.left = lft +"px";
});

// functionality for mobile devices
function RestartGame(){
    isGameOver = false;
    countScore = 0;
    gravity = -20;
    container.style.display = 'none';
}

let offsetX;

 jery.addEventListener('touchstart',(e)=>{
     const touch = e.touches[0];
     offsetX = touch.clientX - jery.offsetLeft;
 }); 
  jery.addEventListener('touchmove',(e)=>{
     const touch = e.touches[0];
     jery.style.left = (touch.clientX - offsetX) + 'px';
 });



