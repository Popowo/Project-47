var PLAY = 1;
var END = 0;
var score = 0;
var gameState = PLAY;
var Button;

var lives = 3, heart1, heart2, heart3, heartIMG,HeartLessIMG;
var trex,trex_running;
var cloudStart, cloudStartIMG, cloud, cloudsGroup, cloudImage;
var gameOver, restart;
var bg,bgIMG;

function preload() {
trex_running = loadAnimation("Assets/Trex1.png","Assets/Trex2.png","Assets/Trex3.png");
HeartLessIMG = loadImage("Assets/EmptyHeart.png");
heartIMG = loadImage("Assets/heart.png");
bgIMG = loadImage("Assets/123.jpg");
cloudImage = loadImage("Assets/Untitled.png");
cloudStartIMG = loadImage("Assets/Jungle.png");

}


function setup() {
  createCanvas(1500,700);
  
  bg = createSprite(750,350);
  bg.addImage("BackGround",bgIMG)
  bg.scale = 1.80;

  cloudStart = createSprite(200,125,50,25);
  cloudStart.addImage("CloudStart",cloudStartIMG);
  cloudStart.setCollider("rectangle",0,0,100,26)

  Button = createButton("Restart ");


  trex = createSprite(200,115,20,20);
  trex.addAnimation("running", trex_running);
  //trex.debug = false;
  trex.scale = 0.5;
  
  cloudsGroup = new Group();

    heart1 = createSprite(700,640);
    heart1.addImage("HeartU",heartIMG);
    heart1.scale = 0.2

    heart2 = createSprite(750,640);
    heart2.addImage("HeartUS",heartIMG);
    heart2.scale = 0.2

    heart3 = createSprite(800,640);
    heart3.addImage("HeartUSS",heartIMG);
    heart3.scale = 0.2
      


}


function draw() {
  background(255);
  
  if(gameState===PLAY){
    spawnClouds();

    var c = 0;
    if(cloudsGroup.isTouching(trex)){
      c = c + Math.round(getFrameRate()/60);
      if(c>=0&&c<=5){
        score+=c;
      }
          trex.velocityX = -3
    }
  
    if(keyDown("space")&&(trex.collide(cloudsGroup)||trex.collide(cloudStart))) {
      //jumpSound.play();
      trex.velocityY = -13.5;
      trex.velocityX = 7.5;
    }
  
    trex.velocityY = trex.velocityY + 0.8
    trex.collide(cloudStart);
    trex.collide(cloudsGroup);
  
    
    
    if(trex.x>1500||trex.y>700||trex.x<0){
  
      //gameState = END;
      //textSize(25);
      //text("GAMEOVER", 700,350);

      trex.x = 200
      trex.y = 115
      trex.velocityX = 0;
      trex.collide(cloudStart);
      heart3.addImage("HeartU",HeartLessIMG);
      heart3.scale = 0.1;
      }

  }

 
    
    if(gameState===END){
      cloudsGroup.destroyEach();
      cloudStart.visible = false;
      trex.visible = false;
      bg.visible = false;
      background("orange");
        Button.size(200);
       Button.position(650,300);
    }
    Button.mousePressed(()=>{
      drawSprites();
      background(255);
      Button.hide();
      gameState=PLAY;
      spawnClouds();
      cloudStart.visible = true;
      trex.visible = true;
      bg.visible = true;
      
    })
    drawSprites();
    textSize(25);
    fill("red");
    text("Score = "+score, 1300,100);
  
    textSize(30);
    fill("darkblue");
    text("Lives ",600,650)
  }
