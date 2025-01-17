class Bathroom {
    constructor(streetAddress, cleanliness, handicapAccesible, babyChangingStation, genderNeutral) {
        this.streetAddress = streetAddress;
        this.cleanliness = cleanliness;
        this.handicapAccesible = handicapAccesible;
        this.babyChangingStation = babyChangingStation;
        this.genderNeutral = genderNeutral;
    }

    getAddress() {
        return this.streetAddress;
    }

    setAddress(newAddress) {
        this.streetAddress = newAddress;
    }

    getCleanliness() {
        return this.cleanliness;
    }

    setCleanliness(newCleanliness) {
        this.cleanliness = newCleanliness;
    }

    getHandicapAccesible() {
        return this.handicapAccesible;
    }

    setHandicapAccesible(newHandicapAccesible) {
        this.handicapAccesible = newHandicapAccesible;
    }

    getBabyChangingStation() {
        return this.babyChangingStation;
    }

    setBabyChangingStation(newBabyChangingStation) {
        this.babyChangingStation = newBabyChangingStation;
    }

    getGenderNeutral() {
        return this.genderNeutral;
    }

    setGenderNeutral(newGenderNeutral) {
        this.genderNeutral = newGenderNeutral;
    }
}

const bathroom1 = new Bathroom("123 Main St",10,true,false,true);
console.log(bathroom1.getAddress()); 
console.log(bathroom1.getCleanliness());