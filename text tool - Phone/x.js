function downloadTableAsPNG() {
    html2canvas(document.getElementById("outputTable"), { scale: 1 }).then(canvas => {
        // Create a new anchor tag
        let a = document.createElement('a');
        // Image's URL
        a.href = canvas.toDataURL('image/png');
        // Set the filename
        a.download = 'output-table.png';
        // Trigger the click event
        a.click();
    });
}