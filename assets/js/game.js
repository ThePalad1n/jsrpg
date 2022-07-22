import Character from "./player.js";
import Enemy from "./enemies.js";
import Item from "./items.js";
import {getRandomInt, removeElementsByClass, makeButton} from "./support.js";

export {gameText}
// player
const mc = new Character('Player', 100, 5, 10)

// item list
const stick = new Item('Stick', 0, 5, 1)

// starting variables
let startbtn = document.getElementById('startbtn');
let gameText = document.getElementById("story");
// story text and initial starting text
let text = document.createTextNode("Wake up in woods, headache, there is a forest and a path");
let options = document.getElementById('options')
let actions = document.getElementById('actions')




//========Templates begin===============
// options template
const optionCmds = elementFromHtml(`
<div id="story">
    <p id="game-text" class="story-text"></p>
    </div>
<br>
<br>
<div id="options">

</div>

`);

// actions template for combat sequence
const actionCmds = elementFromHtml(`
<div id="actions" class="act">
<input class="act" id='action1' type="submit" value='Attack'></input>
<input class="act" id='action2' type="submit" value='Evade'></input>
<input class="act" id='action3' type="submit" value='Flee'></input>
</div>
`);


//========Templates end===============






//========Starting menus begin===============

// initial starting menu
function mainMenu() {
    document.body.appendChild(optionCmds)
    options.style.display = 'none';
    actions.style.display = 'none';
}

// new game after first play through
function newGame() {
    text.textContent = "Welcome back to the Journey. Press start to begin.";
    // choices
    var a = document.createElement('optionA')
    a.innerText = "Play Again"
    a.classList.add('btn')
    a.onclick = function () {
        removeElementsByClass('btn')
        startGame();
    }
    gameText.append(text, a);
}

// removes initial starting menu
startbtn.onclick = function () {
    document.getElementById('startMenu').remove();
    startGame()
};

//========Starting menus end===============




// ========Area 1 begin===========

// first area of the game
function startGame() { // optionA
    gameText.append(text);
    makeButton('a', 'Explore the forest')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        areaOneForest();
    }
    makeButton('b', 'Follow the path')
    optionb.onclick = function () {
        removeElementsByClass('btn')
        areaOnePath();
    }
    makeButton('c', 'Lay down')
    optionc.onclick = function () {
        removeElementsByClass('btn')
        areaOneLay();
    }
}


//player decides to rest
function areaOneLay() {
    // Story
    text.textContent = "You take a short rest and notice your headache is gone.\n What will you do?";
    gameText.append(text);
    // choices
    makeButton('a', 'Explore the forest')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        areaOneForest();
    }
    makeButton('b', 'Follow the path')
    optionb.onclick = function () {
        removeElementsByClass('btn')
        areaOnePath();
    }
}


// player goes in forest
function areaOneForest() {
    text.textContent = "Hear a noise \n What will you do?";
    gameText.append(text);
    // choices
    makeButton('a', 'Run')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        areaOneClearing();
    }
    makeButton('b', 'Investigate')
    optionb.onclick = function () {
        removeElementsByClass('btn')
        text.textContent = "Gotcha bitch, spider kills u ";
        gameText.append(text);
        makeButton('ded', 'Accept Fate')
        optionded.onclick = function () {
            removeElementsByClass('btn')
            id = 1;
            death(1);
        }
    }
}

// Player runs out of woods away from noise
function areaOneClearing() {
    // Story
    text.textContent = "Run through forest trip. noise gets closer and closer \n What will you do?";
    gameText.append(text);
    // choices
    makeButton('a', 'Fight')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        areaOneFight();
    }
    makeButton('b', 'Investigate')
    optionb.onclick = function () {
        alert("You found a new weapon: Stick\n Attack Power increased by 5")
        mc.atk += stick.atk
        removeElementsByClass('btn')
        areaOneFight();
    }
    makeButton('c', 'Hide')
    optionc.onclick = function () {
        removeElementsByClass('btn')
        text.textContent = "Try to hide you but omg spider finds you and eats you";
        gameText.append(text);
        makeButton('ded', 'Accept Fate')
        optionded.onclick = function () {
            removeElementsByClass('btn')
            id = 2;
            death(2);
        }
    }
}


