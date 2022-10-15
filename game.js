let buttonColors=['red','blue','green','yellow'];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;
let nextSequence=()=>{
    userClickedPattern=[];
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#level-title').text(`Level ${level}`)
    level++;


$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);
}
$('.btn').on('click',function(){
let userChosenColor=$(this).attr('id');
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress($(this));
checkAnswer(userClickedPattern.length-1);

 })

 let playSound=(name)=>{
    var audio = new Audio(`sounds/${name}.mp3`);
audio.play();
 }

 let animatePress=(currentColor)=>{
    currentColor.addClass('pressed')
    setTimeout(function(){currentColor.removeClass('pressed')},100)
   
 }

 $('body').keyup(function(){
    if(started===true) return;
    nextSequence();
    started=true;

 })

 let checkAnswer=(currentLevel)=>{
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length) {
        setTimeout(function(){
            nextSequence();
        },1000)
    }
}else{
    new Audio('sounds/wrong.mp3').play();
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any key To Restart')
    startOver();
    setTimeout(function(){
       
        $('body').removeClass('game-over');
    },200)
}
 }

 let startOver=()=>{
    level=0;
    gamePattern=[];
    started=false;
 }