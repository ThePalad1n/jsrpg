/*
Evan Green
07/17/2025
JSRPG

Note:
! = beginning of exclusive funtions or sections for each area
^ = Features to be added
* = seperation of areas
? = used to seperate battle scenes

*/

//!===========================================================================================
// ===== IMPORTS =====
import { mc } from "./player.js";
import { spider, lion, goblin, witch, golem, golemitea, golemiteb } from "./enemies.js";
import { 
    placeholderItems, 
    worldItems, 
    specialItems,
    ITEM_REGISTRY 
} from "./items.js";
import { 
    getRandomInt, 
    getRandomInte, 
    makeButton, 
    updateNav, 
    checkLevel, 
    update, 
    addToInventory, 
    restReset, 
    hideRest, 
    unhideRest,
    initializeSupportSystems
} from "./support.js";
import { shopSystem } from "./shop.js";
import { craftingSystem } from "./crafting.js";

// ===== EMERGENCY FALLBACKS =====
window.updateNav = window.updateNav || function() { console.log("updateNav fallback"); };
window.checkLevel = window.checkLevel || function() { console.log("checkLevel fallback"); };
window.unhideRest = window.unhideRest || function() { console.log("unhideRest fallback"); };
window.hideRest = window.hideRest || function() { console.log("hideRest fallback"); };

// ===== EXPORTS =====
export { gameText, mc, playerArmor, playerWeapon, playerCloak, playerHelm, inventory };
export { gameOver };

// ===== INITIALIZE PLAYER EQUIPMENT =====
mc.equip = [
    placeholderItems.weapon,
    placeholderItems.helmet, 
    placeholderItems.cloak,
    placeholderItems.armor
];

// ===== GAME ELEMENTS =====
let gameText = document.getElementById("story");
let buttoner = document.createElement('h1').appendChild(document.createElement('h1'));
let text = document.querySelector("#game-text");
text.textContent = "Welcome to the Journey. Press start to begin.";

// Player equipment display elements
var playerWeapon = document.getElementById('weapon');
var playerHelm = document.getElementById('helm');
var playerCloak = document.getElementById('cloak');
var playerArmor = document.getElementById('armor');
var inventory = mc.inventory;

// Initialize equipment display
playerWeapon.append(`${mc.equip[0].name}`);
playerHelm.append(`${mc.equip[1].name}`);
playerCloak.append(`${mc.equip[2].name}`);
playerArmor.append(`${mc.equip[3].name}`);

// ===== CORE GAME ENGINE =====
class GameEngine {
    constructor() {
        this.currentScene = null;
        this.gameState = {
            defeatedEnemies: new Set(),
            foundItems: new Set(),
            visitedAreas: new Set(),
            completedQuests: new Set()
        };
    }

    // Generic scene handler with debugging
    showScene(sceneData) {
        console.log("=== SHOW SCENE DEBUG START ===");
        console.log("Scene data:", sceneData);
        
        try {
            text.textContent = sceneData.text;
            console.log("Text content set");
            
            this.clearButtons();
            console.log("Buttons cleared");
            
            sceneData.options.forEach((option, index) => {
                console.log(`Processing option ${index}:`, option);
                
                if (option.condition && !option.condition()) {
                    console.log(`Skipping option ${index} due to condition`);
                    return;
                }
                
                const letter = String.fromCharCode(97 + index);
                console.log(`Creating button ${letter}:`, option.text);
                
                const buttonElement = makeButton(letter, option.text);
                if (buttonElement) {
                    buttonElement.onclick = () => {
                        console.log(`Button ${letter} clicked`);
                        update();
                        if (option.action) {
                            console.log("Executing option action...");
                            option.action();
                        }
                    };
                    console.log(`Button ${letter} event listener set`);
                } else {
                    console.error(`ERROR: Failed to create button ${letter}!`);
                }
            });
            
            this.currentScene = sceneData.id || 'unknown';
            console.log("Current scene set to:", this.currentScene);
            console.log("showScene completed successfully");
        } catch (error) {
            console.error("ERROR in showScene:", error);
            alert("There was an error displaying the scene. Game will continue.");
        }
        console.log("=== SHOW SCENE DEBUG END ===");
    }

    clearButtons() {
        try {
            ['a', 'b', 'c', 'd'].forEach(letter => {
                const btn = document.getElementById(`option${letter}`);
                if (btn) btn.remove();
            });
        } catch (error) {
            console.log("clearButtons error (non-critical):", error);
        }
    }

    // Generic item handler with auto-equip logic
    handleItemFound(item, forceAdd = false) {
        try {
            const shouldEquip = item.equipSlot >= 0 && item.isBetterThan && item.isBetterThan(mc.equip[item.equipSlot]);
            
            if (shouldEquip) {
                alert(`Item Found: ${item.name}\n${item.primaryStat}: +${item[item.primaryStat]}\nItem has been equipped!`);
                mc.equip[item.equipSlot] = item;
                this.updatePlayerStats();
            } else if (forceAdd) {
                alert(`Item Found: ${item.name}\nItem has been added to your inventory!`);
            }
            
            if (mc.addToInventory && typeof mc.addToInventory === 'function') {
                mc.addToInventory(item.name);
            }
            if (addToInventory && typeof addToInventory === 'function') {
                addToInventory(item.tag);
            }
            updateNav();
        } catch (error) {
            console.log("handleItemFound error:", error);
            alert(`Item Found: ${item?.name || 'Unknown Item'}`);
        }
    }

