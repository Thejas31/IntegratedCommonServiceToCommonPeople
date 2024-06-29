// Get the button
let topBtn = document.getElementById("topBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    // Modern browsers
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}



// To connect the server to get responses from the form
$(document).ready(function() {
    $('#Form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        console.log('Form submission triggered');
        
        var formData = {
            name: $('input[name="name"]').val(),
            email: $('input[name="email"]').val(),
            message: $('textarea[name="message"]').val()
        };

        console.log('Form data:', formData);

        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.text();
        })
        .then(data => {
            console.log('Server response:', data);
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error sending form data to server:', error);
            alert('Error submitting form: ' + error.message);
        });
    });
});
