//Enemy Creation
export class Item {
    constructor(name, hp, atk, gp, label, tag, rarity){
        this.name = name
        this.hp = hp
        this.atk = atk
        this.gp = gp
        this.label = label
        this.tag = tag
        this.rarity = rarity
    }
  }

// item list
const stick = new Item('Stick', 0, 3, 1, 'weapon', 'itemstick', 'c')
const lionHide = new Item('Lions Hide Cloak', 20, 0, 25, 'cloak', 'itemlionhide', 'uc')
const spear = new Item('Goblin Spear', 0, 8, 10, 'weapon', 'itemspear', 'uc')
const knife = new Item('Fillet Knife', 0, 7, 10, 'weapon', 'itemknife', 'uc')
const rockHelm = new Item('Rock Helm', 20, 1, 10, 'helmet', 'itemrockhelm', 'r')
const helmA = new Item('Leather Helm', 10, 0, 10, 'helmet', 'itemhelmA', 'uc')

//placeholders for player init items
const placeHolderWeapon = new Item('None', 0, 0, 0, 'weapon', 'none', 'c')
const placeHolderCloak = new Item('None', 0, 0, 0, 'cloak', 'none', 'c')
const placeHolderHelm = new Item('None', 0, 0, 0, 'helmet', 'none', 'c')
const placeHolderArmor = new Item('None', 0, 0, 0, 'armor', 'none', 'c')


//shop items
//armors
const armorA = new Item('Leather Armor', 20, 0, 50, 'armor', 'itemarmorA', 'uc')
const armorB = new Item('Chain Armor', 40, 0, 100, 'armor', 'itemarmorB', 'r')
const armorC = new Item('Plate Armor', 80, 0, 250, 'armor', 'itemarmorC', 'e')
const armorD = new Item('Mitheral Armor', 150, 0, 500, 'armor', 'itemarmorD', 'l')

//weapons
const swordA = new Item('Short Sword', 0, 10, 50, 'weapon', 'itemswordA', 'uc')
const swordB = new Item('Long Sword', 0, 20, 100, 'weapon', 'itemswordB', 'r')
const swordC = new Item('Great Sword', 0, 35, 250, 'weapon', 'itemswordC', 'e')
const swordD = new Item('Gut Sword', 0, 50, 500, 'weapon', 'itemswordD', 'l')

//key items
const keyItemA = new Item('Kitty Collar', 0, 0, 1, 'key item', 'itemcatcollar', 'k')


//comsumables
const stoneA = new Item('Sharpening Stone', 0, 0, 1, 'consumable', 'itemsharpeningstone', 'cc')
const healthA = new Item('Small Health Potion', 50, 0, 25, 'consumable', 'itemsmallhp', 'cc')




export {placeHolderArmor,placeHolderCloak,placeHolderWeapon,placeHolderHelm,stick,lionHide,spear,knife,rockHelm,helmA,stoneA,keyItemA}
export{armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA}