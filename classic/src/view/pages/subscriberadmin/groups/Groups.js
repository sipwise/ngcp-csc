Ext.define('NgcpCsc.view.pages.subscriberadmin.groups.Groups', {
    extend: 'Ext.panel.Panel',

    xtype: 'groups',

    viewModel: 'groups',

    controller: 'groups',

    title: Ngcp.csc.locales.subscriberadmin.title[localStorage.getItem('languageSelected')],

<<<<<<< 8a91b442e2622f48e2dfe71117e2cc1ff236a334
    items: [{
        layout: 'responsivecolumn',
        xtype: 'core-container',
        items: [{
            height: 25
    //        html: Ngcp.csc.locales.subscriberadmin.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 25
    //        html: Ext.String.format('<div class="subscriberadmin-heading">{0} {1}</div>', Ngcp.csc.locales.subscriberadmin.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'container',
            bind: {
                html: '{test_viewmodel_data}'
            }
        }]
    }]

=======
    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        items: [{
            xtype: 'gridfilters',
            padding: 0,
            _linkedStoreId: 'Groups',
            _subscriberAdminGroups: true
        }, {
            xtype:'form',
            ui: 'core-container',
            padding: 20,
            margin:10,
            reference: 'add-new-group',
            hidden: true,
            defaults: {
                width: '98%'
            },
            items: [{
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.name}',
                fieldLabel: Ngcp.csc.locales.filters.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.extension}',
                fieldLabel: Ngcp.csc.locales.filters.extensions[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.hunt_policy}',
                fieldLabel: Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.hunt_timeout}',
                fieldLabel: Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')]
            },{
                layout: 'hbox',
                xtype: 'container',
                defaults: {
                    xtype: 'button',
                    flex: 1
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
    }, {
        userCls: 'big-70 small-100',
        items: [{
            xtype: 'groups-grid'
        }, {
            margin: 10,
            xtype: 'button',
            text: Ngcp.csc.locales.subscriberadmin.add_new_group[localStorage.getItem('languageSelected')],
            handler: 'addGroup'
        }]
    }]
>>>>>>> TT#7556 ngcp-csc Subscriber Admin > Seats section
});
