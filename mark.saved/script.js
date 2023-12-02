function boldText() {
    document.execCommand("bold", false, null);
}

function italicText() {
    document.execCommand("italic", false, null);
}

function underlineText() {
    document.execCommand("underline", false, null);
}

function strikeThroughText() {
    document.execCommand("strikeThrough", false, null);
}

function strongText() {
    document.execCommand("strong", false, null);
}

function emphasizeText() {
    document.execCommand("em", false, null);
}

function subscriptText() {
    document.execCommand("subscript", false, null);
}

function superscriptText() {
    document.execCommand("superscript", false, null);
}

function insertText() {
    document.execCommand("insertHTML", false, "<ins>Inserted Text</ins>");
}

function lineBreak() {
    document.execCommand("insertHTML", false, "<br>");
}

function changeFontColor() {
    let fontColor = document.getElementById("fontColor").value;
    document.execCommand("foreColor", false, fontColor);
}

function copyText() {
    let content = document.getElementById("content");
    let selectedText = window.getSelection().toString();
    if (selectedText) {
        copyToClipboard(selectedText);
        alert("Selected text copied to clipboard!");
    }
}

function clearFormatting() {
    document.execCommand("removeFormat", false, null);
}

