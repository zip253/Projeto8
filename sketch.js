//Estados de Jogo
var PLAY=1;
var END=0;
var estado=1;

var faca,fruta ,monstro,frutaG,monstroG, pontos,r,randomFruit, posicao;
var imgfaca , fruta1, fruta2 ,fruta3,fruta4, imgmonstro, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  imgfaca = loadImage("knife.png");
  imgmonstro = loadAnimation("alien1.png","alien2.png")
  fruta1 = loadImage("fruit1.png");
  fruta2 = loadImage("fruit2.png");
  fruta3 = loadImage("fruit3.png");
  fruta4 = loadImage("fruit4.png");
  gameOverImage = loadImage("fimdeJogo.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //criando espada
   faca=createSprite(40,200,20,20);
   faca.addImage(imgfaca);
   faca.scale=0.7
  
  
  
  //definir colisor para espada
  faca.setCollider("rectangle",0,0,40,40);

  //Variáveis de pontuação e Grupos
  pontos=0;
  frutaG=createGroup();
  monstroG=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(estado===PLAY){
    
    //Chamar função de frutas e função de monstro
    fruits();
    Monster();
    
    //mover espada com o mouse
    faca.y=World.mouseY;
    faca.x=World.mouseX;
  
    //Aumenta a pontuação se a espada tocar na fruta
    if(frutaG.isTouching(faca)){
      frutaG.destroyEach();
      knifeSwooshSound.play();
      pontos=pontos+2;
      
    }
    else
    {
      //Vá para o estado final se a espada tocar o inimigo
      if(monstroG.isTouching(faca)){
        estado=END;
        //som de fim de jogo/gameover
        gameOverSound.play()
        
        frutaG.destroyEach();
        monstroG.destroyEach();
        frutaG.setVelocityXEach(0);
        monstroG.setVelocityXEach(0);
        
        //Mude a animação da espada para fim de jogo e redefina sua posição
        faca.addImage(gameOverImage);
        faca.scale=1;
        faca.x=300;
        faca.y=300;
      }
    }
  }
  
  drawSprites();
  //exibir pontuação
  textSize(25);
  text("Pontuação: "+ pontos,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monstro=createSprite(400,200,20,20);
    monstro.addAnimation("moving", imgmonstro);
    monstro.y=Math.round(random(100,550));
    monstro.velocityX=-(8+(pontos/10));
    monstro.setLifetime=50;
    
    monstroG.add(monstro);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruta=createSprite(400,200,20,20);
    fruta.x = 0    
  //aumentar a velocidade das frutas após a pontuação 4 

      fruta.velocityX= (7+(pontos/4));

     
    fruta.scale=0.2;
     //futa.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruta.addImage(fruta1);
    } else if (r == 2) {
      fruta.addImage(fruta2);
    } else if (r == 3) {
      fruta.addImage(fruta3);
    } else {
      fruta.addImage(fruta4);
    }
    
    fruta.y=Math.round(random(50,550));
   
    
    fruta.setLifetime=100;
    
    frutaG.add(fruta);
  }
}
