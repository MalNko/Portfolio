document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Prepare the email data
    const templateParams = {
        from_name: name,
        to_name: "Malusi", // This can be static or dynamic as per your need
        message: message,
        reply_to: email // Include the user's email for replies
    };

    // Send the email using the public API key
    emailjs.send("service_t2ovszq", "template_cilz02r", templateParams) // Use your Service ID and Template ID
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert('Message sent successfully!');
            // Optionally reset the form
            document.getElementById("contact-form").reset();
        }, function(error) {
            console.log("FAILED...", error);
            alert('Failed to send message. Please try again later.');
        });
});
