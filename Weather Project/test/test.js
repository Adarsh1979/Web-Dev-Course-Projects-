// document.getElementById("btn").addEventListener("click", function(){
//     console.log("Button clicked");
// })

setTimeout(function (){
    console.log("Timer completed");
}, 5000);

function first(func){
    console.log("first executed");
    func();
}


first(function (){
    console.log("second executed");
});


