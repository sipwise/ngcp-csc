Ext.define('NgcpCsc.view.pages.addressbook.AddressbookGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'addressbook-grid',

    store: 'Addressbook',

    reference: 'addressBookGrid',

    padding: 10,

    listeners: {
        afterrender: 'onGridRendered',
        cellclick: 'onCellClicked'
    },

    tbar: [{
        xtype:'label',
        text: Ngcp.csc.locales.common.order_by[localStorage.getItem('languageSelected')]
    },{
            xtype: 'container',
            id: 'group-firstname',
            padding: '0 10 0 0',
            html: Ngcp.csc.locales.addressbook.firstname[localStorage.getItem('languageSelected')],
            cls: 'link',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'changeGroupField'
                }
            }
        }, {
            xtype: 'container',
            id: 'group-lastname',
            padding: '0 10 0 0',
            html: Ngcp.csc.locales.addressbook.lastname[localStorage.getItem('languageSelected')],
            cls: 'link no-underline',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'changeGroupField'
                }
            }
        }, {
            xtype: 'container',
            id: 'group-company',
            padding: '0 10 0 0',
            renderer: 'renderCompanyGroupText',
            cls: 'link no-underline',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'changeGroupField'
                }
            }
        },
        '->', {
            text: Ngcp.csc.locales.addressbook.new_contact[localStorage.getItem('languageSelected')],
            handler: 'createNewContact'
        }
    ],
    columns: {
        defaults: {
            menuDisabled: true,
            sortable: false,
            resizable: false
        },
        items: [{
            renderer: 'renderToggleDetailsIcon',
            width: 30
        }, {
            flex: 1,
            dataIndex: 'name',
            renderer:'composeName'
        }, {
            flex: 1,
            dataIndex: 'company'
        }, {
            renderer: 'renderPhoneIcon',
            width: 30
        }, {
            flex: 1,
            dataIndex: 'mobile'
        }, {
            xtype: 'actioncolumn',
            width: 30,
            align: 'right',
            items: [{
                glyph: 'xf00d@FontAwesome',
                tooltip: Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')],
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
        id: 'rowexpander',
        selectRowOnExpand: true,
        rowBodyTpl: new Ext.XTemplate(
            '<div class="contact-wrapper">',
            '<div class="content"><b>' + Ngcp.csc.locales.addressbook.phone_numbers[localStorage.getItem('languageSelected')] + '</b>',
            '<p><div class="short-label">' + Ngcp.csc.locales.addressbook.home[localStorage.getItem('languageSelected')] + ':</div><div>{home} <span class="fa fa-phone-square pointer"></span></div></p>',
            '<p><div class="short-label">' + Ngcp.csc.locales.addressbook.office[localStorage.getItem('languageSelected')] + ':</div><div> {office} <span class="fa fa-phone-square pointer"></span></div></p>',
            '<p><div class="short-label">' + Ngcp.csc.locales.addressbook.mobile[localStorage.getItem('languageSelected')] + ':</div><div> {mobile} <span class="fa fa-phone-square pointer"></span></div></p>',
            '<p><div class="short-label">' + Ngcp.csc.locales.addressbook.fax[localStorage.getItem('languageSelected')] + ':</div><div> {fax} <span class="fa fa-phone-square pointer"></span></div></p>',
            '</div>',
            '<div class="content"><b>' + Ngcp.csc.locales.addressbook.web[localStorage.getItem('languageSelected')] + '</b>',
            '<p><div class="label">' + Ngcp.csc.locales.addressbook.e_mail[localStorage.getItem('languageSelected')] + ':</div><div> <a class="link" href="mailto:{e_mail}">{e_mail}</a></div></p>',
            '<p><div class="label">' + Ngcp.csc.locales.addressbook.homepage[localStorage.getItem('languageSelected')] + ':</div><div> <a target="_blank" class="link" href="{homepage}">{homepage}</a></div></p>',
            '</div>',
            '</div>')
    }]
});
