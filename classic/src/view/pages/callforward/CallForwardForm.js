Ext.define('NgcpCsc.view.pages.callforward.CallForwardForm', {
    extend: 'Ext.form.Panel',

    xtype: 'callforwardform',

    defaults: {
        width: '100%'
    },

    fieldDefaults: {
        labelAlign: 'top'
    },

    defaultType: 'textfield',

    // TODO: 1. Implement form visuals
    // TODO: 2. Implement form controllers

    items: [{
        // TODO: Replace with tabs:
        // http://examples.sencha.com/extjs/6.0.0/examples/kitchensink/#tabs
        xtype: 'radiogroup',
        simpleValue: true,
        bind: {
            value: '{reminder.recurrence}',
            disabled: '{!reminder.reminder_status}'
        },
        defaults: {
            name: 'cfTimeset'
        },
        items: [{
            boxLabel: Ngcp.csc.locales.callforward.time_one[localStorage.getItem('languageSelected')],
            inputValue: 'time 1'
        }, {
            boxLabel: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')],
            inputValue: 'time 2'
        }, {
            boxLabel: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')],
            inputValue: 'time 3'
        }]
    }, {
        xtype: 'container',
        html: 'When My Phone is Online:'
    }, {
        xtype: 'combo',
        store: ['Own phone for xx sec', 'Voicemail', 'Fax2Mail', 'None'],
        fieldLabel: 'First ring',
        id: 'onlineFirstRing',
        allowBlank: false,
        listeners: {
            specialKey: 'selectFirstRing'
        }
    }, {
        xtype: 'container',
        html: 'Then forward to:'
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            id: 'onlineThenOne',
            allowBlank: false,
            listeners: {
                specialKey: 'selectFirstRing'
            },
            flex: 3
        }, {
            xtype: 'container',
            iconCls: 'x-fa fa-toggle-on',
            flex: 1
            // TODO: Add handler to toggle
        }, {
            xtype: 'combo',
            store: ['10 sec', '20 sec', '30 sec', '40 sec', '50 sec', '60 sec'],
            flex: 1
        }, {
            xtype: 'container',
            iconCls: 'x-fa fa-angle-up',
            flex: 1
            // TODO: Add proper config for up/down
        }]
    }]

});
