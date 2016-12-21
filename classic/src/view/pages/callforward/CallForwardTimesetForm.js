Ext.define('NgcpCsc.view.pages.callforward.CallForwardTimesetForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforwardtimesetform',

    ui: 'cf-timeset',

    initComponent: function () {
        var callForwardTimesetGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid');

        this.items = [{
            html: 'Company Hours:',
            margin: '0 0 5 5'
        }, {
            xtype: 'radiogroup',
            vertical: true,
            columns: 1,
            items: [{
                boxLabel: '24 Hours',
                inputValue: 'twentyfour'
            }, {
                boxLabel: 'Specify hours',
                inputValue: 'specify'
            }]
        }, callForwardTimesetGrid]

        this.callParent();
    }
});
