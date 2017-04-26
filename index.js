function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function() {
  return `(${this.x}, ${this.y})`
}
Point.prototype.constructor = Point

function Shape() {}

Shape.prototype.addToPlane = function(x,y) {
  this.position = new Point(x,y)
}
Shape.prototype.move = function(x,y) {
  this.position = new Point(x,y)
}
Shape.prototype.constructor = Shape

function Circle(r) {
  this.radius = r
}

Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.diameter = function() {
  return this.radius * 2
}
Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius
}
Circle.prototype.circumference = function() {
  return Math.PI * this.diameter()
}

function Side(l) {
  this.length = l
}

function Polygon(sides) {
  this.sides = sides
}

Polygon.prototype = Object.create(Shape.prototype)
Polygon.prototype.perimeter = function() {
  return this.sides.reduce(function(total, side) {
    return total + side.length
  }, 0)
}
Polygon.prototype.numberOfSides = function() {
  return this.sides.length
}

function Quadrilateral(s1,s2,s3,s4) {
  this.side1 = new Side(s1)
  this.side2 = new Side(s2)
  this.side3 = new Side(s3)
  this.side4 = new Side(s4)
  Polygon.call(this, [this.side1, this.side2, this.side3, this.side4])
}

Quadrilateral.prototype = Object.create(Polygon.prototype)
Quadrilateral.prototype.constructor = Quadrilateral

function Triangle(s1,s2,s3) {
  this.side1 = new Side(s1)
  this.side2 = new Side(s2)
  this.side3 = new Side(s3)
  Polygon.call(this, [this.side1, this.side2, this.side3])
}

Triangle.prototype = Object.create(Polygon.prototype)
Triangle.prototype.constructor = Triangle

function Rectangle(w,h) {
  this.width = w
  this.height = h
  Quadrilateral.call(this, w, h, w, h)
}

Rectangle.prototype = Object.create(Quadrilateral.prototype)
Rectangle.prototype.constructor = Rectangle
Rectangle.prototype.area = function() {
  return this.width * this.height
}

function Square(l) {
  this.length = l
  Rectangle.call(this, l, l)
}

Square.prototype = Object.create(Rectangle.prototype)
Square.prototype.constructor = Square
Square.prototype.listProperties = function() {
  let props = []
  for (let p in this) {
    if( this.hasOwnProperty(p) ) {
      props.push(p)
    }
  }
  return props.join(', ')
}
