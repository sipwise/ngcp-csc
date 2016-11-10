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

    items: [{
        xtype: 'segmentedbutton',
        itemId: 'timeButtons',
        items: [{
            text: Ngcp.csc.locales.callforward.time_one[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')]
        }]
    }, {
        xtype: 'segmentedbutton',
        itemId: 'sourceButtons',
        items: [{
            text: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')]
        }]
    }, {
        xtype: 'panel',
        userCls: 'cf-subheader-large',
        html: 'When My Phone is Online:',
        height: 50,
        ui: 'cf-test'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: 'First ring:',
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'firstRingFields',
        height: 50,
        items: [{
            xtype: 'combo',
            store: ['Own phone for xx sec', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'onlineFirstDest',
            value: 'None',
            allowBlank: false,
            listeners: {
                change: 'selectFirstRing'
            },
            flex: 5
        }, {
            xtype: 'combo',
            store: ['0 secs', '10 secs', '20 secs', '30 secs', '40 secs', '50 secs', '60 secs'],
            value: '0 secs',
            id: 'onlineFirstTimeout',
            allowBlank: false,
            flex: 1
        }]
    }, {
        xtype: 'container',
        html: 'Then forward to:',
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgrid'
    }, {
        iconCls: 'x-fa fa-plus-circle',
        xtype: 'button',
        width: 50,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'addEmptyRow'
        }
    }]

});
