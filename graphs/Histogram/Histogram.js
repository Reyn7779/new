// script.js

var histogramData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: '#2196F3',
        borderWidth: 1,
        borderColor: '#fff',
    }]
};

var histogramOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'linear',
            position: 'bottom'
        },
        y: {
            type: 'linear',
            position: 'left'
        }
    }
};

var ctxHistogram = document.getElementById('myHistogramChart').getContext('2d');
var myHistogramChart = new Chart(ctxHistogram, {
    type: 'bar',
    data: histogramData,
    options: histogramOptions
});

function updateChart() {
    var dataInput = document.getElementById('dataInput').value;

    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    histogramData.labels = dataValues.map((value, index) => `Bin ${index + 1}`);
    histogramData.datasets[0].data = dataValues;

    // Use a single color for all bars
    var barColor = document.getElementById('barColor').value;
    histogramData.datasets[0].backgroundColor = Array(dataValues.length).fill(barColor);

    myHistogramChart.update();
}

function generateRandomData() {
    var randomData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    document.getElementById('dataInput').value = randomData.join(', ');
    updateChart();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histogram</title>
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

<canvas id="myHistogramChart" width="600" height="400"></canvas>

<script>
    var histogramData = {
        labels: ${JSON.stringify(histogramData.labels)},
        datasets: [{
            data: ${JSON.stringify(histogramData.datasets[0].data)},
            backgroundColor: '${histogramData.datasets[0].backgroundColor}',
            borderWidth: ${histogramData.datasets[0].borderWidth},
            borderColor: '${histogramData.datasets[0].borderColor}',
        }]
    };

    var histogramOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                type: 'linear',
                position: 'left'
            }
        }
    };

    var ctxHistogram = document.getElementById('myHistogramChart').getContext('2d');
    var myHistogramChart = new Chart(ctxHistogram, {
        type: 'bar',
        data: histogramData,
        options: histogramOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'histogram_chart.html';
    a.click();
}

function downloadAsHistogramGraph() {
    var graphConfig = {
        labels: histogramData.labels,
        data: histogramData.datasets[0].data,
        backgroundColor: histogramData.datasets[0].backgroundColor,
        borderWidth: histogramData.datasets[0].borderWidth,
        borderColor: histogramData.datasets[0].borderColor,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'histogram-graph.histogram-grap';
    a.click();
}

function importHistogramGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.histogram-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                histogramData.labels = importedConfig.labels;
                histogramData.datasets[0].data = importedConfig.data;
                histogramData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                histogramData.datasets[0].borderWidth = importedConfig.borderWidth;
                histogramData.datasets[0].borderColor = importedConfig.borderColor;

                // Update the chart with the imported data
                myHistogramChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".histogram-grap" file.');
    }
}
