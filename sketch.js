var balloon, balloonAnimation;
var backgroundImg;
var database, position;

function preload() {
  backgroundImg = loadImage("Images/Hot Air Ballon-01.png");

  balloonAnimation = loadAnimation("Images/Hot Air Ballon-02.png", "Images/Hot Air Ballon-03.png", 
  "Images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(3000, 2000);

  database = firebase.database();

  balloon = createSprite(360, 960, 20, 20);
  balloon.addAnimation("flying", balloonAnimation);
}

function draw() {
  background(backgroundImg);
  
  if (keyDown(LEFT_ARROW)) {
    balloon.x = balloon.x - 10;
    updateHeight(0, -10);
  } else if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x + 10;
    updateHeight(0, 10);
  } else if (keyDown(UP_ARROW)) {
    balloon.y = balloon.y - 10;
    updateHeight(-10, 0);
  } else if (keyDown(DOWN_ARROW)) {
    balloon.y = balloon.y + 10;
    updateHeight(10, 0);
  }

  textSize(50);
  fill("black");
  text("Use Arrow Keys to Move the Balloon", 200, 200);

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);

  drawSprites();
}

function updateHeight (x, y) {
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight (data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError () {
  console.log("Error in writing to the database");
}

function readPosition (data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}