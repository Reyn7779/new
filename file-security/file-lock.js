(function () {
    let lockedContent = ''; // Variable to store the locked content
    const correctPassword = 'your_unlock_password_here'; // Replace with your actual unlock password

    function lockFile() {
        const contentInput = document.getElementById('file-content-input');
        lockedContent = contentInput.value;

        alert('File locked successfully!');
        contentInput.value = ''; // Clear the textarea
    }

    function unlockFile() {
        const enteredPassword = document.getElementById('file-password').value;

        if (enteredPassword === correctPassword) {
            document.getElementById('file-content').style.display = 'block';
            document.getElementById('locked-content').textContent = lockedContent;
        } else {
            alert('Incorrect password. Access denied.');
        }
    }

    function downloadFile() {
        if (lockedContent) {
            const blob = new Blob([lockedContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'locked_file.txt';
    
            document.body.appendChild(link);
    
            // Use setTimeout to ensure the link is added to the DOM before clicking it
            setTimeout(() => {
                link.click();
                document.body.removeChild(link);
            }, 0);
        } else {
            alert('No content to download. Lock the file first.');
        }
    }
    

    document.getElementById('file-password').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            unlockFile();
        }
    });
})();
