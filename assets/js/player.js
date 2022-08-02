//Character creation
export class Character {
    constructor(name, maxhp, currenthp, basehp, minatk, maxatk, baseatk, gp, level, reqexp, exp){
        this.name = name
        this.maxhp = maxhp
        this.currenthp = currenthp
        this.basehp = basehp
        this.minatk = minatk
        this.maxatk = maxatk
        this.baseatk = baseatk
        this.gp = gp
        this.level = level
        this.reqexp = reqexp
        this.exp = exp
    }
  }


  // player
const mc = new Character('Player', 100, 100, 100, 1, 10, 10, 35, 1, 15, 0)

export{mc}