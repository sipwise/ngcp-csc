Ext.define('NgcpCsc.view.pages.summary.charts.Pie', {
    extend: 'Ext.chart.PolarChart',

    xtype: 'summary-pie',

    reference: 'chart',
    height: 500,
    insetPadding: 60,
    innerPadding: 40,
    interactions: ['rotatePie3d'],
    colors:['#66A648', '#0F589B'],
    series: [{
        type: 'pie3d',
        distortion: 0.5,
        highlight: {
            margin: 30
        },
        angleField: 'data',
        donut: 40,
        label: {
            field: 'name',
            display: 'outside'
        },
        tooltip: {
            trackMouse: true,
            renderer: 'onSeriesTooltipRender'
        }
    }]
});