// player defeats the spider
function areaOneSpiderDefeatedA() { 
    text.textContent = "You successfully defeated the spider!";
    // choices
    gameText.append(text);
    makeButton('a', 'Go down the path')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        areaOnePath();
    }
    makeButton('b', 'Rest for a bit')
    optionb.onclick = function () {
        removeElementsByClass('btn')
        areaOneRest();
    }
}


// player decides to rest after combat
function areaOneRest() { // Story
    text.textContent = "You recovered from your fight with the spider.";
    gameText.append(text);
    alert("You now have full health.")
    mc.hp = 100;
    // choices
    makeButton('a', 'Go down the path')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        areaOnePath();
    }
}

// player finishes the first area and continues on their journey
function areaOnePath() {
    text.textContent = 'end area one';
    gameText.append(text);
    makeButton('a', 'Go down the path')
    optiona.onclick = function () {
        removeElementsByClass('btn')
        newGame();
    }
}
// ========Area 1 end===========





// ========A1 Spider Fight begin===========
function areaOneFight() {
    const spider = new Enemy('Gaint Spider', 25, 8, 10, 50)
    console.log(spider)
    console.log("Starting fight")
    text.textContent = "The Spider Attacks \n What will you do?";
    document.body.appendChild(actionCmds)

    // attack
    const attack = document.getElementById('action1')
    attack.onclick = function () { // player attacks enemy
        spider.hp = spider.hp - mc.atk
        console.log("You did")
        console.log(mc.atk)
        console.log("damage\n")
        console.log("The spider now has")
        console.log(spider.hp)
        console.log("health\n")
        // enemy attacks player
        mc.hp = mc.hp - spider.atk
        console.log("Spider did")
        console.log(spider.atk)
        console.log("damage\n")
        console.log("The player now has")
        console.log(mc.hp)
        console.log("health\n")
        if (mc.hp <= 0) { // end loop
            id = 3;
            death(3);
        }
        if (spider.hp <= 0) {
            removeElementsByClass('act')
            mc.gp += spider.gp
            areaOneSpiderDefeatedA()
        }

    }
    // //evade
    const evade = document.getElementById('action2')
    evade.onclick = function () { // player evades - evasion is number out of 100 for dodging
        var r = getRandomInt(100)
        if (r <= spider.evade) {
            console.log("You evaded successfully")
            mc.hp = mc.hp - 0
        } else { // enemy attacks player
            console.log("You evaded unsuccessfully")
            mc.hp = mc.hp - spider.atk
            console.log("Spider did")
            console.log(spider.atk)
            console.log("damage\n")
            console.log("The player now has")
            console.log(mc.hp)
            console.log("health\n")
            if (mc.hp <= 0) { // end loop
                id = 3;
                death(3);

            }
        }
    }
    // //flee
    const flee = document.getElementById('action3')
    flee.onclick = function () { // player run - evasion is number out of 20 for dodging
        var q = getRandomInt(20)
        if (q == 20) {
            console.log("You escaped")
            spider.hp = 0;
        } else { // enemy attacks player
            console.log("You couldn't escape")
            mc.hp = mc.hp - spider.atk
            console.log("Spider did")
            console.log(spider.atk)
            console.log("damage\n")
            console.log("The player now has")
            console.log(mc.hp)
            console.log("health\n")
            if (mc.hp <= 0) { // end loop
                id = 3;
                death(3);

            }
        }
    }

}
// ========A1 Spider Fight end===========







// =========GAME OVER begin=============

function death(id) {
    switch (id) { // hide death
        case 1: gameOver()
            break;
        case 2: gameOver()
            break;
        case 3: gameOver()
            break;
        default:
            // code block
    }
}


function gameOver() {
    text.textContent = "GAME OVER YOU HAVE DIED";
    // choices
    var a = document.createElement('optionA')
    a.innerText = "Return to menu"
    a.classList.add('btn')
    a.onclick = function () {
        removeElementsByClass('btn')
        newGame();
    }
    gameText.append(text, a);
}

// =========GAME OVER end=============


mainMenu();
