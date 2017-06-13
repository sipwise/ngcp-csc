Ext.define('NgcpCsc.view.pages.account.charts.Pie', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'account-pie',
    height: 500,
    insetPadding: 60,
    innerPadding: 40,
    requires:['Ext.chart.series.Pie3D','Ext.chart.interactions.ItemHighlight','Ext.chart.interactions.RotatePie3D'],
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
