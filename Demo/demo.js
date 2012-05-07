$(function () {

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            defaultSeriesType: 'line',
            zoomType: 'x',
            events: {
                resize: function() {
                    var w=this.chartWidth;
                    //var h=this.chartHeight;
                    myZoomButton.attr({
                        //SVG
                        transform: 'translate(' + (w-90) + ',' + 50 + ')'
                    }).css({
                            //VML
                            left: (w-90) + 'px',
                            top: 50 + 'px'
                        });
                },
                selection: function(event) {
                    if (event.xAxis) {
                        var fromMillis = Math.floor(event.xAxis[0].min);
                        var toMillis = Math.ceil(event.xAxis[0].max);

                        console.log("min = " + fromMillis);
                        console.log("max = " + toMillis);

                        chart.xAxis[0].setExtremes( fromMillis, toMillis, false );
                        chart.redraw();
                        myZoomButton.show();
                    }

                    // prevent default zoom reset button creation
                    event.preventDefault();
                }
            }
        },

        xAxis: {
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

    // show chart
    chart.redraw();

    // custom zoom reset button (is used instead of the default one)
    var myZoomButton = chart.renderer.button('Reset zoom',chart.chartWidth-90,50,function(){
        chart.xAxis[0].setExtremes( null, null, false );
        chart.redraw();
        myZoomButton.hide();
    });

    myZoomButton.hide().add();

    $("#resetZoom").click(function(){
        chart.xAxis[0].setExtremes( null, null, false );
        chart.redraw();
        myZoomButton.hide();
    });

    $("#zoomIn").click(function(){
        chart.xAxis[0].setExtremes( manualMin, manualMax, false );
        chart.redraw();
        myZoomButton.show();
    });

    $("#zoomInMore").click(function(){
        chart.xAxis[0].setExtremes( manualMin2, manualMax2, false );
        chart.redraw();
        myZoomButton.show();
    });

});
