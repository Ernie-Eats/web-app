import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettingsDatabase from '../Database/UserSettingsDatabase.js';
import * as Model from '../Database/models.js';
import * as Function from '../Database/functions.js';

let activePage = "account";
const account = { firstName: "", lastName: "", email: "", username: "", bio: "", profile: undefined };
const general = { darkTheme: false };
const password = { currentPassword: "", newPassword: "", repeatPassword: "" };
const buisness = {};

const contentDivs = [...document.getElementsByClassName("content")];
contentDivs[0].style.display = "block";

const accountButton = document.getElementById("account_button");
accountButton.addEventListener("click", viewAccount);

const generalButton = document.getElementById("general_button");
generalButton.addEventListener("click", viewGeneral);

const passwordButton = document.getElementById("password_button");
passwordButton.addEventListener("click", viewPassword);

const buisnessButton = document.getElementById("business_button");
buisnessButton.addEventListener("click", viewBuisness);

const buttons = [...document.getElementsByClassName('save-button')];
buttons.forEach(b => b.addEventListener('click', save));

// Account Page 
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const bio = document.getElementById("Bio");
const profile = document.getElementById("profile");
const profilePicture = [...document.getElementsByClassName("profileImg")];

await Function.getAddress().then(address => {
    UserDatabase.findUserByAddress(address).then(result => {
        if (result.success) {
            if (!result.model.isBuisnessOwner()) { 
                contentDivs.pop();
                buisnessButton.style.display = "none";
            }

            fname.value = result.model.name.slice(0, result.model.name.indexOf(" "));
            lname.value = result.model.name.slice(result.model.name.indexOf(" ") + 1);
            email.value = result.model.email;
            username.value = result.model.username;
            UserSettingsDatabase.findUserSettingsPageById(result.model.id).then(page => {
                if (page.success) {
                    bio.value = page.model.bio;
                    profilePicture.forEach(elm => elm.src = page.model.profile !== undefined && page.model.profile.length !== 0 ?
                        page.model.profile : "../../ernie-eats-frontend/Images/defaultLogin.png");
                }
            });
        }
    });
});

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

profile.onchange = async (e) => {
    profilePicture[1].src = URL.createObjectURL(e.target.files[0]);
    await Function.convertImageToBase64(e.target.files[0]).then(result => account.profile = result);
}

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

function viewBuisness() {
    contentDivs.forEach((x) => x.style.display = "none");
    document.getElementById("business").style.display = "block";
    activePage = "business";
}

async function save() {
    switch (activePage) {
        case "account":
            {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        if (result.success) {
                            result.model.username = account.username.length === 0 ? result.model.username : account.username;
                            result.model.name = account.firstName.length === 0 && account.lastName.length === 0 ?
                                result.model.name : account.firstName + " " + account.lastName;
                            result.model.email = account.email.length === 0 ? result.model.email : account.email;
                            UserDatabase.updateUser(result.model);
                            UserSettingsDatabase.findUserSettingsPageById(result.model.id).then(page => {
                                if (page.success) {
                                    page.model.bio = account.bio;
                                    page.model.profile = account.profile;
                                    UserSettingsDatabase.updateUserPage(page.model).then(r => {
                                        if (r.success) {
                                            history.go();
                                        }
                                    });
                                } else {
                                    const newPage = new Model.UserSettings(result.model.id, account.bio, false, "", account.profile);
                                    UserSettingsDatabase.insertUserPage(newPage);
                                }
                            });
                        }
                    });
                });
                return;
            }
        case "general":
            {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        if (result.success) {
                            UserSettingsDatabase.findUserSettingsPageById(result.model.id).then(page => {
                                if (page.success) {
                                    page.model.isDarkTheme = general.lightMode;
                                    UserSettingsDatabase.updateUserPage(page.model);
                                }
                            });
                        }
                    })
                });
                return;
            }
        case "password":
            {
                if (password.newPassword === password.repeatPassword) {
                    await Function.getAddress().then(address => {
                        UserDatabase.findUserByAddress(address).then(result => {
                            if (result.success) {
                                if (result.model.password === password.currentPassword) {
                                    result.model.password = password.newPassword;
                                    UserDatabase.updateUser(result.model);
                                }
                            }
                        });
                    });
                }

                return;
            }
        default:
            return;
    }
}
