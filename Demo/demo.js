window.addEvent('domready', function() {

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'line',
            zoomType: 'x',
            events: {
                selection: function(event) {
                    if (event.xAxis) {
                        // user selected interval on chart
                        var fromMillis = Math.floor(event.xAxis[0].min);
                        var toMillis = Math.ceil(event.xAxis[0].max);

                        console.log("min = " + fromMillis);
                        console.log("max = " + toMillis);

                    } else {
                        // chart zoom reset
                    }
                }
            }
        },

        xAxis: {
            type: 'datetime',
            maxZoom: 259200000 // three days (3 * 24 * 3600 * 1000)
        },

        series: [{
            data: []
        }]
    });

    // create testing data
    var data = [
        { timestamp: 1331111111111, value: 2},
        { timestamp: 1332111111111, value: 1},
        { timestamp: 1333111111111, value: 3},
        { timestamp: 1334111111111, value: 2},
        { timestamp: 1335111111111, value: 1},
        { timestamp: 1336111111111, value: 5},
        { timestamp: 1337111111111, value: 7},
        { timestamp: 1338111111111, value: 2},
        { timestamp: 1339111111111, value: 1}
    ];

    // populate chart series
    for (var i = 0; i < data.length; i++) {
        chart.series[0].addPoint( [data[i].timestamp, data[i].value], false, false, false );
    }

    chart.redraw();

})
