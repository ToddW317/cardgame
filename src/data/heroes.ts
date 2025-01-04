import { Hero } from '../types/game';

export const heroes: Hero[] = [
  {
    id: 'fire_hero',
    name: 'Ember Master',
    ability: {
      name: 'Flame Surge',
      description: 'Deal 2 damage to all enemy creatures',
      cost: 2,
    },
    bestSynergy: 'fire'
  },
  {
    id: 'pyroclast',
    name: 'Pyroclast, the Flame Weaver',
    ability: {
      name: 'Fire Bolt',
      description: 'Deal 2 damage to any target.',
      cost: 2
    },
    bestSynergy: 'Fire'
  },
  {
    id: 'terra',
    name: 'Terra, Earth Mother',
    ability: {
      name: 'Stone\'s Gift',
      description: 'Gain 1 additional mana this turn only.',
      cost: 0,
      maxUses: 3
    },
    bestSynergy: 'Earth'
  },
  {
    id: 'zephyr',
    name: 'Zephyr, Wind Caller',
    ability: {
      name: 'Gust of Wind',
      description: 'Return a target creature with 2 or less power to its owner\'s hand. Costs 1 more Mana every use.',
      cost: 1
    },
    bestSynergy: 'Air'
  },
  {
    id: 'naiad',
    name: 'Naiad, Mistress of the Tides',
    ability: {
      name: 'Calm Waters',
      description: 'Draw the top 3 cards of your deck, then discard 2.',
      cost: 2
    },
    bestSynergy: 'Water'
  },
  {
    id: 'erebus',
    name: 'Erebus, Shadow Master',
    ability: {
      name: 'Veil of Shadows',
      description: 'Give a creature -1/0 until your next turn.',
      cost: 1
    },
    bestSynergy: 'Aether'
  },
  {
    id: 'solara',
    name: 'Solara, Light Bearer',
    ability: {
      name: 'Healing Light',
      description: 'Restore 3 health to your hero.',
      cost: 2
    },
    bestSynergy: 'Colorless'
  },
  {
    id: 'vulcan',
    name: 'Vulcan, Forge Lord',
    ability: {
      name: 'Forge Armor',
      description: 'Give a creature +1/+1 until end of turn.',
      cost: 2
    },
    bestSynergy: 'Fire/Earth'
  },
  {
    id: 'celest',
    name: 'Celest, Star Seer',
    ability: {
      name: 'Star Gaze',
      description: 'Scry 2',
      cost: 1
    },
    bestSynergy: 'Air/Water'
  },
  {
    id: 'orion',
    name: 'Orion, Hunter of Depths',
    ability: {
      name: 'Deep Hunt',
      description: 'Exile a target creature with cost of 4 or less.',
      cost: 2,
      maxUses: 1
    },
    bestSynergy: 'Aether'
  },
  {
    id: 'gaia',
    name: 'Gaia, Spirit of Life',
    ability: {
      name: 'Life Bloom',
      description: '3 creatures you control, at random, gain "Whenever this creature deals damage, you gain 1 life."',
      cost: 3,
      maxUses: 1
    },
    bestSynergy: 'Earth'
  }
]; 