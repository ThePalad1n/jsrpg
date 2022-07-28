import {mc} from "./player.js";
import {spider,lion,goblin,witch,golem,golemitea,golemiteb} from "./enemies.js"
import {placeHolderArmor,placeHolderCloak,placeHolderWeapon,placeHolderHelm,stick,lionHide,spear,knife,rockHelm,helmA} from "./items.js";
import {getRandomInt, makeButton, updateNav, checkLevel, update} from "./support.js";
import {armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA} from './shop.js'

export {
    gameText,mc,playerArmor,playerWeapon,playerCloak,playerHelm
}

//temp vars
var cw = placeHolderWeapon
var ch = placeHolderHelm
var cc = placeHolderCloak
var ca = placeHolderArmor

//Player items
mc.inventory = []
mc.equip = [cw, ch, cc, ca]



// starting variables
let gameText = document.getElementById("story");
let text = document.querySelector("#game-text");
text.textContent = "Welcome to the Journey. Press start to begin."
let aBlock = document.createElement('h1').appendChild(document.createElement('h1'));
var playerHelm = document.getElementById('helm')
playerHelm.append(`${
    mc.equip[1].name
}`)
var playerArmor = document.getElementById('armor')
playerArmor.append(`${
    mc.equip[3].name
}`)
var playerCloak = document.getElementById('cloak')
playerCloak.append(`${
    mc.equip[2].name
}`)
var playerWeapon = document.getElementById('weapon')
playerWeapon.append(`${
    mc.equip[0].name
}`)


// ========Starting menus begin===============

// initial starting menu
function mainMenu() {
    gameText.append(text);
    aBlock.append(makeButton('a', 'Start Game'))
    optiona.onclick = function () {
        update()
        areaZeroA()
    }
}

// ========Starting menus end===============



//============Act 0 Begin===============

// player decides to rest
function areaZeroA() { // Story
    text.textContent = "A large man and his Orange cat, Kitty, once lived on a secluded ranch on the outskirts of the forest.";
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroB();
    }

}

function areaZeroB() { // Story
    text.textContent = "He made a peaceful life for the two of them, living off the land and only having minor encounter with the local wildlife.";
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroC();
    }

}
function areaZeroC() { // Story
    text.textContent = "Until one day when the two were celebrating the Kitty's 20th birthday the unthinkable happened...";
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroD();
    }

}
function areaZeroD() { // Story
    text.textContent = "As he was returning from the kitchen with the tuna and chicken birthday cake, the door was broken open and the cat was nowhere to be found with muddy footprints a muck";
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroE();
    }

}
function areaZeroE() { // Story
    text.textContent = `"KITTY!" he screamed `;
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroF();
    }

}

function areaZeroF() { // Story
    text.textContent = `He frantically looked around for and rushed to the door to see if he could find anything outside He looked off in the distance and saw a couple of shadowy figures running off 
    with his beloved pet`;
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroG();
    }

}
function areaZeroG() { // Story
    text.textContent = `With no hesitation he ran out the door bringing nothing with him chasing after his beloved animal. "I swear I'll do everything in my power to get you back!" `;
    aBlock.append(makeButton('a', 'Next'))
    optiona.onclick = function () {
        update()
        areaZeroH();
    }

}
function areaZeroH() { // Story
    text.textContent = `And so our adventure began on his quest to find his beloved animal will he be able to find Kitty in time or will she never be seen again`;
    aBlock.append(makeButton('a', 'Start Your Journey'))
    optiona.onclick = function () {
        update()
        startGame();
    }

}


//=============Act 0 End====================

// ========Area 1 begin===========
// first area of the game
function startGame() { // optionA

    text.textContent = (`You enter the forest where you last saw the shadowy figures. What do you want to do?`)
    aBlock.append(makeButton('a', 'Check the forest'), makeButton('b', 'Follow the path'))
    optiona.onclick = function () {
        update()
        areaOneForest();
    }
    optionb.onclick = function () {
        update()
        areaTwoPath();
    }
}

