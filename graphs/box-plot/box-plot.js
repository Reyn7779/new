// script.js

var boxPlotData = {
    labels: ['Box Plot'],
    datasets: [{
        data: [],
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        borderWidth: 2,
        outlierRadius: 4,
        itemRadius: 4,
        whiskerColor: '#4CAF50',
        whiskerWidth: 2,
        medianColor: '#FFC107',
        medianWidth: 2,
    }]
};

var boxPlotOptions = {
    responsive: true,
    scales: {
        x: {
            display: false,
        },
        y: {
            beginAtZero: true,
        }
    }
};

var ctxBoxPlot = document.getElementById('myBoxPlotChart').getContext('2d');
var myBoxPlotChart = new Chart(ctxBoxPlot, {
    type: 'boxplot',
    data: boxPlotData,
    options: boxPlotOptions
});

function updateChart() {
    var dataInput = document.getElementById('dataInput').value;

    var dataValues = dataInput.split(',').map(value => parseFloat(value.trim()));

    boxPlotData.datasets[0].data = [dataValues];
    boxPlotData.datasets[0].backgroundColor = document.getElementById('boxColor').value;
    boxPlotData.datasets[0].borderColor = document.getElementById('boxColor').value;
    boxPlotData.datasets[0].whiskerColor = document.getElementById('whiskerColor').value;

    myBoxPlotChart.update();
}

function generateRandomData() {
    var randomData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    document.getElementById('dataInput').value = randomData.join(', ');
    updateChart();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box Plot</title>
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

<canvas id="myBoxPlotChart" width="600" height="400"></canvas>

<script>
    var boxPlotData = {
        labels: ['Box Plot'],
        datasets: [{
            data: ${JSON.stringify(boxPlotData.datasets[0].data)},
            backgroundColor: '${boxPlotData.datasets[0].backgroundColor}',
            borderColor: '${boxPlotData.datasets[0].borderColor}',
            borderWidth: ${boxPlotData.datasets[0].borderWidth},
            outlierRadius: ${boxPlotData.datasets[0].outlierRadius},
            itemRadius: ${boxPlotData.datasets[0].itemRadius},
            whiskerColor: '${boxPlotData.datasets[0].whiskerColor}',
            whiskerWidth: ${boxPlotData.datasets[0].whiskerWidth},
            medianColor: '${boxPlotData.datasets[0].medianColor}',
            medianWidth: ${boxPlotData.datasets[0].medianWidth},
        }]
    };

    var boxPlotOptions = {
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                beginAtZero: true,
            }
        }
    };

    var ctxBoxPlot = document.getElementById('myBoxPlotChart').getContext('2d');
    var myBoxPlotChart = new Chart(ctxBoxPlot, {
        type: 'boxplot',
        data: boxPlotData,
        options: boxPlotOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'boxplot_chart.html';
    a.click();
}

function downloadAsBoxPlotGraph() {
    var graphConfig = {
        data: boxPlotData.datasets[0].data,
        backgroundColor: boxPlotData.datasets[0].backgroundColor,
        borderColor: boxPlotData.datasets[0].borderColor,
        borderWidth: boxPlotData.datasets[0].borderWidth,
        outlierRadius: boxPlotData.datasets[0].outlierRadius,
        itemRadius: boxPlotData.datasets[0].itemRadius,
        whiskerColor: boxPlotData.datasets[0].whiskerColor,
        whiskerWidth: boxPlotData.datasets[0].whiskerWidth,
        medianColor: boxPlotData.datasets[0].medianColor,
        medianWidth: boxPlotData.datasets[0].medianWidth,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'boxplot-graph.boxplot-grap';
    a.click();
}

function importBoxPlotGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.boxplot-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                boxPlotData.datasets[0].data = importedConfig.data;
                boxPlotData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                boxPlotData.datasets[0].borderColor = importedConfig.borderColor;
                boxPlotData.datasets[0].borderWidth = importedConfig.borderWidth;
                boxPlotData.datasets[0].outlierRadius = importedConfig.outlierRadius;
                boxPlotData.datasets[0].itemRadius = importedConfig.itemRadius;
                boxPlotData.datasets[0].whiskerColor = importedConfig.whiskerColor;
                boxPlotData.datasets[0].whiskerWidth = importedConfig.whiskerWidth;
                boxPlotData.datasets[0].medianColor = importedConfig.medianColor;
                boxPlotData.datasets[0].medianWidth = importedConfig.medianWidth;

                // Update the chart with the imported data
                myBoxPlotChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".boxplot-grap" file.');
    }
}
