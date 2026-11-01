function Vehicle(color) {
  this.color = color;
}

Vehicle.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`${this.color} vehicle is going ${this.speed}MPH`);
};

Vehicle.prototype.print = function () {
  console.log(`Vehicle: ${this.color}, Speed: ${this.speed}MPH`);
};

function Plane(color) {
  Vehicle.call(this, color);
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed) {
  this.speed = speed;
  console.log(`${this.color} plane is FLYING ${this.speed}MPH`);
};

const redCar = new Vehicle("red");
redCar.go(120);
redCar.print();

const bluePlane = new Plane("Blue");
bluePlane.go(541);
bluePlane.print();

console.log(bluePlane, redCar);
