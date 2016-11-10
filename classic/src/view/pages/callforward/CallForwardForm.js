Ext.define('NgcpCsc.view.pages.callforward.CallForwardForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforward-form',

    store: 'CallForward',

    items: [{
        xtype: 'fieldcontainer',
        title: 'Add new rule',
        layout: 'hbox',
        height: 50,
        defaultType: 'textfield',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 140,
            labelSeparator : ""
        },
        items: [{
            flex: 2,
            fieldLabel: Ext.String.format('<div class="ngcp-field-label">For calls from:</div>'),
            id: 'cf-new-source',
            bind: '{new_source_set}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            flex: 2,
            fieldLabel: Ext.String.format('<div class="ngcp-field-label">during period:</div>'),
            id: 'cf-new-time',
            margin: '0 0 0 5',
            bind: '{new_time_set}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }, {
            flex: 2,
            fieldLabel: Ext.String.format('<div class="ngcp-field-label">forward calls to:</div>'),
            id: 'cf-new-destination',
            margin: '0 0 0 5',
            bind: '{new_destination_set}',
            listeners: {
                specialKey: 'onEnterPressed'
            }
        }]
    }]

});
