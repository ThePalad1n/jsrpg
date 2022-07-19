  // <================== SHOP FUNCTIONS ======================>
  
  //displays shop button
  theShop = function() {
  
    if (first_ow_visit == 1) {
      document.getElementById("shopButton").style.display = "inline-block";
      first_ow_visit += 1;
    
  
    clearGameWindow();
  
    output("While walking through the oveworld you find a sturdy tavern in the middle of a overgrown forest <br/>" +
      "strange...");
  
    add_output.innerHTML += "<br><br>~UPDATE~";
  
    add_output.innerHTML += ("<br><br> You unlocked the Shop!");
    }
  
  };
  
  // <================== SHOP FUNCTIONS ======================>
  
  var shop = function () {
    //sets player location to shop
    if(player.location != "theShop"){
      player.location = 'theShop';
    }
    
    //if player location is set to 'shop'  
    console.log(player.location);
    
    var shop = document.getElementById("game");
    var clearShop = function () {shop.innerHTML = "";}
    clearShop();
    
    if(player.location === "theShop"){
      var shop = document.getElementById("game");
      var abilities = abilityList;
          
      //display gold
      shop.innerHTML += "<div id ='shopgold'>gold: "+player.gold+"</div><br />";
      
      
      //display each ability available
      for(var x in abilities){
        console.log(player.abilities[x]);
          if(player.abilities[x] == undefined){
          shop.innerHTML += "   <button onclick='purchase("+x+")'style='padding: 0.3em; font-size: 80%; font-family: Monospace;'>"+abilities[x].name+"<br/> Damage: "+abilities[x].power+"<br/>Cost: "+abilities[x].cost+"</button>";
          }
        
      }
      
      
      //make this here so it appears after the ability list
      game.innerHTML += "<br /><div style='font-size: 80%;' id = 'warning'></div>";
      game.innerHTML += "<br /><div style='color: lime;' id='allGood'></div>";
      
      //if player selects an ability -> this runs and if player owns it then it displays results
      purchase = function (id) {
        var warning = document.getElementById('warning');
        var allGood = document.getElementById('allGood');
        var shopgold = document.getElementById('shopgold');
        //if player owns more than 1 ability - check and see if player already owns the ability
    
        checkIfOwned = function () {
          for(var x in player.abilities){
            if(player.abilities[x].id == abilityList[id].id){
              //break is here so console doesn't log (can't property undefined);
              return false;
              break;
            }
          }
          return true;
        };
        checkgold = function () {
          if(player.gold < abilityList[id].cost){
            return false;
          }
          return true;
        }
        
        
        if(!checkIfOwned()){
          warning.innerHTML = "Sorry, you already own " + abilityList[id].name;
          allGood.innerHTML = "";
          
        } else if (!checkgold()) {
          warning.innerHTML = "Sorry you don't have enough gold to purchase " + abilityList[id].name;
          allGood.innerHTML = "";
        }
        else {
          //displays green text
          allGood.innerHTML = "You purchased " + abilityList[id].name
          //player.gold - ability cost
          player.gold -= abilityList[id].cost;   
          //gold updates
          shopgold.innerHTML = "gold : " + player.gold;
          //ability bought will push to player abilities
          player.abilities.push(abilityList[id]);
        }
        
        
      }
      
      //creates health Div and everything health display goes here
      var displayHealthShop = function () {
        game.innerHTML += "<div id = 'healthUpdate'>Health: " + player.health + "</div>";
        game.innerHTML += "<br /><div id = 'healShop'></div>";
        var healthDiv = document.getElementById('healShop');
             
        healthDiv.innerHTML += "<button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(25, 5)'>Heal: 25 Health<br />Cost: 5 gold</button>";
        
        healthDiv.innerHTML += "   <button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(50, 10)'>Heal: 50 Health<br />Cost: 10 gold</button>";
        
        healthDiv.innerHTML += "   <button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(100, 30)'>Heal: 100 Health<br />Cost: 30 gold</button>";
        
           if(player.health >= 100){
          document.getElementById('healShop').style.display = "none";
        }
        
      }
      displayHealthShop();
      
      
      
      
    }
    
    //buy health
    buyHealth = function (health, cost) {
        //check if player has max health, or no health
      //located if(player.location === 'theshop')--> first (if);
      
      //so many IF statements :'( just lazy r/n
      
      //if gold and doesn't exceed health -> runs
      if((player.health+health) <= 100 && player.gold >= cost){
        
        player.health += health;
        player.gold -= cost;
        
        
        document.getElementById('allGood').innerHTML = "Health +" + health;
        document.getElementById('healthUpdate').innerHTML = "Health: " + player.health;
        
      }
      //if player has less gold or health
      else {
        //less gold
        if(player.gold < cost){
          document.getElementById('warning').style.color = 'red';
        document.getElementById('warning').innerHTML = "<br />gold: " + player.gold + " - purchase something less than " + cost + " gold...";
        } 
        //less health
        else{
        document.getElementById('warning').style.color = 'red';
        document.getElementById('warning').innerHTML = "<br />Health: " + player.health + " - purchase something less than " + health + " health...";
        }
      }
      
      }
    
  };
  
  // <================== SHOP FUNCTIONS ======================>



    // <================== ABILITIES START ==================>
    var Ability = function(id, name, type, power, stamina_cost, cost, text) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.power = power;
        this.cost = cost;
        this.text = text; 
        
        this.checkStamina = function () {
          if(player.stamina < this.stamina_cost){
            console.log("Sorry you don't have enough power to use this!");
            this.power = 0;
          };
        }
      };
      
      abilityList = [
      //(ID, name, type, power, stamina_cost, cost, text)
      new Ability(0, "Stick", "item", 8, 3, 15, "You swung your stick!"),
        ];
      // <================== ABILITIES END ==================>