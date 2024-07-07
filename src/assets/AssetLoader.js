// src/assets/AssetLoader.js

class AssetLoader {
  static async load() {
    const assetNames = [
      'grass', 'field', 'dirt', 'road', 'tree', 'bushy_grass', 
      'hill', 'red_barn', 'grain_silo', 'water'
    ];

    const assetPromises = assetNames.map(name => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ [name]: img });
        img.onerror = reject;
        img.src = `/src/assets/images/${name}.png`;
      });
    });

    try {
      const loadedAssets = await Promise.all(assetPromises);
      return Object.assign({}, ...loadedAssets);
    } catch (error) {
      console.error('Failed to load assets:', error);
      throw error;
    }
  }
}

export default AssetLoader;
