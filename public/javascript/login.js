async function userLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password= document.querySelector("#password-login").value.trim();

    if(email && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json"}
        });

        if(response.ok) {
            document.location.replace("/");
        } else {
            alert(response.statusText);
        }
    }
};

async function userSignup(event) {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if(username && email && password) {
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json"}
        })

        if(response.ok) {
            console.log("success");
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".login-form").addEventListener("submit", userLogin);
document.querySelector(".signup-form").addEventListener("submit", userSignup);