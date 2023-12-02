
function openHelpDialog() {
    document.getElementById("helpDialog").showModal();
}

function closeHelpDialog() {
    document.getElementById("helpDialog").close();
}

function openMenu() {
    // Open menu.html as a child window
    window.menuWindow = window.open('menu.html', 'menuWindow', 'width=400,height=400');
}

        function downloadTableAsPNG() {
    html2canvas(document.getElementById("content")).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "text-tool.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        document.body.removeChild(link);
    });
}