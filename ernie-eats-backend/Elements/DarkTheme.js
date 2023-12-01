window.onload = () => {
    const isDarkTheme = localStorage.getItem('darkTheme');

    // Apply the stored theme preference if available
    if (isDarkTheme === 'true') {
        document.body.classList.add('dark-mode');
    }
}