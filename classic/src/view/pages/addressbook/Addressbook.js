Ext.define('NgcpCsc.view.pages.addressbook.Addressbook', {
    extend: 'Ext.panel.Panel',

    xtype: 'addressbook',

    controller: 'addressbook',

    viewModel: 'addressbook',

    layout: 'responsivecolumn',

    scrollable: true,

    title: Ngcp.csc.locales.addressbook.title[localStorage.getItem('languageSelected')],

    items : [{
        userCls: 'big-70 small-100 white-box',
        padding:10,
        defaults: {
            padding: 20
        },
        items: [{
                html: Ngcp.csc.locales.addressbook.subtitle[localStorage.getItem('languageSelected')]
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="addressbook-heading">{0} {1}</div>', Ngcp.csc.locales.addressbook.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            },
            {
                xtype: 'addressbook-grid'
            }
        ]
    }, {
        userCls: 'big-30 small-100 white-box',
        defaults: {
            padding: 20
        },
        items: [{
            xtype: 'gridfilters',
            _linkedStoreId: 'Addressbook',
            _hideDateFilters: true,
            _isNested: true
        }, {
            xtype: 'form',
            reference:'contactForm',
            defaults:{
                xtype: 'textfield',
                width:'100%'
            },
            items: [{
                focusable: true,
                fieldLabel: Ngcp.csc.locales.addressbook.first_name[localStorage.getItem('languageSelected')],
                id: 'contactFirstName',
                bind: '{selection.firstname}',
                allowBlank: false,
                blankText: Ngcp.csc.locales.common.no_empty_value[localStorage.getItem('languageSelected')],
                listeners:{
                    change: 'capitalize'
                }
            },{
                fieldLabel: Ngcp.csc.locales.addressbook.last_name[localStorage.getItem('languageSelected')],
                bind: '{selection.lastname}',
                blankText: Ngcp.csc.locales.common.no_empty_value[localStorage.getItem('languageSelected')],
                allowBlank: false,
                listeners:{
                    change: 'capitalize'
                }
            },{
                fieldLabel:  Ngcp.csc.locales.addressbook.company[localStorage.getItem('languageSelected')],
                bind: '{selection.company}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.home[localStorage.getItem('languageSelected')],
                bind: '{selection.home}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.office[localStorage.getItem('languageSelected')],
                bind: '{selection.office}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.mobile[localStorage.getItem('languageSelected')],
                bind: '{selection.mobile}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.fax[localStorage.getItem('languageSelected')],
                bind: '{selection.fax}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.e_mail[localStorage.getItem('languageSelected')],
                bind: '{selection.e_mail}'
            }, {
                fieldLabel:  Ngcp.csc.locales.addressbook.homepage[localStorage.getItem('languageSelected')],
                bind: '{selection.homepage}'
            }],
            bind: {
                hidden: '{!selection}'
            }
        },
        {
            layout: 'hbox',
            defaults: {
                xtype: 'button',
                flex: 1,
                bind: {
                    hidden: '{!selection}'
                }
            },
            items: [{
                text: Ngcp.csc.locales.common.reset[localStorage.getItem('languageSelected')],
                margin: '0 5 0 0',
                handler: 'resetChanges'
            }, {
                text: Ngcp.csc.locales.common.save[localStorage.getItem('languageSelected')],
                handler: 'saveChanges'
            }]
        }]
    }]
});
