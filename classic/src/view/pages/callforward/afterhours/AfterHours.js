Ext.define('NgcpCsc.view.pages.callforward.afterhours.Afterhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'afterhours',

    ui: 'cf-mainform',

    initComponent: function() {var cfInitialStore = Ext.create('NgcpCsc.store.CallForward', {
            storeId: 'CallForwardAfterHours',
            _type: 'afterHours',
            autoLoad: true,
            listeners: {
                load: function(store, recs) {
                    this.fireEvent('cfStoreLoaded', this, recs[0]);
                }
            }
        });

        var callForwardAfterGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-after-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                storeId: 'afterHours-Timeset'
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
                    id: 'collapsePanel-afterHours',
                    title: Ngcp.csc.locales.callforward.for_calls_during_after_hours[localStorage.getItem('languageSelected')],
                    width: '100%',
                    collapsible: true,
                    bind: {
                        collapsed: '{afterPanelIsCollapsed}'
                    },
                    listeners: {
                        collapse: 'collapsePanel',
                        expand: 'collapsePanel'
                    },
                    userCls: 'big-33 small-100 cf-calls-during-section',
                    items: [{

                            xtype: 'panel',
                            margin: '10 0 10 0',
                            html: 'You have not set your after hours calendar yet.', // TODO: Locales or icon, or both. Will wait for feedback from Andreas in next sync-up
                            bind: {
                                hidden: '{afterHours_hideMessage}'
                            }
                        },
                        callForwardAfterGrid, {
                            text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                            xtype: 'button',
                            cls: 'x-btn-left',
                            id: 'afterHours-saveButton',
                            width: 135,
                            margin: '10 0 10 623',
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
                _tabId: 'afterhours',
                _firstPrefixes: ['everybody-', 'listA-', 'listB-'],
                _secondprefix: 'afterHours-'
            }]
        }];
        this.callParent();
    }

});
