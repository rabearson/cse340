const showButton = document.querySelector("#registerForm span")
const character = document.querySelector(".character")
const uppercase = document.querySelector(".uppercase")
const digit = document.querySelector(".digit")
const special = document.querySelector(".special")
const password = document.getElementById("password")

password.addEventListener("input", () => {
    const value = password.value
    if(value.length >= 12){
        character.classList.add("valid")
        character.classList.remove("invalid")
    }
    else {
        character.classList.add("invalid")
        character.classList.remove("valid")
    }
    if(/[A-Z]/.test(value)){
        uppercase.classList.add("valid")
        uppercase.classList.remove("invalid")
    }
    else{
        uppercase.classList.add("invalid")
        uppercase.classList.remove("valid")
    }
    if(/[0-9]/.test(value)){
        digit.classList.add("valid")
        digit.classList.remove("invalid")
    }
    else {
        digit.classList.add("invalid")
        digit.classList.remove("valid")
    }
    if(/[^A-Za-z0-9]/.test(value)){
        special.classList.add("valid")
        special.classList.remove("invalid")
    }
    else {
        special.classList.add("invalid")
        special.classList.remove("valid")
    }
})
console.log(showButton)
showButton.addEventListener("click", () => {
    if(password.value != ""){
        const type = password.getAttribute("type")
        if(type == "password"){
            password.setAttribute("type", "text")
            showButton.textContent = "Hide password"
        }
        else {
            password.setAttribute("type", "password")
            showButton.textContent = "Show password"
        }
    }
})
