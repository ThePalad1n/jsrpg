/*
Evan Green
07/28/2022
JSRPG

Note:
! = beginning of exclusive funtions or sections for each area
^ = Features to be added
* = seperation of areas
? = used to seperate battle scenes

*/

//!===========================================================================================
//!========= Starting Materials Begin ===========
//Imports
import {mc} from "./player.js";
import {spider,lion,goblin,witch,golem,golemite,golemitea,golemiteb} from "./enemies.js"
import {placeHolderArmor,placeHolderCloak,placeHolderWeapon,placeHolderHelm,stick,lionHide,spear,knife,rockHelm,helmA,keyItemA,stoneA, stickB} from "./items.js";
import {getRandomInt, getRandomInte, makeButton, updateNav, checkLevel, update, addToInventory, restReset, hideRest, unhideRest} from "./support.js";
import {armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA} from "./shop.js"
//Exports
export {
    gameText,mc,playerArmor,playerWeapon,playerCloak,playerHelm,inventory
}
export{gameOver}

//temp vars
var cw = placeHolderWeapon
var ch = placeHolderHelm
var cc = placeHolderCloak
var ca = placeHolderArmor

//Player items
var inventory = []
mc.inventory = inventory
mc.equip = [cw, ch, cc, ca]

// starting variables
let gameText = document.getElementById("story");

//allows creation of multiple buttons in one line
let buttoner = document.createElement('h1').appendChild(document.createElement('h1'));

//game text
let text = document.querySelector("#game-text");
text.textContent = "Welcome to the Journey. Press start to begin."

//player equip items
var playerWeapon = document.getElementById('weapon')
playerWeapon.append(`${
    mc.equip[0].name
}`)
var playerHelm = document.getElementById('helm')
playerHelm.append(`${
    mc.equip[1].name
}`)
var playerCloak = document.getElementById('cloak')
playerCloak.append(`${
    mc.equip[2].name
}`)
var playerArmor = document.getElementById('armor')
playerArmor.append(`${
    mc.equip[3].name
}`)


//!========= Starting Materials End ===========
//!===========================================================================================


//!===========================================================================================
//!========Starting menus begin===============

// initial starting menu
function mainMenu() {
    gameText.append(text);
    buttoner.append(makeButton('a', 'Start Game'))
    optiona.onclick = function () {
        update()
        areaZeroA()
    }
}
//!========Starting menus end===============
//!===========================================================================================

// ************************************************************************************************************************************************************ 

//!===========================================================================================
//!============Act 0 Begin===============

// background story
function areaZeroA() {
    text.textContent = "A large man and his Orange cat, Kitty, once lived on a secluded ranch on the outskirts of the forest.";
    buttoner.append(makeButton('a', 'Next'), makeButton('b', 'Skip Intro'))
    optiona.onclick = function () {
        update()
        areaZeroB();
    }
    optionb.onclick = function(){
        update();
        startGame();
    }

}


// background story
function areaZeroB() {
    text.textContent = "He made a peaceful life for the two of them, living off the land and only having minor encounter with the local wildlife.";
    buttoner.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroC();
    }
}

// background story
function areaZeroC() { 
    text.textContent = "Until one day when the two were celebrating the Kitty's 20th birthday the unthinkable happened...";
    buttoner.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroD();
    }
}

// background story
function areaZeroD() { 
    text.textContent = "As he was returning from the kitchen with the tuna and chicken birthday cake, the door was broken open and the cat was nowhere to be found with muddy footprints a muck";
    buttoner.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroE();
    }
}

// background story
function areaZeroE() { 
    text.textContent = `"KITTY!" he screamed `;
    buttoner.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroF();
    }
}


// background story
function areaZeroF() { 
    text.textContent = `He frantically looked around for and rushed to the door to see if he could find anything outside He looked off in the distance and saw a couple of shadowy figures running off 
    with his beloved pet`;
    buttoner.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroG();
    }
}

// background story
function areaZeroG() { 
    text.textContent = `With no hesitation he ran out the door bringing nothing with him chasing after his beloved animal. "I swear I'll do everything in my power to get you back!" `;
    buttoner.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroH();
    }
}

// background story
function areaZeroH() { 
    text.textContent = `And so our adventure began on his quest to find his beloved animal will he be able to find Kitty in time or will she never be seen again`;
    buttoner.append(makeButton('a', 'Start Your Journey'))
    optiona.onclick = function () {
        update()
        startGame();
    }
}
//!=============Act 0 End====================
//!===========================================================================================

// ************************************************************************************************************************************************************ 

//!===========================================================================================
//!========Area 1 begin===========

// first area of the game
function startGame() {
    text.textContent = (`You enter the forest where you last saw the shadowy figures. What do you want to do?`)
    buttoner.append(makeButton('a', 'Check the forest'), makeButton('b', 'Follow the path'))
    optiona.onclick = function () {
        update()
        //continues to side boss
        areaOneForest();
    }
    optionb.onclick = function () {
        update()
        //continues to act two
        areaTwoPath();
    }
}

// player goes in forest
function areaOneForest() {
    text.textContent = `You begin treking through the woods and the visability gets lower and lower. It becomes so dark with think brush and trees that you are no longer able to see you own hands.
    You stop for a second and hear the sound of branches snapping.`;
    buttoner.append(makeButton('a', 'Run'),makeButton('b', 'Investigate'))
    optiona.onclick = function () {
        update()
        //prefighting scene
        areaOneClearing();
    }
    optionb.onclick = function () {
        update()
        death(1);
        }
    }


// Player runs out of woods away from noise
function areaOneClearing() { 
    text.textContent = `You begin running as fast as you can through the dark woods. You recall the direction you first came from and as you run the visibility increases. Suddenly you stumble 
    over a tree root and trip on the ground. The crunching of branches is getting louder. You heard many foot steps getting closer. You get back on your feet and make it through the clearing.
    The noises are getting closer what do you do?`
    
    buttoner.append(makeButton('a', 'Fight'), makeButton('b', 'Investigate'), makeButton('c', 'Hide'))
    optiona.onclick = function () {
        update()
        areaOneFight();
    }
    optionb.onclick = function () {

        //check to see if current item is better than new
        if(mc.equip[0].atk < stick.atk){
        alert(`You found a stick!\n
        Attack: +${stick.atk}\n
        Item has been equiped and added to your inventory!`
        )
        //equips item to player/nav
        mc.equip[0] = stick

        //adds item to inventory
        mc.inventory.push(stick.name);
        }
        else{
            //strictly adds it to inventory
            alert(`You found a stick!\n
            Item has been added to your inventory!`)
        }
        //chat in player stats with new item
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        //adds item to nav
        addToInventory(stick.tag)
        update()
        areaOneFight();
    }
    optionc.onclick = function () {
        update()
        death(2);
        }
    }


