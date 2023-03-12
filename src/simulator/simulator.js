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

                // Forces the particles away from the edges
                let xDir;
                if(j === 0) {
                    xDir = 1;
                } else if (j === this.Nx - 1){
                    xDir = -1;
                } else {
                    let directions = [-1, 1];
                    let directionIndex = Math.floor(Math.random() * directions.length);
                    xDir = directions[directionIndex];
                }

                let xForce = Math.random() * 0.75 * xDir;
                let yForce = Math.max((0.5 - y) + randomUniform(-1, 1) * 0.5, 0);

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
        return new Vector(0, randomUniform(0.05, 0.2));
    }

    getMaxLifeSpan() {
        return randomUniform(2, 4);
    }

    getMass() {
        return randomUniform(0.5, 2);
    }

    initParticle() {
        let position = this.getInitParticlePosition();
        let velocity = this.getInitParticleVelocity();
        let mass = this.getMass();
        let maxLifeSpan = this.getMaxLifeSpan();

        return new Particle(position, velocity, mass, maxLifeSpan, this.id);
    }

    resetParticle(particle) {
        particle.reset(
            this.getInitParticlePosition(),
            this.getInitParticleVelocity(),
            this.getMass(),
            this.getMaxLifeSpan(),
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
