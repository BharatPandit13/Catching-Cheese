var gameState = "intro";
var c = [];
var score = 0;
var timer = 0;

function preload() {
  c = loadImage("Cheese.png");
  m = loadAnimation("Mouse1.png", "Mouse2.png");
  i = loadImage("Starting.png");
  d = loadImage("Den.png");
  e = loadImage("EmptyRoom.jpg");
  w = loadImage("winner.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  mouse = createSprite(915, 65, 30, 30);
  mouse.addAnimation("running", m);


  for (var i = 0; i < 100; i++) {
    var randX = Math.round(random(0, windowWidth))
    var randY = Math.round(random(0, windowHeight))
    c[i] = createSprite(randX, randY, 30, 30);
    c[i].addImage(c);
    c[i].scale = 0.1;
    drawSprites();
  }


}

function draw() {
  background(0);



  text(mouseX + ',' + mouseY, mouseX, mouseY);

  if (gameState === "intro") {
    background(d);
    for (var i = 0; i < 100; i++) {
      c[i].visible = false;
    }
    mouse.visible = false;
    introLevel();
  }

  if (gameState === "level1") {
    background(e);
    for (var i = 0; i < 100; i++) {
      c[i].visible = true;
    }
    mouse.visible = true;
    level1();
    timer = 1500;
    timer = timer - frameCount;
    textSize(25);
    stroke("black")
    fill("yellow")
    strokeWeight(2);
    text("TIME: " + timer, 21, 26);
    text("SCORE: " + score, 21, 80);
    if (timer === 0) {
      gameState = "end";
    }

    if (score === 100 ) {
      gameState = "win";
    }
  }
  if (gameState === "win") {
background(w);
  }
  if (gameState === "end") {
    textSize(25);
    stroke("black")
    fill("yellow")
    strokeWeight(2);
    text("TIME: " + timer, 21, 26);
    text("SCORE: " + score, 21, 50);

    textSize(40);
    text("Press R to Restart Game", 704, 453);

if(keyDown("r")){
 location.reload();
}

  }
  drawSprites();
}

function introLevel() {
  image(i, 200, 50, 500,700);

  textSize(50);
  stroke("yellow");

  strokeWeight(5);
  fill("black");
  text("Help the Mouse eat as much cheese as possible", 722, 292);
  textSize(90);
  text("Press Space to Start", 750, 600);

  if (keyDown("space")) {
    gameState = "level1";
  }
}

function level1() {
  if (keyDown(UP_ARROW)) {
    mouse.y -= 10;
  }
  else if (keyDown(DOWN_ARROW)) {
    mouse.y += 10;
  }
  else if (keyDown(LEFT_ARROW)) {
    mouse.x -= 10;
  }
  else if (keyDown(RIGHT_ARROW)) {
    mouse.x += 10;
  }
  for (var i = 0; i < 100; i++) {
    if (mouse.isTouching(c[i])) {
      // c[i].visible = false;
      c[i].destroy();
      score = score + 1;
    }

  }
}

