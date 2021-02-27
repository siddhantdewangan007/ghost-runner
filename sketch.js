var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var block,blockGroup;
var gameOver,gameOverImage;
var gameState="play";
var spookySound;
var leftS;
var rightS;

function preload()
{
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  gameOverImage=loadImage("th.jpeg");
  spookySound=loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600, 600);
  tower=createSprite(300, 300);
  tower.addImage("towerImage",towerImage);
  ghost=createSprite(200, 200, 50, 50);
  ghost.addImage("ghostImage",ghostImage);
  ghost.scale=0.4;
  doorGroup=new Group();
  climberGroup=new Group();
  blockGroup=new Group();
  rightS=createSprite(600,200,1,800);
  leftS=createSprite(1,200,1,800);
}

function draw()
{
  background("black");
  
  //game state play start
  
  if(gameState==="play"){
    
  spookySound.loop();
    
  tower.velocityY=3;
  if(tower.y>500){
    tower.y=300;
  }
    
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }
  
  if(blockGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
     gameState="end";
  }
    
  spawnDoors(); 
    
  ghost.collide(leftS);
  ghost.collide(rightS);

    
 
  }
  
  //end of play state.
  
  if(gameState==="end"){
   
    
    gameOver=createSprite(300,300);
    gameOver.addImage("gameOverImage",gameOverImage);
    gameOver.scale=1.4;
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    blockGroup.destroyEach();
    tower.destroy();

  }
  
  drawSprites();
}

function spawnDoors()
{
  if(frameCount % 200 === 0){
    door=createSprite(200, -50);
    door.addImage("doorImage",doorImage);
    climber=createSprite(200, 10);
    climber.addImage("climberImage",climberImage);
    block=createSprite(200,15,climber.width,2);
    block.shapeColor="lime";
    
    climber.velocityY=3;
    climber.lifetime=350;
    door.velocityY=3;
    door.lifetime=350;
    block.velocityY=climber.velocityY;
    block.lifetime=350;
    door.x=Math.round(random(120, 400));
    climber.x=door.x;
    block.x=climber.x;
    climberGroup.add(climber);
    doorGroup.add(door);
    blockGroup.add(block);
    
    door.depth=ghost.depth;
    door.depth=+1;
  }
}