// player defeats the spider
function areaOneSpiderDefeatedA() {
    text.textContent = "You successfully defeated the spider!\n What will you do next?";
    buttoner.append(makeButton('a', 'Go down the path'))
    alert(`Gold Gained: ${
        spider.gp
    }\n Exp Gained: ${
        spider.exp
    }`)
    checkLevel();

    optiona.onclick = function () {
        update()
        areaTwoPath();
    }
}

// player escapes the spider using flee thus no rewards
function areaOneSpiderDefeatedB() {
    text.textContent = "You successfully escaped the spider!";
    buttoner.append(makeButton('a', 'Go down the path'))
    optiona.onclick = function () {
        update()
        areaOnePath();
    }
}


//!===============Area 1 end====================
//!===========================================================================================

//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

//!===========================================================================================
//!===============A1 Spider Fight begin===========
function areaOneFight() {
    hideRest()
    let id = 3
    text.textContent = (`The ${
        spider.name
    } Attacks! \n What will you do?`)

    // attack
    buttoner.append(makeButton('a', 'Attack'), makeButton('b', 'Evade'), makeButton('c', 'Flee'))

    optiona.onclick = function () {
        mc.currenthp = mc.currenthp - getRandomInt(spider.minatk, spider.maxatk)
        spider.hp = spider.hp - getRandomInt(mc.minatk, mc.maxatk)
        updateNav()
        text.textContent = (`You did ${
            getRandomInt(mc.minatk, mc.maxatk)
        } damage! \n The spider now has ${
            spider.hp
        } health.\n\nThe spider attacks back dealing ${
        getRandomInt(spider.minatk, spider.maxatk)
        } damage.\n
        \n What is your next move?`)
        if (spider.hp <= 0) {
            mc.gp += spider.gp
            mc.exp += spider.exp
            update()
            unhideRest()
            areaOneSpiderDefeatedA()
        }
        if (mc.currenthp < 1) {
            update()
            death(id);
        }

    }
    // evade
    optionb.onclick = function () {
        var r = getRandomInte(100)
        if (r <= spider.evade) {
            spider.hp = spider.hp - getRandomInt(mc.minatk, mc.maxatk);
            text.textContent = (`You evaded successfully! And counter for ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! What will you do next?`)
            //^if spider health below zero adv
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp -     getRandomInt(spider.minatk, spider.maxatk)
            text.textContent = (`Your evasion failed.\n The spider attacks you for ${
                    getRandomInt(spider.minatk, spider.maxatk)
            } damage!\n What will you do next?`)
            console.log("You evaded unsuccessfully")
            if (mc.currenthp < 1) {
                update()
                death(id);
            }
        }
    }
    optionc.onclick = function () {
        var q = getRandomInte(20)
        if (q == 19) {
            spider.hp = 0;
            update()
            areaOneSpiderDefeatedB()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(spider.minatk, spider.maxatk)
            text.textContent = (`Your escape failed.\n The spider attacks you for ${getRandomInt(spider.minatk, spider.maxatk)} damage!\n What will you do next?`)
            if (mc.currenthp < 1) { // end loop
                update()
                death(id);
            }
        }


    }


}
//!========A1 Spider Fight end===========
//!===========================================================================================

// ************************************************************************************************************************************************************ 

//!===========================================================================================
//!=========A2 begin=======================
function areaTwoPath() { 
    text.textContent = (`You start heading down the path. You notice that the forest is not as thick as before. And what appears to be a clearing ahead.\n
    You make it to the edge of the forest what would you like to do?`)
    
    makeButton('a', 'Walk out into the clearing')
    optiona.onclick = function () {
        update()
        areaTwoClearing();
    }
    makeButton('b', 'Investigate')
    optionb.onclick = function () {
        update()
        areaTwoInvestigateA();
    }
    restReset()
    alert(`Your rests are now avalible`)
}

// enter the clearing for the first time
function areaTwoClearing() {
    text.textContent = (`You take a look ahead into the clearing you see a savanna with grass about waist high. In the distance straight ahead you can see a small hill, 
    to the left you see the tree line continues to wrap the savanah but becomes scattered later on. And to your right you can see what looks like rock formations.`)
    
    if(witch.hp > 0){
    makeButton('a', 'Follow the tree line to the left.')
    optiona.onclick = function () {
        update()
        areaTwoSwampA();
    }
    }
    if(goblin.hp > 0 || lion.hp > 0){
    makeButton('b', 'Walk out into the clearing towards the hill.')
    optionb.onclick = function () {
        update()
        areaTwoSavannaA();
    }
}
    if(golem.hp > 0){
    makeButton('c', 'Head towards the rock structures.')
    optionc.onclick = function () {
        update()
        areaTwoGolemFight()
        // areaTwoRocksA();
    }
}
}



//!===========================================================================================
//!===============Area 2 INVESTIGATIONS begin=================================
// investigate the clearing
function areaTwoInvestigateA() {
    text.textContent = (`Directly is a savanna with grass about waist high. In the distance straight ahead you can see a small hill which has a small amount of smoke billowing. 
    To the left you see the tree line continues to wrap the savanah but becomes scattered later on, you see a purpulish haze emerging from the trees. And to your right you can 
    see what looks like rock formations, is it moving?.`)
    
    makeButton('a', 'Walk out into the clearing')
    optiona.onclick = function () {
        update()
        areaTwoClearing();
    }
}
//!===============Area 2 INVESTIGATIONS end=================================
//!===========================================================================================


//!===========================================================================================
//!===============Area 2 SAVANNA begin=================================
// heading towards the hill in the distance
function areaTwoSavannaA() {
    text.textContent = (`You walk out into the savanna. There is a nice cross breeze that whisps your face. What would you like to do?`)
    
    makeButton('a', 'Keep walking towards the hill.')
    optiona.onclick = function () {
        update()
        areaTwoSavannaB();
    }
    makeButton('b', 'Go back to the tree line.')
    optionb.onclick = function () {
        update()
        areaTwoClearing();
    }
}



// player gets over the hill
function areaTwoSavannaB() {
    text.textContent = (`You make it to the top of the hill you notice that towards the bottom there is a little hut build along a river that is 
    flowing from right to left. What would you like to do?`)
    
    makeButton('a', 'Investigate the hut')
    optiona.onclick = function () {
        update()
        areaTwoSavannaC();
    }
    if(lion.hp > 0){
    makeButton('b', 'Go back in the Savanna')
    optionb.onclick = function () {
        update()
        areaTwoSavannaAB();
        }
        }
        else{
            makeButton('b', 'Go back to the tree line.')
            optionb.onclick = function () {
                update()
                areaTwoClearing();
            }
        }
}

