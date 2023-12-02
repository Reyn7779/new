// Create an object to store passwords for each action
const passwords = {
    open: 'your_open_password_here',
    create: 'your_create_password_here',
    delete: 'your_delete_password_here',
    upload: 'your_upload_password_here',
    copy: 'your_copy_password_here',
    move: 'your_move_password_here'
};

function preventAction(action) {
    const inputPassword = prompt(`Enter ${action} password:`);

    // Check if the entered password matches the stored password for the given action
    if (inputPassword === passwords[action]) {
        alert(`Password for ${action} is correct. Action allowed.`);
        // Add your code to perform the corresponding action here
    } else {
        alert(`Incorrect password. ${action} action not allowed.`);
    }
}
