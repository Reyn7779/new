// script.js

var ganttData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        borderWidth: 1,
    }]
};

var ganttOptions = {
    responsive: true,
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
                displayFormats: {
                    day: 'YYYY-MM-DD'
                }
            },
            title: {
                display: true,
                text: 'Timeline'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Tasks'
            }
        }
    }
};

var ctxGantt = document.getElementById('myGanttChart').getContext('2d');
var myGanttChart = new Chart(ctxGantt, {
    type: 'bar',
    data: ganttData,
    options: ganttOptions
});

function updateChart() {
    var taskInput = document.getElementById('taskInput').value;
    var startDateInput = document.getElementById('startDateInput').value;
    var endDateInput = document.getElementById('endDateInput').value;

    var taskNames = taskInput.split(',').map(value => value.trim());
    var startDates = startDateInput.split(',').map(value => new Date(value.trim()));
    var endDates = endDateInput.split(',').map(value => new Date(value.trim()));

    if (taskNames.length !== startDates.length || startDates.length !== endDates.length) {
        alert('Please make sure the number of tasks, start dates, and end dates match.');
        return;
    }

    ganttData.labels = taskNames;
    ganttData.datasets[0].data = taskNames.map((task, index) => ({
        x: startDates[index],
        y: task,
        x1: endDates[index],
    }));

    ganttData.datasets[0].backgroundColor = document.getElementById('barColor').value;

    myGanttChart.update();
}

function generateRandomData() {
    var taskNames = ['Task 1', 'Task 2', 'Task 3'];
    var startDates = [new Date('2023-01-01'), new Date('2023-01-05'), new Date('2023-01-10')];
    var endDates = [new Date('2023-01-07'), new Date('2023-01-12'), new Date('2023-01-15')];

    document.getElementById('taskInput').value = taskNames.join(', ');
    document.getElementById('startDateInput').value = startDates.map(date => date.toISOString().split('T')[0]).join(', ');
    document.getElementById('endDateInput').value = endDates.map(date => date.toISOString().split('T')[0]).join(', ');

    updateChart();
}

function downloadAsHTML() {
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gantt Chart</title>
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

<canvas id="myGanttChart" width="800" height="400"></canvas>

<script>
    var ganttData = {
        labels: ${JSON.stringify(ganttData.labels)},
        datasets: [{
            data: ${JSON.stringify(ganttData.datasets[0].data)},
            backgroundColor: '${ganttData.datasets[0].backgroundColor}',
            borderColor: '${ganttData.datasets[0].backgroundColor}',
            borderWidth: ${ganttData.datasets[0].borderWidth},
        }]
    };

    var ganttOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'YYYY-MM-DD'
                    }
                },
                title: {
                    display: true,
                    text: 'Timeline'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Tasks'
                }
            }
        }
    };

    var ctxGantt = document.getElementById('myGanttChart').getContext('2d');
    var myGanttChart = new Chart(ctxGantt, {
        type: 'bar',
        data: ganttData,
        options: ganttOptions
    });
</script>

</body>
</html>`;
        
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'gantt_chart.html';
    a.click();
}

function downloadAsGanttGraph() {
    var graphConfig = {
        labels: ganttData.labels,
        data: ganttData.datasets[0].data,
        backgroundColor: ganttData.datasets[0].backgroundColor,
        borderColor: ganttData.datasets[0].backgroundColor,
        borderWidth: ganttData.datasets[0].borderWidth,
    };

    var blob = new Blob([JSON.stringify(graphConfig)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'gantt-graph.gantt-grap';
    a.click();
}

function importGanttGraphFile() {
    var fileInput = document.querySelector('input[type="file"]');
    var file = fileInput.files[0];

    if (file && file.name.endsWith('.gantt-grap')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var importedConfig = JSON.parse(content);

                ganttData.labels = importedConfig.labels;
                ganttData.datasets[0].data = importedConfig.data;
                ganttData.datasets[0].backgroundColor = importedConfig.backgroundColor;
                ganttData.datasets[0].borderColor = importedConfig.backgroundColor;
                ganttData.datasets[0].borderWidth = importedConfig.borderWidth;

                // Update the chart with the imported data
                myGanttChart.update();
            } catch (error) {
                console.error('Error parsing the imported file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a valid ".gantt-grap" file.');
    }
}
