// ===== OPTIMIZED CRAFTING SYSTEM =====
import { ITEM_REGISTRY, getItemByName } from "./items.js";
import { mc } from "./player.js";
import { addToInventory, removeFromInventory, updateNav } from "./support.js";

// ===== CRAFTING RECIPE CLASS =====
class CraftingRecipe {
    constructor(id, name, ingredients, result, description = '') {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients; // Array of {itemName, quantity}
        this.result = result; // {itemName, quantity}
        this.description = description;
        this.unlocked = true; // Could be used for recipe discovery
    }
    
    // Check if player has all required ingredients
    canCraft() {
        return this.ingredients.every(ingredient => 
            mc.hasInInventory(ingredient.itemName, ingredient.quantity)
        );
    }
    
    // Consume ingredients and create result
    craft() {
        if (!this.canCraft()) {
            return { success: false, message: "Missing required ingredients!" };
        }
        
        // Remove ingredients
        this.ingredients.forEach(ingredient => {
            mc.removeFromInventory(ingredient.itemName, ingredient.quantity);
            // Also remove from UI if it's the last of that item
            if (!mc.hasInInventory(ingredient.itemName)) {
                const item = getItemByName(ingredient.itemName);
                if (item) removeFromInventory(item.tag);
            }
        });
        
        // Add result
        const resultItem = getItemByName(this.result.itemName);
        if (resultItem) {
            mc.addToInventory(this.result.itemName, this.result.quantity);
            addToInventory(resultItem.tag);
            
            // Auto-equip if it's better equipment
            if (resultItem.equipSlot >= 0) {
                const currentItem = mc.equip[resultItem.equipSlot];
                if (resultItem.isBetterThan(currentItem)) {
                    mc.equipItem(resultItem, resultItem.equipSlot);
                }
            }
        }
        
        updateNav();
        
        return { 
            success: true, 
            message: `Crafted ${this.result.quantity}x ${this.result.itemName}!`,
            result: resultItem
        };
    }
    
    getIngredientsList() {
        return this.ingredients.map(ing => 
            `${ing.quantity}x ${ing.itemName}`
        ).join(', ');
    }
}

// ===== CRAFTING SYSTEM CLASS =====
class CraftingSystem {
    constructor() {
        this.recipes = new Map();
        this.availableRecipes = new Set();
        this.initializeRecipes();
    }
    
    initializeRecipes() {
        // Define all crafting recipes
        const recipes = [
            new CraftingRecipe(
                'pointy_stick',
                'Pointy Stick',
                [
                    { itemName: 'Stick', quantity: 1 },
                    { itemName: 'Sharpening Stone', quantity: 1 }
                ],
                { itemName: 'Pointy Stick', quantity: 1 },
                'Sharpen a stick to make it more effective in combat.'
            ),
            
            // Add more recipes here
            new CraftingRecipe(
                'reinforced_leather',
                'Reinforced Leather Armor',
                [
                    { itemName: 'Leather Armor', quantity: 1 },
                    { itemName: 'Lions Hide Cloak', quantity: 1 }
                ],
                { itemName: 'Reinforced Leather Armor', quantity: 1 },
                'Combine leather armor with lion hide for better protection.'
            ),
            
            new CraftingRecipe(
                'health_potion',
                'Health Potion',
                [
                    { itemName: 'Red Herb', quantity: 2 },
                    { itemName: 'Water', quantity: 1 }
                ],
                { itemName: 'Small Health Potion', quantity: 1 },
                'Brew a healing potion from herbs and water.'
            )
        ];
        
        recipes.forEach(recipe => {
            this.recipes.set(recipe.id, recipe);
        });
    }
    
    // Check all recipes and update available crafting options
    checkAvailableRecipes() {
        this.availableRecipes.clear();
        
        this.recipes.forEach(recipe => {
            if (recipe.canCraft()) {
                this.availableRecipes.add(recipe.id);
                this.showCraftingOption(recipe);
            } else {
                this.hideCraftingOption(recipe);
            }
        });
    }
    
    showCraftingOption(recipe) {
        const elementId = `craft_${recipe.id}`;
        const element = document.getElementById(elementId);
        
        if (element) {
            element.style.display = 'block';
            this.setupCraftingButton(element, recipe);
        } else {
            // Create crafting button if it doesn't exist
            this.createCraftingButton(recipe);
        }
    }
    
