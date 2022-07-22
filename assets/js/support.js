import {gameText} from './game.js'

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
  console.log(z)
  var y = document.createElement(z)
  console.log(y)
  y.innerText = xx
  y.classList.add('btn')
  y.id = z;
  gameText.append(y);
}


//=======Making Buttons end ===============


//========Supporting Functions End ===============


export {removeElementsByClass}
export {getRandomInt}
export {makeButton}