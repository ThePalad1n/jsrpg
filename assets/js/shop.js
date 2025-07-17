// ===== OPTIMIZED SHOP SYSTEM =====
import { shopItems } from './items.js';
import { mc } from './player.js';
import { addToInventory, updateNav } from "./support.js";

// ===== SHOP SYSTEM CLASS =====
class ShopSystem {
    constructor() {
        this.initializeShopButtons();
    }
    
    // Initialize all shop button event listeners
    initializeShopButtons() {
        // Armor shop buttons
        this.setupItemButton('larmor', shopItems.armor[0]);   // Leather Armor
        this.setupItemButton('carmor', shopItems.armor[1]);   // Chain Armor  
        this.setupItemButton('parmor', shopItems.armor[2]);   // Plate Armor
        this.setupItemButton('marmor', shopItems.armor[3]);   // Mitheral Armor
        
        // Weapon shop buttons
        this.setupItemButton('ssword', shopItems.weapons[0]); // Short Sword
        this.setupItemButton('lsword', shopItems.weapons[1]); // Long Sword
        this.setupItemButton('gsword', shopItems.weapons[2]); // Great Sword
        this.setupItemButton('gutssword', shopItems.weapons[3]); // Gut Sword
        
        // Consumable buttons
        this.setupConsumableButton('healthA', shopItems.consumables[0]); // Health Potion
    }
    
    // Generic setup for equipment items
    setupItemButton(buttonId, item) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        button.onclick = () => this.purchaseEquipment(item);
    }
    
    // Generic setup for consumable items  
    setupConsumableButton(buttonId, item) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        button.onclick = () => this.purchaseConsumable(item);
    }
    
    // Purchase equipment (weapons, armor, etc.)
    purchaseEquipment(item) {
        // Check if player has enough gold
        if (mc.gp < item.price) {
            alert("You can't afford this item");
            return;
        }
        
        // Check if item is better than current equipment
        const currentItem = mc.equip[item.equipSlot];
        if (!item.isBetterThan(currentItem)) {
            alert("Current Item Is Equal Or Better");
            return;
        }
        
        // Complete the purchase
        this.completePurchase(item);
        
        // Equip the item
        mc.equip[item.equipSlot] = item;
        
        // Update player stats and UI
        this.updatePlayerAfterPurchase();
        addToInventory(item.tag);
        
        alert(`Purchased and equipped ${item.name}!`);
    }
    
    // Purchase consumables (health potions, etc.)
    purchaseConsumable(item) {
        if (mc.gp < item.price) {
            alert("You can't afford this item");
            return;
        }
        
        // Handle different consumable types
        switch(item.tag) {
            case 'itemsmallhp':
                this.useHealthPotion(item);
                break;
            default:
                // Generic consumable - just add to inventory
                this.completePurchase(item);
                addToInventory(item.tag);
                alert(`Purchased ${item.name}!`);
        }
    }
    
    // Use health potion immediately upon purchase
    useHealthPotion(potion) {
        if (mc.currenthp >= mc.maxhp) {
            alert("You are already at full health!");
            return;
        }
        
        mc.currenthp += potion.hp;
        mc.gp -= potion.price;
        
        // Cap at max HP
        if (mc.currenthp > mc.maxhp) {
            mc.currenthp = mc.maxhp;
        }
        
        updateNav();
        alert(`Used ${potion.name}! Restored ${potion.hp} health.`);
    }
    
    // Complete the purchase (deduct gold, add to inventory)
    completePurchase(item) {
        mc.gp -= item.price;
        mc.inventory.push(item.name);
    }
    
    // Update player stats after equipment purchase
    updatePlayerAfterPurchase() {
        // Recalculate stats based on equipment
        mc.maxhp = mc.basehp + mc.equip.reduce((sum, item) => sum + (item.hp || 0), 0);
        mc.minatk = 1 + mc.equip.reduce((sum, item) => sum + (item.atk || 0), 0);
        mc.maxatk = mc.baseatk + mc.equip.reduce((sum, item) => sum + (item.atk || 0), 0);
        
        // Ensure current HP doesn't exceed new max HP
        if (mc.currenthp > mc.maxhp) {
            mc.currenthp = mc.maxhp;
        }
        
        updateNav();
    }
    
    // Bulk purchase method (for future use)
    purchaseMultiple(item, quantity) {
        const totalCost = item.price * quantity;
        
        if (mc.gp < totalCost) {
            alert(`You need ${totalCost} gold to buy ${quantity} ${item.name}(s)`);
            return false;
        }
        
        mc.gp -= totalCost;
        
        for (let i = 0; i < quantity; i++) {
            mc.inventory.push(item.name);
        }
        
        updateNav();
        alert(`Purchased ${quantity} ${item.name}(s) for ${totalCost} gold!`);
        return true;
    }
    
    // Get shop inventory for UI display
    getShopInventory() {
        return {
            armor: shopItems.armor,
            weapons: shopItems.weapons, 
            consumables: shopItems.consumables
        };
    }
    
    // Check if player can afford item
    canAfford(item, quantity = 1) {
        return mc.gp >= (item.price * quantity);
    }
    
    // Get items player can afford
    getAffordableItems() {
        const affordable = {};
        
        Object.keys(shopItems).forEach(category => {
            affordable[category] = shopItems[category].filter(item => 
                this.canAfford(item)
            );
        });
        
        return affordable;
    }
}

// ===== DYNAMIC SHOP UI GENERATOR =====
class DynamicShop {
    constructor(shopSystem) {
        this.shopSystem = shopSystem;
    }
    
    // Create shop interface programmatically
    createShopInterface(containerId, shopData) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = ''; // Clear existing content
        
        // Create shop sections
        Object.keys(shopData).forEach(category => {
            const section = this.createShopSection(category, shopData[category]);
            container.appendChild(section);
        });
    }
    
    createShopSection(categoryName, items) {
        const section = document.createElement('div');
        section.className = 'shop-section';
        
        const header = document.createElement('h3');
        header.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        section.appendChild(header);
        
        items.forEach(item => {
            const itemDiv = this.createShopItem(item);
            section.appendChild(itemDiv);
        });
        
        return section;
    }
    
    createShopItem(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = `shop-item rarity-${item.rarity}`;
        
        const affordable = this.shopSystem.canAfford(item);
        if (!affordable) itemDiv.classList.add('unaffordable');
        
        itemDiv.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-stats">
                ${item.hp > 0 ? `+${item.hp} HP` : ''}
                ${item.atk > 0 ? `+${item.atk} ATK` : ''}
            </div>
            <div class="item-price">${item.price} gold</div>
        `;
        
        if (affordable) {
            itemDiv.onclick = () => {
                if (item.label === 'consumable') {
                    this.shopSystem.purchaseConsumable(item);
                } else {
                    this.shopSystem.purchaseEquipment(item);
                }
                this.refreshShopDisplay();
            };
        }
        
        return itemDiv;
    }
    
    refreshShopDisplay() {
        // Re-create the shop interface to update affordability
        const shopData = this.shopSystem.getShopInventory();
        this.createShopInterface('shop-container', shopData);
    }
}

// ===== INITIALIZE SHOP SYSTEM =====
const shopSystem = new ShopSystem();
const dynamicShop = new DynamicShop(shopSystem);

// Export for use in other modules
export { shopSystem, dynamicShop };

// Backward compatibility - initialize the original button listeners
export default shopSystem;