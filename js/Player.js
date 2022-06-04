class Player{
    constructor(){
        this.name = null;
        this.index = null;
        this.position.x = 0;
        this.position.y = 0;
        this.rank = 0,
        this.score = 0;
        this.life = 185;
}

    addPlayer(){
        var playerindex = "players/player" + this.index;
        if( index === 1){
            this.position.x = width / 2 -100;
        }else{
            this.positin.x = width/2 +100;
        }

        database.ref(playerIndex).set({
            name : this.name,
            positionX: this.position.x,
            positionY: this.position.y,
            score: this.score,
            rank: this.rank
        })  
    }

    getDistance(){
        var playerDistanceRef = database.ref("players/player" + this.index);
        playerDistanceRef.on("value", data =>{
            var data = data.val();
            this.positionX = data.positionX;
            this.positionY = data.positionY;
        });
    }

    getCount(){
        var playerCountRef = database.ref("players/player" + this.index);
        playerCountRef.on("value", data =>{
            var data = data.val();
        })
    }

    updateCount(count){
        database.ref("/").update ({
            playerCount: count
        })
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
            positionX: this.positionX,
            positionY: this.positionY,
            rank: this.rank,
            score: this.score,
            life: this.life
        })
    }


    static getPlayersInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data =>{
            allPlayers = data.val();
        })
    }

    getPlanesAtEnd(){
        database.ref("getPlanesAtEnd").on("value", data =>{
            this.rank = data.val();
        })
    }

    static updatePlanesAtEnd(rank){
        database.ref("/").update({
           planesAtEnd: rank 
        })
    }
}