let firstnameElem = document.querySelector(".firstname")
let lastnameElem = document.querySelector(".lastname")
let passwordElem = document.querySelector(".password")
let buttonElem = document.querySelector("button")
let loginformElem = document.querySelector(".login-form")

loginformElem.addEventListener("submit", (event) => {

    event.preventDefault()

     let userData = {
        firstname: firstnameElem.value,
        lastname: lastnameElem.value,
        password: passwordElem.value
    }

    fetch("https://loginpage-695be-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(userData)
    })
    .then(res =>{
        firstnameElem.value = "",
        lastnameElem.value = "",
        passwordElem.value = ""})
    .catch(err => console.error("Error:", err))

})

