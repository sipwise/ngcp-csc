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
        value: 'alwaysButton',
        items: [{
            value: 'alwaysButton',
            text: Ngcp.csc.locales.callforward.time_one[localStorage.getItem('languageSelected')],
            listeners: {
                click: 'clickAlwaysHoursForm'
            }
        }, {
            text: Ngcp.csc.locales.callforward.time_two[localStorage.getItem('languageSelected')],
            listeners: {
                click: 'clickAfterHoursForm'
            }
        }, {
            text: Ngcp.csc.locales.callforward.time_three[localStorage.getItem('languageSelected')],
            listeners: {
                click: 'clickCompanyHoursForm'
            }
        }]
    }, {
        xtype: 'segmentedbutton',
        itemId: 'sourceButtons',
        value: 'everybodyButton',
        items: [{
            value: 'everybodyButton',
            text: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')]
        }, {
            text: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')]
        }]
    }, {
        xtype: 'panel',
        userCls: 'cf-subheader-large',
        html: 'When My Phone is Online:<hr>',
        height: 50,
        ui: 'cf-container',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: 'First ring:',
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'onlineFirstRingFields',
        height: 50,
        items: [{
            xtype: 'combo',
            store: ['Own phone for xx sec', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'onlineFirstDest',
            value: 'None',
            allowBlank: false,
            editable: false,
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
            editable: false,
            flex: 1
        }]
    }, {
        xtype: 'container',
        html: 'Then forward to:',
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgridonline'
    }, {
        iconCls: 'x-fa fa-plus-circle',
        xtype: 'button',
        width: 30,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'onlineAddEmptyRow'
        }
    }, {
        xtype: 'panel',
        userCls: 'cf-subheader-large',
        html: 'When My Phone is Busy:<hr>',
        height: 50,
        ui: 'cf-container',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: 'First ring:',
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'busyFirstRingFields',
        height: 50,
        items: [{
            xtype: 'combo',
            store: ['Own phone for xx sec', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'busyFirstDest',
            value: 'None',
            allowBlank: false,
            editable: false,
            listeners: {
                change: 'selectFirstRing'
            },
            flex: 5
        }, {
            xtype: 'combo',
            store: ['0 secs', '10 secs', '20 secs', '30 secs', '40 secs', '50 secs', '60 secs'],
            value: '0 secs',
            id: 'busyFirstTimeout',
            allowBlank: false,
            editable: false,
            flex: 1
        }]
    }, {
        xtype: 'container',
        html: 'Then forward to:',
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgridbusy'
    }, {
        iconCls: 'x-fa fa-plus-circle',
        xtype: 'button',
        width: 30,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'busyAddEmptyRow'
        }
    }, {
        xtype: 'panel',
        userCls: 'cf-subheader-large',
        html: 'When My Phone is Offline:<hr>',
        height: 50,
        ui: 'cf-container',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: 'First ring:',
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'offlineFirstRingFields',
        height: 50,
        items: [{
            xtype: 'combo',
            store: ['Own phone for xx sec', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'offlineFirstDest',
            value: 'None',
            allowBlank: false,
            editable: false,
            listeners: {
                change: 'selectFirstRing'
            },
            flex: 5
        }, {
            xtype: 'combo',
            store: ['0 secs', '10 secs', '20 secs', '30 secs', '40 secs', '50 secs', '60 secs'],
            value: '0 secs',
            id: 'offlineFirstTimeout',
            allowBlank: false,
            editable: false,
            flex: 1
        }]
    }, {
        xtype: 'container',
        html: 'Then forward to:',
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgridoffline'
    }, {
        iconCls: 'x-fa fa-plus-circle',
        xtype: 'button',
        width: 30,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'offlineAddEmptyRow'
        }
    }]

});
