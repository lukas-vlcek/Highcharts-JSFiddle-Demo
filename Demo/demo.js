$(function () {

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'line',
            zoomType: 'x'
        },

        xAxis: {
            events: {
                setExtremes: function(event){
                    console.log("setExtremes",event);
                    if (event.max && event.min) {
                        // user selected interval on chart
                        var fromMillis = Math.floor(event.min);
                        var toMillis = Math.ceil(event.max);

                        console.log("min = " + fromMillis);
                        console.log("max = " + toMillis);
                    } else {
                        // chart zoom reset
                    }
                }
            },
            type: 'datetime',
            minRange: 259200000 // three days (3 * 24 * 3600 * 1000)
        },

        series: [{
            data: []
        }]
    });

    var manualMin = 1333111111111;
    var manualMax = 1337111111111;

    var manualMin2 = 1335111111111;
    var manualMax2 = 1336111111111;

    // create testing data
    var data = [
        { timestamp: 1331111111111, value: 2},
        { timestamp: 1332111111111, value: 1},
        { timestamp: manualMin, value: 3},
        { timestamp: 1334111111111, value: 2},
        { timestamp: manualMin2, value: 1},
        { timestamp: manualMax2, value: 5},
        { timestamp: manualMax, value: 7},
        { timestamp: 1338111111111, value: 2},
        { timestamp: 1339111111111, value: 1}
    ];

    // populate chart series
    for (var i = 0; i < data.length; i++) {
        chart.series[0].addPoint( [data[i].timestamp, data[i].value], false, false, false );
    }

    chart.redraw();

    $("#resetZoom").click(function(){
        console.log("zoom reset", chart);
        chart.xAxis[0].setExtremes( null, null, false );
        chart.redraw();
    });

    $("#zoomIn").click(function(){
        console.log("zoom in", chart);
        chart.xAxis[0].setExtremes( manualMin, manualMax, false );
        chart.redraw();
    });

    $("#zoomInMore").click(function(){
        console.log("zoom in more", chart);
        chart.xAxis[0].setExtremes( manualMin2, manualMax2, false );
        chart.redraw();
    });

});
