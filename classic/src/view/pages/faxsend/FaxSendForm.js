Ext.define('NgcpCsc.view.pages.faxsend.FaxSendForm', {
    extend: 'Ext.form.Panel',

    xtype: 'faxsendform',

    defaultType: 'textfield',

    layout: 'form',

    items: [{
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.destination_number[localStorage.getItem('languageSelected')],
        bind: '{destination_number}',
        allowBlank: false,
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.fax_send.tooltips.number_fax[localStorage.getItem('languageSelected')] + '"',
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
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.fax_send.tooltips.fax_quality[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            'select': 'selectQuality'
        }
    }, {
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.page_header[localStorage.getItem('languageSelected')],
        bind: '{page_header}',
        allowBlank: false,
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.fax_send.tooltips.header_text[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'textareafield',
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.content[localStorage.getItem('languageSelected')],
        bind: '{content}',
        cls: 'faxsend-content',
        allowBlank: false,
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.fax_send.tooltips.content_text[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'filefield',
        itemId: 'fs-file',
        fieldLabel: Ngcp.csc.locales.fax_send.field_labels.file[localStorage.getItem('languageSelected')],
        anchor: '100%',
        allowBlank: false,
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.fax_send.tooltips.file_to_send[localStorage.getItem('languageSelected')] + '"',
        bind: '{file}',
        buttonText: Ngcp.csc.locales.fax_send.choose_file[localStorage.getItem('languageSelected')]
    }]

})
