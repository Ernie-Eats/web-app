const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

var theme;

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
  
  if(body.classList.contains("dark-mode")){
    console.log("Dark mode");
    theme = "DARK"; 
  } else {
    console.log("Light mode");
    theme = "LIGHT";
  }

  localStorage.setItem("PageTheme", JSON.stringify(theme));

});

let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
console.log(GetTheme);

if(GetTheme === "DARK"){
  document.body.classList = "dark-mode";
}