Ext.define('NgcpCsc.view.common.composer.PhoneKeys', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.phonekeys',

    hidden: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    height: 300,

    margin: '30 10 10 20',

    defaults: {
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            xtype: 'button',
            flex: 1,
            margin: '0 10 10 0',
            handler: 'digitNumber',
            cls: 'rtc-digit'

        }
    },
    items: [{
        items: [{
            text: '1'
        }, {
            text: '2'
        }, {
            text: '3'
        }]
    }, {
        items: [{
            text: '4'
        }, {
            text: '5'
        }, {
            text: '6'
        }]
    }, {
        items: [{
            text: '7'
        }, {
            text: '8'
        }, {
            text: '9'
        }]
    }, {
        items: [{
            text: '*'
        }, {
            text: '0'
        }, {
            text: '#'
        }]
    }]
})
