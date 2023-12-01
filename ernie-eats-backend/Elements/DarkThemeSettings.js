// const themeSwitch = document.getElementById('theme-switch');
//     const body = document.body;
    
// var theme;

//     themeSwitch.addEventListener('change', () => {
//       body.classList.toggle('dark-mode');
//     });



    // document.addEventListener('DOMContentLoaded', function () {
    //   const themeToggle = document.getElementById('themeToggle');
    //   const body = document.body;
  
        // Check if the theme preference is stored in local storage
    // const isDarkTheme = localStorage.getItem('darkTheme');

    // Apply the stored theme preference if available
    // if (isDarkTheme === 'true') {
    //   body.classList.add('dark-theme');
      // updatePageContent('Dark');
    
  // }

  //     themeToggle.addEventListener('click', function () {
  //         body.classList.toggle('dark-theme');
  //     });

       // Save the current theme preference to local storage
//        const currentTheme = body.classList.contains('dark-theme') ? 'true' : 'false';
//        localStorage.setItem('darkTheme', currentTheme);
//    );
 
  

// let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
// console.log(GetTheme);
  
// if(GetTheme === "DARK"){
//   document.body.classList = "dark-mode";
// }


document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check if the theme preference is stored in local storage
  const isDarkTheme = localStorage.getItem('darkTheme');

  // Apply the stored theme preference if available
  if (isDarkTheme === 'true') {
      body.classList.add('dark-theme');
  }

  themeToggle.addEventListener('click', function () {
      // Toggle the dark-theme class
      body.classList.toggle('dark-theme');

      // Save the current theme preference to local storage
      const currentTheme = body.classList.contains('dark-theme') ? 'true' : 'false';
      localStorage.setItem('darkTheme', currentTheme);
  });
});
