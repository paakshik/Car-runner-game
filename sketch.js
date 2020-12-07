var gameState = "MENU";
var lives = 3;
var score = 0;
var survivalTime = 0;
var choser;
function preload(){
    re = loadImage("hiclipart.com (1).png");
    mouse = loadImage("nn.png");
    road = loadImage("download (1).png");
    card = loadImage("clipart268510.png");
    ob1 = loadImage("download (2).png");
    ob2 = loadImage("download (3).png");
    ob3 = loadImage("download (4).png");
    ob4 = loadImage("download (5).png");
    coins  = loadImage("hiclipart.com (2).png");
    res = loadImage("restart.png");
    broke = loadImage("download (6).png");
    bo = loadImage("download (7).png");
    b = loadImage("948f455fed8952d83884dd3dd10c8158.jpg")
}
function setup(){
createCanvas(400,400);
button1 = createSprite(200,200);
button1.addImage(re);
button1.scale = 0.5;

back = createSprite(200,150,300,400);
back.addImage(road);
back.rotation = 90;
back.scale = 5.2;
back.visible = 0;
surfer  = createSprite(120,360);
surfer.visible = 0; 
surfer.addImage(card);
surfer.scale = 0.06;
surfer.rotation = 270;
carG = new Group();
coinG = new Group();
button2 = createSprite(200,200);
button2.addImage(res);
button2.scale = 0.5;
button2.visible = 0;

cusor = createSprite(200,200);
    cusor.addImage(mouse)
    cusor.scale = 0.03;
cum = createSprite(200,200);
cum.addImage(mouse);
cum.scale = 0.03;
cum.visible = 0;

if (!localStorage["HS"]){
    localStorage["HS"] = 0;  
}
if (!localStorage["HT"]){
    localStorage["HT"] = 0;  
}
}
function draw(){
    background(255)
  if (gameState === "MENU"){
      imageMode(CENTER);
      image(b,200,200,400,400)
       cusor.x = mouseX;
    cusor.y = mouseY  
    if (cusor.isTouching(button1)){
          gameState = "PLAY";
          button1.destroy();
          cusor.destroy();
gameState = "PLAY";
      }
     
    }

    if (gameState === "PLAY"){
        
        imageMode(CENTER);
      image(bo,200,200,400,400);
        survivalTime = survivalTime+ abs(Math.round(getFrameRate()/40));
        back.visible = 1;
        surfer.visible = 1;
        if (surfer.x < 100){
            surfer.x = 100;
            surfer.velocityX = 0;
          
        }
        if (surfer.x > 295){
            surfer.x = 295;
            surfer.velocityX = 0;
       
        }
        if (keyDown(RIGHT_ARROW)){
            surfer.x = surfer.x + 30;
        }
        if (keyDown(LEFT_ARROW)){
            surfer.x = surfer.x - 30;
      }
      choser = floor(random(1,4));
      if (World.frameCount % 200 === 0){
         car = createSprite(random(120,290),10,50,50);
         car.velocityY = 2; 
         carG.add(car);
        car.rotation = 180;
        switch(choser){
case 1:car.addImage(ob1);
break;
case 2:car.addImage(ob2);
break;
case 3:car.addImage(ob3);
break;
case 4:car.addImage(ob4);
break;
}
}

if (World.frameCount % 300 === 0){
        coin = createSprite(random(120,290),10,10,10);
        coin.velocityY = 2; 
        coinG.add(coin);
        coin.addImage(coins)
        coin.scale = 0.3;
}
        if (carG.isTouching(surfer)){
            lives = lives - 1;
           
            if (lives > 0){
                carG.destroyEach();
            }
            if (lives === 1){
surfer.addImage(broke);
surfer.scale =1.4;
surfer.rotation = 5;
            }
           if (lives === 0){
            
            button2.visible = 1;
           
           

           gameState = "END";
           }
            
            }
    
    if (coinG.isTouching(surfer)){
        coinG.destroyEach();
        score = score + 1;
    }
    fill("blue");
     
}
    if (gameState === "END"){
        imageMode(CENTER);
        image(bo,200,200,400,400);
        coinG.setVelocityEach(0,0);
           coinG.setLifetimeEach(-300)
           carG.setVelocityEach(0,0);
           carG.setLifetimeEach(-300);
        cum.x = mouseX;
        cum.y = mouseY;
        cum.visible = 1;
        if (localStorage["HS"]> score){
            localStorage["HS"] = score;
        }
        if (localStorage["HT"]> survivalTime){
            localStorage["HT"]> survivalTime;
        }
        if (cum.isTouching(button2)){
            gameState= "PLAY";
            print("JOKER");
            button2.visible = 0;
            cum.visible = 0;
            surfer.addImage(card);
            surfer.scale = 0.06;
            surfer.rotation = 270;
            carG.destroyEach();
            coinG.destroyEach();
            lives = 3;
            score = 0;
        }
        
    }
    drawSprites();
}
 





