export class Vector extends Array {

    add(other) {
        return this.map((e, i) => e + other[i]);
    }

    multiply(value) {
        return this.map((e) => e * value);
    }

    norm() {
        let sum = 0;
        for( let i = 0; i < this.length; i++) {
            sum += this[i]**2;
        }
        return sum ** 0.5;
    }

    dot(other) {

        let sum = 0;

        for (let i = 0; i < this.length; i++) {
            sum += this[i] * other[i];
        }

        return sum;
    }
}