Ext.define('NgcpCsc.view.pages.callforward.companyhours.Companyhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'companyhours',

    ui: 'cf-mainform',

    initComponent: function() {
        var cfInitialStore = Ext.create('NgcpCsc.store.CallForward',{
            storeId: 'CallForwardCompanyHours',
            _type: 'companyHours',
            autoLoad: true,
            listeners: {
                beforeload: function(store) {
                    store._preventReLoad = false;
                },
                load: function(store, recs) {
                    this.fireEvent('cfStoreLoaded', this, recs[0]);
                }
            }
        });

        var callForwardCompanyGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-company-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                storeId: 'companyHours-Timeset'
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
                    items: [{
                        xtype: 'panel',
                        margin: '10 0 10 0',
                        html: 'You have not set your company hours calendar yet.', // TODO: Locales or icon, or both. Will wait for feedback from Andreas in next sync-up
                        bind: {
                            hidden: '{companyHours_hideMessage}'
                        }
                    },
                        callForwardCompanyGrid,
                        {
                            text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                            xtype: 'button',
                            cls: 'x-btn-left',
                            id: 'companyHours-saveButton',
                            width: 135,
                            margin: '10 0 10 585',
                            listeners: {
                                click: 'saveTimesetGrid'
                            }
                        }
                    ]
                }]
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
