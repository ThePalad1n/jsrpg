// ===== ITEM SYSTEM =====
export class Item {
    constructor(name, hp = 0, atk = 0, price = 0, label = '', tag = '', rarity = 'c') {
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.price = price; // Renamed from gp for clarity
        this.label = label;
        this.tag = tag;
        this.rarity = rarity;
        
        // Determine equipment slot from label
        this.equipSlot = this.getEquipSlot(label);
        
        // Determine primary stat for comparison
        this.primaryStat = this.getPrimaryStat();
    }
    
    getEquipSlot(label) {
        const slotMap = {
            'weapon': 0,
            'helmet': 1, 
            'cloak': 2,
            'armor': 3
        };
        return slotMap[label] ?? -1; // -1 for non-equipment items
    }
    
    getPrimaryStat() {
        if (this.atk > 0) return 'atk';
        if (this.hp > 0) return 'hp';
        return null;
    }
    
    // Check if this item is better than another item
    isBetterThan(otherItem) {
        if (!this.primaryStat || !otherItem) return true;
        return this[this.primaryStat] > otherItem[this.primaryStat];
    }
}

// ===== ITEM DEFINITIONS =====

// Placeholder items for initial equipment
export const placeholderItems = {
    weapon: new Item('None', 0, 0, 0, 'weapon', 'none', 'c'),
    helmet: new Item('None', 0, 0, 0, 'helmet', 'none', 'c'),
    cloak: new Item('None', 0, 0, 0, 'cloak', 'none', 'c'),
    armor: new Item('None', 0, 0, 0, 'armor', 'none', 'c')
};

// World drop items
export const worldItems = {
    stick: new Item('Stick', 0, 3, 1, 'weapon', 'itemstick', 'c'),
    lionHide: new Item('Lions Hide Cloak', 20, 0, 25, 'cloak', 'itemlionhide', 'uc'),
    spear: new Item('Goblin Spear', 0, 8, 10, 'weapon', 'itemspear', 'uc'),
    knife: new Item('Fillet Knife', 0, 7, 10, 'weapon', 'itemknife', 'uc'),
    rockHelm: new Item('Rock Helm', 20, 1, 10, 'helmet', 'itemrockhelm', 'r'),
    helmA: new Item('Leather Helm', 10, 0, 10, 'helmet', 'itemhelmA', 'uc'),
    stickB: new Item('Pointy Stick', 0, 6, 5, 'weapon', 'itempstick', 'c')
};

// Shop items organized by category
export const shopItems = {
    armor: [
        new Item('Leather Armor', 20, 0, 50, 'armor', 'itemarmorA', 'uc'),
        new Item('Chain Armor', 40, 0, 100, 'armor', 'itemarmorB', 'r'),
        new Item('Plate Armor', 80, 0, 250, 'armor', 'itemarmorC', 'e'),
        new Item('Mitheral Armor', 150, 0, 500, 'armor', 'itemarmorD', 'l')
    ],
    weapons: [
        new Item('Short Sword', 0, 10, 50, 'weapon', 'itemswordA', 'uc'),
        new Item('Long Sword', 0, 20, 100, 'weapon', 'itemswordB', 'r'),
        new Item('Great Sword', 0, 35, 250, 'weapon', 'itemswordC', 'e'),
        new Item('Gut Sword', 0, 50, 500, 'weapon', 'itemswordD', 'l')
    ],
    consumables: [
        new Item('Small Health Potion', 50, 0, 25, 'consumable', 'itemsmallhp', 'cc'),
        new Item('Sharpening Stone', 0, 0, 10, 'consumable', 'itemsharpeningstone', 'cc')
    ]
};

// Key items and special items
export const specialItems = {
    keyItemA: new Item('Kitty Collar', 0, 0, 1, 'key item', 'itemcatcollar', 'k'),
    stoneA: new Item('Sharpening Stone', 0, 0, 1, 'consumable', 'itemsharpeningstone', 'cc')
};

// ===== ITEM REGISTRY =====
// Central registry for all items (useful for save/load, references, etc.)
export const ITEM_REGISTRY = {
    // Placeholders
    ...placeholderItems,
    
    // World items
    ...worldItems,
    
    // Special items
    ...specialItems,
    
    // Shop items (flattened)
    ...shopItems.armor.reduce((acc, item, index) => {
        acc[`armor${index}`] = item;
        return acc;
    }, {}),
    ...shopItems.weapons.reduce((acc, item, index) => {
        acc[`weapon${index}`] = item;
        return acc;
    }, {}),
    ...shopItems.consumables.reduce((acc, item, index) => {
        acc[`consumable${index}`] = item;
        return acc;
    }, {})
};

// Helper function to get item by name or tag
export function getItemByTag(tag) {
    return Object.values(ITEM_REGISTRY).find(item => item.tag === tag);
}

export function getItemByName(name) {
    return Object.values(ITEM_REGISTRY).find(item => item.name === name);
}

// Backward compatibility exports (for existing code)
export const {
    weapon: placeHolderWeapon,
    helmet: placeHolderHelm, 
    cloak: placeHolderCloak,
    armor: placeHolderArmor
} = placeholderItems;

export const {
    stick,
    lionHide,
    spear,
    knife,
    rockHelm,
    helmA,
    stickB
} = worldItems;

export const {
    keyItemA,
    stoneA
} = specialItems;

// Shop items for backward compatibility
export const [armorA, armorB, armorC, armorD] = shopItems.armor;
export const [swordA, swordB, swordC, swordD] = shopItems.weapons;
export const [healthA] = shopItems.consumables;