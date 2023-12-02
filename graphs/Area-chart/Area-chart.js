// script.js

var areaData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: true,
    }]
};

var areaOptions = {
    responsive: true,
};

var ctxArea = document.getElementById('myAreaChart').getContext('2d');
var myAreaChart = new Chart(ctxArea, {
    type: 'line',
    data: areaData,
    options: areaOptions
});

function updateChart() {
    var labelInput = document.getElementById('labelInput').value;
    var dataInput = document.getElementById('dataInput').value;

    var labels = labelInput.split(',').map(label => label.trim());
    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    areaData.labels = labels;
    areaData.datasets[0].data = dataValues;

    // Use a single color for the area
    var areaColor = document.getElementById('areaColor').value;
    areaData.datasets[0].backgroundColor = areaColor;
    areaData.datasets[0].borderColor = areaColor;

    myAreaChart.update();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Area Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        canvas {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
        }
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        div {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

<canvas id="myAreaChart" width="600" height="400"></canvas>

<script>
    var areaData = {
        labels: ${JSON.stringify(areaData.labels)},
        datasets: [{
            data: ${JSON.stringify(areaData.datasets[0].data)},
            backgroundColor: '${areaData.datasets[0].backgroundColor}',
            borderColor: '${areaData.datasets[0].borderColor}',
            borderWidth: ${areaData.datasets[0].borderWidth},
            fill: ${areaData.datasets[0].fill},
        }]
    };

    var areaOptions = {
        responsive: true,
    };

    var ctxArea = document.getElementById('myAreaChart').getContext('2d');
    var myAreaChart = new Chart(ctxArea, {
        type: 'line',
        data: areaData,
        options: areaOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'area_chart.html';
    a.click();
}

function downloadAsAreaGraph() {
    var graphConfig = {
        labels: areaData.labels,
        data: areaData.datasets[0].data,
        backgroundColor: areaData.datasets[0].backgroundColor,
        borderColor: areaData.datasets[0].borderColor,
        borderWidth: areaData.datasets[0].borderWidth,
        fill: areaData.datasets[0].fill,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'area-graph.area-grap';
    a.click();
}

function importAreaGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.area-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                areaData.labels = importedConfig.labels;
                areaData.datasets[0].data = importedConfig.data;
                areaData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                areaData.datasets[0].borderColor = importedConfig.borderColor;
                areaData.datasets[0].borderWidth = importedConfig.borderWidth;
                areaData.datasets[0].fill = importedConfig.fill;

                // Update the chart with the imported data
                myAreaChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".area-grap" file.');
    }
}
