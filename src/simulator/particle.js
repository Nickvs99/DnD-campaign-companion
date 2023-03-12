export class Particle {

    constructor(position, velocity, mass, maxLifeSpan, id) {
        this.reset(position, velocity, mass, maxLifeSpan, id);
    }

    reset(position, velocity, mass, maxLifeSpan, id) {
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;

        this.maxLifeSpan = maxLifeSpan;
        this.lifeSpan = 0;

        this.id = id;
    }

    applyForce(force, dt) {
        this.velocity = this.velocity.add(force.multiply(dt / this.mass));
        this.position = this.position.add(this.velocity.multiply(dt));
    
        this.lifeSpan += dt;
    }

    computeDragForce() {
        let dragCoefficient = 10;
        let speed = this.velocity.norm();
        let dragNorm = speed ** 2 * dragCoefficient;

        return this.velocity.multiply(-dragNorm);
    }

    isDeath() {
        return this.lifeSpan > this.maxLifeSpan;
    }

    isInBounds() {

        for (let value of this.position) {
            if (value < 0 || value > 1) {
                return false;
            }
        }

        return true;
    }
}
