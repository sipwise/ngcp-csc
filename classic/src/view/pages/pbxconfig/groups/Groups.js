Ext.define('NgcpCsc.view.pages.pbxconfig.groups.Groups', {
    extend: 'Ext.panel.Panel',

    xtype: 'groups',

    viewModel: 'groups',

    controller: 'groups',

    layout: 'responsivecolumn',

    items: [{
        userCls: 'big-30 small-100',
        items: [{
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
                name:'groupName',
                bind: '{selection.name}',
                fieldLabel: Ngcp.csc.locales.common.name[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                bind: '{selection.extension}',
                fieldLabel: Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')]
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
            reference:'addNewBtn',
            text: Ngcp.csc.locales.pbxconfig.add_new_group[localStorage.getItem('languageSelected')],
            handler: 'addGroup'
        }]
    }]
});
