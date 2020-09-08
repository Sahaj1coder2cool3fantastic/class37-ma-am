class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
      car1 = createSprite(100,200);
      car2 = createSprite(300,200);
      car3 = createSprite(500,200);
      car4 = createSprite(700,200);
      //store all the cars in the cars array
      cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of array
      var index = 0;
      //x and y are the positions of the cars
      var x = 0,y;

      for(var plr in allPlayers){
        //adding 1 for every players
        index = index +1;
        //car should be placed at a distance of 200 from each other in the x direction
        x = x+200;
        //get the data from the database to place the car in the y direction
        y = displayHeight-allPlayers[plr].distance;
        //place the cars at the x and y positions for the active player
        //if player is player1, index is 1 but car 1 is 0 at index in the car's array so we use index-1
        cars[index-1].x = x;
        cars[index-1].y = y;
        //finding the active player
        if (index === player.index){
          //make the active car player red
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          //assign the active player's y position of the car to the camera position y so that it can move along with car
          camera.position.y = cars[index-1].y;
        }


      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}
