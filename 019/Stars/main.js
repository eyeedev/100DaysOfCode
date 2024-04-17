const canvas = document.querySelector("canvas");

//settings
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//mouse object
const mouse = {
  x: undefined,
  y: undefined,
};

//mouse movement and update mouse object
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

//Define the Circle object constructor
//object function in which we draw circles and give the movement rules
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    //update x and y coordinates
    c.strokeStyle = "white";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, 0);
    c.shadowBlur = 5;
    c.shadowColor = "rgba(255, 255, 255, 0.5)";
    c.fill();
    c.closePath();
    c.shadowBlur = 0;
    c.stroke();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

//array to store the circles : its an array of objects
var circleArray = [];

//create circles with random parameters and add them to the array
for (var i = 0; i < 350; i++) {
  var radius = Math.random();
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;

  //we make a new object for each circles with different sizes and push each object to the array
  circleArray.push(new Circle(x, y, dx, dy, radius));
}


var connections = [];

function drawLines() {
  //calculate if distance between this circle and mouse position is less than 100px..
  for (var i = 0; i < circleArray.length; i++) {
       const distanceToMouse =  Math.hypot(
        mouse.x -circleArray[i].x ,
        mouse.y -circleArray[i].y 
      ); 

      if(distanceToMouse <= 250){
        for (var j = 0; j < circleArray.length; j++) {
          if( i !== j){
            var distance = Math.hypot(
              circleArray[i].x - circleArray[j].x,
              circleArray[i].y - circleArray[j].y
            ); 
            if (distance <= 100) {
    
              c.beginPath();
              c.moveTo(circleArray[i].x, circleArray[i].y);
              c.lineTo(circleArray[j].x, circleArray[j].y);
              c.strokeStyle = "rgba(255, 255, 255, .1)";
              c.stroke();
               
              }
          }
          
        }
      }


    }
  }


//make a loop to animate the circles
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  drawLines();
}

animate();



