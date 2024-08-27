var userName = document.querySelector('#userName');
var userEmail = document.querySelector('#userEmail');
var userEmailLog = document.querySelector('#userEmailLog');
var userPassword = document.querySelector('#userPassword');
var userPasswordLog = document.querySelector('#userPasswordLog');
var alertMessage = document.querySelector('#alertMessage');
var singBtn = document.querySelector('#singBtn');
var logInBtn = document.querySelector('#logInBtn');
var logOutBtn = document.querySelector('#logOutBtn');
var head = document.querySelector('#head');

var userInfo;
var names;

if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
} else {
    userInfo = [];
}

if (singBtn) {

    singBtn.addEventListener('click', function (e) {
        getUserInfo();
    })

    function emailCheck(email) {

        for (var i = 0; i < userInfo.length; i++) {

            if (userInfo[i].userEmail === email) {

                return true;
            }
        }
        return false;
    }

    function getUserInfo() {

        var info = {
            userName: userName.value,
            userEmail: userEmail.value,
            userPassword: userPassword.value
        }

        if (userName.classList.contains('is-valid') &&
            userEmail.classList.contains('is-valid') &&
            userPassword.classList.contains('is-valid')) {

            if (emailCheck(userEmail.value)) {

                alertMessage.innerHTML = 'This email is already exist';
            } else {

                alertMessage.classList.add('d-none');
                console.log(info);
                userInfo.push(info);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location.href = "login.html";

                clearSingForm();
                console.log(userInfo);
            }

        } else if (userName.classList.contains('is-invalid') &&
            userEmail.classList.contains('is-invalid') &&
            userPassword.classList.contains('is-invalid')) {

            alertMessage.innerHTML = 'inputs are invalid';

        } else if (userName.classList.contains('is-invalid')) {

            alertMessage.innerHTML = 'name must be 3 letters at least';

        } else if (userEmail.classList.contains('is-invalid')) {

            alertMessage.innerHTML = 'Email must be valid';

        } else if (userPassword.classList.contains('is-invalid')) {

            alertMessage.innerHTML = 'password must be between 1 and 27';

        } else {

            alertMessage.innerHTML = 'all inputs are required';
        }
    }

    userName.addEventListener('input', function (e) {
        validationlogin(this);
    })

    userEmail.addEventListener('input', function (e) {
        validationlogin(this);
    })

    userPassword.addEventListener('input', function (e) {
        validationlogin(this);
    })

    function validationlogin(element) {

        var formRegex = {
            userName: /^[A-Za-z]{3,10}\s?(\w|^\w|\s){0,70}$/,
            userEmail: /^[A-Za-z0-9]{5,30}(@gmail\.)[a-z]{2,10}$/,
            userPassword: /^.{1,27}$/
        }

        if (formRegex[element.id].test(element.value)) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
        }
    }

    document.querySelector('.log-form').lastElementChild.firstElementChild.addEventListener('click', function (e) {

        window.location.href = "login.html";
    })
} else if (logInBtn) {

    logInBtn.addEventListener('click', function (e) {

        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i].userEmail === userEmailLog.value && userInfo[i].userPassword === userPasswordLog.value) {

                alertMessage.classList.add('d-none');
                window.location.href = "home.html";
                names = (userInfo[i].userName);
                localStorage.setItem('names', names);

                clearLogForm();
            } else {

                alertMessage.innerHTML = "Invalid email or password";
            }
        }
    })

    logInBtn.nextElementSibling.firstElementChild.addEventListener('click', function (e) {

        window.location.href = 'index.html';
    })
} else if (head) {

    head.innerHTML = `Welcome <span>${localStorage.getItem('names', names)}</span>`;

    logOutBtn.addEventListener('click', function () {

        window.location.href = 'login.html';
        localStorage.removeItem('names');
    })
}

function clearSingForm() {
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    userName.classList.remove('is-valid');
    userEmail.classList.remove('is-valid');
    userPassword.classList.remove('is-valid');
    alertMessage.classList.add('d-none');
}

function clearLogForm() {
    userEmailLog.value = '';
    userPasswordLog.value = '';
}