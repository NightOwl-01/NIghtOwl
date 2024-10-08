const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
    signupBtn.click();
    return false;
};

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[name="email"]').value;
    const password = this.querySelector('input[name="password"]').value;
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', result.token);
          
            toastr.success(result.success, ' Login Success');
            window.location.href = '/productpage';
        } else {
            toastr.error(result.error, 'Login Failed');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Something went wrong. Please try again.', 'Error');
    }
});

// Handle signup form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[name="email"]').value;
    const phone = this.querySelector('input[name="phone"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const confirmPassword = this.querySelector('input[name="confirm_password"]').value;
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, phone, password, confirm_password: confirmPassword })
        });
        const result = await response.json();
        if (response.ok) {
            
            toastr.success(result.success, 'Success');
            loginBtn.click(); 
        } else {
            toastr.error(result.error, 'Signup Failed');
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error('Something went wrong. Please try again.', 'Error');
    }
});