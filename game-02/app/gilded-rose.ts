export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        const filterTexts: string[] = [
            'Aged Brie',
            'Backstage passes to a TAFKAL80ETC concert',
            'Sulfuras, Hand of Ragnaros'
        ]; // Contains names to evaluate

        this.items.map(item => {
            item.name = item.name.trim();
            
            if(filterTexts.indexOf(item.name) < 0 && item.quality > 0) {
                item.quality--; // -1 if the name is not in "filterTexts" and the quality is greater than zero
            } else if(item.quality < 50 && item.name !== filterTexts[2]) {
                item.quality++; // +1 if the quality is less than 50 and the name is different from 'Sulfuras, Hand of Ragnaros'

                if(item.name === filterTexts[1]) { // Enter if the name is equal to 'Backstage passes to a TAFKAL80ETC concert'
                    item.quality += item.sellIn < 11 && item.quality < 50 ? 1 : 0; // +1 If 'sellIn' is less than 11 and quality is less than 50
                    item.quality += item.sellIn < 6 && item.quality < 50 ? 1 : 0; // +1 If 'sellIn' is less than 6 and quality is less than 50
                }
            }

            if (item.name !== filterTexts[2]) {
                item.sellIn--; // -1 If the name is different from 'Sulfuras, Hand of Ragnaros'
            }

            if (item.sellIn < 0) {
                if(item.name === filterTexts[1]) {
                    item.quality = 0; // Quality to zero if the name is equal to 'Backstage passes to a TAFKAL80ETC concert'
                } else if(filterTexts.indexOf(item.name) < 0 && item.quality > 0) {
                    item.quality--; // -1 If the name is not in "filterTexts" and the quality is greater than zero
                } else if(item.quality < 50 && item.name === filterTexts[0]) {
                    item.quality++; // +1 If quality is less than 50 and the name is equal to 'Aged Brie'
                }
            }
        });

        return this.items;
    }
}
