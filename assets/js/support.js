//This program is a collection of supportive functions for the game

//imports
import {mc,playerArmor,playerWeapon,playerCloak,playerHelm,gameOver} from './game.js'


//!========Supporting Functions begin===============

// removes old set of buttons
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

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

var expStatus = document.getElementById('exp-status')
expStatus.append(`${
    mc.exp
}`)
//!======Start Navbar Elements end ===============



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
  expStatus.textContent = (`Exp: ${mc.exp}/${mc.reqexp}`)


  //updates the players equip
  playerHelm.textContent = (`Helm: ${
      mc.equip[1].name
  }`)
  playerArmor.textContent = (`Armor: ${
      mc.equip[3].name
  }`)
  playerCloak.textContent = (`Cloak: ${
      mc.equip[2].name
  }`)
  playerWeapon.textContent = (`Weapon: ${
      mc.equip[0].name
  }`)
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
export{levelStatus,healthStatus,attackStatus,goldStatus,expStatus}