import * as UserDatabase from '../Database/UserDatabase.js';
import * as UserSettingsDatabase from '../Database/UserSettingsDatabase.js';
import * as RestaurantDatabase from '../Database/RestaurantDatabase.js';
import * as RestaurantPageDatabase from '../Database/RestaurantPageDatabase.js';
import * as Model from '../Database/models.js';
import * as Function from '../Database/functions.js';

let activePage = "account";
const account = { firstName: "", lastName: "", email: "", username: "", bio: "", profile: "", banner: "" };
const general = { darkTheme: false };
const password = { currentPassword: "", newPassword: "", repeatPassword: "" };
const business = { banner: "", name: "", email: "", website: "", address: "", contact: "", hours: new Array(14).fill(""), description: "", others: new Array()};

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

const sidebarButtons = [accountButton, generalButton, passwordButton, buisnessButton];

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
const banner = document.getElementById("banner");
const bannerPicture = document.querySelector(".bannerImg");

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

banner.onchange = async (e) => {
    bannerPicture.src = URL.createObjectURL(e.target.files[0]);
    await Function.convertImageToBase64(e.target.files[0]).then(result => account.banner = result);
}

// General Page
const theme = document.getElementById("theme-switch");
const themeLabel = document.getElementById("theme-display");

theme.onclick = () => {
    general.darkTheme = !general.darkTheme;
    document.body.classList.toggle("dark-mode");
    localStorage.setItem('darkTheme', !general.darkTheme);
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

// Business Page
const bbanner = document.getElementById("bbanner");
const bbannerImg = document.getElementById("bbannerImg");
const bName = document.getElementById("bname");
const bEmail = document.getElementById("bemail");
const bWebsite = document.getElementById("bwebsite");
const bAddress = document.getElementById("address");
const bPhoneNumber = document.getElementById("phoneNumber");
const bDescription = document.getElementById("bdescription");
const bOthers = document.getElementById("others");
const bOtherSelection = document.getElementById("otherSelection");
const bHours = [...document.getElementById("hours").getElementsByClassName("time")];

bbanner.onchange = async (e) => { 
    bbannerImg.src = URL.createObjectURL(e.target.files[0]);
    await Function.convertImageToBase64(e.target.files[0]).then(result => business.banner = result);
}

bName.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        business.name = value;
    }
}

bEmail.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        business.email = value;
    }
}

bWebsite.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        business.website = value;
    }
}

bAddress.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        business.address = value;
    }
}

bPhoneNumber.oninput = (e) => { 
    const value = e.target.value;
    if (value !== undefined) {
        business.contact = value;
    }
}

bDescription.oninput = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
        business.description = value;
    }
}

bOthers.onchange = async (e) => {
    if (e.target.files !== undefined && e.target.files.length >= 1) {
        for (const file of e.target.files) {
            const photo = bOtherSelection.appendChild(document.createElement("img"));
            photo.classList.add("otherImg");
            photo.src = URL.createObjectURL(file);
            await Function.convertImageToBase64(file).then(result => business.others.push(result));
        }
    }
}

bHours.forEach((elm, index) => {
    elm.oninput = (e) => {
        console.log(`There is input on the ${index} element.`);
        const value = e.target.value;
        if (value !== undefined) {
            business.hours.fill(value, index, index + 1);
        }
    }
});

