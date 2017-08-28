Ext.define('NgcpCsc.view.common.rtc.composer.Fax', {
    extend: 'Ext.form.Panel',

    alias: 'widget.fax-composer',

    bind: {
        hidden: '{faxComposerHidden}'
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
            bind: '{numberToCall}',
            reference: 'faxNumberInput'
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
        xtype: 'combo',
        store: 'FaxTypes',
        valueField:'name',
        displayField: 'name',
        fieldLabel: 'Quality',
        allowBlank: false,
        editable: false,
        bind: '{faxSelectedQuality}'
    }, {
        xtype: 'textfield',
        allowBlank: false,
        bind: '{faxSageHeader}',
        fieldLabel: 'Page header'
    }, {
        xtype: 'textarea',
        allowBlank: false,
        bind: '{faxContent}',
        fieldLabel: 'Content'
    }, {
        xtype: 'filefield',
        bind: '{faxContenthosenFile}',
        fieldLabel: 'File'
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
            iconCls: Ngcp.csc.icons.send2x,
            listeners: {
                click: 'sendFax'
            }
        }]
    }]
})
