const tileSet = {
  tiles: ['grass', 'water', 'tree', 'bush', 'dirt', 'road', 'barn', 'silo'],
  rules: {
    grass: ['grass', 'tree', 'bush', 'dirt', 'road', 'barn', 'silo', 'water'],
    water: ['water', 'grass'],
    tree: ['grass', 'tree', 'bush'],
    bush: ['grass', 'tree', 'bush'],
    dirt: ['grass', 'dirt', 'road', 'barn', 'silo'],
    road: ['grass', 'dirt', 'road'],
    barn: ['grass', 'dirt'],
    silo: ['grass', 'dirt']
  },
  weights: {
    grass: 10,
    water: 3,
    tree: 5,
    bush: 4,
    dirt: 6,
    road: 2,
    barn: 1,
    silo: 1
  }
};

export default tileSet;
