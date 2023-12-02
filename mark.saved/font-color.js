function markText() {
    let selection = window.getSelection();
    let selectedText = selection.toString();

    if (selectedText !== "") {
        let markElement = document.createElement("mark");
        markElement.style.backgroundColor = document.getElementById("fontColor").value;
        markElement.textContent = selectedText;

        // Create a range for the selected text
        let range = selection.getRangeAt(0);

        // Delete the contents of the range
        range.deleteContents();

        // Insert the marked element at the start of the range
        range.insertNode(markElement);

        // Clear the selection
        selection.removeAllRanges();
    }
}

function changeFontColor() {
    let fontColor = document.getElementById("fontColor").value;
    document.execCommand("foreColor", false, fontColor);
}
