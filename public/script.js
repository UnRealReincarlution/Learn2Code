// IIFE
(() => {
    console.log("Loaded Content")
})()

$("#add_course").on('click', (e) => {
    $("#overlay").css('display', 'flex');
    console.log("overlay shown")
});