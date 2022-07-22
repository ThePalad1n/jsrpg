//Enemy Creation
export default class Enemy {
    constructor(name, hp, atk, gp, evade){
        this.name = name
        this.hp = hp
        this.atk = atk
        this.gp = gp
        this.evade = evade
    }
  }

// enemies list
// const spider = new Enemy('Gaint Spider', 25, 8, 10, 50)
// const goblin = new Enemy('Goblin', 10, 10, 10, 15)
// const skeleton = new Enemy('Skeleton', 15, 12, 1, 25)