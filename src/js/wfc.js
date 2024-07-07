class WFC {
  constructor(width, height, tileSet) {
    this.width = width;
    this.height = height;
    this.tileSet = tileSet;
    this.grid = new Array(width * height).fill().map(() => ({
      collapsed: false,
      options: [...tileSet.tiles]
    }));
  }

  collapse() {
    while (!this.isFullyCollapsed()) {
      const cell = this.getLowestEntropyCell();
      this.collapseCell(cell);
      this.propagate(cell);
    }
    return this.grid;
  }

  isFullyCollapsed() {
    return this.grid.every(cell => cell.collapsed);
  }

  getLowestEntropyCell() {
    const uncollapedCells = this.grid.filter(cell => !cell.collapsed);
    const lowestEntropy = Math.min(...uncollapedCells.map(cell => cell.options.length));
    const lowestEntropyCells = uncollapedCells.filter(cell => cell.options.length === lowestEntropy);
    return lowestEntropyCells[Math.floor(Math.random() * lowestEntropyCells.length)];
  }

  collapseCell(cell) {
    const randomTile = cell.options[Math.floor(Math.random() * cell.options.length)];
    cell.collapsed = true;
    cell.options = [randomTile];
  }

  propagate(changedCell) {
    const stack = [this.getCellCoordinates(this.grid.indexOf(changedCell))];
    
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const neighbors = this.getNeighbors(x, y);
      
      for (const [nx, ny] of neighbors) {
        const neighborCell = this.grid[ny * this.width + nx];
        if (neighborCell.collapsed) continue;
        
        const validOptions = this.getValidOptions(nx, ny);
        if (validOptions.length < neighborCell.options.length) {
          neighborCell.options = validOptions;
          stack.push([nx, ny]);
        }
      }
    }
  }

  getNeighbors(x, y) {
    const neighbors = [
      [x - 1, y], [x + 1, y],
      [x, y - 1], [x, y + 1]
    ];
    return neighbors.filter(([nx, ny]) => 
      nx >= 0 && nx < this.width && ny >= 0 && ny < this.height
    );
  }

  getValidOptions(x, y) {
    const neighbors = this.getNeighbors(x, y);
    const constraints = neighbors.flatMap(([nx, ny]) => {
      const neighborCell = this.grid[ny * this.width + nx];
      return neighborCell.options.flatMap(option => this.tileSet.rules[option]);
    });
    
    return this.tileSet.tiles.filter(tile => 
      constraints.every(constraint => constraint.includes(tile))
    );
  }

  getCellCoordinates(index) {
    return [index % this.width, Math.floor(index / this.width)];
  }
}

export default WFC;