// player goes in forest
function areaOneForest() {
    text.textContent = `You begin treking through the woods and the visability gets lower and lower. It becomes so dark with think brush and trees that you are no longer able to see you own hands.
    You stop for a second and hear the sound of branches snapping.`;
    // choices
    makeButton('a', 'Run')
    optiona.onclick = function () {
        update()
        areaOneClearing();
    }
    makeButton('b', 'Investigate')
    optionb.onclick = function () {
        update()
        text.textContent = `You hold your breath staying as quiet as you can as you investigate the noise. The snapping gets louder and you notice that the noise is coming from above.
        A thick smile begins to fall on your shoulder as you hear a loud chattering next to your ear. You turn to look as your head is crushed between the mandibles of a large spider.`;
        makeButton('ded', 'Accept Fate')
        optionded.onclick = function () {
            update()
            let id = 1;
            death(1);
        }
    }
}

// Player runs out of woods away from noise
function areaOneClearing() { // Story
    text.textContent = `You begin running as fast as you can through the dark woods. You recall the direction you first came from and as you run the visibility increases. Suddenly you stumble 
    over a tree root and trip on the ground. The crunching of branches is getting louder. You heard many foot steps getting closer. You get back on your feet and make it through the clearing.
    The noises are getting closer what do you do?`
    // choices
    makeButton('a', 'Fight')
    optiona.onclick = function () {
        update()
        areaOneFight();
    }
    makeButton('b', 'Investigate')
    optionb.onclick = function () { // alert("You found a new weapon: Stick\n Attack Power increased by 5")
        if(mc.equip[0].atk < stick.atk){
        alert(`You found a stick!\n
        Attack: +5\n
        Item has been equiped and added to your inventory`)
        mc.equip[0] = stick
        // when player picks up hammer
        mc.inventory.push({
            name: stick.name
        });
        }
        else{
            alert(`You found a stick!\n
            Item has been added to your inventory`)
        }
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        update()
        areaOneFight();
    }
    makeButton('c', 'Hide')
    optionc.onclick = function () {
        update()
        text.textContent = `You find a near by log and lay prone next to it. You hold your breath and hoping for the best.
		The foot steps get louder as you hear something push through the clearing. Then silence.
		A few momments pass and you hear nothing so you decide to take a peek. You see that the there is nothing around.
		You let out a sigh of relieve when something sticks to the back of your head. You go to feel what it is when you are suddenly dragged into the woods by your head.
		You are then dragged into a tree and before you can react and are encased in a web, a sticky coffin of sorts.
		You try to scream for help when for feel a stabbing pain in your stomache. Slowly fading away in a blissful sleep...`

        makeButton('ded', 'Accept Fate')
        optionded.onclick = function () {
            update()
            let id = 2;
            death(2);
        }
    }
}


// player defeats the spider
function areaOneSpiderDefeatedA() {
    text.textContent = "You successfully defeated the spider!\n What will you do next?";
    // choices
    alert(`Gold Gained: ${
        spider.gp
    }\n Exp Gained: ${
        spider.exp
    }`)
    checkLevel();
    makeButton('a', 'Go down the path')
    optiona.onclick = function () {
        update()
        areaTwoPath();
    }
    makeButton('b', 'Rest for a bit')
    optionb.onclick = function () {
        mc.currenthp = mc.maxhp;
        alert("You now have full health.")
        updateNav()
        update()
        areaOneRest();
    }
}

// player defeats the spider
function areaOneSpiderDefeatedB() {
    text.textContent = "You successfully escaped the spider!";
    // choices
    makeButton('a', 'Go down the path')
    optiona.onclick = function () {
        update()
        areaOnePath();
    }
    makeButton('b', 'Rest for a bit')
    optionb.onclick = function () {
        update()
        areaOneRest();
    }
}


// player decides to rest after combat
function areaOneRest() { // Story
    text.textContent = "You recovered from your fight with the spider.";
    // choices
    makeButton('a', 'Go down the path')
    optiona.onclick = function () {
        update()
        areaTwoPath();
    }
}

// ========Area 1 end===========

// ********************************************* */

