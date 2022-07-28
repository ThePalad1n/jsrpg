import {armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA} from './items.js'
import {mc} from './game.js'
import {updateNav} from "./support.js";

var larmor = document.getElementById('larmor')
larmor.onclick = function (){
    if( mc.gp >= armorA.gp){
        if(mc.equip[3].hp < armorA.hp){
        mc.gp = mc.gp - armorA.gp
        mc.inventory.push({
            name: armorA.name
        });
        mc.equip[3] = armorA
        mc.maxhp = mc.basehp + mc.equip[3].hp + mc.equip[2].hp + mc.equip[1].hp + mc.equip[0].hp
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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
        mc.atk = mc.baseatk + mc.equip[3].atk + mc.equip[2].atk + mc.equip[1].atk + mc.equip[0].atk
        if(mc.currenthp > mc.maxhp){
            mc.currenthp === mc.maxhp
        }
        updateNav()
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



//need to fix
var hpa = document.getElementById('hpa')
hpa.onclick = function (){
    if( mc.gp >= healthA.gp){
        if(mc.currenthp !== mc.maxhp){
            mc.gp = mc.gp - healthA.gp
            mc.currenthp = mc.currenthp + healthA.hp
            updateNav()
            if(mc.currenthp >= mc.maxhp){
                mc.currenthp === mc.maxhp
                updateNav()
            }
                    updateNav()
                    console.log(mc.inventory)
                }
    else{
        alert(`Youre already at full health.`)
        }
    }
    else{
        alert(`You can't afford this item`)
    }

}



export{armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA}