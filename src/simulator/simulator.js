import { Particle } from "@/simulator/particle.js";
import { Vector } from "@/simulator/vector.js";

import { randomUniform } from "@/util.js";

export class Simulator {

    /**
     * The simulators bounding box spans from coordinates (0,0) to (100, 100)
     */
    constructor(Nx, Ny, Nparticles, dt) {
        this.Nx = Nx;
        this.Ny = Ny;
        this.dt = dt;

        this.id = 0;

        this.forceField = this.computeInitForceField();
        this.particles = this.getInitParticles(Nparticles);
    }

    /**
     * Creates an initial velocity field which is directed upwards and falls off
     * as you get higher.
     */
    computeInitForceField() {

        let forceField = new Array(this.Ny).fill(0).map(() => new Array(this.Nx).fill(0));
        
        for(let i = 0; i < this.Ny; i++) {
            let y = i/this.Nx;
            
            for(let j = 0; j < this.Nx; j++) {

                let randomStrength = 0.5;

                let xForce = randomUniform(-1, 1) * randomStrength;
                let yForce = Math.max((0.5 - y) + randomUniform(-1, 1) * randomStrength, 0);

                forceField[i][j] = new Vector(xForce, yForce);
            }
        }

        return forceField;
    }

    /**
     * Particles are initialized at a random position at the bottom
     */
    getInitParticles(Nparticles) {
        let particles = [];
        
        for (let i = 0; i < Nparticles; i++) {
            particles.push(this.initParticle());
            this.id += 1;
        }

        return particles;
    }

    getInitParticlePosition() {
        return new Vector(Math.random(), 0);
    }

    getInitParticleVelocity() {
        return new Vector(0, 0.1);
    }

    initParticle() {
        let position = this.getInitParticlePosition();
        let velocity = this.getInitParticleVelocity();
        let mass = 1;
        let maxLifeSpan = 3;

        return new Particle(position, velocity, mass, maxLifeSpan, this.id);
    }

    resetParticle(particle) {
        particle.reset(
            this.getInitParticlePosition(),
            this.getInitParticleVelocity(),
            this.id
        );
        
        this.id += 1;
    }


    update() {

        for(let particle of this.particles) {
            
            if(!particle.isInBounds() || particle.isDeath()) {
                this.resetParticle(particle);
                continue;
            }

            // Map particle position to the correct grid cell 
            let i = Math.floor(particle.position[0] * this.Nx);
            let j = Math.floor(particle.position[1] * this.Ny);
            
            let dragForce = particle.computeDragForce();

            particle.applyForce(this.forceField[j][i].add(dragForce), this.dt);
        }
    }
}
