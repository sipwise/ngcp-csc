Ext.define('NgcpCsc.view.pages.callforward.CallForwardForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforward-form',

    store: 'CallForward',

    // TODO: Draw out how you want flex layout to be, and restart from scratch
    // very basic. Then reimplement from there.

    items: [{
        xtype: 'fieldcontainer',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 140,
            labelSeparator: ""
        },
        items: [{
            flex: 1,
            items: [{
                xtype: 'combo',
                emptyText: Ngcp.csc.locales.login.choose_language[localStorage.getItem('languageSelected') || 'en'],
                padding: '0 0 0 15',
                store: 'Sourcesets',
                queryMode: 'local',
                itemId: 'cf-sourcesets',
                valueField: 'source',
                displayField: 'source',
                editable: false,
                value: 'Anyone',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">For calls from:</div>'),
                listeners: {
                    'select': 'sourceSelection'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">Specific #:</div>'),
                itemId: 'cf-new-source',
                margin: '0 0 0 5',
                bind: '{new_source_entered}',
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }]
        }, {
            flex: 1,
            items: [{
                xtype: 'combo',
                emptyText: Ngcp.csc.locales.login.choose_language[localStorage.getItem('languageSelected') || 'en'],
                padding: '0 0 0 15',
                store: 'Timesets',
                queryMode: 'local',
                itemId: 'cf-timesets',
                valueField: 'source',
                displayField: 'source',
                editable: false,
                value: 'Anyone',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">during period:</div>'),
                listeners: {
                    'select': 'sourceSelection'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">new period:</div>'),
                itemId: 'cf-new-time',
                margin: '0 0 0 5',
                bind: '{new_time_entered}',
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }]
        }, {
            flex: 1,
            items: [{
                xtype: 'combo',
                emptyText: Ngcp.csc.locales.login.choose_language[localStorage.getItem('languageSelected') || 'en'],
                padding: '0 0 0 15',
                store: 'Destinationsets',
                queryMode: 'local',
                itemId: 'cf-destinationsets',
                valueField: 'source',
                displayField: 'source',
                editable: false,
                value: 'Anyone',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">forward calls to:</div>'),
                listeners: {
                    'select': 'sourceSelection'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">forward calls to:</div>'),
                itemId: 'cf-new-destination',
                margin: '0 0 0 5',
                bind: '{new_destination_entered}',
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">and ring for:</div>'),
                itemId: 'cf-new-timeout',
                margin: '0 0 0 5',
                bind: '{new_timeout_entered}',
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }]
        }]
    }]

});
