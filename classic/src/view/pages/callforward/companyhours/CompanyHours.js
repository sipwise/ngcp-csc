Ext.define('NgcpCsc.view.pages.callforward.companyhours.Companyhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'companyhours',

    ui: 'cf-mainform',

    initComponent: function() {
        var callForwardCompanyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-company-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardTimesetCompany.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });

        this.items = [{
            userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',
            xtype: 'core-container',
            items: [{
                layout: 'responsivecolumn',
                xtype: 'container',
                items: [{
                    xtype: 'panel',
                    id: 'collapsePanel-companyHours',
                    title: Ngcp.csc.locales.callforward.for_calls_during_company_hours[localStorage.getItem('languageSelected')],
                    width: '100%',
                    collapsible: true,
                    bind: {
                        collapsed: '{companyPanelIsCollapsed}'
                    },
                    listeners: {
                        collapse: 'collapsePanel',
                        expand: 'collapsePanel'
                    },
                    userCls: 'big-33 small-100 cf-calls-during-section',
                    items: [
                        callForwardCompanyGrid,
                        {
                            text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                            xtype: 'button',
                            cls: 'x-btn-left',
                            id: 'companyHours-saveButton',
                            width: 135,
                            margin: '10 0 0 585',
                            listeners: {
                                click: 'saveGrid'
                            }
                        }
                    ]
                }]
            }, {
                xtype: 'statusbar',
                reference: 'loadingBar'
            }, {
                xtype: 'panel',
                width: '100%',
                title: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')]
            }, {
                xtype: 'cftab',
                _tabId: 'companyhours',
                _firstPrefixes: ['everybody-', 'listA-', 'listB-'],
                _secondprefix: 'companyHours-'
            }]
        }];
        this.callParent();
    }

});
