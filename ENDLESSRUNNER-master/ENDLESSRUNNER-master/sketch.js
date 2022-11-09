var main, main_run, main_shoot, main_jump;
var enemy, bullet;
var bg1, bg2, music, ground;
var life = 3, score;
var gameState = "PLAY"


function preload(){
  bg1= loadImage("assets/bg.png");
  enemy = loadImage("assets/enemy.png");
  
  main = loadImage("assets/main.png")
  main_run = loadAnimation("assets/main_run.png", main)
  main_shoot = loadImage("assets/main_shoot.png")
  main_jump = loadImage("assets/main_jump.png")

  bullet = loadImage("assets/bullet.png")

  music = loadSound("assets/music.mp3")

  groundImage = loadImage("assets/ground2.png")
  gameOverImage = loadImage("assets/gameOver.png")
  restartImage = loadImage("assets/restart.png")

  music.play()
}

function setup() {
  createCanvas(500, 500);

  bg2 = createSprite(300, 300, 1000, 1000)
  bg2.addImage("Hi", bg1)

  player = createSprite(32,423,20,50);
  player.addAnimation("running", main_run);
  player.scale= 0.6
  
  ground = createSprite(200,430,1000,20);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,425,400,10);
  invisibleGround.visible = false;
  
  enemyGroup = new Group();
  
  gameOver=createSprite(300,100);
  restart=createSprite(300,140);

  gameOver.addImage(gameOverImage);
  restart.addImage(restartImage);
 
  gameOver.visible=false;
  restart.visible=false;
  
  count = 0;
  
  ground.velocityX = -(4+3*count/100);

  text("Score: "+ count, 400, 50);
}

function draw() {
  
  console.log(gameState);
  
  if(gameState === "PLAY"){

    ground.velocityX = -(6 + 3*count/100);

    count = count + Math.round(World.frameRate/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    

    if(keyDown("space")){
      player.velocityY = -12 ;
    }

    if (keyDown("Shift")){
      shoot()
    }
  
    player.velocityY = player.velocityY + 0.8;
  
    spawnEnemies();
    
    if(enemyGroup.isTouching(player)){
      gameState = "END";
    }
  }
  
  else if(gameState === "END") {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    player.velocityY = 0;  
    enemyGroup.setVelocityXEach(0);
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }

  player.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  enemyGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  player.changeAnimation("running",player_running);
  
  score = 0;
  
}

function spawnEnemies() {
  if (frameCount % 60 === 0) {
    var enemies= createSprite(1400, player.y,40,10);
    enemies.scale = 0.2;
    enemies.velocityX = -6;
    enemies.scale = 0.6   
    enemies.addImage(enemy);
  
    enemies.lifetime = 700/enemies.velocityX;
    enemyGroup.add(enemies);

    if(bullet.isTouching(enemies)){
      enemies.destroy();
      count += 1
    }
   }
  
  }
  


function shoot(){
    bullets = createSprite(player.x, player.y, 1, 1)
    bullets.addImage('bullet', bullet)

    bullets.velocityX = 4
    bullets.lifetime = 120

    bullets.scale = 0.1
  }
