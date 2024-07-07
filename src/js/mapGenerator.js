import WFC from './wfc.js';
import tileSet from './tileSet.js';

class MapGenerator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.wfc = new WFC(width, height, tileSet);
  }

  generate() {
    const collapsedGrid = this.wfc.collapse();
    const processedGrid = this.processGrid(collapsedGrid);
    return this.addSpecialStructures(processedGrid);
  }

  processGrid(grid) {
    // Here we'll add post-processing steps
    this.generateRivers(grid);
    this.generateRoads(grid);
    return grid;
  }

  generateRivers(grid) {
    // Placeholder for river generation
    // We'll implement this in a future iteration
  }

  generateRoads(grid) {
    // Placeholder for road generation
    // We'll implement this in a future iteration
  }

  addSpecialStructures(grid) {
    // Add barns and silos
    const grassCells = grid.filter(cell => cell.options[0] === 'grass');
    const barnCount = Math.floor(this.width * this.height * 0.01); // 1% of cells
    const siloCount = Math.floor(this.width * this.height * 0.005); // 0.5% of cells

    this.addStructures(grid, grassCells, 'barn', barnCount);
    this.addStructures(grid, grassCells, 'silo', siloCount);

    return grid;
  }

  addStructures(grid, availableCells, structureType, count) {
    for (let i = 0; i < count; i++) {
      if (availableCells.length === 0) break;
      const index = Math.floor(Math.random() * availableCells.length);
      const cell = availableCells[index];
      cell.options = [structureType];
      availableCells.splice(index, 1);
    }
  }
}

export default MapGenerator;
