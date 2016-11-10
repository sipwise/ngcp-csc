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
        html: Ngcp.csc.locales.callforward.when_phone_online[localStorage.getItem('languageSelected')] + '<hr>',
        height: 50,
        ui: 'cf-container',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'onlineFirstRingFields',
        height: 50,
        padding: '0 11 0 0',
        items: [{
            xtype: 'combo',
            store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'onlineFirstDest',
            value: 'Own phone',
            allowBlank: false,
            editable: false,
            listeners: {
                change: 'selectOnlineFirstRing'
            },
            flex: 5
        }, {
            xtype: 'combo',
            store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
            value: 'for 10 secs',
            id: 'onlineFirstTimeout',
            allowBlank: false,
            editable: false,
            flex: 1,
            bind: {
                hidden: '{online_timeout_hidden}'
            }
        }]
    }, {
        xtype: 'container',
        html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgridonline'
    }, {
        html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
        xtype: 'button',
        width: 165,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'onlineAddEmptyRow'
        }
    }, {
        xtype: 'panel',
        userCls: 'cf-subheader-large',
        html: Ngcp.csc.locales.callforward.when_phone_busy[localStorage.getItem('languageSelected')] + '<hr>',
        height: 50,
        ui: 'cf-container',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'busyFirstRingFields',
        height: 50,
        padding: '0 11 0 0',
        items: [{
            xtype: 'combo',
            store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'busyFirstDest',
            value: 'None',
            allowBlank: false,
            editable: false,
            listeners: {
                change: 'selectBusyFirstRing'
            },
            flex: 5
        }, {
            xtype: 'combo',
            store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
            value: 'for 10 secs',
            id: 'busyFirstTimeout',
            allowBlank: false,
            editable: false,
            flex: 1,
            bind: {
                hidden: '{busy_timeout_hidden}'
            }
        }]
    }, {
        xtype: 'container',
        html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgridbusy'
    }, {
        html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
        xtype: 'button',
        width: 165,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'busyAddEmptyRow'
        }
    }, {
        xtype: 'panel',
        userCls: 'cf-subheader-large',
        html: Ngcp.csc.locales.callforward.when_phone_offline[localStorage.getItem('languageSelected')] + '<hr>',
        height: 50,
        ui: 'cf-container',
        margin: '0 0 10 0'
    }, {
        xtype: 'container',
        userCls: 'cf-subheader',
        html: Ngcp.csc.locales.callforward.first_ring[localStorage.getItem('languageSelected')],
        height: 25
    }, {
        xtype: 'panel',
        layout: 'hbox',
        id: 'offlineFirstRingFields',
        height: 50,
        padding: '0 11 0 0',
        items: [{
            xtype: 'combo',
            store: ['Own phone', 'Voicemail', 'Fax2Mail', 'None'],
            id: 'offlineFirstDest',
            value: 'None',
            allowBlank: false,
            editable: false,
            listeners: {
                change: 'selectOfflineFirstRing'
            },
            flex: 5
        }, {
            xtype: 'combo',
            store: ['for 10 secs', 'for 20 secs', 'for 30 secs', 'for 40 secs', 'for 50 secs', 'for 60 secs'],
            value: 'for 10 secs',
            id: 'offlineFirstTimeout',
            allowBlank: false,
            editable: false,
            flex: 1,
            bind: {
                hidden: '{offline_timeout_hidden}'
            }
        }]
    }, {
        xtype: 'container',
        html: Ngcp.csc.locales.callforward.then_forward_to[localStorage.getItem('languageSelected')],
        userCls: 'cf-subheader'
    }, {
        xtype: 'callforwardgridoffline'
    }, {
        html: Ngcp.csc.locales.callforward.add_new_destination[localStorage.getItem('languageSelected')],
        xtype: 'button',
        width: 165,
        margin: '15 0 0 0',
        listeners: {
            element: 'el',
            click: 'offlineAddEmptyRow'
        }
    }]

});
