document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const usernameInput = document.querySelector("input[type= 'text']");
    const emailInput = document.querySelector("input[type= 'email']");
    const passwordInput = document.querySelector("input[type= 'password']"); 
    const submitButton = document.querySelector("button[type= 'submit']");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if(username === "" || email === "" || password === "") {
            showAlert("please fill in all fields", "error");
            return;
        }

        if(!validateEmail(email)) {
            showAlert("The email address is not valid!");
            return;
        }

        if(password.length < 6) {
            showAlert("The password must contain at least 6 characters!");
            return;
        }


        if (!/[A-Z]/.test(password)) {
            showAlert("The password must contain at least one uppercase letter!");
            return;
        }

        showAlert(`Welcome, ${username}!`, "success");
        form.reset();
    });


    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);

    }

    function showAlert(message, type) {
        const alertBox = Document.createElement("div");
        alertBox.textContent(message);
        alertBox.className = `alert ${type}`;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
});