    // Generic combat victory handler with debugging
    handleVictoryRewards(enemy, items = []) {
        console.log("=== VICTORY REWARDS DEBUG START ===");
        console.log("Enemy:", enemy.name);
        console.log("Items:", items.map(i => i?.name || 'undefined'));
        
        try {
            const rewards = enemy.getRewards();
            console.log("Rewards received:", rewards);
            
            console.log("About to call mc.earnGold...");
            if (typeof mc.earnGold === 'function') {
                mc.earnGold(rewards.gp);
                console.log("mc.earnGold completed");
            } else {
                console.error("ERROR: mc.earnGold is not a function!");
            }
            
            console.log("About to call mc.gainExp...");
            if (typeof mc.gainExp === 'function') {
                mc.gainExp(rewards.exp);
                console.log("mc.gainExp completed");
            } else {
                console.error("ERROR: mc.gainExp is not a function!");
            }
            
            items.forEach(item => {
                if (item) {
                    this.handleItemFound(item);
                }
            });
            
            this.gameState.defeatedEnemies.add(enemy.name);
            
            console.log("About to call checkLevel...");
            if (typeof checkLevel === 'function') {
                checkLevel();
                console.log("checkLevel completed");
            } else {
                console.error("ERROR: checkLevel is not a function!");
            }
            
            console.log("About to call updateNav...");
            if (typeof updateNav === 'function') {
                updateNav();
                console.log("updateNav completed");
            } else {
                console.error("ERROR: updateNav is not a function!");
            }
            
            console.log("About to call unhideRest...");
            if (typeof unhideRest === 'function') {
                unhideRest();
                console.log("unhideRest completed");
            } else {
                console.error("ERROR: unhideRest is not a function!");
            }
            
            console.log("=== VICTORY REWARDS COMPLETED ===");
        } catch (error) {
            console.error("CRITICAL ERROR in handleVictoryRewards:", error);
            // Continue anyway
            this.gameState.defeatedEnemies.add(enemy.name);
        }
    }

    updatePlayerStats() {
        try {
            if (mc.recalculateStats && typeof mc.recalculateStats === 'function') {
                mc.recalculateStats();
            }
            updateNav();
        } catch (error) {
            console.log("updatePlayerStats error:", error);
        }
    }

    // State management
    isEnemyDefeated(enemyName) {
        return this.gameState.defeatedEnemies.has(enemyName);
    }

    hasVisitedArea(areaName) {
        return this.gameState.visitedAreas.has(areaName);
    }

    visitArea(areaName) {
        this.gameState.visitedAreas.add(areaName);
    }
}

