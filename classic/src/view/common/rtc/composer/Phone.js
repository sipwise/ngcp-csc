Ext.define('NgcpCsc.view.common.rtc.composer.Phone', {
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
            bind: '{numberToCall}',
            reference: 'callNumberInput'
        }, {
            xtype: 'button',
            enableToggle: true,
            iconCls: Ngcp.csc.icons.fax,
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
        items: [{
            xtype: 'container',
            items: [{
                xtype: 'button',
                text: Ngcp.csc.locales.rtc.sendAudio[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.microphone,
                margin: '0 10 0 0',
                listeners: {
                    click: 'sendAudio'
                }
            }, {
                xtype: 'button',
                text: Ngcp.csc.locales.rtc.sendVideo[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.video,
                listeners: {
                    click: 'sendVideo'
                }
            }]
        }]
    }, {
        hidden: true,
        html: '<audio preload="auto" src="' + Ext.manifest.resources.path + '/audio/ring.mp3" loop id="ring"></audio>'
    }]
})
