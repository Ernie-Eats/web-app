import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettingsDatabase from '../Database/UserSettingsDatabase.js';
import * as Model from '../Database/models.js';

let activePage = "account";
const account = { firstName: "", lastName: "", email: "", username: "", bio: "" };
const general = { darkTheme: false };
const password = {currentPassword: "", newPassword: "", repeatPassword: ""};

const contentDivs = [...document.getElementsByClassName("content")];
contentDivs[0].style.display = "block";

const accountButton = document.getElementById("account_button");
accountButton.addEventListener("click", viewAccount);

const generalButton = document.getElementById("general_button");
generalButton.addEventListener("click", viewGeneral);

const passwordButton = document.getElementById("password_button");
passwordButton.addEventListener("click", viewPassword);

const buttons = [...document.getElementsByClassName('save-button')];
buttons.forEach(b => b.addEventListener('click', save));

// Account Page 
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const bio = document.getElementById("Bio");

fname.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        account.firstName = value;
    }
};

lname.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        account.lastName = value;
    }
};

email.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        account.email = value;
    }
};

username.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        account.username = value;
    }
};

bio.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        account.bio = value;
    }
};

// General Page
const theme = document.getElementById("theme");
const themeLabel = document.getElementById("themeLabel")

theme.onclick = () => {
    general.darkTheme = !general.darkTheme;
    themeLabel.innerText = general.darkTheme ? "Dark Theme" : "Light Theme";
};


// Password Page
const currentPassword = document.getElementById("cpassword");
const newPassword = document.getElementById("npassword");
const repeatPassword = document.getElementById("cnpassword");

currentPassword.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        password.currentPassword = value;
    }
};

newPassword.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        password.newPassword = value;
    }
};

repeatPassword.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        password.repeatPassword = value;
    }
};

function viewAccount() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("account").style.display = "block";
    activePage = "account";
}

function viewGeneral() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("general").style.display = "block";
    activePage = "general";
}

function viewPassword() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("password").style.display = "block";
    activePage = "password";
}

async function save() {
    switch (activePage) {
        case "account":
            {
                await UserDatabase.findAllUsers().then(result => {
                    if (result.success) {
                        result.model[0].getAddress().then(address => {
                            let found = result.model.find(value => value.address === address);
                            if (found !== undefined) {
                                found.username = account.username.length === 0 ? found.username : account.username;
                                found.name = account.firstName.length === 0 && account.lastName.length === 0
                                    ? found.name : account.firstName + " " + account.lastName;
                                found.email = account.email.length === 0 ? found.email : account.email;
                                UserDatabase.updateUser(found);
                                UserSettingsDatabase.findAllUserPages().then(r => {
                                    if (r.success) {
                                        let foundPage = r.model.find(value => value.userId === found.id);
                                        if (foundPage === undefined) {
                                            let newPage = new Model.UserSettings(found.id, account.bio, false, "", "");
                                            UserSettingsDatabase.insertUserPage(newPage);
                                            return;
                                        }
                                        foundPage.bio = account.bio;
                                        UserSettingsDatabase.updateUserPage(foundPage);
                                    }
                                });
                            }
                        });
                    }
                });
                return;
            }
        case "general":
            {
                await UserDatabase.findAllUsers().then(result => {
                    if (result.success) {
                        result.model[0].getAddress().then(address => {
                            let foundUser = result.model.find(value => value.address === addresss);
                            if (foundUser !== undefined) {
                                UserSettingsDatabase.findAllUserPages().then(pages => {
                                    let foundPage = pages.model.find(value.userId === foundUser.id);
                                    if (foundPage !== undefined) {
                                        foundPage.isDarkTheme = general.lightMode;
                                        UserSettingsDatabase.updateUserPage(foundPage);
                                    }
                                });
                            }
                        });
                    }
                });
                return;
            }
        case "password":
            {
                await UserDatabase.findAllUsers().then(result => {
                    if (result.success) {
                        result.model[0].getAddress().then(address => {
                            let foundUser = result.model.find(value => value.address === address);
                            if (foundUser !== undefined) {
                                if (foundUser.password === password.currentPassword) {
                                    if (password.newPassword === password.repeatPassword) {
                                        foundUser.password = password.newPassword;
                                        UserDatabase.updateUser(foundUser);
                                    }
                                }
                            }
                        });
                    }
                });

                return;
            }
        default:
            return;
    }
}
