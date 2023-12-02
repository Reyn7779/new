// Your existing functions



function changeFontStyle() {
    var fontStyle = document.getElementById('fontStyle').value;
    document.getElementById('content').style.fontStyle = fontStyle;
}

function undo() {
    document.execCommand('undo', false, null);
}

function redo() {
    document.execCommand('redo', false, null);
}

// Add event listeners for Font Size and Style
document.getElementById('fontSize').addEventListener('change', changeFontSize);
document.getElementById('fontStyle').addEventListener('change', changeFontStyle);

// Add event listener for content changes to update word count
document.getElementById('content').addEventListener('input', updateWordCount);
