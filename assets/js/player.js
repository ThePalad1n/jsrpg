//Character creation
export class Character {
    constructor(name, maxhp, currenthp, basehp, atk, baseatk, gp, level, reqexp, exp){
        this.name = name
        this.maxhp = maxhp
        this.currenthp = currenthp
        this.basehp = basehp
        this.atk = atk
        this.baseatk = baseatk
        this.gp = gp
        this.level = level
        this.reqexp = reqexp
        this.exp = exp
    }
  }


  // player
const mc = new Character('Player', 100, 80, 100, 10, 10, 1000000, 1, 15, 0)

export{mc}