// walk back to savanna
// prelion fight
function areaTwoSavannaAB() {
    text.textContent = (`You walk back into the savanna. There is no longer a breeze. Just silence. What would you like to do?`)
    
    makeButton('a', 'Keep walking towards the hill.')
    optiona.onclick = function () {
        update()
        areaTwoLionFight();
    }
    makeButton('b', 'Go back to the tree line.')
    optionb.onclick = function () {
        update()
        areaTwoLionFight();
    }
}

// post lion fight
function areaTwoSavannaABA() {
    text.textContent = (`After defeating the lion what would you like to do?`)
    //checks if cureent item is better
    if(mc.equip[2].hp < lionHide.hp){
        alert(`Gold Gained: ${
            lion.gp
        }\n Exp Gained: ${
            lion.exp
        }\n
        Item Found: ${
            lionHide.name
        }\n
        Health: +${
            lionHide.hp
        }
        Item has been equiped
        `)

        //equips item to player
        mc.equip[2] = lionHide

        //add to invin
        mc.inventory.push(lionHide.name);
        }
        else{
            alert(`Gold Gained: ${
                lion.gp
            }\n Exp Gained: ${
                lion.exp
            }\n
            Item Found: ${
                lionHide.name
            }\ny`)
        }
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        addToInventory(lionHide.tag)
        //checks level twice
        checkLevel();
        updateNav();

    makeButton('a', 'Walk back towards the hill.')
    optiona.onclick = function () {
        update()
        areaTwoSavannaC();
    }
    makeButton('b', 'Go back to the tree line.')
    optionb.onclick = function () {
        update()
        areaTwoClearing();
    }
}

//hut investigation
function areaTwoSavannaC() {
    text.textContent = (`You make it to the top of the hill once again and decide to go investigate this hut. You head down the hill and get to the hut. What would you like to do?`)
    
    makeButton('a', 'Investigate the inside')
    optiona.onclick = function () {
        update()
        areaTwoHutInside();
    }
    makeButton('b', 'Investigate the outside')
    optionb.onclick = function () {
        update()
        areaTwoHutOutside();
    }
}


//getting to the hut after golem fight
function areaTwoSavannaCG() {
    text.textContent = (`You follow the foot prints until you are lead to a hut what do you want to do? What would you like to do?`)
    
    makeButton('a', 'Investigate the inside')
    optiona.onclick = function () {
        update()
        areaTwoHutInside();
    }
    makeButton('b', 'Investigate the outside')
    optionb.onclick = function () {
        update()
        areaTwoHutOutside();
    }
}


//gets to the hut after the witch encounter
function areaTwoSavannaCW() {
    text.textContent = (`You go upstream in search of clues about Kitty when you see a small hut with smoke billowing out. What would you like to do?`)
    
    makeButton('a', 'Investigate the inside')
    optiona.onclick = function () {
        update()
        areaTwoHutInside();
    }
    makeButton('b', 'Investigate the outside')
    optionb.onclick = function () {
        update()
        areaTwoHutOutside();
    }
}


//player investigates inside the hut
function areaTwoHutInside() {
    //check if goblin has been killed
    //avoiding double encounter
    if(goblin.hp > 0){
    text.textContent = (`You walk up to what appears to be the front of the hut. It is made of the same wood as the forest you just came from. The roof is neatly intertwinned pieces of straw. 
    No windows just the one door. You enter its quiet but you are able the easily see. Taking a look around it looks like something is living in here. There is a small pile of grass that resembles 
    a cot of sorts. What would you like to do?`)
    //one time item find check if found
        if(mc.equip[1] != helmA){
                makeButton('a', 'Keep Investigating.')
                optiona.onclick = function () {
                if(mc.equip[1].hp < helmA.hp){
                alert(`Item Found: ${
                    helmA.name
                }\n
                Health: +${
                    helmA.hp
                }
                Item has been equiped
                `)
                mc.equip[1] = helmA
                
                mc.inventory.push(helmA.name);
            }
                else{
                    alert(`
                    Item Found: ${
                        helmA.name
                    }\n`)
                }
                mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                addToInventory(helmA.tag)
                update()
        areaTwoInsideInvestigation();
            }
        }
    }
    //if encounter and search have happened then only one option
        else{
            text.textContent = (`You already investigated the hut not much here`)
            makeButton('a', 'Go back outside.')
            optiona.onclick = function () {
            update()
            areaThreeRiverGGGG
        }
    }
}


//first time searching the hut
function areaTwoInsideInvestigation() {
    text.textContent = (`Youre inside the hut rummaging around. You find a couple gold pieces that you stuff in your pocket. But before you have a chance to do anything else you hear a noise from 
    outside. What do you do?`)
    buttoner.append(makeButton('a', 'Supirse the creature!'),makeButton('b', 'Hide...'))
    optiona.onclick = function () {
        update()
        text.textContent = (`You suprise the creature and attack dealing ${
            getRandomInt(mc.minatk, mc.maxatk)
        } damage! \n The goblin now has ${
            goblin.hp
        } health.\n`)
        makeButton('c', 'Fight!')
        optionc.onclick = function () {
        update()
        areaTwoGoblinFight();
        }
    }
    optionb.onclick = function () {
        update()
        text.textContent = (`You try to hide from the creature. It bursts in and sees you. It attacks dealing ${
            getRandomInt(goblin.minatk, goblin.maxatk)
        } damage.`)
        makeButton('c', 'Fight!')
        optionc.onclick = function () {
        update()
        areaTwoGoblinFight();
        }
    }
}


//investigation for the outside of the hut
function areaTwoHutOutside() {
        if(goblin.hp > 0){
        text.textContent = (`Youre looking around the outside of the house for anything of possible use. When suddenly a goblin appears infront of you. He is rambling swinging his spear above his head. 
        He seems upset. What will you do?`)
        makeButton('a', 'Fight!')
        optiona.onclick = function () {
            update()
            areaTwoGoblinFight();
            }
        }
        else{
            text.textContent = (`Not really any other clues or materials to gather here should probably push forward.`)
            buttoner.append(makeButton('a', 'Go across river'),makeButton('b', 'Go back to forest'))
            optiona.onclick = function () {
                update()
                areaThreeRiver();
            }
            optionb.onclick = function () {
                update()
                areaTwoClearing();
            }
        }
    }

