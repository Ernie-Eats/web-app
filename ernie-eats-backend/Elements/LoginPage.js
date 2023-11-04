import * as Userdatabase from '../Database/UserDatabase.js'
import { User } from '../Database/models.js';

class LoginPage extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "./ernie-eats-frontend/CSS/login-Signup.css";

        const login = document.createElement("div");
        login.setAttribute("class", "login");

        const wrapper = login.appendChild(document.createElement("div"));
            wrapper.setAttribute("class", "login-wrapper");

            const signinTab = wrapper.appendChild(document.createElement("input"));
            signinTab.setAttribute("id", "signin-tab");
            signinTab.setAttribute("type", "radio");
            signinTab.setAttribute("name", "tab");
            signinTab.setAttribute("class", "signin");
            signinTab.setAttribute("checked", "");

            const labelSigninTab = wrapper.appendChild(document.createElement("label"));
            labelSigninTab.setAttribute("for", "signin-tab");
            labelSigninTab.setAttribute("class", "tab");
            labelSigninTab.innerText = "Sign In";

            const signupTab = wrapper.appendChild(document.createElement("input"));
            signupTab.setAttribute("id", "signup-tab");
            signupTab.setAttribute("type", "radio");
            signupTab.setAttribute("name", "tab");
            signupTab.setAttribute("class", "signup");

            const labelSignupTab = wrapper.appendChild(document.createElement("label"));
            labelSignupTab.setAttribute("for", "signup-tab");
            labelSignupTab.setAttribute("class", "tab");
            labelSignupTab.innerText = "Sign Up";

            const loginFormWrapper = wrapper.appendChild(document.createElement("div"));
            loginFormWrapper.setAttribute("class", "login-form");

            // Signin Page

            const signupPageWrapper = loginFormWrapper.appendChild(document.createElement("div"));
            signupPageWrapper.setAttribute("class", "signin-page");

            const accountTypeGroup = signupPageWrapper.appendChild(document.createElement("div"));
            accountTypeGroup.setAttribute("class", "group");

            const usernameLabel = accountTypeGroup.appendChild(document.createElement("label"));
            usernameLabel.setAttribute("for", "user");
            usernameLabel.setAttribute("class", "label");
            usernameLabel.innerText = "Username";

            const usernameInput = accountTypeGroup.appendChild(document.createElement("input"));
            usernameInput.setAttribute("id", "user");
            usernameInput.setAttribute("type", "text");
            usernameInput.setAttribute("class", "input");

            const passwordTypeGroup = signupPageWrapper.appendChild(document.createElement("div"));
            passwordTypeGroup.setAttribute("class", "group");

            const passwordLabel = passwordTypeGroup.appendChild(document.createElement("label"));
            passwordLabel.setAttribute("for", "pass");
            passwordLabel.setAttribute("class", "label");
            passwordLabel.innerText = "Password";

            const passwordInput = passwordTypeGroup.appendChild(document.createElement("input"));
            passwordInput.setAttribute("id", "pass");
            passwordInput.setAttribute("type", "text");
            passwordInput.setAttribute("class", "input");
            passwordInput.setAttribute("data-type", "password");

            const keepSignedInGroup = signupPageWrapper.appendChild(document.createElement("div"));
            // keepSignedInGroup.setAttribute("class", "group");

            const signinLabel = keepSignedInGroup.appendChild(document.createElement("label"));
            signinLabel.setAttribute("for", "check");
            signinLabel.setAttribute("class", "label");
            signinLabel.innerText = "Keep me Signed in";

            const signinInput = keepSignedInGroup.appendChild(document.createElement("input"));
            signinInput.setAttribute("id", "check");
            signinInput.setAttribute("type", "checkbox");
            signinInput.setAttribute("class", "check");
            signinInput.setAttribute("checked", "");

            const submitButtonGroup = signupPageWrapper.appendChild(document.createElement("div"));
            submitButtonGroup.setAttribute("class", "group");

            const submitButton = submitButtonGroup.appendChild(document.createElement("input"));
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("class", "button");
            submitButton.setAttribute("value", "Sign In");

            const hr = signupPageWrapper.appendChild(document.createElement("div"));
            hr.setAttribute("class", "hr");

            const loginFooter = signupPageWrapper.appendChild(document.createElement("div"));
            loginFooter.setAttribute("class", "footer");

            const forgotPassword = loginFooter.appendChild(document.createElement("a"));
            forgotPassword.href = "";
            forgotPassword.innerText = "Forgot Password?";

            // Sign up Page

            const signupFormWrapper = loginFormWrapper.appendChild(document.createElement("div"));
            signupFormWrapper.setAttribute("class", "signup-page");

            const accountRadioGroup = signupFormWrapper.appendChild(document.createElement("div"));
            accountRadioGroup.setAttribute("class", "group");

            const accountTypeHeader = accountRadioGroup.appendChild(document.createElement("label"));
            accountTypeHeader.setAttribute("class", "label");
            accountTypeHeader.innerText = "Account Type:";

            const buisnessRadio = accountRadioGroup.appendChild(document.createElement("input"));
            buisnessRadio.setAttribute("type", "radio");
            buisnessRadio.setAttribute("id", "buisness");
            buisnessRadio.setAttribute("name", "account-type");
            buisnessRadio.setAttribute("value", "business");

            const buisnessLabel = accountRadioGroup.appendChild(document.createElement("label"));
            buisnessLabel.setAttribute("type", "radio");
            buisnessLabel.setAttribute("class", "radio-inline");
            buisnessLabel.setAttribute("for", "business");
            buisnessLabel.innerText = "Business";

            const personalRadio = accountRadioGroup.appendChild(document.createElement("input"));
            personalRadio.setAttribute("type", "radio");
            personalRadio.setAttribute("id", "personal");
            personalRadio.setAttribute("name", "account-type");
            personalRadio.setAttribute("value", "personal");
            personalRadio.setAttribute("checked", "");

            const radioLabel = accountRadioGroup.appendChild(document.createElement("label"));
            radioLabel.setAttribute("type", "radio");
            radioLabel.setAttribute("class", "radio-inline");
            radioLabel.setAttribute("for", "personal");
            radioLabel.innerText = "Personal";

            const signupUsernameGroup = signupFormWrapper.appendChild(document.createElement("div"));
            signupUsernameGroup.setAttribute("class", "group");

            const signupUsernameLabel = signupUsernameGroup.appendChild(document.createElement("label"));
            signupUsernameLabel.setAttribute("for", "signup-user");
            signupUsernameLabel.setAttribute("class", "label");
            signupUsernameLabel.innerText = "Username";

            const signupUserInput = signupUsernameGroup.appendChild(document.createElement("input"));
            signupUserInput.setAttribute("id", "signup-user");
            signupUserInput.setAttribute("type", "text");
            signupUserInput.setAttribute("class", "input");

            const signupPasswordGroup = signupFormWrapper.appendChild(document.createElement("div"));
            signupPasswordGroup.setAttribute("class", "group");

            const signupPasswordLabel = signupPasswordGroup.appendChild(document.createElement("label"));
            signupPasswordLabel.setAttribute("for", "signup-pass");
            signupPasswordLabel.setAttribute("class", "label");
            signupPasswordLabel.innerText = "Password";

            const signupPasswordInput = signupPasswordGroup.appendChild(document.createElement("input"));
            signupPasswordInput.setAttribute("id", "signup-pass");
            signupPasswordInput.setAttribute("type", "password");
            signupPasswordInput.setAttribute("class", "input");
            signupPasswordInput.setAttribute("data-type", "password");

            const signupRePasswordGroup = signupFormWrapper.appendChild(document.createElement("div"));
            signupRePasswordGroup.setAttribute("class", "group");

            const signupRePasswordLabel = signupRePasswordGroup.appendChild(document.createElement("label"));
            signupRePasswordLabel.setAttribute("for", "signup-repeat-pass");
            signupRePasswordLabel.setAttribute("class", "label");
            signupRePasswordLabel.innerText = "Confirm Password";

            const signupRePasswordInput = signupRePasswordGroup.appendChild(document.createElement("input"));
            signupRePasswordInput.setAttribute("id", "signup-repeat-pass");
            signupRePasswordInput.setAttribute("type", "password");
            signupRePasswordInput.setAttribute("class", "input");
            signupRePasswordInput.setAttribute("data-type", "password");
            
            const signupEmailGroup = signupFormWrapper.appendChild(document.createElement("div"));
            signupEmailGroup.setAttribute("class", "group");

            const signupEmailLabel = signupEmailGroup.appendChild(document.createElement("label"));
            signupEmailLabel.setAttribute("for", "email");
            signupEmailLabel.setAttribute("class", "label");
            signupEmailLabel.innerText = "Email Address";

            const signupEmailInput = signupEmailGroup.appendChild(document.createElement("input"));
            signupEmailInput.setAttribute("id", "email");
            signupEmailInput.setAttribute("type", "text");
            signupEmailInput.setAttribute("class", "input");

            const signupSubmitGroup = signupFormWrapper.appendChild(document.createElement("div"));
            signupSubmitGroup.setAttribute("class", "group");

            const signupSubmitButton = signupSubmitGroup.appendChild(document.createElement("input"));
            signupSubmitButton.setAttribute("class", "button");
            signupSubmitButton.setAttribute("type", "submit");
            signupSubmitButton.setAttribute("value", "Sign up");
        
        const signinUser = { user: "", password: "" };

            usernameInput.oninput = (e) => {
                const value = e.target.value;
                if (value !== undefined) {
                    signinUser.user = value;
                }
            }

            passwordInput.oninput = (e) => {
                const value = e.target.value;
                if (value !== undefined) {
                    signinUser.password = value;
                }
            }

            submitButton.onclick = async () => {
                const keepSignedIn = signinInput.checked;
                if ((signinUser.user === undefined || signinUser.user.length === 0) ||
                        (signinUser.password === undefined || signinUser.password.length === 0)) {
                            console.log("No Username or password was entered");
                            return;
                }

                await Userdatabase.findUserByUsernamePassword(signinUser.user, signinUser.password).then(result => {
                    if (result.success) {
                        result.model.getAddress().then(address => {
                            result.model.address = keepSignedIn ? address : "unknown";
                            Userdatabase.updateUser(result.model).then(r => {
                                console.log(r);
                                if (r.success) {
                                    window.open('index.html');
                                    //window.close('login-Signup.html');
                                }
                            });
                        });
                    }
                });
            }

            const signupUser = { user: "", password: "", repassword: "", email: "" };

            signupUserInput.oninput = (e) => {
                const value = e.target.value;
                if (value !== undefined) {
                    signupUser.user = value;
                }
            }

            signupPasswordInput.oninput = (e) => {
                const value = e.target.value;
                if (value !== undefined) {
                    signupUser.password = value;
                }
            }

            signupRePasswordInput.oninput = (e) => {
                const value = e.target.value;
                if (value !== undefined) {
                    signupUser.repassword = value;
                }
            }

            signupEmailInput.oninput = (e) => {
                const value = e.target.value;
                if (value !== undefined) {
                    signupUser.email = value;
                }
            }

            signupSubmitButton.onclick = async () => {
                if ((signupUser.user === undefined || signupUser.user.length === 0)
                    || (signupUser.password === undefined || signupUser.password.length === 0)
                    || (signupUser.repassword === undefined || signupUser.repassword.length === 0)
                    || (signupUser.email === undefined || signupUser.email.length === 0)) {
                        console.log("Values were not entered");
                        return;
                }

                if (signupUser.password !== signupUser.repassword) {
                    console.log("Passwords do not match");
                    return;
                }
                const isPersonal = personalRadio.checked;

                const user = new User("", signupUser.user, signupUser.email, signupUser.password, !isPersonal, "", "");
                user.address = await user.getAddress();

                await Userdatabase.insertUser(user).then(result => {
                    if (result.success) {       
                        window.close();
                        window.open('index.html');
                    }
                });
            }

        shadow.appendChild(css);
        shadow.appendChild(login);
    }
}

customElements.define("login-page", LoginPage);