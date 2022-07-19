  //<========= BATTLE FUNCTIONS ===============>
  
  var battle = function (enemyID) {
    //checks player if they have less than 1 health, if so health = 0;
    player.hasHealth();
  
    var gameScreen = document.getElementById("game");
    gameScreen.innerHTML = "";
        
    //if user is in Battle
    if(player.inBattle && enemyID != undefined){
        
        userInBattle(enemyID);
        
    } 
    
    
    //USER IN BATTLE
    userInBattle = function(enemyID){
        var gameScreen = document.getElementById("game");
        var enemy = enemies[enemyID];
        
        
        //creates battle screen;
        var displayBattleScreen = function () {
            gameScreen.innerHTML += "_BATTLE MODE_";
            gameScreen.innerHTML += "<div 'abilitiesAvailable'></div>";
        }
        displayBattleScreen();
        
        //display enemy information
        var displayEnemy = function (id) {
            gameScreen.innerHTML += "<br /><br />Fighting: " + enemy.name;
            gameScreen.innerHTML += "<br /><br /><div id = 'enemyHealthBar'></div>";
            gameScreen.innerHTML += "<div id = 'enemyHealth'></div>";
            gameScreen.innerHTML += "<br /> \"" + enemy.speech +"\"";
            
        }
        displayEnemy(enemyID);
        
        //display player information
        var displayPlayerInfo = function () {
            
            var createPlayerHealthBar = function (){
                gameScreen.innerHTML += "<div id = 'playerHealthBar'></div>";
                gameScreen.innerHTML += "player health";
                healthBar = document.getElementById("playerHealthBar");
                if(player.health > 0){
                healthBar.style.width = player.health+'%';
                } else {
                healthBar.style.width = 1 + '%';
                }
                healthBar.style.height = 2+'%';
                healthBar.style.borderRadius = '15px 15px'
                
                healthBar.style.margin = 'auto'
                
                healthBar.style.backgroundColor = 'lime';
                
                healthBar.style.display = 'block';
                
            }
            createPlayerHealthBar();
            
            
        };
        displayPlayerInfo();
        
        //creates [abilities buttons]
        var displayAbilitiesAvailable = function(){
        gameScreen = document.getElementById("game");
        gameScreen.innerHTML += "<br />";
          //creates enemy HealthBar here.... idk why
          var createEnemyHealthBar = function (){
            var enemyHealthBar = document.getElementById('enemyHealthBar');

            enemyHealthBar.style.height = 2+'%';
            enemyHealthBar.style.borderRadius = '15px 15px'

            enemyHealthBar.style.margin = 'auto'

            enemyHealthBar.style.backgroundColor = 'red';

            enemyHealthBar.style.display = 'block';
          }
          createEnemyHealthBar();

        for(var x in player.abilities){
            gameScreen.innerHTML += "  <button style = 'padding: 1em;' onClick = 'updateBattleInformation("+player.abilities[x].id+")'>"+player.abilities[x].name+"<br />Attack Damage: "+player.abilities[x].power+"</button>";
        }

        };
        displayAbilitiesAvailable();
        
        healthBar = {
            length: 50,
        }
        
        currentEnemyInfo = {
            health: enemies[enemyID].health,
            max_health: enemies[enemyID].health,
            power: enemies[enemyID].strength,
            
            gold: enemies[enemyID].gold,
            strength: enemies[enemyID].strength
        }
        
        //[ability buttons] -> gets the ability information;
        updateBattleInformation = function(abilityID){

            var playerDamage = abilityList[abilityID].power*(player.strength/10);
            var playerHealth = player.health;
            var max_health = currentEnemyInfo.max_health;

            
            var enemyHealth = currentEnemyInfo.health;
            var enemyPower = currentEnemyInfo.power;
            
            enemyHealth -= playerDamage; //updated enemy health
            
            playerHealth -= enemyPower; //updated player health
          
  
            
            //if ENEMY or PLAYER hit 0 health
            if(enemyHealth <= 0){
                playerWin(currentEnemyInfo.gold, currentEnemyInfo.strength);
            } 
            else if (playerHealth <= 0){
                player.health = 0;
                playerLost();
            }
            
            
             //<------ ENEMY HEALTH BAR UPDATES -------->
            if(document.getElementById("enemyHealthBar")){
                         document.getElementById("enemyHealthBar").style.maxWidth = '100%';
            document.getElementById("enemyHealthBar").style.width = (enemyHealth/max_health)*100 + "%";
            }
            
            //<------ ENEMY HEALTH BAR UPDATES -------->
            
            
            currentEnemyInfo.health -= playerDamage;
            player.health = playerHealth;

            
            //<------ PLAYER HEALTH BAR UPDATES -------->
            if(playerHealth >= 0 && document.getElementById('playerHealthBar')){
            if(playerHealth){
            document.getElementById('playerHealthBar').style.width = player.health + '%';
            } else{
            document.getElementById('playerHealthBar').style.width = 1 + '%';
            }
            }
            //<------ PLAYER HEALTH BAR UPDATES -------->

        }
        
    }
    
    
    //player Win
    
    var playerWin = function (gold, strength) {
        document.getElementById("game").innerHTML = "Congratulations you won! <br /> gold: " + gold + " - strength: " + strength;
        document.getElementById("game").innerHTML += "<br /> <button style='padding: 2em;' onClick = 'battle()'>Return</button>";

   
        player.gold += gold;
        player.strength += strength;
        
        player.inBattle = false;
    };
    
    //player Lost
    var playerLost = function () {
        gameScreen = "";
      
        document.getElementById("game").innerHTML = "You lost...";
        document.getElementById("game").innerHTML += "<br/ ><button style ='padding: 1em;' onClick = 'battle()'>Return</button>";
        
        player.inBattle =false;
        console.log("You lost");
    }

}

//<========= BATTLE FUNCTIONS ===============>