// ========A1 Spider Fight begin===========
function areaOneFight() {
    console.log(mc.inventory)
    console.log(mc.equip)
    let id = 3
    text.textContent = (`The ${
        spider.name
    } Attacks! \n What will you do?`)

    // attack

    makeButton('a', 'Attack')
    optiona.onclick = function () {
        mc.currenthp = mc.currenthp - spider.atk
        spider.hp = spider.hp - mc.atk
        updateNav()
        text.textContent = (`You did ${
            mc.atk
        } damage! \n The spider now has ${
            spider.hp
        } health.\n\nThe spider attacks back dealing ${
            spider.atk
        } damage.\n
        \n What is your next move?`)
        if (spider.hp <= 0) {
            mc.gp += spider.gp
            mc.exp += spider.exp
            update()
            areaOneSpiderDefeatedA()
        }
        if (mc.currenthp < 1) {
            update()
            death(id);
        }

    }
    // evade
    makeButton('b', 'Evade')
    optionb.onclick = function () {
        var r = getRandomInt(100)
        if (r <= spider.evade) {
            spider.hp = spider.hp - mc.atk;
            text.textContent = (`You evaded successfully! And counter for ${
                mc.atk
            } damage! What will you do next?`)
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - spider.atk
            text.textContent = (`Your evasion failed.\n The spider attacks you for ${
                spider.atk
            } damage!\n What will you do next?`)
            console.log("You evaded unsuccessfully")
            if (mc.currenthp < 1) {
                update()
                death(id);
            }
        }
    }
    makeButton('c', 'Flee')
    optionc.onclick = function () {
        var q = getRandomInt(20)
        if (q == 19) {
            spider.hp = 0;
            update()
            areaOneSpiderDefeatedB()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - spider.atk
            text.textContent = (`Your escape failed.\n The spider attacks you for ${
                spider.atk
            } damage!\n What will you do next?`)
            if (mc.currenthp < 1) { // end loop
                update()
                death(id);
            }
        }


    }


}
// ========A1 Spider Fight end===========


// ********************************************* */
// ********************************************* */
// ********************************************* */

// =========A2 begin=======================
function areaTwoPath() { // Story
    text.textContent = (`You start heading down the path. You notice that the forest is not as thick as before. And what appears to be a clearing ahead.\n
    You make it to the edge of the forest what would you like to do?`)
    // choices
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
    makeButton('c', 'Rest')
    optionc.onclick = function () {
        update()
        areaTwoRest();
    }
}

