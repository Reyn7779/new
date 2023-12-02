// script.js

var candlestickData = {
    labels: ['Candlestick Chart'],
    datasets: [{
        data: [],
        borderColor: '#4CAF50',
        backgroundColor: '#2196F3',
    }]
};

var candlestickOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'category',
            labels: ['Candlestick'],
        },
        y: {
            beginAtZero: true,
        }
    }
};

var ctxCandlestick = document.getElementById('myCandlestickChart').getContext('2d');
var myCandlestickChart = new Chart(ctxCandlestick, {
    type: 'candlestick',
    data: candlestickData,
    options: candlestickOptions
});

function updateChart() {
    var dataInput = document.getElementById('dataInput').value;

    var candlestickValues = dataInput.split(',').map(value => parseFloat(value.trim()));
    
    if (candlestickValues.length !== 4) {
        alert('Please enter four values (Open, High, Low, Close) for each candlestick.');
        return;
    }

    candlestickData.datasets[0].data = [{
        o: candlestickValues[0],
        h: candlestickValues[1],
        l: candlestickValues[2],
        c: candlestickValues[3],
    }];

    candlestickData.datasets[0].backgroundColor = document.getElementById('candleColor').value;
    candlestickData.datasets[0].borderColor = document.getElementById('borderColor').value;

    myCandlestickChart.update();
}

function generateRandomData() {
    var randomData = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));
    document.getElementById('dataInput').value = randomData.join(', ');
    updateChart();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candlestick Chart</title>
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

<canvas id="myCandlestickChart" width="600" height="400"></canvas>

<script>
    var candlestickData = {
        labels: ['Candlestick Chart'],
        datasets: [{
            data: ${JSON.stringify(candlestickData.datasets[0].data)},
            borderColor: '${candlestickData.datasets[0].borderColor}',
            backgroundColor: '${candlestickData.datasets[0].backgroundColor}',
        }]
    };

    var candlestickOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                labels: ['Candlestick'],
            },
            y: {
                beginAtZero: true,
            }
        }
    };

    var ctxCandlestick = document.getElementById('myCandlestickChart').getContext('2d');
    var myCandlestickChart = new Chart(ctxCandlestick, {
        type: 'candlestick',
        data: candlestickData,
        options: candlestickOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'candlestick_chart.html';
    a.click();
}

function downloadAsCandlestickGraph() {
    var graphConfig = {
        data: candlestickData.datasets[0].data,
        borderColor: candlestickData.datasets[0].borderColor,
        backgroundColor: candlestickData.datasets[0].backgroundColor,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'candlestick-graph.candlestick-grap';
    a.click();
}

function importCandlestickGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.candlestick-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                candlestickData.datasets[0].data = importedConfig.data;
                candlestickData.datasets[0].borderColor = importedConfig.borderColor;
                candlestickData.datasets[0].backgroundColor = importedConfig.backgroundColor;

                // Update the chart with the imported data
                myCandlestickChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".candlestick-grap" file.');
    }
}
