// Your existing functions

function changeTheme() {
    var selectedTheme = document.getElementById('theme').value;

    // Remove existing theme class
    document.body.classList.remove('dark', 'light');

    // Add the selected theme class
    if (selectedTheme !== 'default') {
        document.body.classList.add(selectedTheme);
    }
}
