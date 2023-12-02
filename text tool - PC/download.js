function downloadFile() {
    var fileType = document.getElementById("fileType").value;
    var content = document.getElementById("content").cloneNode(true);

    // Convert images to data URLs
    var images = content.querySelectorAll("img");
    images.forEach(function (img) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        img.src = canvas.toDataURL();
    });

    var contentHTML = content.innerHTML;
    var blob = new Blob([contentHTML], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "text-tool." + fileType);
}

