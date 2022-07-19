var start = function() {
    //prompts player for their name
    var getName = function() {
      player.name = prompt("What is your name");
    }
    getName();
  
    //checks if the user has pressed the 'how to play button'
    var ifPlayerName = function() {
      parent = document.getElementById("container");
      child = document.getElementById("start");
      parent.removeChild(child);
    }
    ifPlayerName();
  };
  

  //sets var output to the txt on screen
  var output = function(txt) {
    document.getElementById("game").innerHTML = txt;
  };
  
  add_output = document.getElementById("game");
  
  //holds player locations visited
  var first_ow_visit = 0;
  var unlocked_battle = 0;
  
  //<==== PLAYER INFORMATION START =====>
  var player = {
    name: "Unknown",
    
    location: world,
  
    health: 100,
  
    strength: 2,
  
    gold: 15,
  
    abilities: [],
    
    hasHealth: function () {
      if(this.health < 0){
        this.health = 0;
      }
    }
  };
  
  //<==== PLAYER INFORMATION END =====>

  

//<==== ENEMY INFORMATION START =====>
  enemies = [
    {
      id: 0,
      name: "Giant Spider",
      
      health: 50,
      power: 4,
        
      gold: 30,
      strength: 1,
      
      speech: "Screeeee!"
    }
  ];
  //<==== ENEMY INFORMATION END =====>


  
  //STATS button
  displayStats = function() {
    clearGameWindow();
    var hold = [];
    for (var i = 0; i < player.abilities.length; i++) {
      hold.push(" " + player.abilities[i].name)
    };
  
    output(
      "Name: " + player.name + "<br/>" +
      "Strength: " + player.strength + "<br>" +
      "gold: " + player.gold + "<br>" +
      "Health: " + player.health + "<br />"+
      "Abilities: " + hold
    );
  };
  
  //clears text from game
  var clearGameWindow = function() {
    document.getElementById("game").innerHTML = "";
  };
  

  


  //<===== world START ======>
  var world = function() {
    //clears the game screen upon visit
    var newGame = function() {
      add_output.innerHTML = "";
    }
    newGame();

  
    //displays default header text upon visit
    var intro = function() {
      add_output.innerHTML += "<br/>"
      add_output.innerHTML += "You wake up deep inside the woods around mid day, head throbbing, vision coming back into focus. 'Where am I?' you ask yourself. <br/>";
      add_output.innerHTML += "You check you body for injuries. You don't find anything wrong but find an odd watch attached to your wrist. When you press it a  <br/>";
      add_output.innerHTML += "Holographic menu shows up that say 'SHOP'. 'I don't know what this is but ill check it out later' you think to yourself.<br/>";
      add_output.innerHTML += "Now you take a moment to look at your surroundings. You are surrounded by a thick tree line but have a clear path infront of you.<br/>";
      add_output.innerHTML += "What do you do? <br/>";
      add_output.innerHTML += "<br/>";
    }
    intro();
  
  
  };
  //<===== world ======>



  document.getElementById('game').style.overflow = 'hidden';