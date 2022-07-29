//Enemy Creation
export class Item {
    constructor(name, hp, atk, gp, label, tag){
        this.name = name
        this.hp = hp
        this.atk = atk
        this.gp = gp
        this.label = label
        this.tag = tag
    }
  }

// item list
const stick = new Item('Stick', 0, 3, 1, 'weapon', 'itemstick')
const lionHide = new Item('Lions Hide Cloak', 20, 0, 25, 'cloak', 'itemlionhide')
const spear = new Item('Goblin Spear', 0, 8, 10, 'weapon', 'itemspear')
const knife = new Item('Fillet Knife', 0, 7, 10, 'weapon', 'itemknife')
const rockHelm = new Item('Rock Helm', 20, 1, 10, 'helmet', 'itemrockhelm')
const helmA = new Item('Leather Helm', 10, 0, 10, 'helmet', 'itemhelmA')

//placeholders for player init items
const placeHolderWeapon = new Item('None', 0, 0, 0, 'weapon', 'none')
const placeHolderCloak = new Item('None', 0, 0, 0, 'cloak', 'none')
const placeHolderHelm = new Item('None', 0, 0, 0, 'helmet', 'none')
const placeHolderArmor = new Item('None', 0, 0, 0, 'armor', 'none')


//shop items
//armors
const armorA = new Item('Leather Armor', 20, 0, 50, 'armor', 'itemarmorA')
const armorB = new Item('Chain Armor', 40, 0, 100, 'armor', 'itemarmorB')
const armorC = new Item('Plate Armor', 80, 0, 250, 'armor', 'itemarmorC')
const armorD = new Item('Mitheral Armor', 150, 0, 500, 'armor', 'itemarmorD')

//weapons
const swordA = new Item('Short Sword', 0, 10, 50, 'weapon', 'itemswordA')
const swordB = new Item('Long Sword', 0, 20, 100, 'weapon', 'itemswordB')
const swordC = new Item('Great Sword', 0, 35, 250, 'weapon', 'itemswordC')
const swordD = new Item('Gut Sword', 0, 50, 500, 'weapon', 'itemswordD')

//key items
const keyItemA = new Item('Kitty Collar', 0, 0, 1, 'key item', 'itemcatcollar')


//comsumables
const stoneA = new Item('Sharpening Stone', 0, 0, 1, 'consumable', 'itemsharpeningstone')
const healthA = new Item('Small Health Potion', 50, 0, 25, 'consumable', 'itemsmallhp')




export {placeHolderArmor,placeHolderCloak,placeHolderWeapon,placeHolderHelm,stick,lionHide,spear,knife,rockHelm,helmA,stoneA,keyItemA}
export{armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA}