//This program is a collection of supportive functions for the game

//imports
import {mc,playerArmor,playerWeapon,playerCloak,playerHelm,gameOver} from './game.js'


//!========Supporting Functions begin===============

//!=======Remove button begin===========
// removes old set of buttons
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
//!========Remove button end=============



//!=======Evasion begin=========
//generates random number for enemy evasion
function getRandomInte(max) {
  return Math.floor(Math.random() * max);
}
//!=======Evasion end=========



//!=========Attack Range begin=========
//generates damage for each player attack
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
//!=========Attack Range end=========



//!=======Making Buttons begin=======
//creates buttons by passing which button and descript
function makeButton(x, xx){
  var z = 'option' + x;
  var y = document.createElement(z)
  var home = document.querySelector("#button-holder")
  y.innerText = xx
  y.classList.add('btn')
  y.id = z;
  home.appendChild(y);
}
//!=======Making Buttons end ===============



//!=======Start Navbar Elements begin ===============
//creates initial nav elements for status
var levelStatus = document.getElementById('level-status')
levelStatus.append(`${
    mc.level
}`)
var healthStatus = document.getElementById('health-status')
healthStatus.append(`${
    mc.currenthp
}/${
    mc.maxhp
}`)

var attackStatus = document.getElementById('attack-status')
attackStatus.append(`${mc.minatk}-${mc.maxatk}`)
var goldStatus = document.getElementById('gold-status')
goldStatus.append(`${
    mc.gp
}`)

var shortRests = document.getElementById('srest')
shortRests.append(`${
    shortRest
}`)
var longRests = document.getElementById('lrest')
longRests.append(`${
    longRest
}`)
//!======Start Navbar Elements end ===============



//!========Exp bar Begin=======================
//Exp bar update
function expUpdate() {
    var f = mc.exp
    var g = mc.reqexp
    var h = f/g
    var i = document.getElementById("expstatus")
    i.style.width = (h*100) + '%'; 
    return
  }
//!========Exp bar end=======================



//!========Rests Begin===================
//types of rests
var shortRest = 3
var longRest = 1


//when a short rest is taken
shortRests.onclick = function () {
    if (shortRest > 0){
    if (mc.currenthp != mc.maxhp) {
        let z = Math.floor(Math.random() * 5);
        var heal = z * 4 + mc.level
        alert(`You decide to take a short rest, you regain ${heal} health and feel a little more refreshed.`)
        mc.currenthp += heal;
        shortRest = shortRest - 1
        if (mc.currenthp > mc.maxhp) {
            mc.currenthp === mc.maxhp
        }
    } else {
        alert(`There is no need to rest you are at full health.`)
    }
}
else{
    alert(`You cant short rest for a while`)
}
    updateNav()
}

//when a long rest is taken
longRests.onclick = function () {
    if(longRest > 0){
    if (mc.currenthp != mc.maxhp) {
        alert(`You decide to take a long rest, you regain full health and feel well rested.`)
        mc.currenthp = mc.maxhp
        if (mc.currenthp > mc.maxhp) {
            mc.currenthp === mc.maxhp
        }
        shortRest = 3
        longRest = 0
    } else {
        alert(`There is no need to rest you are at full health.`)
    }
}
else{
    alert(`You cant long rest for a while`)
}
    updateNav()
}


//When a new area is entered the rests are reset with a little text blurb and alert
function restReset(){
    shortRest = 3
    longRest = 1
    alert(`You now are at full health.`)
    mc.currenthp = mc.maxhp
    updateNav()
}
//!=======Rests End========================



