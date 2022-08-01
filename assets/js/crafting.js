
//Item A + Item B = Item C
import {placeHolderArmor,placeHolderCloak,placeHolderWeapon,placeHolderHelm,stick,lionHide,spear,knife,rockHelm,helmA,keyItemA,stoneA, stickB} from "./items.js";
import {gameText,mc,playerArmor,playerWeapon,playerCloak,playerHelm,inventory} from "./game.js"
import {getRandomInt, getRandomInte, makeButton, updateNav, checkLevel, update, addToInventory, restReset, hideRest, unhideRest, removeFromInventory} from "./support.js"; 
function checkRec(){
    console.log(mc.inventory)
    console.log(mc.inventory.includes(stoneA.name))
    console.log(mc.inventory.includes("Stick",0))
if(mc.inventory.includes("Stick") && mc.inventory.includes("Sharpening Stone")){
    console.log(inventory.includes(stoneA.name))
    console.log(inventory.includes(stick.name))
    let x = "itempstickc"
	unhideCraftItem(x)
}
}
function unhideCraftItem(x){
    let y = document.getElementById(x);
    console.log(y)
    y.style.display = 'block';
    craftStickB(x)

}
function hideCraftItem(x){
    let y = document.getElementById(x);
    console.log(y)
    y.style.display = 'none';
}

function craftStickB(x){
let y = document.getElementById(x);
y.onclick = function () {
    if(mc.equip[0].atk < stickB.atk){
        mc.equip[0] = stickB.atk
        mc.inventory.push(
            stickB.name);
    removeFromInventory(stick.tag)
    removeFromInventory(stoneA.tag)
    addToInventory(stickB.tag)
    hideCraftItem(x)
    updateNav()
}
else{
    alert(`Current Item Is Equal Or Better`)
    }
}
}

export{unhideCraftItem}
export{craftStickB}
export{checkRec}