// ===== UNIFIED COMBAT SYSTEM =====
class CombatSystem {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.currentEnemy = null;
        this.deathId = 0;
        this.onVictory = null;
        this.victoryItems = [];
        this.combatLog = [];
    }

    startCombat(enemy, deathId, onVictory, items = []) {
        this.currentEnemy = enemy.clone ? enemy.clone() : enemy;
        this.deathId = deathId;
        this.onVictory = onVictory;
        this.victoryItems = items;
        this.combatLog = [];
        
        hideRest();
        this.showCombatStatus();
    }

    showCombatStatus(lastAction = null) {
        const enemy = this.currentEnemy;
        
        // Build combat status display
        let statusText = `=== COMBAT ===\n`;
        statusText += `Enemy: ${enemy.name}\n`;
        statusText += `HP: ${enemy.hp}/${enemy.maxhp}\n`;
        statusText += `Attack: ${enemy.minatk}-${enemy.maxatk}\n\n`;
        
        statusText += `Your HP: ${mc.currenthp}/${mc.maxhp}\n`;
        statusText += `Your Attack: ${mc.minatk}-${mc.maxatk}\n\n`;
        
        // Add last action result if any
        if (lastAction) {
            statusText += `${lastAction}\n\n`;
        }
        
        statusText += `What will you do?`;
        
        this.game.showScene({
            id: 'combat',
            text: statusText,
            options: [
                { text: 'Attack', action: () => this.attack() },
                { text: 'Evade', action: () => this.evade() },
                { text: 'Flee', action: () => this.flee() }
            ]
        });
    }

    attack() {
        const enemy = this.currentEnemy;
        console.log("Attack called, enemy HP:", enemy.hp);
        
        if (enemy.dodgeChance && getRandomInt(1, 100) <= enemy.dodgeChance) {
            this.enemyDodged();
            return;
        }

        const playerDamage = mc.getAttackDamage();
        const enemyDamage = enemy.attack();
        
        mc.takeDamage(enemyDamage);
        enemy.takeDamage(playerDamage);
        
        updateNav();
        
        // Create action log
        let actionLog = `You attack for ${playerDamage} damage!\n`;
        actionLog += `${enemy.name} strikes back for ${enemyDamage} damage!`;
        
        console.log("After damage - enemy HP:", enemy.hp, "enemy isDead:", enemy.isDead());
        
        if (enemy.isDead()) {
            console.log("Enemy is dead, calling victory...");
            actionLog += `\n\n${enemy.name} has been defeated!`;
            this.showVictoryScreen(actionLog);
        } else if (!mc.isAlive()) {
            death(this.deathId);
        } else {
            this.showCombatStatus(actionLog);
        }
    }

    evade() {
        const enemy = this.currentEnemy;
        const evadeSuccess = getRandomInt(1, 100) <= enemy.evade;
        
        let actionLog;
        
        if (evadeSuccess) {
            const counterDamage = mc.getAttackDamage();
            enemy.takeDamage(counterDamage);
            actionLog = `You successfully evade and counter for ${counterDamage} damage!`;
            
            if (enemy.isDead()) {
                actionLog += `\n\n${enemy.name} has been defeated!`;
                this.showVictoryScreen(actionLog);
                return;
            }
        } else {
            const enemyDamage = enemy.attack();
            mc.takeDamage(enemyDamage);
            updateNav();
            actionLog = `Your evasion failed! ${enemy.name} attacks for ${enemyDamage} damage!`;
            
            if (!mc.isAlive()) {
                death(this.deathId);
                return;
            }
        }
        
        this.showCombatStatus(actionLog);
    }

    flee() {
        const enemy = this.currentEnemy;
        
        if (enemy.cannotFlee) {
            this.showCombatStatus("You can't flee from this enemy!");
            return;
        }
        
        const fleeSuccess = getRandomInt(1, 100) <= (enemy.fleeChance || 5);
        
        if (fleeSuccess) {
            enemy.hp = 0; // Mark as defeated for story purposes
            unhideRest();
            update();
            if (this.onVictory) this.onVictory(true); // Pass true for fled
        } else {
            const enemyDamage = enemy.attack();
            mc.takeDamage(enemyDamage);
            updateNav();
            
            const actionLog = `Your escape failed! ${enemy.name} attacks for ${enemyDamage} damage!`;
            
            if (!mc.isAlive()) {
                death(this.deathId);
            } else {
                this.showCombatStatus(actionLog);
            }
        }
    }

    enemyDodged() {
        const enemyDamage = this.currentEnemy.attack();
        mc.takeDamage(enemyDamage);
        updateNav();
        
        const actionLog = `${this.currentEnemy.name} avoided your attack and strikes back for ${enemyDamage} damage!`;
        
        if (!mc.isAlive()) {
            death(this.deathId);
        } else {
            this.showCombatStatus(actionLog);
        }
    }

    showVictoryScreen(finalAction) {
        const enemy = this.currentEnemy;
        const rewards = enemy.getRewards();
        
        let victoryText = `${finalAction}\n\n`;
        victoryText += `=== VICTORY! ===\n`;
        victoryText += `Defeated: ${enemy.name}\n`;
        victoryText += `Gold Gained: ${rewards.gp}\n`;
        victoryText += `Experience Gained: ${rewards.exp}\n`;
        
        if (this.victoryItems.length > 0) {
            victoryText += `\nItems Found:\n`;
            this.victoryItems.forEach(item => {
                if (item && item.name) {
                    victoryText += `- ${item.name}\n`;
                }
            });
        }
        
        this.game.showScene({
            id: 'victory',
            text: victoryText,
            options: [
                { 
                    text: 'Continue', 
                    action: () => this.victory(false)
                }
            ]
        });
    }

    victory(fled = false) {
        console.log("=== VICTORY DEBUG START ===");
        console.log("Victory called, fled:", fled);
        
        try {
            if (!fled) {
                console.log("About to call handleVictoryRewards...");
                this.game.handleVictoryRewards(this.currentEnemy, this.victoryItems);
                console.log("handleVictoryRewards completed successfully");
            }
            
            if (this.onVictory) {
                console.log("About to call onVictory callback...");
                this.onVictory(fled);
                console.log("onVictory callback completed successfully");
            } else {
                console.error("ERROR: No onVictory callback found!");
                this.manualNavigation();
            }
        } catch (error) {
            console.error("ERROR in victory method:", error);
            this.manualNavigation();
        }
        console.log("=== VICTORY DEBUG END ===");
    }

    manualNavigation() {
        console.log("Manual navigation triggered");
        try {
            this.game.showScene({
                text: "You are victorious! What will you do next?",
                options: [
                    { 
                        text: 'Continue your journey', 
                        action: () => {
                            try {
                                areaTwoPath();
                            } catch (error) {
                                console.error("Navigation error:", error);
                                alert("Navigation error. Click OK to restart.");
                                location.reload();
                            }
                        }
                    }
                ]
            });
        } catch (error) {
            console.error("Manual navigation failed:", error);
            if (confirm("Victory! Click OK to restart the game.")) {
                location.reload();
            }
        }
    }
}

