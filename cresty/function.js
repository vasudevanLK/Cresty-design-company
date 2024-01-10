
;(function() {
  "use strict";

  //// Global Variables
  const face = document.querySelector(".face");
  const pupils = face.querySelectorAll(".face__pupil");
  
  const leftPupil = pupils[0];
  const rightPupil = pupils[1];
  const eyeLeft = leftPupil.parentNode;
  const eyeRight = rightPupil.parentNode;
  const eyeLeftOffsetX = eyeLeft.offsetParent.offsetLeft + eyeLeft.offsetLeft;
  const eyeLeftOffsetY = eyeLeft.offsetParent.offsetTop + eyeLeft.offsetTop;
  const eyeRightOffsetX = eyeRight.offsetParent.offsetLeft + eyeRight.offsetLeft;
  const eyeRightOffsetY = eyeRight.offsetParent.offsetTop + eyeRight.offsetTop;

    
  /*Add Evenet Listener*/
  face.addEventListener("mousemove", onMouseMove); /*we can change it to window.addEventListener if we want to*/
  
  
  /// Constructor
  function Eye(eyeElem, pupilElem, eyeOffsetX, eyeOffsetY) {
    this.width = eyeElem.offsetWidth;
    this.height = eyeElem.offsetHeight;
    this.offsetX = eyeOffsetX;
    this.offsetY = eyeOffsetY;
    this.pupil = pupilElem;
    this.pupilWidth = pupilElem.offsetWidth;
    this.pupilHeight = pupilElem.offsetHeight;
    this.relativeX = 0; this.relativeY = 0;
  };
  
  
  //// Prototype Methods
  Eye.prototype.setEyeCoordinates = function(mouseX, mouseY) {
    
    const r = this.pupilWidth / 2;

    const eyeX = (this.width / 2) - r;
    const eyeY = (this.height / 2) - r;

    const distanceThreshold = eyeX;
  
    const pointX = mouseX - r - this.offsetX - eyeX;
    const pointY = mouseY - r - this.offsetY - eyeY;

    const distance = Math.sqrt( Math.pow(pointX, 2) + Math.pow(pointY, 2) );

    if(distance < distanceThreshold) {
      this.relativeX = mouseX - this.eyeOffsetX - r;
      this.relativeY = mouseY - this.eyeOffsetY - r;
    } 
    else {
      this.relativeX = pointX / distance * distanceThreshold + eyeX;
      this.relativeY = pointY / distance * distanceThreshold + eyeY;
    }
  
  };

  Eye.prototype.updateEyeLocation = function() {

    let x = 0;
    let y = 0;

    x += (this.relativeX - x) / 1;
    y += (this.relativeY - y) / 1;

    this.pupil.style.setProperty("left", `${x}px`);
    this.pupil.style.setProperty("top", `${y}px`);

  };
  
  
  /*Initiate Eyes*/

  //// Initialize eye elements
  const eyeLeftElem = new Eye(eyeLeft, leftPupil, eyeLeftOffsetX, eyeLeftOffsetY);
  const eyeRightElem = new Eye(eyeRight, rightPupil, eyeRightOffsetX, eyeRightOffsetY);
  
  
  //// Mousemove event handler
  function onMouseMove(e) {
    const pageX = e.pageX;
    const pageY = e.pageY;
    
    eyeLeftElem.setEyeCoordinates(pageX, pageY);
    eyeRightElem.setEyeCoordinates(pageX, pageY);
    
  };
  
  
  //// Update pupil location
  let intervalID = window.setInterval(function() {
    
     eyeLeftElem.updateEyeLocation();
     eyeRightElem.updateEyeLocation();
    
  }, 5);



})();