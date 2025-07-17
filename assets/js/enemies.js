// ===== ENEMY SYSTEM =====
export class Enemy {
    constructor(name, hp, minatk, maxatk, gp, evade, exp, options = {}) {
        this.name = name;
        this.maxhp = hp;
        this.hp = hp; // Current HP
        this.minatk = minatk;
        this.maxatk = maxatk;
        this.gp = gp;
        this.evade = evade;
        this.exp = exp;
        
        // Optional properties with defaults
        this.dodgeChance = options.dodgeChance || 0;
        this.fleeChance = options.fleeChance || 5;
        this.cannotFlee = options.cannotFlee || false;
        this.description = options.description || `A ${name.toLowerCase()}.`;
        this.type = options.type || 'normal';
        this.weaknesses = options.weaknesses || [];
        this.resistances = options.resistances || [];
        this.specialAbilities = options.specialAbilities || [];
    }
    
    // ===== COMBAT METHODS =====
    attack(targetDefense = 0) {
        const baseDamage = Math.floor(Math.random() * (this.maxatk - this.minatk + 1)) + this.minatk;
        return Math.max(1, baseDamage - targetDefense);
    }
    
    takeDamage(amount) {
        const oldHp = this.hp;
        this.hp = Math.max(0, this.hp - amount);
        return oldHp - this.hp; // Return actual damage taken
    }
    
    heal(amount) {
        const oldHp = this.hp;
        this.hp = Math.min(this.maxhp, this.hp + amount);
        return this.hp - oldHp; // Return actual healing done
    }
    
    isAlive() {
        return this.hp > 0;
    }
    
    isDead() {
        return this.hp <= 0;
    }
    
    // ===== STATUS METHODS =====
    getHealthPercentage() {
        return (this.hp / this.maxhp) * 100;
    }
    
    getHealthStatus() {
        const percentage = this.getHealthPercentage();
        if (percentage <= 25) return 'critical';
        if (percentage <= 50) return 'wounded';
        if (percentage <= 75) return 'damaged';
        return 'healthy';
    }
    
    // ===== SPECIAL ABILITIES =====
    canUseSpecialAbility(abilityName) {
        return this.specialAbilities.includes(abilityName);
    }
    
    useSpecialAbility(abilityName) {
        switch (abilityName) {
            case 'web':
                return this.webAttack();
            case 'roar':
                return this.roarAttack();
            case 'poison':
                return this.poisonAttack();
            default:
                return null;
        }
    }
    
    webAttack() {
        return {
            name: 'Web Shot',
            damage: this.attack(),
            effect: 'immobilize',
            description: `${this.name} shoots a web!`
        };
    }
    
    roarAttack() {
        return {
            name: 'Intimidating Roar',
            damage: 0,
            effect: 'fear',
            description: `${this.name} lets out a terrifying roar!`
        };
    }
    
    poisonAttack() {
        return {
            name: 'Poison Strike',
            damage: this.attack(),
            effect: 'poison',
            description: `${this.name} strikes with venomous fangs!`
        };
    }
    
    // ===== AI BEHAVIOR =====
    shouldFlee() {
        return this.getHealthPercentage() < 25 && Math.random() < 0.3;
    }
    
    shouldUseSpecialAbility() {
        return this.specialAbilities.length > 0 && Math.random() < 0.2;
    }
    
    // ===== REWARDS =====
    getRewards() {
        return {
            gp: this.gp,
            exp: this.exp,
            items: this.dropItems()
        };
    }
    
    dropItems() {
        // Override in specific enemies for custom drops
        return [];
    }
    
    // ===== UTILITY METHODS =====
    reset() {
        this.hp = this.maxhp;
    }
    
    clone() {
        return new Enemy(
            this.name,
            this.maxhp,
            this.minatk,
            this.maxatk,
            this.gp,
            this.evade,
            this.exp,
            {
                dodgeChance: this.dodgeChance,
                fleeChance: this.fleeChance,
                cannotFlee: this.cannotFlee,
                description: this.description,
                type: this.type,
                weaknesses: [...this.weaknesses],
                resistances: [...this.resistances],
                specialAbilities: [...this.specialAbilities]
            }
        );
    }
    
    toString() {
        return `${this.name} - HP: ${this.hp}/${this.maxhp}, ATK: ${this.minatk}-${this.maxatk}`;
    }
}

// ===== MAIN STORY ENEMIES =====
export const spider = new Enemy('Giant Spider', 25, 8, 12, 20, 50, 14, {
    dodgeChance: 0,
    fleeChance: 5,
    description: 'A massive spider with glowing red eyes and venomous fangs.',
    type: 'arachnid',
    specialAbilities: ['web', 'poison'],
    weaknesses: ['fire'],
    resistances: ['poison']
});

export const lion = new Enemy('Lion', 55, 8, 15, 15, 75, 35, {
    cannotFlee: true,
    description: 'A fierce predator with a golden mane and powerful claws.',
    type: 'beast',
    specialAbilities: ['roar'],
    weaknesses: ['loud_noise'],
    resistances: ['fear']
});