// ===== STORY SEQUENCE HANDLER =====
class StorySequence {
    constructor(gameEngine) {
        this.game = gameEngine;
    }
    
    playSequence(scenes, currentIndex = 0) {
        if (currentIndex >= scenes.length) return;
        
        const scene = scenes[currentIndex];
        const options = [{
            text: currentIndex === scenes.length - 1 ? scene.finalButtonText : 'Next',
            action: () => {
                if (currentIndex === scenes.length - 1) {
                    scene.finalAction();
                } else {
                    this.playSequence(scenes, currentIndex + 1);
                }
            }
        }];
        
        if (scene.skippable && currentIndex < scenes.length - 1) {
            options.push({
                text: 'Skip Intro',
                action: scene.skipAction
            });
        }
        
        this.game.showScene({
            id: scene.id,
            text: scene.text,
            options: options
        });
    }
}

// ===== SCENE DEFINITIONS =====
const areaZeroSequence = [
    {
        id: 'areaZeroA',
        text: "A large man and his Orange cat, Kitty, once lived on a secluded ranch on the outskirts of the forest.",
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroB',
        text: "He made a peaceful life for the two of them, living off the land and only having minor encounters with the local wildlife.",
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroC',
        text: "Until one day when the two were celebrating Kitty's 20th birthday, the unthinkable happened...",
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroD',
        text: "As he returned from the kitchen with the tuna and chicken birthday cake, the door was broken open and the cat was nowhere to be found, with muddy footprints everywhere.",
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroE',
        text: '"KITTY!" he screamed.',
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroF',
        text: "He frantically looked around and rushed to the door. In the distance, he saw shadowy figures running off with his beloved pet.",
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroG',
        text: 'With no hesitation he ran out the door bringing nothing with him. "I swear I\'ll do everything in my power to get you back!"',
        skippable: true,
        skipAction: () => gameEngine.showScene(SCENES.startGame)
    },
    {
        id: 'areaZeroH',
        text: "And so our adventure began on his quest to find his beloved animal. Will he be able to find Kitty in time?",
        finalButtonText: 'Start Your Journey',
        finalAction: () => gameEngine.showScene(SCENES.startGame)
    }
];

const SCENES = {
    mainMenu: {
        id: 'mainMenu',
        text: "Welcome to the Journey. Press start to begin.",
        options: [
            { text: 'Start Game', action: () => storySequence.playSequence(areaZeroSequence) }
        ]
    },
    
    startGame: {
        id: 'startGame',
        text: "You enter the forest where you last saw the shadowy figures. What do you want to do?",
        options: [
            { text: 'Check the forest', action: () => areaOneForest() },
            { text: 'Follow the path', action: () => areaTwoPath() }
        ]
    }
};

// ===== GAME AREAS =====
function areaOneForest() {
    gameEngine.showScene({
        id: 'areaOneForest',
        text: "You trek through the woods as visibility gets lower. It becomes so dark you can no longer see your own hands. You stop and hear branches snapping.",
        options: [
            { text: 'Run', action: () => areaOneClearing() },
            { text: 'Investigate', action: () => death(1) }
        ]
    });
}

function areaOneClearing() {
    gameEngine.showScene({
        id: 'areaOneClearing', 
        text: "You run through the dark woods, trip over a root, but make it to a clearing. The noises are getting closer. What do you do?",
        options: [
            { text: 'Fight', action: () => fightSpider() },
            { 
                text: 'Search for items', 
                action: () => {
                    gameEngine.handleItemFound(worldItems.stick);
                    fightSpider();
                }
            },
            { text: 'Hide', action: () => death(2) }
        ]
    });
}

function areaTwoPath() {
    gameEngine.visitArea('areaTwoPath');
    gameEngine.showScene({
        id: 'areaTwoPath',
        text: "You head down the path. The forest becomes less thick and you see a clearing ahead. What would you like to do?",
        options: [
            { text: 'Walk out into the clearing', action: () => areaTwoClearing() },
            { text: 'Investigate the area', action: () => areaTwoInvestigate() }
        ]
    });
    restReset();
}

function areaTwoClearing() {
    const options = [];
    
    if (!gameEngine.isEnemyDefeated('Swamp Witch')) {
        options.push({ text: 'Follow the tree line to the left', action: () => areaTwoSwampA() });
    }
    
    if (!gameEngine.isEnemyDefeated('Goblin') || !gameEngine.isEnemyDefeated('Lion')) {
        options.push({ text: 'Walk towards the hill', action: () => areaTwoSavannaA() });
    }
    
    if (!gameEngine.isEnemyDefeated('Golem')) {
        options.push({ text: 'Head towards the rock structures', action: () => fightGolem() });
    }
    
    gameEngine.showScene({
        id: 'areaTwoClearing',
        text: "You see a savanna with waist-high grass. Ahead is a small hill, to the left the tree line continues, and to the right are rock formations.",
        options: options
    });
}

