// ===== OPTIMIZED SUPPORT UTILITIES =====
import { mc } from './player.js';

// ===== UTILITY FUNCTIONS =====
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomInte(max) {
    return Math.floor(Math.random() * max);
}

// ===== DOM UTILITIES =====
export function removeElementsByClass(className) {
    try {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    } catch (error) {
        console.log("removeElementsByClass error (non-critical):", error);
    }
}

export function makeButton(letter, text) {
    try {
        const buttonId = 'option' + letter;
        const button = document.createElement('button');
        const home = document.querySelector("#button-holder");
        
        if (!home) {
            console.error("ERROR: #button-holder element not found!");
            return null;
        }
        
        button.innerText = text;
        button.classList.add('btn');
        button.id = buttonId;
        home.appendChild(button);
        
        return button;
    } catch (error) {
        console.error("makeButton error:", error);
        return null;
    }
}

// ===== REST SYSTEM =====
class RestSystem {
    constructor() {
        this.shortRest = 3;
        this.longRest = 1;
        this.initialized = false;
    }
    
    initializeRestButtons() {
        try {
            const shortRestBtn = document.getElementById('srest');
            const longRestBtn = document.getElementById('lrest');
            
            if (shortRestBtn) {
                shortRestBtn.onclick = () => this.takeShortRest();
            }
            
            if (longRestBtn) {
                longRestBtn.onclick = () => this.takeLongRest();
            }
            
            this.updateRestDisplay();
            this.initialized = true;
        } catch (error) {
            console.log("RestSystem initialization error (non-critical):", error);
        }
    }
    
    takeShortRest() {
        try {
            if (this.shortRest <= 0) {
                alert("You can't short rest for a while");
                return;
            }
            
            if (mc.currenthp >= mc.maxhp) {
                alert("There is no need to rest, you are at full health.");
                return;
            }
            
            const healAmount = getRandomInt(1, 5) * 4 + mc.level;
            mc.currenthp = Math.min(mc.currenthp + healAmount, mc.maxhp);
            this.shortRest--;
            
            alert(`You take a short rest and regain ${healAmount} health.`);
            updateNav();
        } catch (error) {
            console.log("takeShortRest error:", error);
        }
    }
    
    takeLongRest() {
        try {
            if (this.longRest <= 0) {
                alert("You can't long rest for a while");
                return;
            }
            
            if (mc.currenthp >= mc.maxhp) {
                alert("There is no need to rest, you are at full health.");
                return;
            }
            
            mc.currenthp = mc.maxhp;
            this.shortRest = 3;
            this.longRest = 0;
            
            alert("You take a long rest and feel completely refreshed!");
            updateNav();
        } catch (error) {
            console.log("takeLongRest error:", error);
        }
    }
    
    reset() {
        try {
            this.shortRest = 3;
            this.longRest = 1;
            mc.currenthp = mc.maxhp;
            alert("You now are at full health.");
            updateNav();
        } catch (error) {
            console.log("restReset error:", error);
        }
    }
    
    updateRestDisplay() {
        try {
            if (!this.initialized) {
                this.initializeRestButtons();
                return;
            }
            
            const shortRestDisplay = document.getElementById('srest');
            const longRestDisplay = document.getElementById('lrest');
            
            if (shortRestDisplay) {
                shortRestDisplay.textContent = `Short Rests: ${this.shortRest}/3`;
            }
            
            if (longRestDisplay) {
                longRestDisplay.textContent = `Long Rests: ${this.longRest}/1`;
            }
        } catch (error) {
            console.log("updateRestDisplay error (non-critical):", error);
        }
    }
    
    hide() {
        try {
            const restElement = document.getElementById('restee');
            if (restElement) restElement.style.display = 'none';
        } catch (error) {
            console.log("hideRest error (non-critical):", error);
        }
    }
    
    show() {
        try {
            const restElement = document.getElementById('restee');
            if (restElement) restElement.style.display = 'block';
        } catch (error) {
            console.log("unhideRest error (non-critical):", error);
        }
    }
}

// ===== PLAYER STATS SYSTEM =====
class PlayerStatsManager {
    constructor() {
        this.elements = {};
        this.initialized = false;
    }
    