//!===============Area 2 SAVANNA End=================================
//!===========================================================================================



//!===========================================================================================
//!===============Area 2 SWAMP BEgin=================================
// heading towards the treeliune to the right
function areaTwoSwampA() {
    text.textContent = (`You follow the tree line around the savanna. You notice that a pugnant smell is beginning to fill the air. The trees are getting thinner and the ground begins to feel damp.
    What would you like to do?`)
    makeButton('a', 'Continue through the thinning woods.')
    optiona.onclick = function () {
        update()
        areaTwoSwampB();
    }
}

// continuing towards the swamp
function areaTwoSwampB() {
    text.textContent = (`You keep pushing on, holding your nose, when you encounter a swamp. There is a little home propped up above the water. Smoke billowing above out of the chimney.
     what would you like to do?`)
     buttoner.append(makeButton('a', 'Investigate the swamp'),makeButton('b', 'Investigate the home'))
    optiona.onclick = function () {
        update()
        areaTwoSwampC();

    }
    optionb.onclick = function () {
        update()
        areaTwoWitchHutA();
    }
}

// Investigating the swamp
function areaTwoSwampC() {
    text.textContent = (`You look around for what might be causing this smell and find several piles of skin scattered around the swamp near this swamp home. No evidence of bones or organs, 
    just pile and piles of skin. They vary from animals to humans to everythiong in between. As you are investigating you hear a cackling from the swamp home.
    what would you like to do?`)
    buttoner.append(makeButton('a', 'Investigate the house'),makeButton('b', 'Ignore it'))
    optiona.onclick = function () {
        update()
        areaTwoWitchHutA();

    }
    optionb.onclick = function () {
        update()
        text.textContent = `You continue your investigation. But then your vision starts to blur. Your try rubbing your eyes but it doesnt seem to be working. When suddenly you pass out.`;
        makeButton('ded', 'Continue')
        optionded.onclick = function () {
            update()
            death(7);
        }

    }
}
// player approaches the hut
function areaTwoWitchHutA() {
    text.textContent = (`You approach the hut as you drudge through a purplish water. You get to the base and climb a later up. You notice the door is open and hear a faint voice of what appears to
    be an old lady. What do you want to do?`)
    buttoner.append( makeButton('a', `Ask "Who is there?"`),makeButton('b', "Burst in and attack the woman."))
    optiona.onclick = function () {
        update()
        areaTwoWitchHutB();
    }
    optionb.onclick = function () {
        update()
        areaTwoWitchFight();
    }
}

// player enters the hut
function areaTwoWitchHutB() {
    text.textContent = (`You ask "Who is there?" Then for a couple moments there is no reply. Shortly after you hear. "Just a troubled old lady, would you mind coming in and helping me with something.`)
    buttoner.append(makeButton('a', 'Go in and help her.'), makeButton('b', "Go in and attack the woman."))
    optiona.onclick = function () {
        update()
        death(6);
        }
    optionb.onclick = function () {
        update()
        areaTwoWitchFight();
    }
}


function areaTwoWitchFled() {
    text.textContent = "You escape the witches hut and run away throught the swamp.";
    makeButton('a', 'Keep Running')
    optiona.onclick = function () {
        update()
        areaThreeRiverW()
    }
}

function areaTwoWitchKilled() {
    text.textContent = "You kill the horid witch as you see the room is litered with bones and flesh. Nothing really left for you here.";
    makeButton('a', 'Exit Hut')
    optiona.onclick = function () {
        update()
        areaThreeRiverW()
    }
}
//!===============Area 2 SWAMP end =================================
//!===========================================================================================




//!===========================================================================================
//!===============Area 2 Rocks begin =================================
//^Need to add filler events for description and story leading up to the golem fight
//!===============Area 2 Rocks end =================================
//!===========================================================================================


//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

//!===========================================================================================
//!=================lion fight begin=======================================
function areaTwoLionFight() {
    //getRandomInt(mc.minatk, mc.maxatk) calculates damage range
    hideRest()
    let id = 4
    text.textContent = (`The ${
        lion.name
    } Attacks! \n What will you do?`)
    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        mc.currenthp = mc.currenthp - getRandomInt(lion.minatk, lion.maxatk)
        lion.hp = lion.hp - getRandomInt(mc.minatk, mc.maxatk)
        updateNav()
        text.textContent = (`You did ${
            getRandomInt(mc.minatk, mc.maxatk)
        } damage! \n The lion now has ${
            lion.hp
        } health.\n\nThe lion attacks back dealing ${
            getRandomInt(lion.minatk, lion.maxatk)
        } damage.\n What is your next move?`)
        if (lion.hp <= 0) {
            mc.gp += lion.gp
            mc.exp += lion.exp
            unhideRest()
            update();
            areaTwoSavannaABA();
        }
        if (mc.currenthp < 1) {
            death(id);
        }

    }
    // evade
    makeButton('b', 'Evade')
    optionb.onclick = function () {
        var r = getRandomInte(100)
        if (r <= lion.evade) {
            lion.hp = lion.hp - getRandomInt(mc.minatk, mc.maxatk);
            text.textContent = (`You evaded successfully! And counter for ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! What will you do next?`)
            //^add adv if the enemy dies
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(lion.minatk, lion.maxatk)
            text.textContent = (`Your evasion failed.\n The lion attacks you for ${
                getRandomInt(lion.minatk, lion.maxatk)
            } damage!\n What will you do next?`)
            updateNav()
            console.log("You evaded unsuccessfully")
            if (mc.currenthp < 1) {
                death(id);
            }
        }
    }
    // flee
    makeButton('c', 'Run')
    optionc.onclick = function () {
        alert('You cant flee from this enemy!')
    }
}
//!=================lion fight end=======================================
//!===========================================================================================

//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

