Ext.define('NgcpCsc.view.pages.callforward.CallForwardForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforward-form',

    store: 'CallForward',

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
            flex: 2,
            items: [{
                xtype: 'combo',
                padding: '0 0 0 15',
                store: 'Sourcesets',
                queryMode: 'local',
                itemId: 'cf-sourcesets',
                valueField: 'source',
                displayField: 'source',
                editable: false,
                value: 'Anyone',
                hidden: false,
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">For calls from:</div>'),
                listeners: {
                    'select': 'cfSelect'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">specific #:</div>'),
                itemId: 'cf-new-source',
                margin: '0 0 0 5',
                bind: '{new_source_entered}',
                hidden: true,
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }]
        }, {
            flex: 2,
            items: [{
                xtype: 'combo',
                padding: '0 0 0 15',
                store: 'Timesets',
                queryMode: 'local',
                itemId: 'cf-timesets',
                valueField: 'period',
                displayField: 'period',
                editable: false,
                value: 'Always',
                hidden: false,
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">during period:</div>'),
                listeners: {
                    'select': 'cfSelect'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">define period:</div>'),
                itemId: 'cf-new-time',
                margin: '0 0 0 5',
                bind: '{new_time_entered}',
                hidden: true,
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }]
        }, {
            flex: 2,
            items: [{
                xtype: 'combo',
                padding: '0 0 0 15',
                store: 'Destinationsets',
                queryMode: 'local',
                itemId: 'cf-destinationsets',
                valueField: 'destination',
                displayField: 'destination',
                editable: false,
                value: 'Voicemail',
                hidden: false,
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">forward calls to:</div>'),
                listeners: {
                    'select': 'cfSelect'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">forward calls to:</div>'),
                itemId: 'cf-new-destination',
                margin: '0 0 0 5',
                bind: '{new_destination_entered}',
                hidden: true,
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: Ext.String.format('<div class="ngcp-field-label">and ring for:</div>'),
                itemId: 'cf-new-timeout',
                margin: '0 0 0 5',
                bind: '{new_timeout_entered}',
                hidden: true,
                listeners: {
                    specialKey: 'onEnterPressed'
                }
            }]
        }, {
            flex: 1,
            xtype: 'container',
            html: Ngcp.csc.locales.callforward.save_rule[localStorage.getItem('languageSelected')].toLowerCase(),
            cls: 'link',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'submitForm'
                }
            }

        }]
    }]

});
