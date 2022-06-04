var plane1, plane1Img;
var plane2, plane2Img;
var nail, nailImg;
var bird1, bird1Img;
var bird2, bird2Img;
var background1, background1Img;
var canvas;
var database;




function preload() {
plane1Img = loadImage("plane1.png");
plane2Img = loadImage("plane2.png");
nailImg = loadImage("nail.png");
bird1Img = loadImage("bird1.png");
bird2Img = loadImage("bird2.png");
background1Img = loadImage("skye.jpg");
}

function setup() {

  database = firebase.database();

  canvas = createCanvas(700, 400);
 
 /*background1 = createSprite(350, 150);
 background1.addImage(background1Img);
 background1.scale = 3;*/


  

}

function draw() {
  background("lightblue");


  /*background1.velocityX = -2;
  if (background1.x < 0) {
    background1.x = background1.width / 2;
}*/


  /*if(keyDown (UP_ARROW)){
    plane1.y -= 1;
    plane2.y -= 1;
  } 
  if(keyDown (DOWN_ARROW)){
    plane1.y += 1;
    plane2.y += 1;
  }

  if(keyDown(LEFT_ARROW)){
    nail = createSprite(200,200);
    nail.addImage(nailImg);
    nail.scale = 0.2;
    nail.velocityX = 5;
  }
  */
  
  
  
  
  
  drawSprites();
}


