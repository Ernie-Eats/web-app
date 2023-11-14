async function getAddress() {
    return await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    });
}

export { getAddress,  convertImageToBase64 } 
