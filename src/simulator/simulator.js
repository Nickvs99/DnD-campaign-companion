import { Particle } from "@/simulator/particle.js";
import { Vector } from "@/simulator/vector.js";

import { randomUniform } from "@/util.js";

export class Simulator {

    /**
     * The simulators bounding box spans from coordinates (0,0) to (1, 1)
     */
    constructor(Nx, Ny, nParticles, dt) {
        this.Nx = Nx;
        this.Ny = Ny;
        this.maxNParticles = nParticles;
        this.dt = dt;

        this.id = 0;

        this.setForceField();
        this.particles = this.getInitParticles(nParticles);

        this.particleIDsToRemove = new Array();
    }

    /**
     * Creates a force field which is directed upwards and falls off
     * as you get higher. Furthermore, it points away from the edges.
     */
    setForceField() {

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

                let xForce = randomUniform(0, 0.75) * xDir;
                let yForce = Math.max((0.5 - y) + randomUniform(-0.5, 0.5), 0.05);

                forceField[i][j] = new Vector(xForce, yForce);
            }
        }

        this.forceField = forceField;
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
        return randomUniform(3, 6);
    }

    getMass() {
        return randomUniform(0.5, 2);
    }

    getRandomIsotropicVector(radius) {
        let angle = randomUniform(0, 2 * Math.PI);
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;

        return new Vector(x, y);
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

    spawnIsotropicParticles(position, nParticles) {

        for (let i = 0; i < nParticles; i++) {
            this.particles.push(new Particle(
                position,
                this.getRandomIsotropicVector(0.2),
                this.getMass(),
                this.getMaxLifeSpan(),
                this.id
            ));

            // These particles are removed when they have reached the end of their life
            this.particleIDsToRemove.push(this.id);

            this.id += 1;
        }
    }


    update() {

        for(let i = this.particles.length - 1; i >= 0; i--) {
            let particle = this.particles[i];
            
            if(!particle.isInBounds() || particle.isDeath()) {

                if(this.particleIDsToRemove.includes(particle.id)) {
                    this.particleIDsToRemove = this.particleIDsToRemove.filter(id => id !== particle.id);
                    this.particles = this.particles.filter(p => p.id !== particle.id);
                }
                else {
                    this.resetParticle(particle);
                }
                
                continue;
            }

            // Map particle position to the correct grid cell 
            let x = Math.floor(particle.position[0] * this.Nx);
            let y = Math.floor(particle.position[1] * this.Ny);
            
            let dragForce = particle.computeDragForce();

            particle.applyForce(this.forceField[y][x].add(dragForce), this.dt);
        }
    }
}
