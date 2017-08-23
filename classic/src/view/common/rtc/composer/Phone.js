Ext.define('NgcpCsc.view.common.composer.Phone', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.phone-composer',

    bind: {
        hidden: '{phoneComposerHidden}'
    },
    items: [{
        layout: 'hbox',
        margin: 20,
        items: [
            // buttons for testing color change method during dev
        {
            xtype: 'button',
            text: 'toggle color change',
            handler: 'toggleRtcpanelColorOn'
        },
        {
            xtype: 'button',
            text: 'revert color change',
            handler: 'toggleRtcpanelColorOff'
        },
        {
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

                }
            }, {
                xtype: 'button',
                text: Ngcp.csc.locales.rtc.sendVideo[localStorage.getItem('languageSelected')],
                iconCls: Ngcp.csc.icons.video
            }]
        }]
    }, {
        hidden: true,
        html: '<audio id="ring" src="' + Ext.manifest.resources.path + '/audio/skype_ring.mp3" preload="auto"></audio>'
    }]
})
