Ext.define('NgcpCsc.view.pages.callforward.afterhours.Afterhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'afterhours',

    ui: 'cf-mainform',

    initComponent: function () {
        var me = this;
        // XXX Cvenusino: I am trying to grab collapsed value from local storage,
        // but currently not working. Also tried setting it directly without
        // variable. Is there a way we can create a vm value based on local,
        // storage, so that we also can bind it (in addition to making it work)?
        var afterHoursCollapsed = localStorage.getItem('afterHoursCollapsed');
        // var afterHoursCollapsed = true;

        var callForwardAfterGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: 'cf-timeset-after-grid',
            store: Ext.create('NgcpCsc.store.CallForwardTimeset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardAfter.json',
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
                        title: Ngcp.csc.locales.callforward.for_calls_during_after_hours[localStorage.getItem('languageSelected')],
                        width: '100%',
                        collapsible: true,
                        collapsed: me.afterHoursCollapsed,
                        userCls: 'big-33 small-100 cf-calls-curing-section',
                        items: [{
                            layout: 'hbox',
                            items: [{
                                xtype: 'container',
                                userCls: 'cf-calls-during',
                                html: Ngcp.csc.locales.callforward.for_calls_during_after_hours[localStorage.getItem('languageSelected')],
                                margin: '10 0 0 0'
                            }, {
                                xtype: 'button',
                                userCls: 'cf-calendar-button',
                                iconCls: Ngcp.csc.icons.calendar2x,
                                handler: 'toggleAfterTimesetGrid'
                            }]
                        }]
                    }, {
                        xtype: 'panel',
                        userCls: 'big-66 small-100',
                        bind: {
                            hidden: '{after_hours}'
                        },
                        items: [
                            callForwardAfterGrid
                        ]
                    }]
                }, {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '15 0 0 0',
                    bind: {
                        hidden: '{after_hours}'
                    },
                    items: [{
                        xtype: 'component',
                        flex: 1
                    }, {
                        text: 'SAVE', // TODO: Locales
                        xtype: 'button',
                        cls: 'x-btn-left',
                        id: 'afterHours-saveButton',
                        width: 135,
                        margin: '0 0 0 0',
                        listeners: {
                            click: 'saveTimeset'
                        }
                    }, {
                        xtype: 'button',
                        cls: 'x-btn-left',
                        html: 'CANCEL', // TODO: Locales
                        id: 'afterHours-cancelButton',
                        margin: '0 0 0 10',
                        handler: 'cancelTimeset'
                    }]
                }, {
                    xtype: 'statusbar',
                    reference: 'loadingBar'
                }, {
                    xtype: 'panel',
                    width: '100%',
                    title: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')]
                }, {
                    xtype: 'afterhourstabs'
            }]
        }];
        this.callParent();
    }

});
