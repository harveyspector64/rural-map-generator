// WaveFunctionCollapse.js

import { TILE_TYPES, VALID_NEIGHBORS } from '../config/TileConfig';
import RandomUtils from '../utils/RandomUtils';

class WaveFunctionCollapse {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill().map(() => Array(width).fill(null));
    this.stack = [];
  }

  generate() {
    this.initializeGrid();
    while (this.stack.length > 0) {
      const { x, y } = this.stack.pop();
      this.collapseCellAndPropagateConstraints(x, y);
    }
    return this.grid;
  }

  initializeGrid() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = new Set(TILE_TYPES);
        this.stack.push({ x, y });
      }
    }
    RandomUtils.shuffle(this.stack);
  }

  collapseCellAndPropagateConstraints(x, y) {
    const cell = this.grid[y][x];
    if (cell.size === 1) return; // Already collapsed

    const chosenTile = RandomUtils.weightedChoice([...cell]);
    this.grid[y][x] = new Set([chosenTile]);

    this.propagateConstraints(x, y);
  }

  propagateConstraints(x, y) {
    const queue = [{x, y}];
    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const currentTile = [...this.grid[y][x]][0];

      const neighbors = [
        { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
      ];

      for (const { dx, dy } of neighbors) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) continue;

        const neighborCell = this.grid[ny][nx];
        const validNeighbors = VALID_NEIGHBORS[currentTile];
        const newPossibilities = new Set([...neighborCell].filter(tile => validNeighbors.includes(tile)));

        if (newPossibilities.size < neighborCell.size) {
          this.grid[ny][nx] = newPossibilities;
          queue.push({ x: nx, y: ny });
          if (newPossibilities.size === 1 && !this.stack.some(pos => pos.x === nx && pos.y === ny)) {
            this.stack.push({ x: nx, y: ny });
          }
        }
      }
    }
  }
}

export default WaveFunctionCollapse;
