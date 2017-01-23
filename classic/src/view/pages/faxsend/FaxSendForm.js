Ext.define('NgcpCsc.view.pages.faxsend.FaxSendForm', {
    extend: 'Ext.form.Panel',

    xtype: 'faxsendform',

    defaultType: 'textfield',

    layout: 'form',

    items: [{
        fieldLabel: Ngcp.csc.locales.faxsend.field_labels.destination_number[localStorage.getItem('languageSelected')],
        bind: '{fax.destination_number}',
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.faxsend.tooltips.number_fax[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'combo',
        fieldLabel: Ngcp.csc.locales.faxsend.field_labels.quality[localStorage.getItem('languageSelected')],
        padding: '0 0 0 15',
        store: 'FaxSendQuality',
        queryMode: 'local',
        itemId: 'faxsend-quality',
        valueField: 'quality',
        displayField: 'quality',
        editable: false,
        value: 'Standard',
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.faxsend.tooltips.fax_quality[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            'select': 'selectQuality'
        }
    }, {
        fieldLabel: Ngcp.csc.locales.faxsend.field_labels.page_header[localStorage.getItem('languageSelected')],
        bind: '{fax.page_header}',
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.faxsend.tooltips.header_text[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'textareafield',
        fieldLabel: Ngcp.csc.locales.faxsend.field_labels.content[localStorage.getItem('languageSelected')],
        bind: '{fax.content}',
        cls: 'faxsend-content',
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.faxsend.tooltips.content_text[localStorage.getItem('languageSelected')] + '"',
        listeners: {
            specialKey: 'onEnterPressed'
        }
    }, {
        xtype: 'filefield',
        itemId: 'fs-file',
        fieldLabel: Ngcp.csc.locales.faxsend.field_labels.file[localStorage.getItem('languageSelected')],
        anchor: '100%',
        inputAttrTpl: 'data-qtip="' + Ngcp.csc.locales.faxsend.tooltips.file_to_send[localStorage.getItem('languageSelected')] + '"',
        bind: '{fax.file}',
        buttonText: Ngcp.csc.locales.faxsend.choose_file[localStorage.getItem('languageSelected')]
    }]

})