function areaTwoInvestigate() {
    gameEngine.showScene({
        id: 'areaTwoInvestigate',
        text: "You investigate and see smoke from a hill, a purple haze from trees, and moving rocks.",
        options: [{ text: 'Enter clearing', action: () => areaTwoClearing() }]
    });
}

// ===== SAVANNA AREA =====
function areaTwoSavannaA() {
    gameEngine.showScene({
        id: 'areaTwoSavannaA',
        text: "You walk out into the savanna. There is a nice cross breeze. What would you like to do?",
        options: [
            { text: 'Keep walking towards the hill', action: () => areaTwoSavannaB() },
            { text: 'Go back to the tree line', action: () => areaTwoClearing() }
        ]
    });
}

function areaTwoSavannaB() {
    gameEngine.showScene({
        id: 'areaTwoSavannaB',
        text: "You make it to the top of the hill and notice a little hut built along a river flowing from right to left. What would you like to do?",
        options: [
            { text: 'Investigate the hut', action: () => areaTwoSavannaC() },
            { 
                text: 'Go back to savanna', 
                action: () => gameEngine.isEnemyDefeated('Lion') ? areaTwoClearing() : areaTwoSavannaAB(),
                condition: () => !gameEngine.isEnemyDefeated('Lion')
            },
            {
                text: 'Go back to the tree line',
                action: () => areaTwoClearing(),
                condition: () => gameEngine.isEnemyDefeated('Lion')
            }
        ]
    });
}

function areaTwoSavannaAB() {
    gameEngine.showScene({
        id: 'areaTwoSavannaAB',
        text: "You walk back into the savanna. There is no longer a breeze. Just silence. What would you like to do?",
        options: [
            { text: 'Keep walking towards the hill', action: () => fightLion() },
            { text: 'Go back to the tree line', action: () => fightLion() }
        ]
    });
}

function areaTwoSavannaC() {
    gameEngine.showScene({
        id: 'areaTwoSavannaC',
        text: "You approach the hut. It's made of forest wood with a straw roof. What would you like to do?",
        options: [
            { text: 'Investigate the inside', action: () => areaTwoHutInside() },
            { text: 'Investigate the outside', action: () => areaTwoHutOutside() }
        ]
    });
}

function areaTwoHutInside() {
    if (!gameEngine.isEnemyDefeated('Goblin')) {
        gameEngine.showScene({
            id: 'areaTwoHutInside',
            text: "You enter the quiet hut. It looks like something is living here. There's a pile of grass that resembles a cot. What would you like to do?",
            options: [
                { 
                    text: 'Keep Investigating', 
                    action: () => {
                        gameEngine.handleItemFound(worldItems.helmA);
                        areaTwoInsideInvestigation();
                    },
                    condition: () => !mc.hasInInventory('Leather Helm')
                },
                {
                    text: 'Go back outside',
                    action: () => areaTwoSavannaC(),
                    condition: () => mc.hasInInventory('Leather Helm')
                }
            ]
        });
    } else {
        gameEngine.showScene({
            id: 'areaTwoHutInsideEmpty',
            text: "You already investigated the hut. Not much here anymore.",
            options: [{ text: 'Go back outside', action: () => areaThreeRiverGGGG() }]
        });
    }
}

function areaTwoInsideInvestigation() {
    gameEngine.showScene({
        id: 'areaTwoInsideInvestigation',
        text: "You're inside the hut rummaging around. You find a couple gold pieces. But before you can do anything else, you hear a noise from outside. What do you do?",
        options: [
            { 
                text: 'Surprise the creature!', 
                action: () => {
                    const surpriseDamage = mc.getAttackDamage();
                    goblin.takeDamage(surpriseDamage);
                    gameEngine.showScene({
                        text: `You surprise the creature and attack dealing ${surpriseDamage} damage! The goblin now has ${goblin.hp} health.`,
                        options: [{ text: 'Fight!', action: () => fightGoblin() }]
                    });
                }
            },
            { 
                text: 'Hide...', 
                action: () => {
                    const ambushDamage = getRandomInt(goblin.minatk, goblin.maxatk);
                    mc.takeDamage(ambushDamage);
                    gameEngine.showScene({
                        text: `You try to hide but the creature bursts in and sees you. It attacks dealing ${ambushDamage} damage.`,
                        options: [{ text: 'Fight!', action: () => fightGoblin() }]
                    });
                }
            }
        ]
    });
}

function areaTwoHutOutside() {
    if (!gameEngine.isEnemyDefeated('Goblin')) {
        gameEngine.showScene({
            id: 'areaTwoHutOutside',
            text: "You're looking around the outside when suddenly a goblin appears in front of you. He is rambling and swinging his spear above his head. He seems upset. What will you do?",
            options: [{ text: 'Fight!', action: () => fightGoblin() }]
        });
    } else {
        gameEngine.showScene({
            id: 'areaTwoHutOutsideEmpty',
            text: "Not really any other clues or materials to gather here. Should probably push forward.",
            options: [
                { text: 'Go across river', action: () => areaThreeRiver() },
                { text: 'Go back to forest', action: () => areaTwoClearing() }
            ]
        });
    }
}

