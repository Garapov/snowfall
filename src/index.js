import { Snowflake } from './snowflake';

export class SnowfallCanvas {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: true }); // Enable transparent background
        
        // Default options
        this.options = {
            count: options.count || 100,
            minRadius: options.minRadius || 2,
            maxRadius: options.maxRadius || 5,
            minSpeed: options.minSpeed || 1,
            maxSpeed: options.maxSpeed || 3,
            wind: options.wind || 0,
            color: options.color || 'white',
            opacity: options.opacity || 0.8,
            ...options
        };

        this.snowflakes = new Array(this.options.count); // Pre-allocate array
        this.isRunning = false;
        this.animationFrame = null;
        this.lastTime = 0;
        this.frameInterval = 1000 / 60; // Target 60 FPS

        // Bind methods that are used in animation loop
        this.animate = this.animate.bind(this);

        // Initialize after setting canvas dimensions
        this.resize();
        this.init();

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resize();
                // Redistribute snowflakes across the new canvas width
                const width = this.canvas.width;
                this.snowflakes.forEach(snowflake => {
                    snowflake.x = Math.random() * width;
                });
            }, 150);
        });
    }

    init() {
        const { width, height } = this.canvas;
        
        // Create snowflakes in a single loop
        for (let i = 0; i < this.options.count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height - height; // Start above the canvas
            this.snowflakes[i] = this.createSnowflake(x, y);
        }
    }

    createSnowflake(x = null, y = null) {
        const { minRadius, maxRadius, minSpeed, maxSpeed, wind } = this.options;
        
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        // Calculate speed based on radius - bigger snowflakes fall faster
        const radiusRatio = (radius - minRadius) / (maxRadius - minRadius);
        const speed = minSpeed + (maxSpeed - minSpeed) * radiusRatio;
        
        x = x ?? Math.random() * this.canvas.width;
        y = y ?? Math.random() * -this.canvas.height;

        return new Snowflake(x, y, radius, speed, wind);
    }

    resize() {
        const { offsetWidth, offsetHeight } = this.canvas;
        this.canvas.width = offsetWidth;
        this.canvas.height = offsetHeight;
        
        // Set constant properties
        this.ctx.fillStyle = 'white';
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.animate();
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    animate(currentTime = 0) {
        if (!this.isRunning) return;

        // Control frame rate
        const elapsed = currentTime - this.lastTime;
        if (elapsed < this.frameInterval) {
            this.animationFrame = requestAnimationFrame(this.animate);
            return;
        }
        this.lastTime = currentTime - (elapsed % this.frameInterval);

        const { width, height } = this.canvas;
        const { wind } = this.options;
        
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, width, height);
        
        // Update and draw in a single loop
        for (let i = 0; i < this.snowflakes.length; i++) {
            const snowflake = this.snowflakes[i];
            snowflake.update(height, wind);
            
            if (snowflake.isReset) {
                const x = Math.random() * width;
                // When resetting, recalculate speed based on radius
                const radiusRatio = (snowflake.radius - this.options.minRadius) / (this.options.maxRadius - this.options.minRadius);
                snowflake.speed = this.options.minSpeed + (this.options.maxSpeed - this.options.minSpeed) * radiusRatio;
                snowflake.wind = wind;
                snowflake.reset(x, -10);
            }
            
            snowflake.draw(this.ctx);
        }

        this.animationFrame = requestAnimationFrame(this.animate);
    }

    updateOptions(newOptions) {
        const oldOptions = { ...this.options };
        this.options = { ...this.options, ...newOptions };
        
        // Update snowflakes count if needed
        if (newOptions.count !== undefined) {
            const diff = newOptions.count - this.snowflakes.length;
            
            if (diff > 0) {
                // Add more snowflakes
                const currentLength = this.snowflakes.length;
                for (let i = 0; i < diff; i++) {
                    this.snowflakes[currentLength + i] = this.createSnowflake();
                }
            } else if (diff < 0) {
                // Remove excess snowflakes
                this.snowflakes.length = newOptions.count;
            }
        }

        // Cache frequently accessed values
        const { minRadius, maxRadius, minSpeed, maxSpeed, wind } = this.options;

        // Update sizes and speeds if radius changes
        if (newOptions.minRadius !== undefined || newOptions.maxRadius !== undefined) {
            const oldRadiusRange = oldOptions.maxRadius - oldOptions.minRadius;
            const newRadiusRange = maxRadius - minRadius;
            
            this.snowflakes.forEach(snowflake => {
                // Keep the same relative size ratio when updating radius
                const oldRadiusRatio = (snowflake.radius - oldOptions.minRadius) / oldRadiusRange;
                
                // Calculate new radius maintaining the same relative position in the range
                snowflake.radius = minRadius + (oldRadiusRatio * newRadiusRange);
                
                // Update speed based on new radius
                const radiusRatio = (snowflake.radius - minRadius) / newRadiusRange;
                snowflake.speed = minSpeed + (maxSpeed - minSpeed) * radiusRatio;
            });
        }

        // Update wind for all snowflakes if wind changes
        if (newOptions.wind !== undefined) {
            this.snowflakes.forEach(snowflake => {
                snowflake.wind = wind;
            });
        }
    }
}