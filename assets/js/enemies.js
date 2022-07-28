//Enemy Creation
class Enemy {
    constructor(name, hp, atk, gp, evade, exp){
        this.name = name
        this.hp = hp
        this.atk = atk
        this.gp = gp
        this.evade = evade
        this.exp = exp
    }
  }


  const spider = new Enemy('Giant Spider', 50, 8, 20, 50, 14)
  const lion = new Enemy('Lion', 55, 15, 15, 75, 35)
  const goblin = new Enemy('Goblin', 50, 10, 10, 15, 75)
  const witch = new Enemy('Swamp Witch', 65, 11, 10, 15, 75)
  const golem = new Enemy('Golem', 100, 8, 10, 15, 35)
  const golemitea = new Enemy('Golemite A', 50, 4, 5, 7, 15)
  const golemiteb = new Enemy('Golemite B', 50, 4, 5, 7, 15)
 
  
export{spider,lion,goblin,witch,golem,golemitea,golemiteb}