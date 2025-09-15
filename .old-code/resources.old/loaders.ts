export function getLoader(extension: string): (url: string) => Promise<any> {
  switch (extension) {
    case '.glb':
    case '.gltf':
      return async (url: string) => {
        // Placeholder for GLTF loader
        console.log(`Loading GLTF: ${url}`);
        return {};
      };
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.webp':
      return async (url: string) => {
        // Placeholder for image loader
        console.log(`Loading image: ${url}`);
        return {};
      };
    case '.mp3':
    case '.wav':
    case '.ogg':
      return async (url: string) => {
        // Placeholder for audio loader
        console.log(`Loading audio: ${url}`);
        return {};
      };
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
}