await Function.getAddress().then(address => {
    UserDatabase.findUserByAddress(address).then(result => {
        if (result.success) {
            if (!result.model.isBusinessOwner()) {
                buisnessButton.style.display = "none";
            } else {
                RestaurantDatabase.findRestaurantByOwnerId(result.model.id).then(rest => {
                    console.log(rest);
                    if (rest.success) {
                        bName.value = rest.model.name;
                        RestaurantPageDatabase.findRestaurantPageByRestaurantId(rest.model.id).then(page => {
                            console.log(page);
                            if (page.success) {
                                bEmail.value = page.model.email;
                                bWebsite.value = page.model.website;
                                bAddress.value = page.model.address;
                                bDescription.value = page.model.description;
                                if (page.model.hours !== undefined && page.model.hours.length === 14) {
                                    bHours.forEach((elm, index) => elm.value = page.model.hours[index]);
                                }
                            }
                        });
                    }
                });
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

function viewAccount() {
    contentDivs.forEach((x) => x.style.display = "none");
    sidebarButtons.forEach((x) => x.classList.remove('active'));
    document.getElementById("account").style.display = "block";
    document.getElementById("account_button").classList.add("active");
    activePage = "account";
}

function viewGeneral() {
    contentDivs.forEach((x) => x.style.display = "none");
    sidebarButtons.forEach((x) => x.classList.remove('active'));
    document.getElementById("general").style.display = "block";
    document.getElementById("general_button").classList.add("active");
    activePage = "general";
}

function viewPassword() {
    contentDivs.forEach((x) => x.style.display = "none");
    sidebarButtons.forEach((x) => x.classList.remove('active'));
    document.getElementById("password").style.display = "block";
    document.getElementById("password_button").classList.add("active");
    activePage = "password";
}

function viewBuisness() {
    contentDivs.forEach((x) => x.style.display = "none");
    sidebarButtons.forEach((x) => x.classList.remove('active'));
    document.getElementById("business").style.display = "block";
    document.getElementById("business_button").classList.add("active");
    activePage = "business";
}

async function save() {
    switch (activePage) {
        case "account":
            {
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(result => {
                        console.log(result);
                        if (result.success) {
                            result.model.username = account.username.length === 0 ? result.model.username : account.username;
                            result.model.name = account.firstName.length === 0 && account.lastName.length === 0 ?
                                result.model.name : account.firstName + " " + account.lastName;
                            result.model.email = account.email.length === 0 ? result.model.email : account.email;
                            UserDatabase.updateUser(result.model);
                            UserSettingsDatabase.findUserSettingsPageById(result.model.id).then(page => {
                                console.log(page);
                                if (page.success) {
                                    console.log(account);
                                    page.model.bio = account.bio;
                                    page.model.profile = account.profile;
                                    page.model.banner = account.banner;
                                    UserSettingsDatabase.updateUserPage(page.model).then(r => {
                                        console.log(r);
                                        if (r.success) {
                                            history.go();
                                        }
                                    });
                                } else {
                                    const newPage = new Model.UserSettings(result.model.id, account.bio, false, account.banner, account.profile);
                                    UserSettingsDatabase.insertUserPage(newPage).then(s => console.log(s));
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
                                    UserSettingsDatabase.updateUserPage(page.model).then(p => history.go());
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
        case "business":
            { 
                await Function.getAddress().then(address => {
                    UserDatabase.findUserByAddress(address).then(user => {
                        if (user.success) {
                            RestaurantDatabase.findRestaurantByOwnerId(user.model.id).then(restaurant => {
                                if (restaurant.success) {
                                    RestaurantPageDatabase.findRestaurantPageByRestaurantId(restaurant.model.id).then(page => {
                                        if (page.success) {
                                            page.model.email = business.email.length === 0 ? page.model.email : business.email;
                                            page.model.website = business.website.length === 0 ? page.model.website : business.website;
                                            page.model.hours = business.hours;
                                            page.model.address = business.address.length === 0 ? page.model.address : business.address;
                                            page.model.contact = business.contact.length === 0 ? page.model.contact : business.contact;
                                            page.model.description = business.description.length === 0 ? page.model.description : business.description;
                                            page.model.banner = business.banner;
                                            page.model.photos = business.others;
                                            RestaurantPageDatabase.updateRestaurantPage(page.model);
                                        } else {
                                            const newRestaurantPage = new Model.RestaurantPage(restaurant.model.id, business.email, business.website,
                                                business.hours, business.address, business.contact, business.description, business.banner, business.others);
                                            RestaurantPageDatabase.insertRestaurantPage(newRestaurantPage);
                                        }
                                    })
                                }
                            })
                        }
                    });
                });
                return;
            }
        default:
            return;
    }
}
