var PLAY, END, gameState;
var monkey , monkey_running, ground, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var fruit, obstacle;
var score, survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  groundImg = loadImage("ground2.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 500);
  
  monkey = createSprite(50, 425, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(250, 480, 500, 40);
  ground.addImage("ground", groundImg);
  ground.shapeColor = "lightgreen";
  ground.velocityX = -5;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}


function draw() {
  background("lightblue");
  
  text("Score: " + score, 400, 50);
  
  text("Survival Time: " + survivalTime, 300, 50);
  
  if(gameState == PLAY) {
    survivalTime = Math.ceil(frameCount/frameRate())
  
    if(ground.x < 0) {
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") && monkey.y > 425) {
      monkey.velocityY = -20;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
  
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score ++;
    }
    
    if(obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
    
  } else if(gameState == END) {
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      survivalTime = survivalTime;
      text("Game Over", 250, 200);
      text("Your score is " + score, 250, 250);
      text("Your survival time is " + survivalTime, 250, 300);
  }
  
  fruits();
  
  obstacles();
  
  drawSprites();
}

function fruits() {
  if(frameCount % 100 == 0) {
    fruit = createSprite(530, 250, 50, 50);
    fruit.addImage("fruit", bananaImage);
    fruit.scale = 0.1;
    fruit.y = Math.round(random(200, 350));
    fruit.velocityX = -2;
    fruit.lifetime = 265;
    FoodGroup.add(fruit);
  }
}

function obstacles() {
  if(frameCount % 300 == 0) {
    obstacle = createSprite(550, 450, 50, 50);
    //obstacle.addImage("obstacles", obstacleImage);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 275;
    obstacle.setCollider("circle", 0, 0, 180);
    obstacleGroup.add(obstacle);
  }
}