// ===== SWAMP AREA =====
function areaTwoSwampA() {
    gameEngine.showScene({
        id: 'areaTwoSwampA',
        text: "You follow the tree line around the savanna. A pungent smell fills the air. The trees are getting thinner and the ground feels damp. What would you like to do?",
        options: [{ text: 'Continue through the thinning woods', action: () => areaTwoSwampB() }]
    });
}

function areaTwoSwampB() {
    gameEngine.showScene({
        id: 'areaTwoSwampB',
        text: "You keep pushing on, holding your nose, when you encounter a swamp. There's a little home propped above the water with smoke billowing from the chimney. What would you like to do?",
        options: [
            { text: 'Investigate the swamp', action: () => areaTwoSwampC() },
            { text: 'Investigate the home', action: () => areaTwoWitchHutA() }
        ]
    });
}

function areaTwoSwampC() {
    gameEngine.showScene({
        id: 'areaTwoSwampC',
        text: "You look around and find several piles of skin scattered around the swamp. No bones or organs, just piles of skin from various creatures. As you investigate, you hear cackling from the swamp home. What would you like to do?",
        options: [
            { text: 'Investigate the house', action: () => areaTwoWitchHutA() },
            { text: 'Ignore it', action: () => death(7) }
        ]
    });
}

function areaTwoWitchHutA() {
    gameEngine.showScene({
        id: 'areaTwoWitchHutA',
        text: "You approach the hut as you drudge through purplish water. You notice the door is open and hear a faint voice of what appears to be an old lady. What do you want to do?",
        options: [
            { text: 'Ask "Who is there?"', action: () => areaTwoWitchHutB() },
            { text: 'Burst in and attack the woman', action: () => fightWitch() }
        ]
    });
}

function areaTwoWitchHutB() {
    gameEngine.showScene({
        id: 'areaTwoWitchHutB',
        text: 'You ask "Who is there?" After a few moments you hear: "Just a troubled old lady, would you mind coming in and helping me with something?"',
        options: [
            { text: 'Go in and help her', action: () => death(6) },
            { text: 'Go in and attack the woman', action: () => fightWitch() }
        ]
    });
}

// ===== COMBAT FUNCTIONS =====
function fightSpider() {
    console.log("Starting spider fight...");
    
    combatSystem.startCombat(
        spider,
        3,
        (fled) => {
            console.log("Spider fight finished, fled:", fled);
            try {
                if (fled) {
                    gameEngine.showScene({
                        text: "You escaped from the spider and continue down the path.",
                        options: [{ text: 'Continue', action: () => areaTwoPath() }]
                    });
                } else {
                    gameEngine.showScene({
                        text: "You defeated the spider! The path ahead is now clear.",
                        options: [{ text: 'Go down the path', action: () => areaTwoPath() }]
                    });
                }
            } catch (error) {
                console.error("Error in spider victory callback:", error);
                areaTwoPath();
            }
        }
    );
}

function fightLion() {
    combatSystem.startCombat(
        lion,
        4,
        () => {
            gameEngine.showScene({
                text: "After defeating the lion, what would you like to do?",
                options: [
                    { text: 'Walk back towards the hill', action: () => areaTwoSavannaC() },
                    { text: 'Go back to the tree line', action: () => areaTwoClearing() }
                ]
            });
        },
        [worldItems.lionHide]
    );
}

function fightGoblin() {
    combatSystem.startCombat(
        goblin,
        5,
        () => areaThreeRiverGG(),
        [worldItems.spear]
    );
}

function fightWitch() {
    combatSystem.startCombat(
        witch,
        8,
        (fled) => {
            if (fled) {
                gameEngine.showScene({
                    text: "You escape the witch's hut and run away through the swamp.",
                    options: [{ text: 'Keep Running', action: () => areaThreeRiverW() }]
                });
            } else {
                gameEngine.showScene({
                    text: "You kill the horrid witch. The room is littered with bones and flesh. Nothing really left for you here.",
                    options: [{ text: 'Exit Hut', action: () => areaThreeRiverW() }]
                });
            }
        },
        [worldItems.knife]
    );
}

function fightGolem() {
    combatSystem.startCombat(
        golem,
        8,
        () => fightGolemites(),
        []
    );
}

// ===== MULTI-ENEMY COMBAT (GOLEMITES) =====
function fightGolemites() {
    // Reset golemites to full health
    golemitea.hp = golemitea.maxhp;
    golemiteb.hp = golemiteb.maxhp;
    
    showGolemiteCombat();
}

