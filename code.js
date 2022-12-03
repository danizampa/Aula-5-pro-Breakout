var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["f914f2da-edde-4977-9b70-1299fd685dcf"],"propsByKey":{"f914f2da-edde-4977-9b70-1299fd685dcf":{"name":"volleyball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G/category_sports/volleyball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G/category_sports/volleyball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var score=0;

var ball = createSprite(200, 200, 20, 20);
ball.setAnimation("volleyball_1");
ball.scale = 0.05;

ball.velocityX = 0;
ball.velocityY = 0;

var paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor="Gold";

var bricks= createGroup();

createBrickRow(65, "DeepPink");
createBrickRow(94, "Purple");
createBrickRow(123, "Teal");
createBrickRow(152, "ForestGreen");


function createBrickRow(y,color){
for(var c=0; c<6; c++){
  var brick = createSprite(65+54*c,y, 50, 25);
  brick.shapeColor= color;
  bricks.add(brick);
 }
}
createEdgeSprites();

function draw(){
  background("Black");
  
  fill("red");
  textSize(25);
  text("Pontuação: "+score,40, 45);
  paddle.x = World.mouseX;
  
  if(paddle.x < 60){
    paddle.x =60;
  }
  
  if(paddle.x > 340){
    paddle.x =340;
  }
  drawSprites();
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle)){
    playSound( "assets/category_hits/puzzle_game_button_03.mp3");
  }
  if(!bricks[0]){
    ball.velocityX=0;
    ball.velocityY=0;
    text("Parabéns! Você venceu!", 80, 200);
  }
}

function mousePressed(){
  ball.velocityX = 5;
  ball.velocityY = 5;
}

function brickHit(ball,brick){
  playSound( "assets/category_hits/puzzle_game_button_04.mp3");
  brick.remove();
  //brick.destroy();
  score+=5;
  //score= score+5;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
