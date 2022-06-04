class Game {
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("h2");

        this.leaderboardTitle = createElement("h2");

        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        this.playerMoving = false;
        this.leftKeyActive = false;
    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gameSate: state
        });
    }

    start(){
        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();

        plane1 = createSprite(100, 157, 20, 20);
        plane1.addImage(plane1Img);
        plane1.scale = 0.8;
        
      
        plane2 = createSprite(100, 301,20,20);
        plane2.addImage(plane2Img);
        plane2.scale = 0.27;
      
        planes = [plane1, plane2];

        obstacles = new Group();

        var obstaclesPositions = [
            { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
            { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
            { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
            { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
            { x: width / 2, y: height - 2800, image: obstacle2Image },
            { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
            { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
            { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
            { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
            { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
            { x: width / 2, y: height - 5300, image: obstacle1Image },
            { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
          ];

          this.addSprites(obsatcles, obstacle.length, bird1Img, bird2Img, 0.04, obstaclesPositions);

    }

    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y;
    
          
          if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            spriteImage = positions[i].image;
          } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(-height * 4.5, height - 400);
          }
          var sprite = createSprite(x, y);
          sprite.addImage("sprite", spriteImage);
    
          sprite.scale = scale;
          spriteGroup.add(sprite);
        }
      }
    
      handleElements() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");
    
       
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
    
        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 60, 40);
    
        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 50, 80);
    
        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 50, 130);
      }
    
      play() {
        this.handleElements();
        this.handleResetButton();
    
        Player.getPlayersInfo();
        player.getPlanesAtEnd();
    
        if (allPlayers !== undefined) {
          image(track, 0, -height * 5, width, height * 6);
    
          this.showLife();
       
    
          var index = 0;
          for (var plr in allPlayers) {
            
            index = index + 1;
    
            var y = height - allPlayers[plr].positionY;
            var currentLife = allPlayers[plr].life;
            if(currentLife <= 0){
              planes[index -1].changeImage("blast");
              planes[index-1].scale = 0.3;
    
            }
           planes[index - 1].position.x = x;
            planes[index - 1].position.y = y;
    
            if (index === player.index) {
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
    
         
              
              if(player.life <= 0){
                this.blast = true;
                this.playerMoving = false;
              }
          
              camera.position.y = planes[index - 1].position.y;
            }
          }
    
          if (this.playerMoving) {
            player.positionY += 5;
            player.update();
          }
    
        
          this.handlePlayerControls();
    
         
          const finshLine = height * 6 - 100;
    
          if (player.positionY > finshLine) {
            gameState = 2;
            player.rank += 1;
            Player.updatePlanesAtEnd(player.rank);
            player.update();
            this.showRank();
          }
    
          drawSprites();
        }
      }
    
      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
            planesAtEnd: 0
          });
          window.location.reload();
        });
      }
    
      showLife() {
        push();
        image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
        fill("#f50057");
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
    
    
    
    
    
   
    
  
    
      showRank() {
        swal({
          title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
          text: "You reached the finish line successfully",
          imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        });
      }
    
      gameOver() {
        swal({
          title: `Game Over`,
          text: "Oops you lost the race....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }

    }
    




