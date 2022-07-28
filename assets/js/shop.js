//This script is for processing and displaying shop items

//imports
import {armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD} from './items.js'
import {mc} from './game.js'
import {addToInventory, updateNav} from "./support.js";


//leather armor nav changes
var larmor = document.getElementById('larmor')
larmor.onclick = function (){
    //check to see if user has enough to purchase
    if( mc.gp >= armorA.gp){
        //check to see if players current item is better
        if(mc.equip[3].hp < armorA.hp){
        //deduct gold
        mc.gp = mc.gp - armorA.gp
        //add to inventory
        mc.inventory.push({
            name: armorA.name
        });
        //equip item
        mc.equip[3] = armorA
        //adjust stats
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        //make sure that the current hp doesnt overflow on item change
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        //update the nav
        updateNav()
        //add to nav invin
        addToInventory(armorA.tag)
    }

    else{
        alert(`Current Item Is Better`)
        }
    }

    else{
        alert(`You can't afford this item`)
    }
}
var carmor = document.getElementById('carmor')
carmor.onclick = function (){
    if( mc.gp >= armorB.gp){
        if(mc.equip[3].hp < armorB.hp){
        mc.gp = mc.gp - armorA.gp
        mc.inventory.push({
            name: armorB.name
        });
        mc.equip[3] = armorB
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(armorB.tag)
        console.log(mc.inventory)
    }
        else{
            alert(`Current Item Is Better`)
            }
    }
    else{
        alert(`You can't afford this item`)
    }
}

var parmor = document.getElementById('parmor')
parmor.onclick = function (){
    if( mc.gp >= armorC.gp){
        if(mc.equip[3].hp < armorC.hp){
        mc.gp = mc.gp - armorC.gp
        mc.inventory.push({
            name: armorC.name
        });
        mc.equip[3] = armorC
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(armorC.tag)
        console.log(mc.inventory)
    }
    else{
        alert(`Current Item Is Better`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }
}
var marmor = document.getElementById('marmor')
marmor.onclick = function (){
    if( mc.gp >= armorD.gp){
        if(mc.equip[3].hp < armorD.hp){
        mc.gp = mc.gp - armorD.gp
        mc.inventory.push({
            name: armorD.name
        });
        mc.equip[3] = armorD
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(armorD.tag)
        console.log(mc.inventory)
    }
    else{
        alert(`Current Item Is Better`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }
}



var ssword = document.getElementById('ssword')
ssword.onclick = function (){
    if( mc.gp >= swordA.gp){
        if(mc.equip[0].atk < swordA.atk){
        mc.gp = mc.gp - swordA.gp
        mc.inventory.push({
            name: swordA.name
        });
        mc.equip[0] = swordA
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(swordA.tag)
        console.log(mc.inventory)
    }
    else{
        alert(`Current Item Is Better`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }
}
var lsword = document.getElementById('lsword')
lsword.onclick = function (){
    if( mc.gp >= swordB.gp){
        if(mc.equip[0].atk < swordB.atk){
        mc.gp = mc.gp - swordB.gp
        mc.inventory.push({
            name: swordB.name
        });
        mc.equip[0] = swordB
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(swordB.tag)
        console.log(mc.inventory)
    }
    else{
        alert(`Current Item Is Better`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }
}
var gsword = document.getElementById('gsword')
gsword.onclick = function (){
    if( mc.gp >= swordC.gp){
        if(mc.equip[0].atk < swordC.atk){
        mc.gp = mc.gp - swordC.gp
        mc.inventory.push({
            name: swordC.name
        });
        mc.equip[0] = swordC
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(swordC.tag)
        console.log(mc.inventory)
    }
    else{
        alert(`Current Item Is Better`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }
}
var gutssword = document.getElementById('gutssword')
gutssword.onclick = function (){
    if( mc.gp >= swordD.gp){
        if(mc.equip[0].atk < swordD.atk){
        mc.gp = mc.gp - swordD.gp
        mc.inventory.push({
            name: swordD.name
        });
        mc.equip[0] = swordD
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.minatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        mc.maxatk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
        addToInventory(swordD.tag)
        console.log(mc.inventory)
    }
    else{
        alert(`Current Item Is Better`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }
}




export{armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD}