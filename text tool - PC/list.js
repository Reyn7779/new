// list.js

function insertList(type) {
    var content = document.getElementById('content');
    
    // Get the selected text
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedText = range.extractContents();

    // Create the list element based on the type
    var list = document.createElement(type === 'ol' ? 'ol' : 'ul');
    list.appendChild(selectedText);

    // Insert the list at the current cursor position
    range.deleteContents();
    range.insertNode(list);

    // Display alert based on the list type
    var alertMessage = '';
    switch (type) {
        case 'ol':
            alertMessage = 'Ordered List (Number)';
            break;
        case 'ul':
            alertMessage = 'Unordered List (Dot)';
            break;
        default:
            alertMessage = 'List Type: ' + type;
            break;
    }

    alert(alertMessage);
}
