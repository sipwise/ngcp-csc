Ext.define('NgcpCsc.view.pages.addressbook.AddressbookGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'addressbook-grid',

    store: 'Addressbook',

    padding: 10,

    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            renderer: 'renderToggleDetailsIcon',
            width: 30
        }, {
            text: Ngcp.csc.locales.addressbook.columns.name[localStorage.getItem('languageSelected')],
            flex: 1,
            dataIndex: 'name'
        }, {
            text: Ngcp.csc.locales.addressbook.columns.company[localStorage.getItem('languageSelected')],
            flex: 1,
            dataIndex: 'company'
        }, {
            renderer: 'renderPhoneIcon',
            width: 30
        }, {
            text: Ngcp.csc.locales.addressbook.columns.number[localStorage.getItem('languageSelected')],
            flex: 1,
            dataIndex: 'mobile'
        }, {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [{
                glyph: 'xf00d@FontAwesome',
                tooltip: Ngcp.csc.locales.callbarring.delete[localStorage.getItem('languageSelected')],
                handler: 'removeContact'
            }]
        }]
    },

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<div class="contact-wrapper">',
                '<div class="content"><b>'+Ngcp.csc.locales.addressbook.phone_numbers[localStorage.getItem('languageSelected')]+'</b>',
                    '<p><div class="short-label">'+Ngcp.csc.locales.addressbook.home[localStorage.getItem('languageSelected')]+':</div><div>{home} <span class="fa fa-phone-square"></span></div></p>',
                    '<p><div class="short-label">'+Ngcp.csc.locales.addressbook.office[localStorage.getItem('languageSelected')]+':</div><div> {office} <span class="fa fa-phone-square"></span></div></p>',
                    '<p><div class="short-label">'+Ngcp.csc.locales.addressbook.mobile[localStorage.getItem('languageSelected')]+':</div><div> {mobile} <span class="fa fa-phone-square"></span></div></p>',
                    '<p><div class="short-label">'+Ngcp.csc.locales.addressbook.fax[localStorage.getItem('languageSelected')]+':</div><div> {fax} <span class="fa fa-phone-square"></span></div></p>',
                '</div>',
                '<div class="content"><b>'+Ngcp.csc.locales.addressbook.web[localStorage.getItem('languageSelected')]+'</b>',
                    '<p><div class="label">'+Ngcp.csc.locales.addressbook.e_mail[localStorage.getItem('languageSelected')]+':</div><div> <a target="blank" class="link" href="{e_mail}">Link text</a></div></p>',
                    '<p><div class="label">'+Ngcp.csc.locales.addressbook.homepage[localStorage.getItem('languageSelected')]+':</div><div> <a target="blank" class="link" href="{homepage}">{homepage}</a></div></p>',
                '</div>',
            '</div>')
    }]
});
