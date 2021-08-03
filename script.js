// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideCircleCircle, color, colorMode, createCanvas, ellipse, height,
 *    mouseX, mouseY, random, rect, stroke, strokeWeight, text, width, createButton, textSize,
 *    textStyle, BOLD, NORMAL, loadAnimation, drawSprites, fill, noFill, animation
 */

let canvas, brushHue, backgroundColor, coinX, coinY, score, gameIsOver, hit;
let restartButton, playerSize = 30
let time = 1000
let resetTime = time
let coinDiameter
let highScore = 0
let coinXVel, coinYVel, velSize


function setup() {
  // Canvas & color settings
  canvas = createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  velSize = 1
  
  
  coinXVel = random(-1,1)
  coinYVel = random(-1,1)
  coinDiameter = 20
  
  // Get random coordinates for the starting position of the coin (coinX, coinY)
  newCoin()
  
  // Initialize time to 1000, and gameIsOver to false
  time = 1000;
  gameIsOver = false;
  score = 0
  
  
  
  restartButton = createButton("Restart")
  restartButton.mousePressed(restartGame)
}

function draw() {
  background(backgroundColor);
  
  text(`Time remaining: ${time}`, 20, 40);
  handleTime()
  
  //animation(coinAnim, 20, 20);
  
  
  
  // Add text with the time remaining: 

  
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  if (hit && !gameIsOver) {
    handleCollision()
    
  }
  
  
  fill('rgb(255,180,0)')
  ellipse(coinX, coinY, coinDiameter);
  ellipse(coinX, coinY, coinDiameter);
  
  fill(100)
  // Draw the cursor at the mouse position
  ellipse(mouseX, mouseY, playerSize);
  
  fill(0)
  text("Score: " + score, 20, 60)
  moveCoin()
  
  
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  newCoin()
  shrinkPlayer()
  time += 15
  score += 1
  coinXVel = random(-1 - velSize, 1 + velSize)
  coinYVel = random(1 - velSize, 1 + velSize)

}

function handleTime() {
  // We'll write code to handle the time.
  if (time > 0) {
    time -= 1
  } else {
    time = 0
    gameIsOver = true
    textSize(30)
    textStyle(BOLD)
    text("Game over!", width/2 - 75, height/2)
    
    
    //reset style for normal text
    textStyle(NORMAL)
    textSize(12)
    showHighScore()
  }
  
}

function restartGame() {
  score = 0
  gameIsOver = false
  time = resetTime
}

function newCoin() {
  coinX = random(coinDiameter/2, width - coinDiameter/2)
  coinY = random(coinDiameter/2, height - coinDiameter/2)
}

function showHighScore() {
  if (score > highScore) {
    highScore = score
  }
  text("High Score: " + highScore, width/2 - 30, height/2 + 30)
}

function shrinkPlayer() {
  if (playerSize > 2) {
    playerSize -= 2
  }
  
}

function moveCoin() {
  if (!gameIsOver) {
    coinX += coinXVel
    coinY += coinYVel
    if (coinX <= coinDiameter/2 || coinX >= width - coinDiameter){
      if (coinXVel < 14) {
        coinXVel *= -1.5
      }
      else {
        coinXVel *= 1
      }
    }
    if (coinY <= coinDiameter/2 || coinY >= height - coinDiameter){
      if (coinYVel < 14) {
        coinYVel *= -1.5
      }
      else {
        coinYVel *= -1
      }
    }
      }

}
/*
function mousePressed() {

  //create a sprite at the mouse position and store it in a temporary variable
  var s = createSprite(mouseX, mouseY, 30, 30);
  //if no image or animation is associated it will be a rectancle of the specified size
  //and a random color

  //now you can use the variable to set properties
  //e.g. a random velocity on the x and y coordinates
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
}
*/