function showGolemiteCombat(lastAction = null) {
    // Check victory condition
    if (golemitea.isDead() && golemiteb.isDead()) {
        let victoryText = "=== VICTORY! ===\n";
        victoryText += "Both golemites have been defeated!\n\n";
        victoryText += "Items Found:\n";
        victoryText += "- Rock Helm\n";
        victoryText += "- Stone Fragment\n";
        
        gameEngine.showScene({
            id: 'golemiteVictory',
            text: victoryText,
            options: [
                { 
                    text: 'Continue', 
                    action: () => {
                        gameEngine.handleVictoryRewards(golemitea, [worldItems.rockHelm, specialItems.stoneA]);
                        areaThreeRiverG();
                    }
                }
            ]
        });
        return;
    }
    
    // Build combat status display
    let statusText = `=== GOLEMITE COMBAT ===\n`;
    statusText += `Golemite A: ${golemitea.hp}/${golemitea.maxhp} HP\n`;
    statusText += `Golemite B: ${golemiteb.hp}/${golemiteb.maxhp} HP\n\n`;
    statusText += `Your HP: ${mc.currenthp}/${mc.maxhp}\n`;
    statusText += `Your Attack: ${mc.minatk}-${mc.maxatk}\n\n`;
    
    // Add last action result if any
    if (lastAction) {
        statusText += `${lastAction}\n\n`;
    }
    
    statusText += `What will you do?`;
    
    const options = [];
    
    // Add attack options for living golemites
    if (!golemitea.isDead()) {
        options.push({
            text: 'Attack Golemite A',
            action: () => attackGolemite('A')
        });
    }
    
    if (!golemiteb.isDead()) {
        options.push({
            text: 'Attack Golemite B',
            action: () => attackGolemite('B')
        });
    }
    
    // Add flee option
    options.push({
        text: 'Attempt to Flee',
        action: () => attemptFleeGolemites()
    });
    
    gameEngine.showScene({
        id: 'golemiteCombat',
        text: statusText,
        options: options
    });
}

function attackGolemite(target) {
    try {
        const damage = mc.getAttackDamage();
        let targetGolemite = target === 'A' ? golemitea : golemiteb;
        
        // Player attacks
        targetGolemite.takeDamage(damage);
        
        let actionLog = `You attack Golemite ${target} for ${damage} damage!\n`;
        
        // Check if both are dead after this attack
        if (golemitea.isDead() && golemiteb.isDead()) {
            actionLog += `Golemite ${target} crumbles to dust!\nBoth golemites have been defeated!`;
            showGolemiteCombat(actionLog);
            return;
        }
        
        // Living golemites counter-attack
        let totalDamage = 0;
        
        if (!golemitea.isDead()) {
            const damageA = golemitea.attack();
            totalDamage += damageA;
            actionLog += `Golemite A strikes for ${damageA} damage!\n`;
        }
        
        if (!golemiteb.isDead()) {
            const damageB = golemiteb.attack();
            totalDamage += damageB;
            actionLog += `Golemite B strikes for ${damageB} damage!\n`;
        }
        
        // Apply damage to player
        mc.takeDamage(totalDamage);
        updateNav();
        
        actionLog += `Total damage taken: ${totalDamage}`;
        
        // Check if player died
        if (!mc.isAlive()) {
            death(9);
            return;
        }
        
        // Continue the combat with action log
        showGolemiteCombat(actionLog);
        
    } catch (error) {
        console.error("Error in golemite combat:", error);
        showGolemiteCombat("There was an error in combat, but the fight continues...");
    }
}

function attemptFleeGolemites() {
    const fleeChance = 25;
    const fleeRoll = getRandomInt(1, 100);
    
    if (fleeRoll <= fleeChance) {
        gameEngine.showScene({
            text: "You successfully escape from the golemites and retreat to safety!",
            options: [
                { text: 'Go back to clearing', action: () => areaTwoClearing() }
            ]
        });
    } else {
        // Failed to flee, golemites attack
        let totalDamage = 0;
        let actionLog = "Your escape attempt failed!\n";
        
        if (!golemitea.isDead()) {
            const damageA = golemitea.attack();
            totalDamage += damageA;
            actionLog += `Golemite A blocks your path and attacks for ${damageA} damage!\n`;
        }
        
        if (!golemiteb.isDead()) {
            const damageB = golemiteb.attack();
            totalDamage += damageB;
            actionLog += `Golemite B strikes for ${damageB} damage!\n`;
        }
        
        mc.takeDamage(totalDamage);
        updateNav();
        
        actionLog += `Total damage taken: ${totalDamage}`;
        
        if (!mc.isAlive()) {
            death(9);
            return;
        }
        
        showGolemiteCombat(actionLog);
    }
}

// ===== AREA THREE FUNCTIONS =====
function areaThreeRiverG() {
    gameEngine.showScene({
        id: 'areaThreeRiverG',
        text: "After defeating the Golem and Golemites, you notice you're next to a river. The river bank has footprints that go upstream. What do you do?",
        options: [
            { text: 'Follow footprints upstream', action: () => areaTwoSavannaC() },
            { text: 'Go back to the forest', action: () => areaTwoClearing() }
        ]
    });
}