export const goblin = new Enemy('Goblin', 50, 8, 13, 10, 15, 20, {
    dodgeChance: 33,
    description: 'A cunning green-skinned warrior wielding a crude spear.',
    type: 'humanoid',
    specialAbilities: [],
    weaknesses: ['light'],
    resistances: []
});

export const witch = new Enemy('Swamp Witch', 65, 10, 15, 10, 15, 35, {
    dodgeChance: 10,
    description: 'A decrepit old woman with dark magic and malicious intent.',
    type: 'humanoid',
    specialAbilities: ['poison', 'curse'],
    weaknesses: ['holy'],
    resistances: ['poison', 'curse']
});

export const golem = new Enemy('Golem', 50, 6, 10, 10, 15, 35, {
    dodgeChance: 10,
    fleeChance: 0, // Very hard to flee from
    description: 'A massive construct of animated stone and earth.',
    type: 'construct',
    specialAbilities: ['slam'],
    weaknesses: ['lightning'],
    resistances: ['physical', 'poison']
});

// Golem splits into these when defeated
export const golemitea = new Enemy('Golemite A', 25, 3, 5, 5, 7, 15, {
    description: 'A smaller fragment of the original golem.',
    type: 'construct',
    weaknesses: ['lightning'],
    resistances: ['poison']
});

export const golemiteb = new Enemy('Golemite B', 25, 3, 5, 5, 7, 15, {
    description: 'A smaller fragment of the original golem.',
    type: 'construct', 
    weaknesses: ['lightning'],
    resistances: ['poison']
});

// Legacy compatibility
export const golemite = golemitea;

// ===== FUTURE ENEMIES =====
export const futureEnemies = {
    skeletona: new Enemy('Skeleton Grunt', 35, 8, 12, 10, 50, 15, {
        description: 'An animated skeleton warrior.',
        type: 'undead',
        weaknesses: ['holy', 'bludgeoning'],
        resistances: ['poison', 'fear']
    }),
    
    skeletonb: new Enemy('Skeleton Grunt', 35, 8, 12, 10, 50, 15, {
        description: 'An animated skeleton warrior.',
        type: 'undead',
        weaknesses: ['holy', 'bludgeoning'],
        resistances: ['poison', 'fear']
    }),
    
    skeletonc: new Enemy('Giant Skeleton', 65, 10, 14, 10, 30, 25, {
        description: 'A towering undead giant.',
        type: 'undead',
        weaknesses: ['holy', 'bludgeoning'],
        resistances: ['poison', 'fear']
    }),
    
    goblina: new Enemy('Goblin Grunt', 50, 8, 13, 10, 45, 20, {
        description: 'A goblin soldier.',
        type: 'humanoid',
        weaknesses: ['light'],
        resistances: []
    }),
    
    goblinb: new Enemy('Goblin Grunt', 50, 8, 13, 10, 45, 20, {
        description: 'A goblin soldier.',
        type: 'humanoid',
        weaknesses: ['light'],
        resistances: []
    }),
    
    goblinc: new Enemy('Goblin Archer', 40, 9, 14, 10, 45, 20, {
        description: 'A goblin with a crude bow.',
        type: 'humanoid',
        specialAbilities: ['ranged_attack'],
        weaknesses: ['light'],
        resistances: []
    }),
    
    hobgob: new Enemy('Hobgoblin', 70, 12, 15, 100, 40, 70, {
        description: 'A large, intelligent goblin leader.',
        type: 'humanoid',
        specialAbilities: ['command', 'intimidate'],
        weaknesses: ['light'],
        resistances: ['fear']
    })
};

// ===== ENEMY REGISTRY =====
export const ENEMY_REGISTRY = {
    spider,
    lion,
    goblin,
    witch,
    golem,
    golemite,
    golemitea,
    golemiteb,
    ...futureEnemies
};

// ===== UTILITY FUNCTIONS =====
export function getEnemyByName(name) {
    return Object.values(ENEMY_REGISTRY).find(enemy => 
        enemy.name.toLowerCase() === name.toLowerCase()
    );
}

export function getEnemiesByType(type) {
    return Object.values(ENEMY_REGISTRY).filter(enemy => enemy.type === type);
}

export function createEnemyGroup(enemyNames) {
    return enemyNames.map(name => {
        const enemy = getEnemyByName(name);
        return enemy ? enemy.clone() : null;
    }).filter(enemy => enemy !== null);
}

// Random encounter system
export function getRandomEnemy(level = 1, type = null) {
    let candidates = Object.values(ENEMY_REGISTRY);
    
    if (type) {
        candidates = candidates.filter(enemy => enemy.type === type);
    }
    
    // Filter by appropriate level (rough approximation)
    candidates = candidates.filter(enemy => {
        const enemyLevel = Math.floor(enemy.maxhp / 20) + Math.floor(enemy.maxatk / 5);
        return Math.abs(enemyLevel - level) <= 2;
    });
    
    if (candidates.length === 0) return null;
    
    const randomEnemy = candidates[Math.floor(Math.random() * candidates.length)];
    return randomEnemy.clone();
}