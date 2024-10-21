let wrapUsersElem = document.querySelector("#wrap-users")
let modalContainer = document.querySelector("#delete-modal")
let deleteUserBtn =document.querySelector(".delete-user-btn")
let editUserBtn =document.querySelector("#edit-modal")
let acceptBtn = document.querySelector(".accept-btn")
let rejectBtn = document.querySelector(".unaccept-btn")
let firstnameElem =document.querySelector(".firstname")
let lastnameElem =document.querySelector(".lastname")
let passwordElem =document.querySelector(".password")
let userID = null

window.addEventListener("load",getAllUsers)

function getAllUsers() {
    fetch("https://loginpage-695be-default-rtdb.firebaseio.com/users.json")
        .then(res => res.json())
        .then(data => {
            let userData = Object.entries(data)
            wrapUsersElem.innerHTML = ""

            userData.forEach(item => {

                wrapUsersElem.insertAdjacentHTML("beforeend",`
                <div class = "user">
                <div class = "user-profile-wrap">
                    <img class = "user-profile" src="img/noimg.png" alt="default-image">
                    <div class = "user-profile-description">
                        <h1 class="user-profile-name">${item[1].firstname} - ${item[1].lastname}<span class="user-age"> 18 </span></h1>
                        <h3 class="user-explanations">pass : ${item[1].password}</h3>
                    </div>
                </div>
                <div class="btn-groups-column">
                    <button class="delete-user-btn" onclick="deleteUser('${item[0]}')"> delete </button>
                    <button class="edit-user-btn" onclick="editUser('${item[0]}')"> edit </button>
                </div>
            </div>
`)
            })
        })
}

function deleteUser(id){

    userID = id
    modalContainer.classList.add("visible")
    }

function rejectDeleteFunc(){
      modalContainer.classList.remove("visible")
}

function acceptDeleteFunc(){

     fetch(`https://loginpage-695be-default-rtdb.firebaseio.com/users/${userID}.json`,{
        method : "DELETE",
        }).then(res => {
         console.log(res)
            getAllUsers()
            rejectDeleteFunc()
     })
        }

function editUser(id){
    userID = id
    console.log(id)
    editUserBtn.classList.add("visible")
}

function rejectEditFunc(){
    editUserBtn.classList.remove("visible")
}

function acceptEditFunc(){
    let userData = {
        firstname : firstnameElem.value,
        lastname : lastnameElem.value,
        password : passwordElem.value,
    }

    fetch(`https://loginpage-695be-default-rtdb.firebaseio.com/users/${userID}.json`,{
        method : "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(userData)
    }).then(items =>{
        getAllUsers()
        rejectEditFunc()
    })
}
