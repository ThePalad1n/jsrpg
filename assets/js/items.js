//Enemy Creation
export class Item {
    constructor(name, hp, atk, gp, label){
        this.name = name
        this.hp = hp
        this.atk = atk
        this.gp = gp
        this.label = label
    }
  }

// item list
//const stick = new Item('Stick', 0, 5, 1)

const stick = new Item('Stick', 0, 5, 1, 'weapon')
const lionHide = new Item('Lions Hide Cloak', 20, 0, 25, 'cloak')
const spear = new Item('Spear', 0, 12, 10, 'weapon')
const knife = new Item('Knife', 0, 11, 10, 'weapon')
const rockHelm = new Item('Rock Helm', 20, 1, 10, 'helmet')
const helmA = new Item('Leather Helm', 10, 0, 10, 'helmet')
const placeHolderWeapon = new Item('None', 0, 0, 0, 'weapon')
const placeHolderCloak = new Item('None', 0, 0, 0, 'cloak')
const placeHolderHelm = new Item('None', 0, 0, 0, 'helmet')
const placeHolderArmor = new Item('None', 0, 0, 0, 'armor')


//shop items
const armorA = new Item('Leather Armor', 20, 0, 50, 'armor')
const armorB = new Item('Chain Armor', 40, 0, 100, 'armor')
const armorC = new Item('Plate Armor', 80, 0, 250, 'armor')
const armorD = new Item('Mitheral Armor', 150, 0, 500, 'armor')

const swordA = new Item('Short Sword', 0, 15, 50, 'weapon')
const swordB = new Item('Long Sword', 0, 30, 100, 'weapon')
const swordC = new Item('Great Sword', 0, 45, 250, 'weapon')
const swordD = new Item('Gut Sword', 0, 75, 500, 'weapon')

const healthA = new Item('Small Health Potion', 20, 0, 20, 'misc')


export {placeHolderArmor,placeHolderCloak,placeHolderWeapon,placeHolderHelm,stick,lionHide,spear,knife,rockHelm,helmA}
export{armorA,armorB,armorC,armorD,swordA,swordB,swordC,swordD,healthA}