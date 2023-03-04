var listOfDrumBtns = document.querySelectorAll(".drum");    // this is list of <button> objects having class ".drum" 

// In line 10 function(){...} is called Anonymous function (doesnt have function name, straight implementation). It is 
// used when we've to use function as a parameter (here when click is detected then only to call it.)


// Detecting Button Press (mouse click)
// with the help of below for loop, we are calling .addEventListener() function for each of our buttons ( from listOfDrumButtons)

for(var i=0; i<listOfDrumBtns.length; i++){
    listOfDrumBtns[i].addEventListener("click", function (){    
        var buttonInnerHTML = this.innerHTML;   // this returns the HTML text between the button tag i.e. the letter on button
        playAudio(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
}


// Detecting Keyboard Press 

document.addEventListener("keydown", function(buttonWhichCausedEvent){
    playAudio(buttonWhichCausedEvent.key);
    // this buttonWhichCausedEvent has no. of attributes about event due to which addEventListener() 
    // got triggered such as key (key gives the char i.e. which key was pressed).

    buttonAnimation(buttonWhichCausedEvent.key);
});


function playAudio(key){
    switch (key) {
        case "w":
            var audio = new Audio("sounds/tom-1.mp3"); 
            // Creating object of Audio which is CostructorFunction (it has some attributes and some methods )

            audio.play();
            break;

        case "a":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;

        case "s":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;

        case "d":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;

        case "j":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;

        case "k":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;

        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        

        default:console.log(key);
            break;
    }
}


function buttonAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);    // here we are selecting the button by class name (currentKey)
    activeButton.classList.add("pressed");      // and then adding another class "pressed" to it. So that corresponding CSS gets applied.

    setTimeout(function () {        // Becoz of this, atfer a delay of 100ms, "pressed" class is removed from the selected button
        activeButton.classList.remove("pressed");
    }, 100);
}

