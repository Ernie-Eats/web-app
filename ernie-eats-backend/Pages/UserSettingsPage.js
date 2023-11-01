
const contentDivs = [...document.getElementsByClassName("content")];

contentDivs[0].style.display = "block";

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
