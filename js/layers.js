addLayer("main", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Eth", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0), // Currency

    }},
    color: "#6A0DAD",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "ether", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('main', 12)) mult = mult.times(upgradeEffect('main', 12))
        mult = mult.mul(buyableEffect('main', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let Generation = new Decimal(1)
        return Generation
      },

      upgrades: {

        11: {
            title: "Point Generator",
            description: "Double your point gain.",
            cost: new Decimal(1),
        },
        
        12: {
            title: "Ether Generator",
            description: "Add ^0.05 to your Ether gain",
            cost: new Decimal(35),
            effect() {
                return player.points.add(1).pow(0.05)
            },
        },

      },

      buyables: {

 11 : {
      cost(x) {
        let PowerI = new Decimal(1.75)
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Ether Point Generator v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Point Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ether</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },

    12 : {
      cost(x) {
        let PowerI = new Decimal(2.35)
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1)))
        return Calculation;
      },
      display() {
        return `<b style="font-size:24px">Ethereal Token v${format(player[this.layer].buyables[this.id], 0)}</b>
    <h2>x${format(tmp[this.layer].buyables[this.id].effect)} Ether Generation</h2><br>
    <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Ether</h1>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let Effect = new Decimal(1).mul(Decimal.pow(1.25, x.pow(1)))
        return Effect;
      },
      unlocked() {
        return true;
      }
    },
},

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
      //  {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
