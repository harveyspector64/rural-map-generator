// src/core/MapGenerator.js

import WaveFunctionCollapse from './WaveFunctionCollapse.js';
import TileMap from './TileMap.js';
import { TILE_TYPES, TILE_WEIGHTS } from '../config/TileConfig.js';

class MapGenerator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.wfc = new WaveFunctionCollapse(width, height);
  }

  generateMap() {
    const baseGrid = this.wfc.generate();
    const tileMap = new TileMap(this.width, this.height);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        tileMap.setTile(x, y, baseGrid[y][x]);
      }
    }

    this.addDecorations(tileMap);
    // Future: this.addRivers(tileMap);
    // Future: this.addRoads(tileMap);

    return tileMap;
  }

  addDecorations(tileMap) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (tileMap.getTile(x, y) === 'grass') {
          if (Math.random() < 0.1) {
            tileMap.setTile(x, y, 'tree');
          } else if (Math.random() < 0.05) {
            tileMap.setTile(x, y, 'bushy_grass');
          }
        }
      }
    }
  }
}

export default MapGenerator;
