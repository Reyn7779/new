// outline.js

function addOutline() {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        let span = document.createElement("span");

        // Get the color from the fontColor input
        let fontColorInput = document.getElementById("fontColor");
        let outlineColor = fontColorInput.value || "blue"; // Default to blue if no color is selected
        span.style.outline = `2px solid ${outlineColor}`; // Customize the width and use the selected color

        range.surroundContents(span);
    }
}

function removeOutline() {
    let content = document.getElementById("content");
    content.style.outline = "none";
}