    hideCraftingOption(recipe) {
        const elementId = `craft_${recipe.id}`;
        const element = document.getElementById(elementId);
        
        if (element) {
            element.style.display = 'none';
        }
    }
    
    createCraftingButton(recipe) {
        const craftingContainer = document.getElementById('crafting-container');
        if (!craftingContainer) return;
        
        const button = document.createElement('button');
        button.id = `craft_${recipe.id}`;
        button.className = 'crafting-button';
        button.innerHTML = `
            <div class="recipe-name">${recipe.name}</div>
            <div class="recipe-ingredients">${recipe.getIngredientsList()}</div>
            <div class="recipe-description">${recipe.description}</div>
        `;
        
        craftingContainer.appendChild(button);
        this.setupCraftingButton(button, recipe);
    }
    
    setupCraftingButton(element, recipe) {
        element.onclick = () => this.craftItem(recipe);
    }
    
    craftItem(recipe) {
        const result = recipe.craft();
        
        if (result.success) {
            alert(result.message);
            
            // Check if we should auto-equip
            if (result.result && result.result.equipSlot >= 0) {
                const currentItem = mc.equip[result.result.equipSlot];
                if (result.result.isBetterThan(currentItem)) {
                    alert(`${result.result.name} has been equipped!`);
                }
            }
            
            // Hide this crafting option if we no longer have ingredients
            if (!recipe.canCraft()) {
                this.hideCraftingOption(recipe);
            }
            
            // Recheck all recipes in case new ones became available
            this.checkAvailableRecipes();
            
        } else {
            alert(result.message);
        }
    }
    
    getRecipe(id) {
        return this.recipes.get(id);
    }
    
    getAllRecipes() {
        return Array.from(this.recipes.values());
    }
    
    getAvailableRecipes() {
        return Array.from(this.availableRecipes).map(id => this.recipes.get(id));
    }
    
    unlockRecipe(id) {
        const recipe = this.recipes.get(id);
        if (recipe) {
            recipe.unlocked = true;
            this.checkAvailableRecipes();
        }
    }
    
    // Create a dynamic crafting interface
    createCraftingInterface(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '<h3>Crafting</h3>';
        
        const availableRecipes = this.getAvailableRecipes();
        
        if (availableRecipes.length === 0) {
            container.innerHTML += '<p>No recipes available. Collect more items to unlock crafting options.</p>';
            return;
        }
        
        availableRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'crafting-recipe';
            recipeDiv.innerHTML = `
                <h4>${recipe.name}</h4>
                <p>${recipe.description}</p>
                <p><strong>Requires:</strong> ${recipe.getIngredientsList()}</p>
                <button onclick="craftingSystem.craftItem(craftingSystem.getRecipe('${recipe.id}'))">
                    Craft
                </button>
            `;
            container.appendChild(recipeDiv);
        });
    }
    
    // Discovery system - learn recipes from items or events
    discoverRecipe(itemName) {
        // Example: discovering recipes based on finding certain items
        const discoveries = {
            'Sharpening Stone': ['pointy_stick'],
            'Lions Hide Cloak': ['reinforced_leather'],
            'Red Herb': ['health_potion']
        };
        
        const recipeIds = discoveries[itemName];
        if (recipeIds) {
            recipeIds.forEach(id => {
                const recipe = this.recipes.get(id);
                if (recipe && !recipe.unlocked) {
                    recipe.unlocked = true;
                    alert(`You discovered a new recipe: ${recipe.name}!`);
                }
            });
            this.checkAvailableRecipes();
        }
    }
}

// ===== INITIALIZE CRAFTING SYSTEM =====
const craftingSystem = new CraftingSystem();

// ===== MAIN CRAFTING CHECK FUNCTION =====
export function checkRec() {
    craftingSystem.checkAvailableRecipes();
}

// ===== LEGACY SUPPORT =====
// Keep the old function for backward compatibility
export function craftStickB() {
    const recipe = craftingSystem.getRecipe('pointy_stick');
    if (recipe) {
        craftingSystem.craftItem(recipe);
    }
}

export function unhideCraftItem(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

// ===== EXPORTS =====
export { craftingSystem, CraftingRecipe };

// Auto-initialize crafting check
export default craftingSystem;