Ext.define('NgcpCsc.view.pages.summary.charts.Calls', {
    extend: 'Ext.chart.PolarChart',

    xtype: 'summary-pie',

    reference: 'chart',
    height: 500,
    insetPadding: 50,
    innerPadding: 20,
    store: Ext.create('Ext.data.Store', {
        fields: ['os', 'data1'],
        data: [{
            os: 'Android',
            data1: 68.3
        }, {
            os: 'BlackBerry',
            data1: 1.7
        }, {
            os: 'iOS',
            data1: 17.9
        }, {
            os: 'Windows Phone',
            data1: 10.2
        }, {
            os: 'Others',
            data1: 1.9
        }]

    }),
    legend: {
        docked: 'bottom'
    },
    interactions: ['rotate', 'itemhighlight'],
    sprites: [],
    series: [{
        type: 'pie',
        angleField: 'data1',
        donut: 50,
        label: {
            field: 'os',
            display: 'outside'
        },
        highlight: true,
        tooltip: {
            trackMouse: true,
            renderer: 'onSeriesTooltipRender'
        }
    }]
});
