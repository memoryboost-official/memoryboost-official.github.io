/**
 * login formular to fill out
 * @type {HTMLElement}
 */
let loginForm = document.getElementById("login");

/**
 * register formular to fill out
 * @type {HTMLElement}
 */
let registerForm = document.getElementById("register");

/**
 * toggle-button<br>
 * changes the formulars between login and register
 * @type {HTMLElement}
 */
let toggleButton = document.getElementById("button");

/**
 * whole wrapper, which contains login-, register-formular and buttons
 * @type {HTMLElement}
 */
let container = document.getElementById("container");

let upperB = false;
let lowerB = false;
let numberB = false;
let specialB = false;
let lengthB = false;


let addUser = document.getElementById("userJSON");
/**
 * checks if new json-file has been added
 * waits until imported file has loaded
 * reads it and imports the user
 */
addUser.addEventListener('change', function() {
    let reader = new FileReader();

    // event starts when reader has read a file
    reader.addEventListener('load', function() {
        let addedUser = JSON.parse(reader.result);
        let user = {
            username: addedUser.username,
            password: addedUser.password,
            cards: addedUser.cards
        }
        let userJSON = JSON.stringify(user);

        //if user exists, alert, else import new user
        if(localStorage.getItem(addedUser.username) !== null){
            alert("This user already exists!");
        }
        else{
            localStorage.setItem(addedUser.username, userJSON);;
        }
    });
    reader.readAsText(addUser.files[0]); // Read the uploaded file, otherwise nothing will be imported
});


/**
 * when tapping on register, register formular will pop up
 */
function chooseRegister(){
    loginForm.style.left="-300px";
    registerForm.style.left="45px";
    toggleButton.style.left="50%";
    container.style.height="500px";
}

/**
 * when tapping on login, login formular will pop up
 */
function chooseLogin(){
    loginForm.style.left="45px";
    registerForm.style.left="345px";
    toggleButton.style.left="0%";
    container.style.height="360px";
}

/**
 * - gets typed username, password and repeated password<br>
 * - creates user<br>
 * - proves if user already exists<br>
 * - proves if password and repeated password are the same<br>
 * - proves if password requirements are fullfilled<br>
 * - if these conditions are true, user will be saved
 */
async function register(){
    let regUserName = document.getElementById("regUserName").value;
    let regUserPw = document.getElementById("regUserPw").value;
    let regUserPwRep = document.getElementById("regUserPwRep").value;

    let card={
        question: null,
        answer: null
    }

    let user={
        username: regUserName,
        password: encrypt(regUserPw),
        cards: []
    }

    let json = JSON.stringify(user);

    if(localStorage.getItem(regUserName) !== null){
        alert("This user already exists!");
    }
    else if(regUserPwRep !== regUserPw){
        alert("Password are not the same!");
    }
    else if(!upperB || !lowerB || !specialB || !numberB || !lengthB){
        alert("Password does not fullfil the requirements");
    }
    else{
        localStorage.setItem(regUserName, json);
    }
}

/**
 * encrypts a password, converts base64 to ASCII
 * @param password
 * @returns {string}
 */
function encrypt(password) {
    return btoa(password);
}

/**
 * decrypts a password, converts ASCII back to base64
 * @param encrypted
 * @returns {string}
 */
function decrypt(encrypted) {
    return atob(encrypted);
}

/**
 * - gets typed username and password<br>
 * - proves if user already exists<br>
 * - proves if typed password is correct<br>
 * - if these conditions are true, user will be logged in
 */
function login(){
    let logUserName = document.getElementById("logUserName").value;
    let logUserPw = document.getElementById("logUserPw").value;
    if(localStorage.getItem(logUserName) !== null){
        var storedUser = localStorage.getItem(logUserName);
        var storedUserData = JSON.parse(storedUser);
        if(decrypt(storedUserData.password) === logUserPw){
            sessionStorage.setItem('currentUser', storedUser);
            window.location.href="main/flashcards.html";
            return false;
        }
        else{
            alert("Password is false!");
        }
    }
    else{
        alert("This user does not exists!");
    }
}

/**
 * validates following requirements:<br>
 * - at least one uppercase<br>
 * - at least one lowercase<br>
 * - at least one special symbol: !@#$%^&*()_-+=?<>.,<br>
 * - at least one number<br>
 * - at least 8 characters
 */
function validate(){
    let password = document.getElementById("regUserPw");
    let upper = document.getElementById("upper");
    let lower = document.getElementById("lower");
    let special = document.getElementById("special");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    if(password.value.match(/[A-Z]/)){
        upper.style.color = "green";
        upperB = true;
    }
    else{
        upper.style.color = "red";
        upperB = false;
    }
    if(password.value.match(/[a-z]/)){
        lower.style.color = "green";
        lowerB = true;
    }
    else{
        lower.style.color = "red";
        lowerB = false;
    }
    if(password.value.match(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\?\<\>\.\,]/)){
        special.style.color = "green";
        specialB = true;
    }
    else{
        special.style.color = "red";
        specialB = false;
    }
    if(password.value.match(/[0-9]/)){
        number.style.color = "green";
        numberB = true;
    }
    else{
        number.style.color = "red";
        numberB = false;
    }
    if(password.value.length>=8){
        length.style.color = "green";
        lengthB = true;
    }
    else{
        length.style.color = "red";
        lengthB = false;
    }
}
