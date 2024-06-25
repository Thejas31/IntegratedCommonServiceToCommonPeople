// Get the button
let topBtn = document.getElementById("topBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    // Modern browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
