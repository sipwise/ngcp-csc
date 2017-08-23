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
            bind: '{numberToCall}',
            reference:'callNumberInput'
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
            items: [
                {
                    xtype: 'button',
                    text : 'Audio Call',
                    iconCls: Ngcp.csc.icons.microphone,
                    margin: '0 10 0 0',
                    listeners: {

                    }
                },{
                    xtype: 'button',
                    text : 'Video Call',
                    iconCls: Ngcp.csc.icons.video
                }
            ]
        }]
    }, {
        hidden: true,
        html: '<audio id="ring" src="'+Ext.manifest.resources.path+'/audio/skype_ring.mp3" preload="auto"></audio>'
    }]
})
