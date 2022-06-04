class Game{
    constructor(){
        this.resetButton = createButton("RESET");
        this.resetTitle = createElement("RESET");

        this.leaderboardTitle = createElement("h2");

        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        
    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(start){
        database.ref("/").update({
            gameState: state
        })
    }

    start(){
        player = new Player();
        playerCount = player.getCount();

        form = new form();
        form.display();

        plane1 = createSprite(100, 157, 20, 20);
        plane1.addImage(plane1Img);
        plane1.scale = 0.8;
        
      
        plane2 = createSprite(100, 301,20,20);
        plane2.addImage(plane2Img);
        plane2.scale = 0.27;
      
        planes = [plane1, plane2];

        drawSprites()

        obstacles = new Group();

        /*var obstaclesPosition[{}
            {}
        }*/
        this.addSprites(obstacles, obtaclesPosition, bird1Img, bird2Img, 0.5, obstaclesPosition );

       
    }

    addSprites(spritesGroup, numberOfSprites, spriteImage, scale, positions = []){
        for(var i = 0; i < numberOfSprites; i++){
            var x,y;y

            if(positions.length > 0){
                x = position[i].x;
                y = position[i].y;
                spriteImage = position[i].image;
            }else{
                x = random(1,10);
                y = random(1,10);
            }
       var sprite = createSprite(x,y);
       sprite.addImage("sprite", spriteImage);

       sprite.scale = scale;
       spriteGroup.add(sprite);

        
        }

    }

    handleElements(){
        form.hide;
        form.titleImg.position();
        form.titleImg.class("gameTitleAfterEffect");

        this.resetTitle.html("RESET GAME");
        this.resetTitle.class("resetText");
        this.resetTitle.position();

        this.resetButton.class("resetButton");
        this.resetButton.position();

        this.leaderboardTitle.hmtl("LEADEBOARD");
        this.leaderboardTitle.class("resetText");
        this.leaderboardTitle.position();

        this.leader1.class("leadersText");
        this.leader1.position();

        this.leader2.class("leadersText");
        this.leader2.position();
    }

    play(){
        this.handleElements();
        this.handleResetButton();

        Player.getPlayersInfo();
        player.getPlanesAtEnd();

        if(allPlayer !== undefined){
            //image(sky, );

            this.showLife();

            var index = 0;
            for(var plr in allPlayers){
                index = index + 1;

                var x = allPlayers[plr].positionX;
                var y = height - allPlayers[plr].positionY;
                var currentLife = allPlayers[plr].life;
                if(currentLife < 0){
                    planes[index-1].changeImage("");
                    planes[index-1].scale = 0.5;
                }

                planes[index-1].position.x = x;
                planes[index-1].position.y = y;

                if(index === player.index){
                    stroke(10);
                    fill("green");
                    ellipse(x, y, 50, 50);

                   if(player.life <= 0){
                       this.playerMoving = false;
                    } 
                camera.position.x = planes[index - 1].position.x;
                
                
                }


            }

            if(this.playerMoving){
                player.positionX += 3;
                player.update();
            }

            this.handlePlayerControls();

            //const finishLine = ;

            if(player.positionX > finsihline){
                gameState = 2;
                player.rank += 1;
                Player.updatePlanesAtEnd();
                player.update();
                this.showRank();
            }
            
            
            
        }
    }

    handleResetButton(){
        this.resetButton.mousePressed(() =>{
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                player: {},
                planesAtTheEnd: 0
            });
            window.location.reload();   
        });
    }
    showLife() {
        push();
        image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
        fill("#CB12177");
        rect(width / 2 - 100, height - player.positionY - 400, player.life, 20);
        noStroke();
        pop();
      }
      showLeaderboard() {
        var leader1, leader2;
        var players = Object.values(allPlayers);
        if (
          (players[0].rank === 0 && players[1].rank === 0) ||
          players[0].rank === 1
        ) {
        
          leader1 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
    
          leader2 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
        }
    
        if (players[1].rank === 1) {
          leader1 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
    
          leader2 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
        }
    
        this.leader1.html(leader1);
        this.leader2.html(leader2);
      }
    
      handlePlayerControls() {
        if(!this.blast){
        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
    
        if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          this.leftKeyActive = true;
          player.positionX -= 5;
          player.update();
        }
    
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
          this.leftKeyActive = false;
          player.positionX += 5;
          player.update();
        }}
      }
    
   
    
      handleObstacleCollision(index) {
        if (planes[index - 1].collide(obstacles)) {
          if (this.leftKeyActive) {
            player.positionX += 100;
          } else {
            player.positionX -= 100;
          }
    
          
          if (player.life > 0) {
            player.life -= 185 / 3;
          }
    
          player.update();
        }
      }
    
      showRank() {
        swal({
          title: `AWESOME!${"\n"}Rank${"\n"}${player.rank}`,
          text: "YOU DID IT",
          imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        });
      }
    
      gameOver() {
        swal({
          title: `Game Over`,
          text: "Not your best race....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
      handleCarsCollision(index){
        if(index === 1){
          if(planes[index-1].collide(planes[1])){
            if(this.leftKeyActive){
              player.positionX += 100;
              
            }else{
              player.positionX -= 100;
            }
            if(player.life > 0){
              player.life = 0;
            }
            player.update();
          }
        }
        if(index === 2){
          if(planes[index-1].collide(planes[0])){
            if(this.leftKeyActive){
              player.positionX += 100;
              
            }else{
              player.positionX -= 100;
            }
            if(player.life > 0){
              player.life = 0;
            }
            player.update();
          }
        }
       
      }
      drawSprites()
    }