// ... (Your existing functions)

function insertLink() {
    const linkInput = prompt("Enter link:");
    const textInput = prompt("Enter text:");

    if (linkInput && textInput) {
        const linkElement = document.createElement("a");
        linkElement.href = linkInput;
        linkElement.textContent = textInput;

        // Insert the link at the current cursor position
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(linkElement);
    } else {
        alert("Both link and text inputs are required.");
    }
}

document.getElementById("content").addEventListener("contextmenu", function (event) {
    event.preventDefault();

    // Create a context menu
    const contextMenu = document.createElement("div");
    contextMenu.style.position = "absolute";
    contextMenu.style.backgroundColor = "#f1f1f1";
    contextMenu.style.border = "1px solid #d4d4d4";
    contextMenu.style.padding = "8px";
    contextMenu.style.zIndex = "1";

    // Add buttons to the context menu
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.onclick = function () {
        copyText();
        contextMenu.style.display = "none";
    };

    const pasteButton = document.createElement("button");
    pasteButton.textContent = "Paste";
    pasteButton.onclick = function () {
        // Implement paste functionality if needed
        contextMenu.style.display = "none";
    };

    const insertLinkButton = document.createElement("button");
    insertLinkButton.textContent = "Insert Link";
    insertLinkButton.onclick = function () {
        insertLink();
        contextMenu.style.display = "none";
    };

    // Add buttons to the context menu
    contextMenu.appendChild(copyButton);
    contextMenu.appendChild(pasteButton);
    contextMenu.appendChild(insertLinkButton);

    // Position the context menu
    contextMenu.style.left = event.clientX + "px";
    contextMenu.style.top = event.clientY + "px";

    // Display the context menu
    document.body.appendChild(contextMenu);

    // Hide the context menu when clicking outside of it
    document.addEventListener("click", function hideContextMenu() {
        contextMenu.style.display = "none";
        document.removeEventListener("click", hideContextMenu);
    });
});
