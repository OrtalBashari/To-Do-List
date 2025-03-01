document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const usernameInput = document.querySelector("input[type='text']");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']"); 
    const submitButton = document.querySelector("button[type='submit']");

    form.addEventListener("submit", async function(event){
        event.preventDefault();
        
        const username = usernameInput.value.trim();
        const email = emailInput ? emailInput.value.trim() : ""; // בדיקה אם קיים
        const password = passwordInput.value.trim();

        if(username === "" || password === "") {
            showAlert("Please fill in all fields", "error");
            return;
        }

        if (emailInput && email === "") {
            showAlert("Please enter an email!", "error");
            return;
        }

        if (emailInput && !validateEmail(email)) {
            showAlert("The email address is not valid!", "error");
            return;
        }

        if(password.length < 6) {
            showAlert("The password must contain at least 6 characters!", "error");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            showAlert("The password must contain at least one uppercase letter!", "error");
            return;
        }



        showAlert(`Welcome, ${username}!`, "success");
        
        setTimeout(() => {
            window.location.href = "home.html"; // מחליף לעמוד הבית
        }, 3000);

        form.reset();
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function showAlert(message, type) {
        const alertBox = document.createElement("div"); // תיקון האות D
        alertBox.textContent = message; // תיקון הבעיה עם textContent
        alertBox.className = `alert ${type}`;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
});
