//Enemy Creation
class Enemy {
    constructor(name, hp, minatk, maxatk, gp, evade, exp){
        this.name = name
        this.hp = hp
        this.minatk = minatk
        this.maxatk = maxatk
        this.gp = gp
        this.evade = evade
        this.exp = exp
    }
  }


  const spider = new Enemy('Giant Spider', 50, 6, 10, 20, 50, 14)
  const lion = new Enemy('Lion', 55, 8, 15, 15, 75, 35)
  const goblin = new Enemy('Goblin', 50, 8, 13, 10, 15, 35)
  const witch = new Enemy('Swamp Witch', 65, 10, 15, 10, 15, 35)
  const golem = new Enemy('Golem', 100, 6, 10, 10, 15, 35)
  const golemite = new Enemy('Golemite A', 50, 3, 5, 5, 7, 15)
  const golemitea = new Enemy('Golemite A', 50, 3, 5, 5, 7, 15)
  const golemiteb = new Enemy('Golemite B', 50, 3, 5, 5, 7, 15)
 
  
export{spider,lion,goblin,witch,golem,golemite,golemitea,golemiteb}