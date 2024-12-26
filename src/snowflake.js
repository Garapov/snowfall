export class Snowflake {
    constructor(x, y, radius, speed, wind) {
        // Store initial properties for reuse
        this.initialX = x;
        this.initialRadius = radius;
        this.initialSpeed = speed;
        
        // Current state
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.wind = wind;
        this.isReset = false;
    }

    update(canvasHeight, wind) {
        this.y += this.speed;
        this.x += wind;

        // Simple bounds check
        this.isReset = this.y > canvasHeight + this.radius * 2;
    }

    draw(ctx) {
        // Skip drawing if offscreen
        if (this.y < -this.radius * 2) return;
        
        // Use optimized circle drawing
        ctx.beginPath();
        ctx.arc(this.x | 0, this.y | 0, this.radius, 0, 6.283); // 6.283 ≈ 2 * Math.PI, avoid calculation
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.isReset = false;
    }
}