//!=======Update Navbar begin ===============
//updates the nav bar items
function updateNav() {
  levelStatus.textContent = (`Level: ${
      mc.level
  }`)
  healthStatus.textContent = (`Health: ${
      mc.currenthp
  }/${
      mc.maxhp
  }`)
  attackStatus.textContent = (`Attack: ${mc.minatk}-${mc.maxatk}`)
  goldStatus.textContent = (`Gold: ${
      mc.gp
  }`)


  //updates the players equip
 
//player helm equip
playerHelm.classList.remove(`c`);
playerHelm.classList.remove(`uc`);
playerHelm.classList.remove(`r`);
playerHelm.classList.remove(`e`);
playerHelm.classList.remove(`l`);
  playerHelm.classList.remove(`${mc.equip[1].rarity}`);
  playerHelm.textContent = (`Helm: ${
    mc.equip[1].name
  }`)
  //playerHelm.classList.add(`dropdown-item`);
  playerHelm.classList.add(`${mc.equip[1].rarity}`);

//player armor equip
playerArmor.classList.remove(`c`);
playerArmor.classList.remove(`uc`);
playerArmor.classList.remove(`r`);
playerArmor.classList.remove(`e`);
playerArmor.classList.remove(`l`);
  playerArmor.classList.remove(`${mc.equip[3].rarity}`);
  playerArmor.textContent = (`Armor: ${
      mc.equip[3].name
  }`)
  //playerArmor.classList.add(`dropdown-item`);
  playerArmor.classList.add(`${mc.equip[3].rarity}`);


//player cloak equip
playerCloak.classList.remove(`c`);
playerCloak.classList.remove(`uc`);
playerCloak.classList.remove(`r`);
playerCloak.classList.remove(`e`);
playerCloak.classList.remove(`l`);
  playerCloak.classList.remove(`${mc.equip[2].rarity}`);
  playerCloak.textContent = (`Cloak: ${
      mc.equip[2].name
  }`)
  //playerCloak.classList.add(`dropdown-item`);
  playerCloak.classList.add(`${mc.equip[2].rarity}`);



//player weapon equip
  //playerWeapon.classList.remove(`dropdown-item`);
  playerWeapon.classList.remove(`c`);
  playerWeapon.classList.remove(`uc`);
  playerWeapon.classList.remove(`r`);
  playerWeapon.classList.remove(`e`);
  playerWeapon.classList.remove(`l`);
  playerWeapon.textContent = (`Weapon: ${
      mc.equip[0].name
  }`)
  //playerWeapon.classList.add(`dropdown-item`);
  playerWeapon.classList.add(`${mc.equip[0].rarity}`);


  //rests
  shortRests.textContent = (`Short Rests: ${shortRest}/3`)
  longRests.textContent = (`Long Rests: ${longRest}/1`)

  //info
}

//!======Update Navbar end ===============



//!=======Start Level Check begin ===============

function checkLevel() {
  if (mc.exp > mc.reqexp) {
      mc.level = 1 + mc.level;
      mc.reqexp += 10 * mc.level
      mc.exp = 0
      alert(`You are now level ${
          mc.level
      }!\n Health: +5\n Attack: +1\n`)
      mc.maxhp += 5
      mc.minatk += 1
      mc.maxatk += 1
      return
  } else {
      return
  }
}

//!=======Start Level Check end ===============



//!======is alive? start====================
//^needs work still have a couple neg health overflows
//is supposed to check health after each hit to prevent overflow
function checkHealth(){
    if(mc.currenthp <= 0){
        gameOver()
    }
    else {
        return
    }
}

//!=======is alive? end=====================



//!=======Add Item to invin begin=================
//add to inventory
function addToInventory(zzz){
    const invin = document.getElementById(zzz);
    invin.style.display = 'block';
}
//!=======Add Item to invin end=================



//!======= Rest Nav begin=================
//hide rest nav
function hideRest(){
    const restee = document.getElementById('restee');
    restee.style.display = 'none';
}
//unhide rest nav
function unhideRest(){
    const restee = document.getElementById('restee');
    restee.style.display = 'block';
}
//!======= Rest Nav end=================



//!=======Start Update begin ===============
//function goes through list of what needs to be updated on page change
function update() {
    updateNav()
    checkHealth()
    checkLevel()
    expUpdate()
    removeElementsByClass('btn')
    updateNav()
}

//!=======Start Update end ===============


//!========Supporting Functions End ===============


//exports
export {getRandomInt}
export {getRandomInte}
export {makeButton}
export {updateNav}
export {checkLevel}
export {checkHealth}
export {update}
export {expUpdate}
export {addToInventory}
export {restReset}
export {hideRest}
export {unhideRest}
export{levelStatus,healthStatus,attackStatus,goldStatus, shortRest, longRest}