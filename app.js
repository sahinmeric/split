//TODO: Is there any way to write filenames to an array?
//We create an image array,later we will randomly pick one of them to split, png files are better to use?
var imageList = ["cat0", "cat1", "cat2", "cat3", "cat4", "cat5", "cat6"];

//We generate a random number and pass it to a variable
var randomNumber = Math.floor(Math.random() * imageList.length + 1);

// With random number we generate a image name variable
var imageSrc = "images/" + imageList[randomNumber] + ".jpg";

//Show the image at the left side of the screen
document.getElementById("original").setAttribute("src", imageSrc);

//Creating the <canvas> element to use as a container for images.
var canvas = document.createElement("canvas");

//The getContext() method returns an object that provides methods and properties for drawing on the canvas.
var ctx = canvas.getContext("2d");

//We will create an empty array to save the parts of the splitted image
var parts = [];

//An instance of an Image object
var img = new Image();

//We will set image source to randomly generated image source that we created before
img.src = imageSrc;

//When image is loaded run the split method
img.onload = split_4;

//Here we are splitting the image into 4 parts
function split_4() {
  var w2 = img.width / 2;
  var h2 = img.height / 2;

  for (var i = 0; i < 4; i++) {
    var x = (-w2 * i) % (w2 * 2);
    var y = h2 * i <= h2 ? 0 : -h2;

    //We generate another random number for the rotate splitted parts of the image
    var randomDeg = Math.floor(Math.random() * 3 + 1); // Random number between 1-4

    canvas.width = w2;
    canvas.height = h2;

    ctx.drawImage(this, x, y, w2 * 2, h2 * 2);

    parts.push(canvas.toDataURL());

    var slicedImage = document.createElement("img");
    slicedImage.src = parts[i];
    var div = document.getElementById("right");
    div.appendChild(slicedImage);
    slicedImage.setAttribute("id", "part" + [i]);
    //style="width:128px;height:128px;" can be used also
    slicedImage.setAttribute("width", "96", "height", "96");
    slicedImage.setAttribute(
      "style",
      "transform: rotate(" + randomDeg * 45 + "deg)"
    );
  }

  //TODO: for loop?
  //ENABLE IMAGE CONTROLS
  document.getElementById("part0").addEventListener("click", rotate);
  document.getElementById("part0").addEventListener("click", checkStatus);
  document.getElementById("part1").addEventListener("click", rotate);
  document.getElementById("part1").addEventListener("click", checkStatus);
  document.getElementById("part2").addEventListener("click", rotate);
  document.getElementById("part2").addEventListener("click", checkStatus);
  document.getElementById("part3").addEventListener("click", rotate);
  document.getElementById("part3").addEventListener("click", checkStatus);
}

// TODO: for loop?
function checkStatus() {
  //GET HTML ELEMENT TRANSFORM VALUES
  var part0Degree = document.getElementById("part0").style.transform;
  var part1Degree = document.getElementById("part1").style.transform;
  var part2Degree = document.getElementById("part2").style.transform;
  var part3Degree = document.getElementById("part3").style.transform;

  //TODO better/shorter way?
  if (part0Degree === "rotate(360deg)") {
    if (part1Degree === "rotate(360deg)") {
      if (part2Degree === "rotate(360deg)") {
        if (part3Degree === "rotate(360deg)") {
          //TODO: before calling gameover() function remove eventlisteners?
          //document.getElementById("part0").removeEventListener("click", rotate);
          gameOver();
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  }
}
//When game ends do something.
//TODO: Show score (Time passed in seconds x 5)
function gameOver() {
  setTimeout(function () {
    alert("Congratulations! Here is your kitty cat :)");
  }, 1000);
  clearTimeout();
}

//Rotate the image by 90 degree in clockwise direction ...
//TODO: Can we make it current value +90deg instead of checking 4 different status ?
function rotate() {
  var currentDeg = this.style.transform;

  switch (currentDeg) {
    case "rotate(90deg)":
      this.style.transform = "rotate(180deg)";
      break;
    case "rotate(180deg)":
      this.style.transform = "rotate(270deg)";
      break;
    case "rotate(270deg)":
      this.style.transform = "rotate(360deg)";
      break;
    default:
      this.style.transform = "rotate(90deg)";
      break;
  }
}