    initializeStatusElements() {
        try {
            // Get DOM elements for status display with error checking
            this.elements = {
                level: document.getElementById('level-status'),
                health: document.getElementById('health-status'),
                attack: document.getElementById('attack-status'),
                gold: document.getElementById('gold-status'),
                weapon: document.getElementById('weapon'),
                helm: document.getElementById('helm'),
                cloak: document.getElementById('cloak'),
                armor: document.getElementById('armor'),
                expBar: document.getElementById('expstatus')
            };
            
            this.initialized = true;
            // Only update if we successfully found elements
            this.updateAll();
        } catch (error) {
            console.log("PlayerStatsManager initialization error (non-critical):", error);
        }
    }
    
    updateAll() {
        if (!this.initialized) {
            this.initializeStatusElements();
        }
        
        try {
            this.updateStats();
            this.updateEquipment();
            this.updateExpBar();
            this.recalculatePlayerStats();
        } catch (error) {
            console.log("PlayerStatsManager update error (non-critical):", error);
        }
    }
    
    updateStats() {
        try {
            if (this.elements.level) {
                this.elements.level.textContent = `Level: ${mc.level}`;
            }
            
            if (this.elements.health) {
                this.elements.health.textContent = `Health: ${mc.currenthp}/${mc.maxhp}`;
            }
            
            if (this.elements.attack) {
                this.elements.attack.textContent = `Attack: ${mc.minatk}-${mc.maxatk}`;
            }
            
            if (this.elements.gold) {
                this.elements.gold.textContent = `Gold: ${mc.gp}`;
            }
        } catch (error) {
            console.log("updateStats error (non-critical):", error);
        }
    }
    
    updateEquipment() {
        try {
            if (!mc.equip || !Array.isArray(mc.equip)) return;
            
            const equipmentSlots = ['weapon', 'helm', 'cloak', 'armor'];
            const equipmentLabels = ['Weapon', 'Helm', 'Cloak', 'Armor'];
            
            equipmentSlots.forEach((slot, index) => {
                const element = this.elements[slot];
                if (!element || !mc.equip[index]) return;
                
                const item = mc.equip[index];
                if (!item || !item.name) return;
                
                // Remove old rarity classes
                ['c', 'uc', 'r', 'e', 'l'].forEach(rarity => {
                    element.classList.remove(rarity);
                });
                
                // Update text and add new rarity class
                element.textContent = `${equipmentLabels[index]}: ${item.name}`;
                if (item.rarity) {
                    element.classList.add(item.rarity);
                }
            });
        } catch (error) {
            console.log("updateEquipment error (non-critical):", error);
        }
    }
    
    updateExpBar() {
        try {
            if (!this.elements.expBar || !mc.reqexp) return;
            
            const expPercent = (mc.exp / mc.reqexp) * 100;
            this.elements.expBar.style.width = expPercent + '%';
        } catch (error) {
            console.log("updateExpBar error (non-critical):", error);
        }
    }
    
    recalculatePlayerStats() {
        try {
            if (!mc.equip || !Array.isArray(mc.equip)) {
                console.log("mc.equip not properly initialized, skipping recalculation");
                return;
            }
            
            mc.maxhp = mc.basehp + mc.equip.reduce((sum, item) => sum + (item?.hp || 0), 0);
            mc.minatk = 1 + mc.equip.reduce((sum, item) => sum + (item?.atk || 0), 0);
            mc.maxatk = mc.baseatk + mc.equip.reduce((sum, item) => sum + (item?.atk || 0), 0);
            
            // Ensure current HP doesn't exceed max HP
            if (mc.currenthp > mc.maxhp) {
                mc.currenthp = mc.maxhp;
            }
        } catch (error) {
            console.log("recalculatePlayerStats error (non-critical):", error);
        }
    }
}

// ===== LEVEL SYSTEM =====
export function checkLevel() {
    try {
        if (mc.exp >= mc.reqexp) {
            mc.level++;
            mc.reqexp += 10 * mc.level;
            mc.exp = 0;
            
            const hpBonus = 5;
            const atkBonus = 1;
            
            mc.basehp += hpBonus;
            mc.baseatk += atkBonus;
            
            alert(`Level Up! You are now level ${mc.level}!\nHealth: +${hpBonus}\nAttack: +${atkBonus}`);
            
            if (playerStatsManager) {
                playerStatsManager.recalculatePlayerStats();
                playerStatsManager.updateAll();
            }
        }
    } catch (error) {
        console.log("checkLevel error:", error);
    }
}

