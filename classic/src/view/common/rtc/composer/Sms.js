Ext.define('NgcpCsc.view.common.composer.Sms', {
    extend: 'Ext.form.Panel',

    alias: 'widget.sms-composer',

    bind: {
        hidden: '{smsComposerHidden}'
    },
    defaults: {
        width: '90%',
        margin: 20
    },
    items: [{
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            emptyText: 'Allowed digits are 0-9, +, # and *.',
            hideTrigger: true,
            width: '80%',
            bind: '{numberToCall}'
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
        xtype: 'textarea',
        bind: '{smsText}',
        fieldLabel: 'Content',
        emptyText: 'Max 140 digits.',
        reference:'smsTextArea'
    }, {
        xtype: 'container',
        layout: 'center',
        margin: '40 20 20 20',
        items: [{
            xtype: 'button',
            cls: 'rtc-icons-big',
            bind: {
                disabled: '{disableSmsSubmit}'
            },
            width: 60,
            height: 60,
            margin: '50 0 10 0',
            iconCls: Ngcp.csc.icons.send2x,
            cls: 'rtc-icons-big',
            listeners: {
                click: {
                    fn: 'sendSms',
                    el: 'element'
                }
            }
        }]
    }]
})
