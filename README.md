# Canvas Snowfall

A lightweight and customizable HTML5 Canvas-based snowfall animation library. Create beautiful snow effects for your web projects with minimal setup.

## Features

- 🎨 Pure Canvas-based rendering for optimal performance
- ⚡️ Lightweight with zero dependencies
- 🎮 Real-time customization of snowfall parameters
- 📱 Responsive and mobile-friendly
- 🎯 Easy to integrate with any web project

## Live Demo

Check out the live demo of the snowfall effect here: [Example Page](https://garapov.github.io/snowfall/examples/index.html)

## Installation

```bash
npm install canvas-snowfall
```

## Usage

### Using ES Modules

```javascript
import { SnowfallCanvas } from 'canvas-snowfall';

// Get your canvas element
const canvas = document.getElementById('snowfall');

// Initialize snowfall
const snowfall = new SnowfallCanvas(canvas);

// Start the animation
snowfall.start();
```

### Using UMD Bundle (Direct Browser Usage)

You can include the library directly in your HTML using one of these methods:

#### Using CDN

```html
<!-- Production (minified) -->
<script src="https://cdn.jsdelivr.net/gh/Garapov/snowfall@main/dist/snowfall.umd.min.js"></script>

<!-- Development (unminified) -->
<script src="https://cdn.jsdelivr.net/gh/Garapov/snowfall@main/dist/snowfall.umd.js"></script>
```

#### Download Source

You can download the latest release (v1.2.1) directly:
- [Download Source Code (zip)](https://github.com/Garapov/snowfall/archive/refs/tags/v1.2.1.zip)

After downloading, include the library in your HTML:

```html
<script src="path/to/snowfall.umd.min.js"></script>
```

Then use it in your JavaScript:

```javascript
const canvas = document.getElementById('snowfall');
const snowfall = new SnowfallCanvas(canvas);
snowfall.start();
```

For development, you can use the unminified version:
```html
<script src="path/to/snowfall.umd.js"></script>
```

### HTML Setup

```html
<canvas id="snowfall"></canvas>
```

### Configuration Options

You can customize the snowfall by passing options when initializing:

```javascript
const options = {
    count: 100,          // Number of snowflakes
    minRadius: 2,        // Minimum snowflake radius
    maxRadius: 5,        // Maximum snowflake radius
    minSpeed: 1,         // Minimum falling speed
    maxSpeed: 3,         // Maximum falling speed
    wind: 0,            // Wind effect (-2 to 2)
    color: 'white',     // Snowflake color
    opacity: 0.8        // Snowflake opacity
};

const snowfall = new SnowfallCanvas(canvas, options);
```

### Dynamic Updates

You can update options on the fly:

```javascript
// Update single or multiple options
snowfall.updateOptions({
    count: 200,
    wind: 1.5
});
```

### Control Methods

```javascript
// Start animation
snowfall.start();

// Stop animation
snowfall.stop();

// Resize handler is automatic, but you can call it manually if needed
snowfall.resize();
```

## Example

Check out the `examples` directory for a complete demo with interactive controls. The example demonstrates how to:
- Create a fullscreen snow effect
- Add controls for snowflake count, wind effect, and speed
- Handle window resizing

## Browser Support

Works in all modern browsers that support HTML5 Canvas:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use in your projects!