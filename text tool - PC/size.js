function changeTextSize() {
    const fontSizeInput = document.getElementById("fontSizeInput");
    const fontSize = fontSizeInput.value;

    // Validate if the input is a valid number
    if (!isNaN(fontSize)) {
        const selectedText = window.getSelection();
        if (selectedText.toString() !== "") {
            document.execCommand("fontSize", false, fontSize + "px");
        }
    } else {
        alert("Please enter a valid number for the font size.");
    }
}
