Ext.define('NgcpCsc.view.common.composer.Phone', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.phone-composer',

    bind: {
        hidden: '{phoneComposerHidden}'
    },
    items: [{
        layout: 'hbox',
        margin: 20,
        items: [{
            xtype: 'textfield',
            emptyText: 'Allowed digits are 0-9, +, # and *.',
            hideTrigger: true,
            width: '80%',
            bind: '{numberToCall}'
        }, {
            xtype: 'button',
            enableToggle: true,
            iconCls: 'x-fa fa-fax',
            width: '20%',
            handler: 'showPhoneComposer'
        }]
    }, {
        xtype: 'phonekeys',
        bind: {
            hidden: '{phoneKeyboardHidden}'
        }
    }, {
        xtype: 'container',
        layout: 'center',
        margin: '40 20 20 20',
        items: [{
            xtype: 'button',
            cls: 'rtc-icons-big',
            bind: {
                disabled: '{disableSubmit}'
            },
            width: 60,
            height: 60,
            margin: '50 0 10 0',
            iconCls: 'x-fa fa-phone fa-3x',
            cls: 'rtc-icons-big',
            listeners: {
                click: {
                    fn: 'startNewCall',
                    el: 'element'
                }
            }
        }]
    }, {
        hidden: true,
        html: '<audio id="ring" src="resources/audio/skype_ring.mp3" preload="auto"></audio>'
    }]
})
