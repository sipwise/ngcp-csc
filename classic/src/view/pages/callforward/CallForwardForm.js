Ext.define('NgcpCsc.view.pages.callforward.CallForwardForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforward-form',

    viewModel: 'callforward',

    store: 'CallForward',

    items: [{
        xtype: 'fieldcontainer',
        title: 'Add new rule',
        layout: 'hbox',
        height: 200,
        defaultType: 'textfield',

        fieldDefaults: {
            labelAlign: 'right'
        },
        items: [{
            flex: 2,
            fieldLabel: 'For calls from',
            name: 'callforward-new-source',
            bind: '{new_source_set}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            flex: 2,
            fieldLabel: 'during period',
            name: 'callforward-new-time',
            margin: '0 0 0 5',
            bind: '{new_time_set}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            flex: 2,
            fieldLabel: 'forward calls to',
            name: 'callforward-new-destination',
            margin: '0 0 0 5',
            bind: '{new_destination_set}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }]
    }]

});
