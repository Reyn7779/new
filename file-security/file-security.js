(function () {
    const correctPassword = 'your_unlock_password_here'; // Replace with your actual unlock password
    const actionPasswords = {
        download: 'your_download_password_here',
        edit: 'your_edit_password_here',
        delete: 'your_delete_password_here',
        upload: 'your_upload_password_here',
        share: 'your_share_password_here',
        copy: 'your_copy_password_here',
        move: 'your_move_password_here'
    };

    function unlockFile() {
        const enteredPassword = document.getElementById('file-password').value;

        if (enteredPassword === correctPassword) {
            document.getElementById('file-content').style.display = 'block';
        } else {
            alert('Incorrect password. Access denied.');
        }
    }

    function performAction(action) {
        const enteredPassword = prompt(`Enter ${action} password:`);

        if (enteredPassword === actionPasswords[action]) {
            alert(`${action} action allowed.`);
            // Add your code to perform the corresponding action here
        } else {
            alert(`Incorrect password. ${action} action not allowed.`);
        }
    }

    document.getElementById('file-password').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            unlockFile();
        }
    });
})();
