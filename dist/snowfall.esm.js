class Snowflake {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.updateOptions(options);
        this.reset();
    }
    
    updateOptions(options) {
        this.options = options;
        this.size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        this.speed = (Math.random() + 0.5) * options.speed;
    }
    
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = -this.size;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * this.options.wind;
        this.y += this.speed;
        
        // Reset if snowflake goes off screen
        if (this.y > this.canvas.height + this.size) {
            this.reset();
        }
        
        // Wrap horizontally
        if (this.x > this.canvas.width + this.size) {
            this.x = -this.size;
        } else if (this.x < -this.size) {
            this.x = this.canvas.width + this.size;
        }
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

class Snowfall {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = {
            snowflakeCount: options.snowflakeCount || 100,
            speed: options.speed || 1,
            wind: options.wind || 0,
            size: {
                min: options.size?.min || 2,
                max: options.size?.max || 5
            }
        };
        
        this.snowflakes = [];
        this.isAnimating = false;
        this.animationFrame = null;
        
        this.init();
        this.resize();
        
        // Bind resize event
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        // Create initial snowflakes
        for (let i = 0; i < this.options.snowflakeCount; i++) {
            this.snowflakes.push(new Snowflake(this.canvas, this.options));
        }
    }
    
    resize() {
        // Make canvas full-screen
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw each snowflake
        this.snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(this.ctx);
        });
        
        if (this.isAnimating) {
            this.animationFrame = requestAnimationFrame(() => this.update());
        }
    }
    
    start() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.update();
        }
    }
    
    stop() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
    
    setOptions(options) {
        this.options = { ...this.options, ...options };
        this.snowflakes.forEach(snowflake => snowflake.updateOptions(this.options));
    }
}

export { Snowfall };
//# sourceMappingURL=snowfall.esm.js.map
