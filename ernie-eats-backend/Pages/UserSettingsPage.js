import * as Userdatabase from '../Database/UserDatabase.js';

const contentDivs = [...document.getElementsByClassName("content")];
contentDivs[0].style.display = "block";

const accountButton = document.getElementById("account_button");
accountButton.addEventListener("click", viewAccount);

const generalButton = document.getElementById("general_button");
generalButton.addEventListener("click", viewGeneral);

const passwordButton = document.getElementById("password_button");
passwordButton.addEventListener("click", viewPassword);

function viewAccount() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("account").style.display = "block";
}

function viewGeneral() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("general").style.display = "block";
}

function viewPassword() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("password").style.display = "block";
}
