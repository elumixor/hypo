# 🎮 Asset Viewer Tool

A comprehensive visual tool for loading, inspecting, and debugging game assets in the HYPO project.

## 🚀 Quick Start

### Method 1: Using the npm script (Recommended)
```bash
# Make sure the dev server is running
bun run dev

# In another terminal, launch the asset viewer
bun run assets
```

### Method 2: Direct access
Open your browser to: http://localhost:5173/scripts/asset-viewer.html

## ✨ Features

### 📦 Asset Loading
- **Automatic Detection**: Discovers assets in the `src/assets/` directory
- **Progress Tracking**: Real-time loading progress with detailed feedback
- **Error Handling**: Graceful error handling with fallback options
- **Type Recognition**: Automatically detects file types (models, textures, audio, etc.)

### 👁️ 3D Model Viewer
- **Interactive Viewing**: Full 3D model inspection with mouse controls
- **Automatic Scaling**: Models are automatically centered and scaled to fit
- **Lighting Setup**: Professional lighting setup for optimal viewing
- **Grid Helper**: Visual grid for spatial reference
- **Orbit Controls**: 
  - **Left Click + Drag**: Rotate around model
  - **Right Click + Drag**: Pan camera
  - **Scroll Wheel**: Zoom in/out

### 🖼️ Texture Viewer
- **Image Preview**: High-quality image display with zoom capabilities
- **Dimension Info**: Shows texture resolution (width x height)
- **Format Support**: PNG, JPG, JPEG, WebP textures

### 📊 Asset Information
- **File Details**: Name, type, file size, dimensions
- **Model Statistics**: Scene count, animation count, mesh information
- **Loading Status**: Success/error status for each asset
- **Resource Metrics**: Memory usage and performance data

## 🛠️ Technical Details

### Supported Asset Types

| Type | Extensions | Viewer | Features |
|------|------------|--------|----------|
| **3D Models** | `.glb`, `.gltf` | Three.js | Interactive 3D viewing, animations |
| **Textures** | `.png`, `.jpg`, `.jpeg`, `.webp` | Native | Zoom, dimension display |
| **Audio** | `.ogg`, `.mp3`, `.wav` | Web Audio | *(Coming soon)* |

### Browser Compatibility
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile**: Basic support (touch controls)

## 🎯 Usage Scenarios

### 🔍 **Asset Inspection**
- Verify models load correctly
- Check texture quality and dimensions
- Validate file formats and compatibility

### 🐛 **Debugging**
- Identify loading failures
- Monitor loading performance
- Test asset optimization

### 🎨 **Asset Review**
- Preview models before integration
- Compare different asset versions
- Review asset quality and appearance

## 📁 File Structure

```
scripts/
├── asset-viewer.html       # Main viewer application
└── launch-viewer.ts        # Cross-platform launcher script
```

## 🔧 Configuration

### Adding New Asset Types

To support additional asset types, extend the asset configuration in the viewer:

```javascript
const assetConfigs = [
  { 
    name: 'NewAsset', 
    filename: 'newasset.ext', 
    type: 'newtype', 
    path: '/src/assets/category/newasset.ext' 
  }
];
```

### Custom Asset Paths

The viewer automatically scans these directories:
- `src/assets/models/` - 3D models
- `src/assets/textures/` - 2D textures
- `src/assets/audio/` - Audio files *(future)*

## 🚨 Troubleshooting

### Dev Server Not Running
```bash
Error: Dev server not responding
Solution: Run 'bun run dev' first
```

### Asset Loading Failures
- **Check file paths**: Ensure assets are in correct directories
- **Verify file formats**: Use supported file extensions
- **Check file size**: Large files may timeout during loading
- **Network issues**: Ensure dev server is accessible

### Browser Issues
- **Enable WebGL**: Required for 3D model viewing
- **Clear cache**: Browser cache may serve outdated assets
- **Check console**: Browser console shows detailed error messages

## 🔮 Future Enhancements

- **Audio Playback**: Support for audio asset preview
- **Animation Controls**: Play/pause animations in models
- **Asset Comparison**: Side-by-side asset comparison
- **Export Tools**: Asset optimization and export utilities
- **Batch Operations**: Bulk asset processing and validation
- **Performance Metrics**: Detailed performance analysis

## 🤝 Contributing

When adding new features to the asset viewer:

1. **Test Compatibility**: Ensure cross-browser compatibility
2. **Update Documentation**: Add usage examples and screenshots
3. **Error Handling**: Implement graceful error handling
4. **Performance**: Consider memory usage for large assets
5. **Accessibility**: Maintain keyboard navigation support

---

The Asset Viewer is a powerful development tool that streamlines asset management and debugging in the HYPO game development workflow.
