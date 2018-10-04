google.charts.load("current", {packages:["corechart", "bar"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var donutData = google.visualization.arrayToDataTable([
        ['Type de visiteurs', 'Pourcentage'],
        ['Particuliers',     74],
        ['Professionels',      26]
    ]);

    var donutOptions = {
        title: 'Type de visiteurs en %',
        pieHole: 0.4,
    };

    var donut = new google.visualization.PieChart(document.getElementById('donutchart'));
    donut.draw(donutData, donutOptions);


    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Jour');
    data.addColumn('number', 'Nombre de visites');
    

    data.addRows([
    [new Date(2018, 09, 08), 120],
    [new Date(2018, 09, 09), 100],
    [new Date(2018, 09, 10), 94],
    [new Date(2018, 09, 11), 118],
    [new Date(2018, 09, 12), 136],
    [new Date(2018, 09, 13), 153],
    [new Date(2018, 09, 14), 107],
    [new Date(2018, 09, 15), 87],
    [new Date(2018, 09, 16), 93],
    [new Date(2018, 09, 17), 101],
    ]);

    var options = {
    title: 'Nombre de visites par jour',
    hAxis: {
        title: 'Jour',
        format: 'dd/MM',
    },
    vAxis: {
        title: 'Nombre de visites'
    }
    };

    var chart = new google.visualization.ColumnChart(
    document.getElementById('chart_div'));

    chart.draw(data, options);
}

$(window).resize(function() {
    drawChart();
})