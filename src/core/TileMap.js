// src/core/TileMap.js

class TileMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = Array(height).fill().map(() => Array(width).fill('grass'));
  }

  getTile(x, y) {
    return this.tiles[y][x];
  }

  setTile(x, y, tileType) {
    this.tiles[y][x] = tileType;
  }

  isInBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}

export default TileMap;