//!===========================================================================================
//!============================Goblin fight begin==============================
function areaTwoGoblinFight() {
    hideRest()
    let id = 5
    text.textContent = (`The ${
        goblin.name
    } Attacks! \n What will you do?`)
    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        var d = getRandomInte(3)
        if (d == 1) {
            text.textContent = (`The goblin avoided your attack! The goblin attacks you dealing ${
                getRandomInt(goblin.minatk, goblin.maxatk)
            } damage.\n You now have ${
                mc.currenthp
            } health!
            \n What is your next move?`)
            updateNav()
        } else {
            mc.currenthp = mc.currenthp - getRandomInt(goblin.minatk, goblin.maxatk)
            goblin.hp = goblin.hp - getRandomInt(mc.minatk, mc.maxatk)
            text.textContent = (`You did ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! \n The goblin now has ${
                goblin.hp
            } health.\n\nThe goblin attacks back dealing ${
                getRandomInt(goblin.minatk, goblin.maxatk)
            } damage.\n What is your next move?`)
            updateNav()
            if (goblin.hp <= 0) {
                if(mc.equip[0].atk < spear.atk){
                    alert(`Gold Gained: ${
                        goblin.gp
                    }\n Exp Gained: ${
                        goblin.exp
                    }\n
                    Item Found: ${
                        spear.name
                    }\n
                    Health: +${
                        spear.atk
                    }
                    Item has been equiped
                    `)
                    mc.equip[0] = spear
                    
                    mc.inventory.push(spear.name);
                    }
                    else{
                        alert(`Gold Gained: ${
                            goblin.gp
                        }\n Exp Gained: ${
                            goblin.exp
                        }\n
                        Item Found: ${
                            spear.name
                        }\n`)
                    }
                    mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                    mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp = mc.gp + goblin.gp
                    mc.exp = mc.exp + goblin.exp
                    addToInventory(spear.tag)
                    unhideRest()
                    update()
                    areaThreeRiverGG()
            }
            if (mc.currenthp < 1) {
                update()
                death(id);
            }

        }
    }
    // evade
    makeButton('b', 'Evade')
    optionb.onclick = function () {
        var r = getRandomInte(100)
        if (r <= goblin.evade) {
            goblin.hp = goblin.hp - getRandomInt(mc.minatk, mc.maxatk);
            text.textContent = (`You evaded successfully! And counter for ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! What will you do next?`)
            if (goblin.hp <= 0) {
                if(mc.equip[0].atk < spear.atk){
                    alert(`Gold Gained: ${
                        goblin.gp
                    }\n Exp Gained: ${
                        goblin.exp
                    }\n
                    Item Found: ${
                        spear.name
                    }\n
                    Health: +${
                        spear.atk
                    }
                    Item has been equiped
                    `)
                    mc.equip[0] = spear
                    
                    mc.inventory.push(spear.name);
                    }
                    else{
                        alert(`Gold Gained: ${
                            goblin.gp
                        }\n Exp Gained: ${
                            goblin.exp
                        }\n
                        Item Found: ${
                            spear.name
                        }\n`)
                    }
                    mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                    mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    addToInventory(spear.tag)
                    unhideRest()
                    update()
                areaThreeRiverGG()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(goblin.minatk, goblin.maxatk)
            text.textContent = (`Your evasion failed.\n The goblin attacks you for ${
                getRandomInt(goblin.minatk, goblin.maxatk)
            } damage!\n What will you do next?`)
            updateNav()
            console.log("You evaded unsuccessfully")
            if (mc.currenthp < 1) {
                update()
                death(id);
            }
        }
    }
}
}

// !============Goblin fight end==============================
//!===========================================================================================

//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

//!===========================================================================================
//!============================witch fight begin==============================

function areaTwoWitchFight() {
    hideRest()
    text.textContent = (`The ${
        witch.name
    } Attacks! \n What will you do?`)

    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        var d = getRandomInte(10)
        if (d == 1) {
            text.textContent = (`The witch avoided your attack! The witch attacks you dealing ${
                getRandomInt(witch.minatk, witch.maxatk)
            } damage.\n What is your next move?`)
            updateNav()
        } else {
            mc.currenthp = mc.currenthp - getRandomInt(witch.minatk, witch.maxatk)
            witch.hp = witch.hp - getRandomInt(mc.minatk, mc.maxatk)
            text.textContent = (`You did ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! \n The witch now has ${
                witch.hp
            } health.\n\nThe witch attacks back dealing ${
                getRandomInt(witch.minatk, witch.maxatk)
            } damage.\n What is your next move?`)
            updateNav()
            if (witch.hp <= 0) {
                    if(mc.equip[0].atk < knife.atk){
                        alert(`Gold Gained: ${
                            witch.gp
                        }\n Exp Gained: ${
                            witch.exp
                        }\n
                        Item Found: ${
                            knife.name
                        }\n
                        Health: +${
                            knife.atk
                        }
                        Item has been equiped
                        `)
                        mc.equip[0] = knife
                        
                        mc.inventory.push(
                            knife.name
                        );
                        }
                        else{
                            alert(`Gold Gained: ${
                                witch.gp
                            }\n Exp Gained: ${
                                witch.exp
                            }\n
                            Item Found: ${
                                knife.name
                            }\n`)
                        }
                        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                        mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                        addToInventory(knife.tag)
                        unhideRest()
                        update()
                        areaTwoWitchKilled()
            }
            if (mc.currenthp < 1) {
                death(8);
            }

        }
    }
    // evade
    makeButton('b', 'Evade')
    optionb.onclick = function () {
        var r = getRandomInte(100)
        if (r <= witch.evade) {
            witch.hp = witch.hp - getRandomInt(mc.minatk, mc.maxatk);
            text.textContent = (`You evaded successfully! And counter for ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! What will you do next?`)
            updateNav()
            if(witch.hp <= 0){
                if(mc.equip[0].atk < knife.atk){
                    alert(`Gold Gained: ${
                        witch.gp
                    }\n Exp Gained: ${
                        witch.exp
                    }\n
                    Item Found: ${
                        knife.name
                    }\n
                    Health: +${
                        knife.atk
                    }
                    Item has been equiped
                    `)
                    mc.equip[0] = knife
                    
                    mc.inventory.push(
                    knife.name
                    );
                    }
                    else{
                        alert(`Gold Gained: ${
                            witch.gp
                        }\n Exp Gained: ${
                            witch.exp
                        }\n
                        Item Found: ${
                            knife.name
                        }\n`)
                    }
                    mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                    mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    addToInventory(knife.tag)
                    unhideRest()
                update();
                areaTwoWitchKilled()
            }
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(witch.minatk, witch.maxatk)
            text.textContent = (`Your evasion failed.\n The witch attacks you for ${
                getRandomInt(witch.minatk, witch.maxatk)
            } damage!\n What will you do next?`)
            console.log("You evaded unsuccessfully")
            updateNav()
            if (mc.currenthp < 1) {
                update()
                death(8);
            }
        }
    }
    // flee
    makeButton('c', 'Flee')
    optionc.onclick = function () {
        var q = getRandomInte(20)
        if (q == 19) {
            witch.hp = 0;
            unhideRest()
            update()
            areaTwoWitchFled()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(witch.minatk, witch.maxatk)
            text.witch = (`Your escape failed.\n The witch attacks you for ${
                getRandomInt(witch.minatk, witch.maxatk)
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) { // end loop
                death(8);
            }
        }


    }
}

//!============================Witch fight End==============================
//!===========================================================================================


//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

//!===========================================================================================
//!============================Golem fight begin==============================

function areaTwoGolemFight() {
    hideRest()
    let id = 8
    text.textContent = (`You approach the rocks you saw from the distance when all of the sudden they start shaking. The rocks then rise in the air smashing into each other forming a ball.
    The ball gets bigger... Looks like it has arms... And legs! When everything stops. Two bright red eyes sprout and the ${
        golem.name
    } Attacks! \n What will you do?`)

    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        var d = getRandomInte(10)
        if (d == 1) {
            text.textContent = (`The golem avoided your attack! The golem attacks you dealing ${
                getRandomInt(golem.minatk, golem.maxatk)
            } damage.
            \n What is your next move?`)
            updateNav()
        } else {
            mc.currenthp = mc.currenthp - getRandomInt(golem.minatk, golem.maxatk)
            golem.hp = golem.hp - getRandomInt(mc.minatk, mc.maxatk)
            text.textContent = (`You did ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! \n The golem now has ${
                golem.hp
            } health.\n\nThe golem attacks back dealing ${
                getRandomInt(golem.minatk, golem.maxatk)
            } damage.
        \n What is your next move?`)
            updateNav()
            if (golem.hp <= 0) {
                
                update()
                areaTwoGolemitesEnter()
            }
            if (mc.currenthp < 1) {
                death(id);
            }

        }
    }
    // evade
    makeButton('b', 'Evade')
    optionb.onclick = function () {
        var r = getRandomInte(100)
        if (r <= golem.evade) {
            golem.hp = golem.hp - getRandomInt(mc.minatk, mc.maxatk);
            text.textContent = (`You evaded successfully! And counter for ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! What will you do next?`)
            updateNav()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(golem.minatk, golem.maxatk)
            text.textContent = (`Your evasion failed.\n The golem attacks you for ${
                getRandomInt(golem.minatk, golem.maxatk)
            } damage!\n What will you do next?`)
            console.log("You evaded unsuccessfully")
            updateNav()
            if (mc.currenthp < 1) {
                update()
                death(id);
            }
        }
    }
    // flee
    makeButton('c', 'Flee')
    optionc.onclick = function () {
        var q = getRandomInte(30)
        if (q == 29) {
            golem.hp = 0;
            unhideRest()
            update()
            areaThreeRiver()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - getRandomInt(golem.minatk, golem.maxatk)
            text.golem = (`Your escape failed.\n The golem attacks you for ${
                getRandomInt(golem.minatk, golem.maxatk)
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) { // end loop
                death(id);
            }
        }


    }
}


