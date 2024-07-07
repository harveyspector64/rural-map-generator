// TileConfig.js

export const TILE_TYPES = [
  'grass', 'field', 'dirt', 'road', 'tree', 'bushyGrass', 'water'
];

export const VALID_NEIGHBORS = {
  grass: ['grass', 'field', 'dirt', 'road', 'tree', 'bushyGrass', 'water'],
  field: ['field', 'dirt', 'road'],
  dirt: ['grass', 'field', 'dirt', 'road'],
  road: ['grass', 'field', 'dirt', 'road'],
  tree: ['grass', 'bushyGrass'],
  bushyGrass: ['grass', 'tree', 'bushyGrass'],
  water: ['grass', 'water']
};

export const TILE_WEIGHTS = {
  grass: 10,
  field: 5,
  dirt: 3,
  road: 1,
  tree: 2,
  bushyGrass: 2,
  water: 1
};