function areaThreeRiverW() {
    gameEngine.showScene({
        id: 'areaThreeRiverW',
        text: "After the witch encounter, you notice you're next to a river. The river bank has footprints that go downstream. What do you do?",
        options: [
            { text: 'Follow footprints upstream', action: () => areaTwoSavannaC() },
            { text: 'Go back to the forest', action: () => areaTwoClearing() }
        ]
    });
}

function areaThreeRiverGG() {
    gameEngine.showScene({
        id: 'areaThreeRiverGG',
        text: "You defeat the goblin and find a collar with a bell. Next to the bell is a name tag. You flip it over and it reads 'Kitty'.",
        options: [{ text: 'Next', action: () => areaThreeRiverGGG() }]
    });
}

function areaThreeRiverGGG() {
    gameEngine.showScene({
        id: 'areaThreeRiverGGG',
        text: "You clench the collar and put it around your wrist. What do you want to do now?",
        options: [
            { text: 'Go across the river', action: () => areaThreeRiver() },
            { text: 'Go back to the forest', action: () => areaTwoClearing() }
        ]
    });
    
    if (!mc.hasInInventory('Kitty Collar')) {
        gameEngine.handleItemFound(specialItems.keyItemA, true);
    }
}

function areaThreeRiverGGGG() {
    gameEngine.showScene({
        id: 'areaThreeRiverGGGG',
        text: "What do you want to do now?",
        options: [
            { text: 'Go across the river', action: () => areaThreeRiver() },
            { text: 'Go back to the forest', action: () => areaTwoClearing() }
        ]
    });
}

function areaThreeRiver() {
    gameEngine.showScene({
        id: 'areaThreeRiver',
        text: "You wait by the river to continue your adventure. This is all that's implemented so far. Thanks for playing the optimized version!",
        options: [{ text: 'Main Menu', action: () => location.reload() }]
    });
}

// ===== DEATH SYSTEM =====
const DEATH_SCENARIOS = {
    1: "You investigate the noise and hear chattering above. You turn to look as your head is crushed between the mandibles of a large spider.",
    2: "You hide behind a log but something sticks to your head. You're dragged into a web and slowly fade away...",
    3: "The spider catches you with a well-timed web. Unable to defend yourself, you slowly fade away...",
    4: "The lion lunges on top of you, pinning you down. It bites your neck and everything fades to black.",
    5: "The goblin throws his spear and pierces your chest. As you collapse, he steals your coin pouch.",
    6: "You walk into the home and are immediately stabbed with a large knife. Blood pours from your stomach as everything fades to black.",
    7: "You awake in some room, bound and muzzled. A witch stands over you with a knife. 'Now be a good boy as I get my pound of flesh.' Muffled screams fill the swamp.",
    8: "The golem's massive rocky fist comes down and crushes you.",
    9: "A golemite catches you off guard and sweeps your legs. It body slams you into the rocky ground until you are mush."
};

function death(id) {
    const scenario = DEATH_SCENARIOS[id] || "You have died.";
    
    gameEngine.showScene({
        id: 'death',
        text: scenario,
        options: [
            { text: 'Accept Fate', action: gameOver }
        ]
    });
}

function gameOver() {
    gameEngine.showScene({
        id: 'gameOver',
        text: "GAME OVER YOU HAVE DIED",
        options: [
            { text: 'GG', action: () => location.reload() }
        ]
    });
}

// ===== DEBUGGING UTILITIES =====
window.emergencyDebug = function() {
    console.log("=== EMERGENCY DEBUG ===");
    console.log("mc:", mc);
    console.log("mc.equip:", mc.equip);
    console.log("button-holder element:", document.querySelector("#button-holder"));
    console.log("makeButton function:", typeof makeButton);
    console.log("updateNav function:", typeof updateNav);
    console.log("checkLevel function:", typeof checkLevel);
    console.log("unhideRest function:", typeof unhideRest);
};

window.testNavigation = function() {
    try {
        gameEngine.showScene({
            text: "Navigation test - can you see this?",
            options: [
                { text: 'Yes, I can see this', action: () => alert("Navigation is working!") },
                { text: 'Go to area two', action: () => areaTwoPath() }
            ]
        });
    } catch (error) {
        console.error("Navigation test failed:", error);
        alert("Navigation system has a problem: " + error.message);
    }
};

// ===== INITIALIZE GAME =====
const gameEngine = new GameEngine();
const combatSystem = new CombatSystem(gameEngine);
const storySequence = new StorySequence(gameEngine);

// Initialize support systems
try {
    initializeSupportSystems();
    console.log("Support systems initialized");
} catch (error) {
    console.log("Support initialization error:", error);
}

// Initialize DOM elements if they exist
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeSupportSystems();
        console.log("Support systems re-initialized after DOM ready");
    } catch (error) {
        console.log("DOM ready initialization error:", error);
    }
});

// Start the game
gameEngine.showScene(SCENES.mainMenu);
