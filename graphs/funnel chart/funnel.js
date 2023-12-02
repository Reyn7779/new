// script.js

var funnelData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 1,
    }]
};

var funnelOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    }
};

var ctxFunnel = document.getElementById('myFunnelChart').getContext('2d');
var myFunnelChart = new Chart(ctxFunnel, {
    type: 'funnel',
    data: funnelData,
    options: funnelOptions
});

function updateChart() {
    var stageInput = document.getElementById('stageInput').value;
    var valueInput = document.getElementById('valueInput').value;
    var colorInput = document.getElementById('colorInput').value;

    var stageNames = stageInput.split(',').map(value => value.trim());
    var values = valueInput.split(',').map(value => parseFloat(value.trim()));
    var stageColors = colorInput.split(',').map(value => value.trim());

    if (stageNames.length !== values.length || values.length !== stageColors.length) {
        alert('Please make sure the number of stages, values, and colors match.');
        return;
    }

    funnelData.labels = stageNames;
    funnelData.datasets[0].data = values;
    funnelData.datasets[0].backgroundColor = stageColors;

    myFunnelChart.update();
}

function generateRandomData() {
    var stageNames = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
    var values = [100, 75, 50, 25];
    var stageColors = ['#2196F3', '#4CAF50', '#FFC107', '#E91E63'];

    document.getElementById('stageInput').value = stageNames.join(', ');
    document.getElementById('valueInput').value = values.join(', ');
    document.getElementById('colorInput').value = stageColors.join(', ');

    updateChart();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Funnel Chart</title>
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

<canvas id="myFunnelChart" width="800" height="400"></canvas>

<script>
    var funnelData = {
        labels: ${JSON.stringify(funnelData.labels)},
        datasets: [{
            data: ${JSON.stringify(funnelData.datasets[0].data)},
            backgroundColor: ${JSON.stringify(funnelData.datasets[0].backgroundColor)},
            borderWidth: ${funnelData.datasets[0].borderWidth},
        }]
    };

    var funnelOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        }
    };

    var ctxFunnel = document.getElementById('myFunnelChart').getContext('2d');
    var myFunnelChart = new Chart(ctxFunnel, {
        type: 'funnel',
        data: funnelData,
        options: funnelOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'funnel_chart.html';
    a.click();
}

function downloadAsFunnelGraph() {
    var graphConfig = {
        labels: funnelData.labels,
        data: funnelData.datasets[0].data,
        backgroundColor: funnelData.datasets[0].backgroundColor,
        borderWidth: funnelData.datasets[0].borderWidth,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'funnel-graph.funnel-grap';
    a.click();
}

function importFunnelGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.funnel-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                funnelData.labels = importedConfig.labels;
                funnelData.datasets[0].data = importedConfig.data;
                funnelData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                funnelData.datasets[0].borderWidth = importedConfig.borderWidth;

                // Update the chart with the imported data
                myFunnelChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".funnel-grap" file.');
    }
}
