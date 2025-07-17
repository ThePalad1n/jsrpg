// ===== CHARACTER SYSTEM =====
export class Character {
    constructor(name, maxhp, currenthp, basehp, minatk, maxatk, baseatk, gp, level, reqexp, exp) {
        this.name = name;
        this.maxhp = maxhp;
        this.currenthp = currenthp;
        this.basehp = basehp;
        this.minatk = minatk;
        this.maxatk = maxatk;
        this.baseatk = baseatk;
        this.gp = gp;
        this.level = level;
        this.reqexp = reqexp;
        this.exp = exp;
        
        // Initialize equipment and inventory
        this.equip = [];
        this.inventory = [];
    }
    
    // ===== STAT MANAGEMENT =====
    recalculateStats() {
        // Base calculation - can be overridden by game systems
        this.maxhp = this.basehp + this.equip.reduce((sum, item) => sum + (item.hp || 0), 0);
        this.minatk = 1 + this.equip.reduce((sum, item) => sum + (item.atk || 0), 0);
        this.maxatk = this.baseatk + this.equip.reduce((sum, item) => sum + (item.atk || 0), 0);
        
        // Ensure current HP doesn't exceed max
        if (this.currenthp > this.maxhp) {
            this.currenthp = this.maxhp;
        }
    }
    
    // ===== HEALTH MANAGEMENT =====
    heal(amount) {
        const oldHp = this.currenthp;
        this.currenthp = Math.min(this.currenthp + amount, this.maxhp);
        return this.currenthp - oldHp; // Return actual healing done
    }
    
    takeDamage(amount) {
        const oldHp = this.currenthp;
        this.currenthp = Math.max(this.currenthp - amount, 0);
        return oldHp - this.currenthp; // Return actual damage taken
    }
    
    isAlive() {
        return this.currenthp > 0;
    }
    
    // ===== EXPERIENCE AND LEVELING =====
    gainExp(amount) {
        this.exp += amount;
        const levelsGained = [];
        
        while (this.exp >= this.reqexp) {
            this.levelUp();
            levelsGained.push(this.level);
        }
        
        return levelsGained;
    }
    
    levelUp() {
        this.level++;
        this.exp -= this.reqexp;
        this.reqexp += 10 * this.level; // Scaling experience requirement
        
        // Level up bonuses
        const hpBonus = 5;
        const atkBonus = 1;
        
        this.basehp += hpBonus;
        this.baseatk += atkBonus;
        this.currenthp += hpBonus; // Heal on level up
        
        this.recalculateStats();
        
        return {
            level: this.level,
            hpBonus,
            atkBonus
        };
    }
    
    // ===== EQUIPMENT MANAGEMENT =====
    equipItem(item, slot) {
        const oldItem = this.equip[slot];
        this.equip[slot] = item;
        this.recalculateStats();
        return oldItem;
    }
    
    unequipItem(slot) {
        const item = this.equip[slot];
        this.equip[slot] = null;
        this.recalculateStats();
        return item;
    }
    
    // ===== INVENTORY MANAGEMENT =====
    addToInventory(itemName, quantity = 1) {
        for (let i = 0; i < quantity; i++) {
            this.inventory.push(itemName);
        }
    }
    
    removeFromInventory(itemName, quantity = 1) {
        let removed = 0;
        for (let i = this.inventory.length - 1; i >= 0 && removed < quantity; i--) {
            if (this.inventory[i] === itemName) {
                this.inventory.splice(i, 1);
                removed++;
            }
        }
        return removed;
    }
    
    hasInInventory(itemName, quantity = 1) {
        return this.inventory.filter(item => item === itemName).length >= quantity;
    }
    
    getInventoryCount(itemName) {
        return this.inventory.filter(item => item === itemName).length;
    }
    
    // ===== ECONOMY =====
    canAfford(cost) {
        return this.gp >= cost;
    }
    
    spendGold(amount) {
        if (this.canAfford(amount)) {
            this.gp -= amount;
            return true;
        }
        return false;
    }
    
    earnGold(amount) {
        this.gp += amount;
    }
    
    // ===== SERIALIZATION (for save/load) =====
    toSaveData() {
        return {
            name: this.name,
            maxhp: this.maxhp,
            currenthp: this.currenthp,
            basehp: this.basehp,
            minatk: this.minatk,
            maxatk: this.maxatk,
            baseatk: this.baseatk,
            gp: this.gp,
            level: this.level,
            reqexp: this.reqexp,
            exp: this.exp,
            equip: this.equip.map(item => item ? {
                name: item.name,
                tag: item.tag
            } : null),
            inventory: [...this.inventory]
        };
    }
    
    static fromSaveData(saveData, itemRegistry) {
        const character = new Character(
            saveData.name,
            saveData.maxhp,
            saveData.currenthp,
            saveData.basehp,
            saveData.minatk,
            saveData.maxatk,
            saveData.baseatk,
            saveData.gp,
            saveData.level,
            saveData.reqexp,
            saveData.exp
        );
        
        // Restore equipment
        if (saveData.equip) {
            character.equip = saveData.equip.map(equipData => {
                if (!equipData) return null;
                return itemRegistry[equipData.tag] || null;
            });
        }
        
        // Restore inventory
        if (saveData.inventory) {
            character.inventory = [...saveData.inventory];
        }
        
        return character;
    }
    
    // ===== STATUS EFFECTS (for future expansion) =====
    applyStatusEffect(effect) {
        // Future: Handle buffs, debuffs, etc.
        // this.statusEffects = this.statusEffects || [];
        // this.statusEffects.push(effect);
    }
    
    // ===== COMBAT UTILITIES =====
    getAttackDamage(min = null, max = null) {
        const minAtk = min || this.minatk;
        const maxAtk = max || this.maxatk;
        return Math.floor(Math.random() * (maxAtk - minAtk + 1)) + minAtk;
    }
    
    toString() {
        return `${this.name} (Level ${this.level}) - HP: ${this.currenthp}/${this.maxhp}, ATK: ${this.minatk}-${this.maxatk}, Gold: ${this.gp}`;
    }
}

// ===== PLAYER INSTANCE =====
// Create the main character instance
export const mc = new Character('Player', 100, 100, 100, 1, 10, 10, 35, 1, 15, 0);

// ===== PLAYER PRESETS =====
// Define different character builds for future use
export const CHARACTER_PRESETS = {
    warrior: {
        name: 'Warrior',
        basehp: 120,
        baseatk: 12,
        gp: 25
    },
    
    rogue: {
        name: 'Rogue', 
        basehp: 80,
        baseatk: 8,
        gp: 50
    },
    
    mage: {
        name: 'Mage',
        basehp: 70,
        baseatk: 6,
        gp: 40
    }
};

// Function to create character from preset
export function createCharacterFromPreset(presetName) {
    const preset = CHARACTER_PRESETS[presetName];
    if (!preset) return null;
    
    return new Character(
        preset.name,
        preset.basehp,
        preset.basehp,
        preset.basehp,
        1,
        preset.baseatk,
        preset.baseatk,
        preset.gp,
        1,
        15,
        0
    );
}