function areaTwoGolemitesEnter() {
    let id = 9
    text.textContent = (`You defeated the ${
        golem.name
    } and it begins to violently shake. When all the sudden it splits apart into two smaller golemites! \n What will you do?`)
    // attack a
    makeButton('a', 'Attack Golemite A')
    optiona.onclick = function () {
        let d = getRandomInte(10)
        if (d == 1) {
            text.textContent = (`The golemite avoided your attack! Golemite A attacks you dealing ${
                getRandomInt(golemitea.minatk, golemitea.maxatk)
            } damage.\n Golemite B attacks you dealing ${
                getRandomInt(golemiteb.minatk, golemiteb.maxatk)
            } damage.\n What is your next move?`)
            mc.currenthp = mc.currenthp - getRandomInt(golemitea.minatk, golemitea.maxatk) - getRandomInt(golemiteb.minatk, golemiteb.maxatk)
            updateNav()
        } else {

            mc.currenthp = mc.currenthp - getRandomInt(golemitea.minatk, golemitea.maxatk)
            golemitea.hp = golemitea.hp - getRandomInt(mc.minatk, mc.maxatk)
            updateNav()

            if (golemitea.hp <= 0 && golemiteb.hp <= 0) {
                if(mc.equip[1].hp < rockHelm.hp){
                    alert(`Gold Gained: ${
                        golemitea.gp + golemiteb.gp + golem.gp
                    }\n Exp Gained: ${
                        golemitea.exp + golemiteb.exp + golem.exp
                    }\n
                                Items Found: ${
                        rockHelm.name
                    } and 1x ${stoneA.name}\n
                                Health: +${
                        rockHelm.hp
                    }
                            `)
                    mc.equip[1] = rockHelm
                    
                    mc.inventory.push(
                        rockHelm.name,
                        stoneA.name
                    );
                    }
                    else{
                        alert(`Gold Gained: ${
                            golemitea.gp + golemiteb.gp + golem.gp
                        }\n Exp Gained: ${
                            golemitea.exp + golemiteb.exp + golem.exp
                        }\n
                                    Item Found: ${
                            rockHelm.name
                        }and 1x ${stoneA.name}\n`)
                        mc.inventory.push(
                            rockHelm.name,
                            stoneA.name
                        );
                    }
                    mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                    mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp += golemitea.gp + golem.gp + golemiteb.gp
                    mc.exp += golemitea.exp + golem.exp + golemiteb.exp
                    addToInventory(rockHelm.tag)
                    addToInventory(stoneA.tag)
                    unhideRest()
                update()
                areaThreeRiverG()
            } else {
                text.textContent = (`You did ${
                    getRandomInt(mc.minatk, mc.maxatk)
                } damage! \n The golemite now has ${
                    golemitea.hp
                } health.\n\nThe golemite attacks back dealing ${
                    getRandomInt(golemitea.minatk, golemitea.maxatk)
                } damage.
                \n What is your next move?`)
                if (golemitea.hp <= 0) {
                    let y = document.getElementById('optiona')
                    y.parentElement.removeChild(y)
                }
            }
            if (mc.currenthp < 1) {
                death(id);
            }
        }
    }


    // attack b
    makeButton('b', 'Attack Golemite B')
    optionb.onclick = function () {
        let d = getRandomInte(10)

        if (d == 1) {
            text.textContent = (`The golemite avoided your attack! Golemite A attacks you dealing ${
                getRandomInt(golemitea.minatk, golemitea.maxatk)
            } damage.\n Golemite B attacks you dealing ${
                getRandomInt(golemiteb.minatk, golemiteb.maxatk)
            } damage.
                    \n What is your next move?`)
            updateNav()
        } else {

            mc.currenthp = mc.currenthp - getRandomInt(golemiteb.minatk, golemiteb.maxatk)
            golemiteb.hp = golemiteb.hp - getRandomInt(mc.minatk, mc.maxatk)
            updateNav()

            if (golemitea.hp <= 0 && golemiteb.hp <= 0) {
                if(mc.equip[1].hp < rockHelm.hp){
                    alert(`Gold Gained: ${
                        golemitea.gp + golemiteb.gp + golem.gp
                    }\n Exp Gained: ${
                        golemitea.exp + golemiteb.exp + golem.exp
                    }\n
                                Items Found: ${
                        rockHelm.name
                    } and 1x ${stoneA.name}\n
                                Health: +${
                        rockHelm.hp
                    }
                            `)
                    mc.equip[1] = rockHelm
                    
                    mc.inventory.push(
                        rockHelm.name,
                        stoneA.name
                    );
                    }
                    else{
                        alert(`Gold Gained: ${
                            golemitea.gp + golemiteb.gp + golem.gp
                        }\n Exp Gained: ${
                            golemitea.exp + golemiteb.exp + golem.exp
                        }\n
                                    Item Found: ${
                            rockHelm.name
                        }and 1x ${stoneA.name}\n`)
                        mc.inventory.push(
                            rockHelm.name,
                            stoneA.name
                        );
                    }
                    mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                    mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp += golemitea.gp + golem.gp + golemiteb.gp
                    mc.exp += golemitea.exp + golem.exp + golemiteb.exp
                    addToInventory(rockHelm.tag)
                    addToInventory(stoneA.tag)
                    unhideRest()
                update()
                areaThreeRiverG()
            } else {
                text.textContent = (`You did ${
                    getRandomInt(mc.minatk, mc.maxatk)
                } damage! \n The golemite now has ${
                    golemiteb.hp
                } health.\n\nThe golemite attacks back dealing ${
                    getRandomInt(golemiteb.minatk, golemiteb.maxatk)
                } damage.
                \n What is your next move?`)
                if (golemiteb.hp <= 0) {
                    let y = document.getElementById('optionb')
                    y.parentElement.removeChild(y)
                }
            }

            if (mc.currenthp < 1) {
                death(id);
            }
        }
    }
    // evade
    makeButton('c', 'Evade')
    optionc.onclick = function () {
        var r = getRandomInte(100)
        if (r <= golem.evade) {
            golemitea.hp = golemitea.hp - getRandomInt(mc.minatk, mc.maxatk);
            golemiteb.hp = golemiteb.hp - getRandomInt(mc.minatk, mc.maxatk);
            text.textContent = (`You evaded successfully! And counter both golemites for ${
                getRandomInt(mc.minatk, mc.maxatk)
            } damage! What will you do next?`)
            updateNav()
            if (golemitea.hp && golemiteb.hp <= 0) {
                if(mc.equip[1].hp < rockHelm.hp){
                    alert(`Gold Gained: ${
                        golemitea.gp + golemiteb.gp + golem.gp
                    }\n Exp Gained: ${
                        golemitea.exp + golemiteb.exp + golem.exp
                    }\n
                                Item Found: ${
                        rockHelm.name
                    }\n
                                Health: +${
                        rockHelm.hp
                    }
                            `)
                    mc.equip[1] = rockHelm
                    mc.inventory.push(
                        rockHelm.name
                    );
                    }
                    else{
                        alert(`Gold Gained: ${
                            golemitea.gp + golemiteb.gp + golem.gp
                        }\n Exp Gained: ${
                            golemitea.exp + golemiteb.exp + golem.exp
                        }\n
                                    Item Found: ${
                            rockHelm.name
                        }\n`)
                    }
                    mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                    mc.minatk = 1 + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp += golemitea.gp + golem.gp + golemiteb.gp
                    mc.exp += golemitea.exp + golem.exp + golemiteb.exp
                    addToInventory(rockHelm.tag)
                update()
                areaThreeRiverG()
        } else {
            mc.currenthp = mc.currenthp - getRandomInt(golemitea.minatk, golemitea.maxatk)
            text.textContent = (`Your evasion failed.\n The golemite attacks you for ${
                getRandomInt(golemitea.minatk, golemitea.maxatk)
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) {
                update()
                death(id);
            }
        }
    }
}
    makeButton('d', 'Flee')
    optiond.onclick = function () {
        var q = getRandomInte(20)
        if (q == 19) {
            golemitea.hp = 0;
            golemiteb.hp = 0;
            unhideRest()
            update()
            areaThreeRiver()
        } else {
            mc.currenthp = mc.currenthp - golemite.minatk
            text.textContent = (`Your escape failed.\n The golemite attacks you for ${
                golemite.minatk
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) {
                death(id);
            }
        }
    }
}


//!============================Golem fight end==============================
//!===========================================================================================


//??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????


//!=========A2 end========================
//!===========================================================================================



//************************************************************************************************************************************************************ 



//!===========================================================================================
//!=========AREA 3 Begin========================
//post golem fight
function areaThreeRiverG() {
    text.textContent = "After defeating the Golem and Golemites you notice youre next to a river. The river bank has foot prints that go upstream. What do you do?";
    
    makeButton('a', 'Follow footprints upstream.')
    optiona.onclick = function () {
        update()
        areaTwoSavannaCG()
    }
    makeButton('b', 'Go back to the forest.')
    optionb.onclick = function () {
        update()
        areaTwoClearing()
    }
}

//after witch fight
function areaThreeRiverW() {
    text.textContent = "After defeating the Witch you notice youre next to a river. The river bank has foot prints that go down stream. What do you do?";
    
    makeButton('a', 'Follow footprints upstream.')
    optiona.onclick = function () {
        update()
        areaTwoSavannaCW()
    }
    makeButton('b', 'Go back to the forest.')
    optionb.onclick = function () {
        update()
        areaTwoClearing()
    }
}

//after goblin encounter filler
function areaThreeRiverGG() {
    text.textContent = `You defeat the goblin and find a collar witha bell, next to the bell there is a name tag. You filp it over and it reads the name "Kitty"`;
    makeButton('a', 'Next')
    optiona.onclick = function () {
        update()
        areaThreeRiverGGG()
    }
}

//after filler
function areaThreeRiverGGG() {
    text.textContent = `You clench the collar and put it around your wrist. What do you want to do now?`;
    buttoner.append(makeButton('a', 'Go across the river'), makeButton('b', 'Go back to the forest'))
    if(mc.currenthp != mc.maxhp){
    alert(`
    Item Found: ${
        keyItemA.name
    }\n
    Item has been added to inventory
    `)
    mc.inventory.push(
    keyItemA.name
    );
    addToInventory(keyItemA.tag)
    }
    optiona.onclick = function () {
        update()
        areaThreeRiver()
    }
    optionb.onclick = function () {
        update()
        areaTwoClearing()
    }
}


//after filler
function areaThreeRiverGGGG() {
    text.textContent = `What do you want to do now?`;
    buttoner.append(makeButton('a', 'Go across the river'), makeButton('b', 'Go back to the forest'))
    optiona.onclick = function () {
        update()
        areaThreeRiver()
    }
    optionb.onclick = function () {
        update()
        areaTwoClearing()
    }

}

//end of game for now
function areaThreeRiver() {
    text.textContent = "You wait by the river to continue your adventure. This is all I have so far. Thanks for playing!";
    makeButton('a', 'Main Menu')
    optiona.onclick = function () {
        update()
        location.reload();
    }
}


//!=========AREA 3 end==========================
//!===========================================================================================


// ************************************************************************************************************************************************************ 


//!===========================================================================================
//!=========GAME OVER begin=============
//used to create different death scenerios
//^add different death cases and possibly a chance of revival
function death(id) {
    switch (id) { // hide death
        case 1: 
            text.textContent = `You hold your breath staying as quiet as you can as you investigate the noise. The snapping gets louder and you notice that the noise is coming from above.
            A thick smile begins to fall on your shoulder as you hear a loud chattering next to your ear. You turn to look as your head is crushed between the mandibles of a large spider.`;
            buttoner.append(makeButton('a', 'Accept Fate'))
            optiona.onclick = function () {
                update()
                gameOver()
            }
            break;
        case 2: 
            text.textContent = `You find a near by log and lay prone next to it. You hold your breath and hoping for the best.
            The foot steps get louder as you hear something push through the clearing. Then silence.
            A few momments pass and you hear nothing so you decide to take a peek. You see that the there is nothing around.
            You let out a sigh of relieve when something sticks to the back of your head. You go to feel what it is when you are suddenly dragged into the woods by your head.
            You are then dragged into a tree and before you can react and are encased in a web, a sticky coffin of sorts.
            You try to scream for help when for feel a stabbing pain in your stomache. Slowly fading away in a blissful sleep...`
            buttoner.append(makeButton('a', 'Accept Fate'))
            optiona.onclick = function () {
                update()
                gameOver()
            }
            break;
        case 3:
            update()
            let i = 4
            let x = Math.floor(Math.random() * 10);
            if(x < i){
                text.textContent = `As you fight this large arachnid it catches you by suprise and shoots a well time web binding your hands. Unable to defend yourself, you attempt to break free.
                Youre successful in your attempt and divert the next attack.`
                buttoner.append(makeButton('a', 'Fight again'))
                optiona.onclick = function () {
                    mc.currenthp = 25
                    update()
                    areaOneFight()
                    }
                }
            else{
                text.textContent = `As you fight this large arachnid it catches you by suprise and shoots a well time web binding your hands. Unable to defend yourself, you attempt to break free.
                But you are just unable to do it. As you struggle to break free, the spider gets ahold of you and begins wrapping you in a web. You try to scream for help when for feel a stabbing
                pain in your stomache. Slowly fading away in a blissful sleep...`
                buttoner.append(makeButton('a', 'Accept Fate'))
                optiona.onclick = function () {
                    update()
                    gameOver()
            }
        }
            break;
        case 4:
            update()
            text.textContent = `As you go to attack the lion it lunges on top of you, pinning you to the ground. You struggle and struggle but you can't get free. It bites down on your neck, 
            removing it from your body. Everything fades to black.`
            buttoner.append(makeButton('a', 'Accept Fate'))
            optiona.onclick = function () {
                update()
                gameOver()
            }
            break;
        case 5:
            update() 
        text.textContent = `As the battle heats up the goblin surprisingly throws his spear at you. Too shocked to react you try to deflect but fail. The spear pierces you through the chest. He begins
        snickering as you collapse to your knees gushing blood out of your chest. As he approaches you he comes over and steals your coin pouch. He then puts a collar in the bag as your world fades to black.`
        buttoner.append(makeButton('a', 'Accept Fate'))
        optiona.onclick = function () {
            update()
            gameOver()
        }
            break;
        case 6:
            update()
            text.textContent = (`You walk into the home and are immediately stabbed in the gut with a large knife. Youre too stunned to react as you start coughing up blood. You try to remove the knife but
        she has an extremely tight hold. "Shh shh shh" she says as she drives the knife a little deeper and twists it. Blood is pooring out of your stomach. You try to stay consious but then everything 
        fades to black.`)
            buttoner.append(makeButton('a', 'Accept Fate'))
            optiona.onclick = function () {
                update()
                gameOver()
            }
            break;
        case 7:
            update()
            text.textContent = (`You awake suddenly. Youre in some room. You try to get up but you cant. Your arms and legs are bound, mouth muzzled. As you try to scream you hear a voice. 
        "Tisk Tisk you shouldn't have been playing in my swamp." A plump and decrepid witch stands over you. She is holding a large knife. "Now be a good boy as I get my pound of flesh." Muffled
        screams fill the swamp and youre slowly skinned alive.`)
            buttoner.append(makeButton('a', 'Accept Fate'))
            optiona.onclick = function () {
                update()
                gameOver()
            }
            break;
        case 8:
            update()
            text.textContent = `You approach the Golem to make a mighty attack. As you do its large rocky fist comes from above. You arent able to avoid it in time as it crushes you. Yours legs
            and arms are now broken, and youre having difficulty breathing. The Golem continues smashing until your body lies there motionless.`
            buttoner.append(makeButton('a', 'Accept Fate'))
            optiona.onclick = function () {
                update()
                gameOver()
            }
            break;
            case 9:
                update()
                text.textContent = `A golemite catches you off guard and sweeps your legs out from under you. As you attempt to get up, it gives you no time. The golemite body slams you into the hard
                rocky ground. The wind leave your chest as it pumbles you until you are mush.`
                buttoner.append(makeButton('a', 'Accept Fate'))
                optiona.onclick = function () {
                    update()
                    gameOver()
                }
                break;
        default:
            // code block
    }
}

//dead screen
//^add picture for later
function gameOver() {
    text.textContent = "GAME OVER YOU HAVE DIED";
    makeButton('a', 'GG')
    // var img = document.createElement("img");
    // img.src = "/assets/images/youdied.jpg";
    // var src = document.getElementById("image");
    // src.append(img);
    optiona.onclick = function () {
        update()
        location.reload();
    }
}

//!=========GAME OVER end=============
//!===========================================================================================

mainMenu();
