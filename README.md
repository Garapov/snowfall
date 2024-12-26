# Canvas Snowfall

A lightweight and customizable HTML5 Canvas-based snowfall animation library. Create beautiful snow effects for your web projects with minimal setup.

## Features

- 🎨 Pure Canvas-based rendering for optimal performance
- ⚡️ Lightweight with zero dependencies
- 🎮 Real-time customization of snowfall parameters
- 📱 Responsive and mobile-friendly
- 🎯 Easy to integrate with any web project

## Installation

```bash
npm install canvas-snowfall
```

## Usage

### Basic Setup

```javascript
import { SnowfallCanvas } from 'canvas-snowfall';

// Get your canvas element
const canvas = document.getElementById('snowfall');

// Initialize snowfall
const snowfall = new SnowfallCanvas(canvas);

// Start the animation
snowfall.start();
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