// enter the clearing for the first time
function areaTwoClearing() {
    text.textContent = (`You take a look ahead into the clearing you see a savanna with grass about waist high. In the distance straight ahead you can see a small hill, 
    to the left you see the tree line continues to wrap the savanah but becomes scattered later on. And to your right you can see what looks like rock formations.`)
    // choices
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
// ===============Area 2 INVESTIGATIONS begin=================================
// investigate the clearing
function areaTwoInvestigateA() {
    text.textContent = (`Directly is a savanna with grass about waist high. In the distance straight ahead you can see a small hill which has a small amount of smoke billowing. 
    To the left you see the tree line continues to wrap the savanah but becomes scattered later on, you see a purpulish haze emerging from the trees. And to your right you can 
    see what looks like rock formations, is it moving?.`)
    // choices
    makeButton('a', 'Walk out into the clearing')
    optiona.onclick = function () {
        update()
        areaTwoClearing();
    }
}
// ===============Area 2 INVESTIGATIONS end=================================


// ===============Area 2 SAVANNA begin=================================
// player decides to rest and will recover full health
function areaTwoRest() {
    text.textContent = (`You take short rest at the edge of the woods what would you like to do?`)
    alert("You now have full health.")
    mc.currenthp = mc.maxhp;
    // choices
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
}

// player decides to rest after lion fight
function areaTwoRestB() {
    text.textContent = (`You take short rest in the savanna. What would you like to do?`)
    alert("You now have full health.")
    mc.currenthp = mc.maxhp;
    // choices
    makeButton('a', 'Walk back towards the hill.')
    optiona.onclick = function () {
        update()
        areaTwoSavannaC();
    }
}
// ===============Area 2 RESTs end=================================


// ===============Area 2 SAVANNA begin=================================
// heading towards the hill in the distance
function areaTwoSavannaA() {
    text.textContent = (`You walk out into the savanna. There is a nice cross breeze that whisps your face. What would you like to do?`)
    // choices
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
    // choices
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
    // choices
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
    // choices
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
        mc.equip[2] = lionHide
        // when player picks up hammer
        mc.inventory.push({
            name: lionHide.name
        });
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk

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
    makeButton('c', 'Take a short rest')
    optionc.onclick = function () {
        alert("You now have full health.")
        mc.currenthp = mc.maxhp;
        update()
        areaTwoRestB();
    }
}


function areaTwoSavannaC() {
    text.textContent = (`You make it to the top of the hill once again and decide to go investigate this hut. You head down the hill and get to the hut. What would you like to do?`)
    // choices
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

function areaTwoSavannaCG() {
    text.textContent = (`You follow the foot prints until you are lead to a hut what do you want to do? What would you like to do?`)
    // choices
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

function areaTwoSavannaCW() {
    text.textContent = (`You go upstream in search of clues about Kitty when you see a small hut with smoke billowing out. What would you like to do?`)
    // choices
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


function areaTwoHutInside() {
    if(goblin.hp > 0){
    text.textContent = (`You walk up to what appears to be the front of the hut. It is made of the same wood as the forest you just came from. The roof is neatly intertwinned pieces of straw. 
    No windows just the one door. You enter its quiet but you are able the easily see. Taking a look around it looks like something is living in here. There is a small pile of grass that resembles 
    a cot of sorts. What would you like to do?`)
    // choices
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
                // when player picks up hammer
                mc.inventory.push({
                    name: helmA.name
                });
            }
                else{
                    alert(`
                    Item Found: ${
                        helmA.name
                    }\n`)
                }
                mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
                mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                update()
        areaTwoInsideInvestigation();
            }
        }
    }
        else{
            text.textContent = (`You already investigated the hut not much here`)
            makeButton('a', 'Go back outside.')
            optiona.onclick = function () {
            update()
            areaThreeRiver()
        }
    }
}

function areaTwoInsideInvestigation() {
    text.textContent = (`Youre inside the hut rummaging around. You find a couple gold pieces that you stuff in your pocket. But before you have a chance to do anything else you hear a noise from 
    outside. What do you do?`)
    // choices
    makeButton('a', 'Supirse the creature!')
    optiona.onclick = function () {
        update()
        areaTwoGoblinFight();
    }
    makeButton('b', 'Hide...')
    optionb.onclick = function () {
        update()
        areaTwoGoblinFight();
    }
}

function areaTwoHutOutside() {
        if(goblin.hp > 0){
        text.textContent = (`Youre looking around the outside of the house for anything of possible use. When suddenly a goblin appears infront of you. He is rambling swinging his spear above his head. 
        He seems upset. What will you do?`)
        // choices
        makeButton('a', 'Fight!')
        optiona.onclick = function () {
            update()
            areaTwoGoblinFight();
            }
        }
        else{
            text.textContent = (`Not really any other clues or materials to gather here should probably push forward.`)
            // choices
            makeButton('a', 'Go across river')
            optiona.onclick = function () {
                update()
                areaThreeRiver();
            }
            makeButton('b', 'Go back to forest')
            optionb.onclick = function () {
                update()
                areaTwoClearing();
            }
        }
    }

// ===============Area 2 SAVANNA End=================================


// ===============Area 2 SWAMP BEgin=================================
// heading towards the treeliune to the right
function areaTwoSwampA() {
    text.textContent = (`You follow the tree line around the savanna. You notice that a pugnant smell is beginning to fill the air. The trees are getting thinner and the ground begins to feel damp.
    What would you like to do?`)
    // choices
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
    // choices
    makeButton('a', 'Investigate the swamp')
    optiona.onclick = function () {
        update()
        areaTwoSwampC();

    }
    makeButton('b', 'Investigate the home')
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
    // choices
    makeButton('a', 'Investigate the house')
    optiona.onclick = function () {
        update()
        areaTwoWitchHutA();

    }
    makeButton('b', 'Ignore it')
    optionb.onclick = function () {
        update()
        text.textContent = `You continue your investigation. But then your vision starts to blur. Your try rubbing your eyes but it doesnt seem to be working. When suddenly you pass out.`;

        makeButton('ded', 'Continue')
        optionded.onclick = function () {
            update()
            areaTwoWitchDeathB()
        }

    }
}
// player approaches the hut
function areaTwoWitchHutA() {
    text.textContent = (`You approach the hut as you drudge through a purplish water. You get to the base and climb a later up. You notice the door is open and hear a faint voice of what appears to
    be an old lady. What do you want to do?`)
    // choices
    makeButton('a', `Ask "Who is there?"`)
    optiona.onclick = function () {
        update()
        areaTwoWitchHutB();
    }
    makeButton('b', "Burst in and attack the woman.")
    optionb.onclick = function () {
        update()
        areaTwoWitchFight();
    }
}
// player enters the hut
function areaTwoWitchHutB() {
    text.textContent = (`You ask "Who is there?" Then for a couple moments there is no reply. Shortly after you hear. "Just a troubled old lady, would you mind coming in and helping me with something.`)
    // choices
    makeButton('a', 'Go in and help her.')
    optiona.onclick = function () {
        update()
        makeButton('ded', 'Continue')
        optionded.onclick = function () {
            update()
            areaTwoWitchDeathA()
        }
    }
    makeButton('b', "Go in and attack the woman.")
    optionb.onclick = function () {
        update()
        areaTwoWitchFight();
    }
}


// ===============Witch Battle Outcome begin=================================
// one of two witch death scenes
function areaTwoWitchDeathA() {
    text.textContent = (`You walk into the home and are immediately stabbed in the gut with a large knife. Youre too stunned to react as you start coughing up blood. You try to remove the knife but
    she has an extremely tight hold. "Shh shh shh" she says as she drives the knife a little deeper and twists it. Blood is pooring out of your stomach. You try to stay consious but then everything 
    fades to black.`)
    makeButton('ded', 'Continue')
    optionded.onclick = function () {
        update()
        let id = 6;
        death(6);
    }
}

// the other of two witch death scensns
function areaTwoWitchDeathB() {
    text.textContent = (`You awake suddenly. Youre in some room. You try to get up but you cant. Your arms and legs are bound, mouth muzzled. As you try to scream you hear a voice. 
    "Tisk Tisk you shouldn't have been playing in my swamp." A plump and decrepid witch stands over you. She is holding a large knife. "Now be a good boy as I get my pound of flesh." Muffled
    screams fill the swamp and youre slowly skinned alive.`)
    makeButton('ded', 'Continue')
    optionded.onclick = function () {
        update()
        let id = 6;
        death(6);
    }
}

// ===============Witch  Battle Outcome end=================================


// ===============Witch Death Scene end=================================

function areaTwoWitchFled() {
    text.textContent = "You escape the witches hut and run away throught the swamp.";
    // choices
    makeButton('a', 'Keep Running')
    optiona.onclick = function () {
        update()
        areaThreeRiverW()
    }
}

function areaTwoWitchKilled() {
    text.textContent = "You kill the horid witch as you see the room is litered with bones and flesh. Nothing really left for you here.";
    // choices
    makeButton('a', 'Exit Hut')
    optiona.onclick = function () {
        update()
        areaThreeRiverW()
    }
}


// ===============Area 2 SWAMP end =================================

// ===============Area 2 Rocks begin =================================
// heading towards the structure
// function areaTwoRocksA() {}
// function areaTwoRocksB() {}
// function areaTwoRocksC() {}
// ===============Area 2 Rocks end =================================

// ********************************************* */

// =================lion fight begin=======================================

function areaTwoLionFight() {
    let id = 4

    text.textContent = (`The ${
        lion.name
    } Attacks! \n What will you do?`)

    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        mc.currenthp = mc.currenthp - lion.atk
        lion.hp = lion.hp - mc.atk
        updateNav()
        text.textContent = (`You did ${
            mc.atk
        } damage! \n The lion now has ${
            lion.hp
        } health.\n\nThe lion attacks back dealing ${
            lion.atk
        } damage.\n What is your next move?`)
        if (lion.hp <= 0) {
            mc.gp += lion.gp
            mc.exp += lion.exp
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
        var r = getRandomInt(100)
        if (r <= lion.evade) {
            lion.hp = lion.hp - mc.atk;
            text.textContent = (`You evaded successfully! And counter for ${
                mc.atk
            } damage! What will you do next?`)
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - lion.atk
            text.textContent = (`Your evasion failed.\n The lion attacks you for ${
                lion.atk
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
// rock structure to the right
// add golems

// =================lion fight end=======================================

// ********************************************* */

// ============================goblin fight begin==============================

function areaTwoGoblinFight() {
    let id = 5

    text.textContent = (`The ${
        goblin.name
    } Attacks! \n What will you do?`)

    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        var d = getRandomInt(3)
        if (d == 1) {
            text.textContent = (`The goblin avoided your attack! The goblin attacks you dealing ${
                goblin.atk
            } damage.\n You now have ${
                mc.currenthp
            } health!
            \n What is your next move?`)
            updateNav()
        } else {
            mc.currenthp = mc.currenthp - goblin.atk
            goblin.hp = goblin.hp - mc.atk
            text.textContent = (`You did ${
                mc.atk
            } damage! \n The goblin now has ${
                goblin.hp
            } health.\n\nThe goblin attacks back dealing ${
                goblin.atk
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
                    // when player picks up hammer
                    mc.inventory.push({
                        name: spear.name
                    });
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
                    mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp = mc.gp + goblin.gp
                    mc.exp = mc.exp + goblin.exp
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
        var r = getRandomInt(100)
        if (r <= goblin.evade) {
            goblin.hp = goblin.hp - mc.atk;
            text.textContent = (`You evaded successfully! And counter for ${
                mc.atk
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
                    // when player picks up hammer
                    mc.inventory.push({
                        name: spear.name
                    });
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
                    mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
            
                update()
                areaThreeRiverGG()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - goblin.atk
            text.textContent = (`Your evasion failed.\n The goblin attacks you for ${
                goblin.atk
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

// ============Goblin fight end==============================


// ********************************************* */


// ============================witch fight begin==============================

function areaTwoWitchFight() {
    let id = 6

    text.textContent = (`The ${
        witch.name
    } Attacks! \n What will you do?`)

    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        var d = getRandomInt(10)
        if (d == 1) {
            text.textContent = (`The witch avoided your attack! The witch attacks you dealing ${
                witch.atk
            } damage.\n What is your next move?`)
            updateNav()
        } else {
            mc.currenthp = mc.currenthp - witch.atk
            witch.hp = witch.hp - mc.atk
            text.textContent = (`You did ${
                mc.atk
            } damage! \n The witch now has ${
                witch.hp
            } health.\n\nThe witch attacks back dealing ${
                witch.atk
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
                        // when player picks up hammer
                        mc.inventory.push({
                            name: knife.name
                        });
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
                        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                update()
                areaTwoWitchKilled()
            }
            if (mc.currenthp < 1) {
                death(id);
            }

        }
    }
    // evade
    makeButton('b', 'Evade')
    optionb.onclick = function () {
        var r = getRandomInt(100)
        if (r <= witch.evade) {
            witch.hp = witch.hp - mc.atk;
            text.textContent = (`You evaded successfully! And counter for ${
                mc.atk
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
                    // when player picks up hammer
                    mc.inventory.push({
                        name: knife.name
                    });
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
                    mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                update();
                areaTwoWitchKilled()
            }
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - witch.atk
            text.textContent = (`Your evasion failed.\n The witch attacks you for ${
                witch.atk
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
        var q = getRandomInt(20)
        if (q == 19) {
            witch.hp = 0;
            update()
            areaTwoWitchFled()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - witch.atk
            text.witch = (`Your escape failed.\n The witch attacks you for ${
                witch.atk
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) { // end loop
                death(id);
            }
        }


    }
}

// ============================Witch fight begin==============================


// ============================Golem fight begin==============================

function areaTwoGolemFight() {
    let id = 7

    text.textContent = (`You approach the rocks you saw from the distance when all of the sudden they start shaking. The rocks then rise in the air smashing into each other forming a ball.
    The ball gets bigger... Looks like it has arms... And legs! When everything stops. Two bright red eyes sprout and the ${
        golem.name
    } Attacks! \n What will you do?`)

    // attack
    makeButton('a', 'Attack')
    optiona.onclick = function () {
        var d = getRandomInt(10)
        if (d == 1) {
            text.textContent = (`The golem avoided your attack! The golem attacks you dealing ${
                golem.atk
            } damage.
            \n What is your next move?`)
            updateNav()
        } else {
            mc.currenthp = mc.currenthp - golem.atk
            golem.hp = golem.hp - mc.atk
            text.textContent = (`You did ${
                mc.atk
            } damage! \n The golem now has ${
                golem.hp
            } health.\n\nThe golem attacks back dealing ${
                golem.atk
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
        var r = getRandomInt(100)
        if (r <= golem.evade) {
            golem.hp = golem.hp - mc.atk;
            text.textContent = (`You evaded successfully! And counter for ${
                mc.atk
            } damage! What will you do next?`)
            updateNav()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - golem.atk
            text.textContent = (`Your evasion failed.\n The golem attacks you for ${
                golem.atk
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
        var q = getRandomInt(30)
        if (q == 29) {
            golem.hp = 0;
            update()
            areaThreeRiver()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - golem.atk
            text.golem = (`Your escape failed.\n The golem attacks you for ${
                golem.atk
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) { // end loop
                death(id);
            }
        }


    }
}


function areaTwoGolemitesEnter() {
    let id = 8

    text.textContent = (`You defeated the ${
        golem.name
    } and it begins to violently shake. When all the sudden it splits apart into two smaller golemites! \n What will you do?`)

    // attack
    makeButton('a', 'Attack Golemite A')
    optiona.onclick = function () {
        let d = getRandomInt(10)
        if (d == 1) {
            text.textContent = (`The golemite avoided your attack! Golemite A attacks you dealing ${
                golemitea.atk
            } damage.\n Golemite B attacks you dealing ${
                golemiteb.atk
            } damage.\n What is your next move?`)
            mc.currenthp = mc.currenthp - golemitea.atk - golemiteb.atk
            updateNav()
        } else {

            mc.currenthp = mc.currenthp - golemitea.atk
            golemitea.hp = golemitea.hp - mc.atk
            updateNav()

            if (golemitea.hp <= 0 && golemiteb.hp <= 0) {
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
                    // when player picks up hammer
                    mc.inventory.push({
                        name: rockHelm.name
                    });
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
                    mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp += golemitea.gp + golem.gp + golemiteb.gp
                    mc.exp += golemitea.exp + golem.exp + golemiteb.exp
                update()
                areaThreeRiverG()
            } else {
                text.textContent = (`You did ${
                    mc.atk
                } damage! \n The golemite now has ${
                    golemitea.hp
                } health.\n\nThe golemite attacks back dealing ${
                    golemitea.atk
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


    // attack
    makeButton('b', 'Attack Golemite B')
    optionb.onclick = function () {
        let d = getRandomInt(10)

        if (d == 1) {
            text.textContent = (`The golemite avoided your attack! Golemite A attacks you dealing ${
                golemitea.atk
            } damage.\n Golemite B attacks you dealing ${
                golemiteb.atk
            } damage.
                    \n What is your next move?`)
            updateNav()
        } else {

            mc.currenthp = mc.currenthp - golemiteb.atk
            golemiteb.hp = golemiteb.hp - mc.atk
            updateNav()

            if (golemitea.hp <= 0 && golemiteb.hp <= 0) {
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
                    // when player picks up hammer
                    mc.inventory.push({
                        name: rockHelm.name
                    });
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
                    mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp += golemitea.gp + golem.gp + golemiteb.gp
                    mc.exp += golemitea.exp + golem.exp + golemiteb.exp
                update()
                areaThreeRiverG()
            } else {
                text.textContent = (`You did ${
                    mc.atk
                } damage! \n The golemite now has ${
                    golemiteb.hp
                } health.\n\nThe golemite attacks back dealing ${
                    golemiteb.atk
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
        var r = getRandomInt(100)
        if (r <= golem.evade) {
            golemitea.hp = golemitea.hp - mc.atk;
            golemiteb.hp = golemiteb.hp - mc.atk;
            text.textContent = (`You evaded successfully! And counter both golemites for ${
                mc.atk
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
                    // when player picks up hammer
                    mc.inventory.push({
                        name: rockHelm.name
                    });
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
                    mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
                    mc.gp += golemitea.gp + golem.gp + golemiteb.gp
                    mc.exp += golemitea.exp + golem.exp + golemiteb.exp
                update()
                areaThreeRiverG()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - golemitea.atk
            text.textContent = (`Your evasion failed.\n The golemite attacks you for ${
                golemitea.atk
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) {
                update()
                death(id);
            }
        }
    }
}
    // flee
    makeButton('d', 'Flee')
    optiond.onclick = function () {
        var q = getRandomInt(20)
        if (q == 19) {
            golemitea.hp = 0;
            golemiteb.hp = 0;
            update()
            areaThreeRiver()
        } else { // enemy attacks player
            mc.currenthp = mc.currenthp - golemite.atk
            text.textContent = (`Your escape failed.\n The golemite attacks you for ${
                golemite.atk
            } damage!\n What will you do next?`)
            updateNav()
            if (mc.currenthp < 1) { // end loop
                death(id);
            }
        }


    }
}


// Enter Golemites

// ============================Golem fight end==============================


// =========A2 end========================


// ********************************************* */
// ********************************************* */
// ********************************************* */


// =========AREA 3 Begin========================
function areaThreeRiverG() {
    text.textContent = "After defeating the Golem and Golemites you notice youre next to a river. The river bank has foot prints that go upstream. What do you do?";
    // choices
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

function areaThreeRiverW() {
    text.textContent = "After defeating the Witch you notice youre next to a river. The river bank has foot prints that go down stream. What do you do?";
    // choices
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

function areaThreeRiverGG() {
    text.textContent = `You defeat the goblin and find a collar witha bell, next to the bell there is a name tag. You filp it over and it reads the name "Kitty"`;
    // choices
    makeButton('a', 'Next')
    optiona.onclick = function () {
        update()
        areaThreeRiverGGG()
    }
}
function areaThreeRiverGGG() {
    text.textContent = `You clench the collar and put it around your wrist. What do you want to do now?"`;
    // choices
    makeButton('a', 'Go accross the river')
    optiona.onclick = function () {
        update()
        areaThreeRiver()
    }
    makeButton('b', 'Go back to the forest')
    optionb.onclick = function () {
        update()
        areaTwoClearing()
    }
}

function areaThreeRiver() {
    text.textContent = "You wait by the river to continue your adventure. This is all I have so far. Thanks for playing!";
    // choices
    makeButton('a', 'Main Menu')
    optiona.onclick = function () {
        update()
        location.reload();
    }
}


// =========AREA 3 end==========================

// =========GAME OVER begin=============

function death(id) {
    switch (id) { // hide death
        case 1: gameOver()
            break;
        case 2: gameOver()
            break;
        case 3: gameOver()
            break;
        case 4: gameOver()
            break;
        case 5: gameOver()
            break;
        case 6: gameOver()
            break;
        case 7: gameOver()
            break;
        case 8: gameOver()
            break;
        default:
            // code block
    }
}


function gameOver() {
    text.textContent = "GAME OVER YOU HAVE DIED";
    makeButton('a', 'GG')
    optiona.onclick = function () {
        update()
        location.reload();
    }
}

// =========GAME OVER end=============


mainMenu();
