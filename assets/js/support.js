import {gameText,mc,playerArmor,playerWeapon,playerCloak,playerHelm} from './game.js'

//========Supporting Functions begin===============

// removes old set of buttons
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// =======Evasion begin=========
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// =======Evasion end=========


//=======Making Buttons begin=======

function makeButton(x, xx){
  var z = 'option' + x;
  var y = document.createElement(z)
  var home = document.querySelector("#button-holder")
  y.innerText = xx
  y.classList.add('btn')
  y.id = z;
  home.appendChild(y);
}


//=======Making Buttons end ===============

//=======Start Navbar Elements begin ===============

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
attackStatus.append(`${
    mc.atk
}`)
var goldStatus = document.getElementById('gold-status')
goldStatus.append(`${
    mc.gp
}`)
var expStatus = document.getElementById('exp-status')
expStatus.append(`${
    mc.exp
}`)
//=======Start Navbar Elements end ===============

//=======Update Navbar begin ===============

function updateNav() {
  levelStatus.textContent = (`Level: ${
      mc.level
  }`)
  healthStatus.textContent = (`Health: ${
      mc.currenthp
  }/${
      mc.maxhp
  }`)
  attackStatus.textContent = (`Attack: ${
      mc.atk
  }`)
  goldStatus.textContent = (`Gold: ${
      mc.gp
  }`)
  expStatus.textContent = (`Exp: ${
      mc.exp
  }`)
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

//=======Update Navbar end ===============


//=======Start Level Check begin ===============

function checkLevel() {
  if (mc.exp > mc.reqexp) {
      mc.level = 1 + mc.level;
      mc.reqexp += 10 * mc.level
      alert(`You are now level ${
          mc.level
      }!\n Health: +5\n Attack: +1\n`)
      mc.maxhp += 5
      mc.atk += 1
      return
  } else {
      return
  }
}

//=======Start Level Check end ===============



//======is alive? start====================

function checkHealth(){
    if(mc.currenthp <=0){
        gameOver()
    }
    else {
        return
    }
}

//=======is alive? end=====================


//=======Start Update begin ===============

function update() {
  checkHealth()
  checkLevel()
  removeElementsByClass('btn')
  updateNav()
}

//=======Start Update end ===============













//========Supporting Functions End ===============


export {getRandomInt}
export {makeButton}
export {updateNav}
export {checkLevel}
export {checkHealth}
export {update}
export{levelStatus,healthStatus,attackStatus,goldStatus,expStatus}