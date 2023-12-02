function markText() {
    let selection = window.getSelection();
    let selectedText = selection.toString();

    if (selectedText !== "") {
        // Ask the user whether to use the original color
        let useOriginalColor = confirm("Do you want to use the original color?");

        let markElement = document.createElement("mark");
        if (!useOriginalColor) {
            markElement.style.backgroundColor = document.getElementById("fontColor").value;
        }
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
