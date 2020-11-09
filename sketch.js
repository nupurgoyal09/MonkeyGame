var player, playerimg, bg, bgimg, invground, banimg,
banGroup, obsGroup, r, score, obsimg, monkeyDie, survivalTime;

var PLAY = 0;
var END = 1;
var gameState = PLAY;
function preload(){
  bgimg = loadImage("jungle.jpg");
  playerimg = loadAnimation("Monkey_01.png",        "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",  "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  banimg = loadImage("banana.png");
  obsimg = loadImage("stone.png");
  monkeyDie = loadAnimation("Monkey_10.png");
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(200, 200, 20, 20);
  bg.addImage("a", bgimg);
  bg.scale = 0.65;
  bg.width = 800;
  bg.x = bg.width/2;
  
  player = createSprite(50, 330, 20, 20);
  player.addAnimation("a", playerimg);
  player.addAnimation("y", monkeyDie);
  player.scale = 0.1;
  
  invground = createSprite(200, 370, 400, 20);
  banGroup = new Group();
  obsGroup = new Group();
  score = 0;
  survivalTime = 0;
}

function draw() {
  background("black");
  if(bg.x<0){
   bg.x = bg.width/2;
  }
  if(gameState === PLAY){
    if(keyDown("space")&&player.y>=330){
     player.velocityY = -18;
    }
   survivalTime = survivalTime +Math.round(getFrameRate()/40);    
    bananas();
    obstacles();
    
    if(banGroup.isTouching(player)){
     banGroup.destroyEach();
     score = score+1;
    }
    if(obsGroup.isTouching(player)){
     gameState = END;
    }
    bg.velocityX = -6;
  }
  //////////////////////////////////////////////////////
  invground.visible = false;
  
  player.velocityY = player.velocityY + 1;
  player.collide(invground);
  
  drawSprites();
  textSize(25);
  textFont("Impact");
  fill("lightblue");
  text("Bananas collected: "+score, 90, 60);
  text("SURVIVALTIME: "+survivalTime, 110, 100);
  //////////////////////////////////////////////////////
  if(gameState === END){
    player.velocityY = 0;
    
    banGroup.setVelocityXEach(0);
    obsGroup.setVelocityXEach(0);
    
    player.changeAnimation("y", monkeyDie);
    bg.velocityX = 0;
    obsGroup.setLifetimeEach(-1);
    banGroup.setLifetimeEach(-1);
    
    frameRate = 0;
    textSize(25);
    textFont("Impact");
    fill("black");
    text("Press 'Space' to play again", 70, 200);
    if(keyDown("space")){
     reset();
      player.changeAnimation("a", playerimg);
    }
  }
}  
function bananas(){
  if(frameCount%70 ==0){
    r = random(200, 260);
    
    var banana = createSprite(410, r, 20, 20);
    banana.addImage("c", banimg);
    banana.scale = 0.05;
    banana.velocityX = -6;
    
   
    banana.lifetime = 70;
     banGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%180===0){
    
    var obs = createSprite(410, 330, 20, 20);
    obs.addImage("h", obsimg);
    obs.scale = 0.18;
    obs.velocityX = -6;
    
    obsGroup.add(obs);
    obs.lifetime = 80;
  }
}
function reset(){
  gameState = PLAY;
  obsGroup.destroyEach();
  banGroup.destroyEach();
  score = 0;
  survivalTime = 0;
}