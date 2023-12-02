// copy.js
function copyText() {
    let content = document.getElementById("content").innerHTML;
    copyToClipboard(content);
    alert("HTML code of the text copied to clipboard!");
}

function copyToClipboard(text) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