// ===== INVENTORY MANAGEMENT =====
export function addToInventory(itemTag) {
    try {
        const element = document.getElementById(itemTag);
        if (element) {
            element.style.display = 'block';
        }
    } catch (error) {
        console.log("addToInventory error (non-critical):", error);
    }
}

export function removeFromInventory(itemTag) {
    try {
        const element = document.getElementById(itemTag);
        if (element) {
            element.style.display = 'none';
        }
    } catch (error) {
        console.log("removeFromInventory error (non-critical):", error);
    }
}

// ===== HEALTH SYSTEM =====
export function checkHealth() {
    try {
        if (mc.currenthp <= 0) {
            // Import gameOver function when needed to avoid circular dependencies
            import('./game.js').then(({ gameOver }) => {
                gameOver();
            });
        }
    } catch (error) {
        console.log("checkHealth error:", error);
    }
}

// ===== SAFE INITIALIZATION =====
let restSystem = null;
let playerStatsManager = null;

export function initializeSupportSystems() {
    try {
        if (!restSystem) {
            restSystem = new RestSystem();
            restSystem.initializeRestButtons();
        }
        
        if (!playerStatsManager) {
            playerStatsManager = new PlayerStatsManager();
            playerStatsManager.initializeStatusElements();
        }
        
        console.log("Support systems initialized successfully");
    } catch (error) {
        console.log("Support systems initialization error (non-critical):", error);
    }
}

// ===== MASTER UPDATE FUNCTION =====
export function update() {
    try {
        if (!playerStatsManager) {
            initializeSupportSystems();
        }
        if (playerStatsManager) {
            playerStatsManager.updateAll();
        }
        checkHealth();
        checkLevel();
        removeElementsByClass('btn');
        
        // Check crafting recipes if crafting system is available
        try {
            import('./crafting.js').then(({ checkRec }) => {
                if (typeof checkRec === 'function') {
                    checkRec();
                }
            });
        } catch (error) {
            // Crafting system not available
        }
    } catch (error) {
        console.log("update error:", error);
    }
}

// ===== CONVENIENCE FUNCTIONS =====
export function updateNav() {
    try {
        if (!playerStatsManager) {
            initializeSupportSystems();
        }
        if (playerStatsManager) {
            playerStatsManager.updateAll();
        }
    } catch (error) {
        console.log("updateNav error (non-critical):", error);
    }
}

export function expUpdate() {
    try {
        if (!playerStatsManager) {
            initializeSupportSystems();
        }
        if (playerStatsManager) {
            playerStatsManager.updateExpBar();
        }
    } catch (error) {
        console.log("expUpdate error (non-critical):", error);
    }
}

export function restReset() {
    try {
        if (!restSystem) {
            initializeSupportSystems();
        }
        if (restSystem) {
            restSystem.reset();
        }
    } catch (error) {
        console.log("restReset error:", error);
    }
}

export function hideRest() {
    try {
        if (!restSystem) {
            initializeSupportSystems();
        }
        if (restSystem) {
            restSystem.hide();
        }
    } catch (error) {
        console.log("hideRest error (non-critical):", error);
    }
}

export function unhideRest() {
    try {
        if (!restSystem) {
            initializeSupportSystems();
        }
        if (restSystem) {
            restSystem.show();
        }
    } catch (error) {
        console.log("unhideRest error (non-critical):", error);
    }
}

// ===== EXPORTS =====
export { restSystem, playerStatsManager };

// Legacy exports for backward compatibility
export const levelStatus = document.getElementById('level-status');
export const healthStatus = document.getElementById('health-status');
export const attackStatus = document.getElementById('attack-status');
export const goldStatus = document.getElementById('gold-status');

// Dynamic rest exports
export function getShortRest() {
    return restSystem ? restSystem.shortRest : 3;
}

export function getLongRest() {
    return restSystem ? restSystem.longRest : 1;
}