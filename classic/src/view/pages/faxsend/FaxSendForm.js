Ext.define('NgcpCsc.view.pages.faxsend.FaxSendForm', {
    extend: 'Ext.form.Panel',

    xtype: 'faxsendform',
    defaultType: 'textfield',
    layout: 'form',
    width: 750,

    items: [{
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.destination_number[localStorage.getItem('languageSelected')],
        bind: '{destination_number}',
        inputAttrTpl: 'data-qtip="The number to send the fax to"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'combo',
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.quality[localStorage.getItem('languageSelected')],
        padding: '0 0 0 15',
        store: 'FaxSendQuality',
        queryMode: 'local',
        itemId: 'faxsend-quality',
        valueField: 'quality',
        displayField: 'quality',
        editable: false,
        value: 'Standard',
        inputAttrTpl: 'data-qtip="Fax quality"',
        listeners: {
            'select': 'selectQuality'
        }
    }, {
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.page_header[localStorage.getItem('languageSelected')],
        bind: '{page_header}',
        inputAttrTpl: 'data-qtip="Header text to add on every page"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'textareafield',
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.content[localStorage.getItem('languageSelected')],
        bind: '{content}',
        cls: 'faxsend-content',
        inputAttrTpl: 'data-qtip="Content text"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'filefield',
        itemId: 'fs-file',
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.file[localStorage.getItem('languageSelected')],
        anchor: '100%',
        inputAttrTpl: 'data-qtip="File to send. Will be sent if no text content specified. Supported File Types are TXT, PDF, PS, TIFF"',
        bind: '{file}',
        buttonText: 'Choose File'
    }]

})
