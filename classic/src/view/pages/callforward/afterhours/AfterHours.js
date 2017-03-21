Ext.define('NgcpCsc.view.pages.callforward.afterhours.Afterhours', {
    extend: 'NgcpCsc.view.pages.callforward.CallForward',

    xtype: 'afterhours',

    initComponent: function () {
        var callForwardAfterGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTimesetGrid', {
            id: this._prefix + 'cf-timeset-after-grid',
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
        var callForwardListAGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
            id: this._prefix + 'afterhours-cf-sourceset-list-a-grid',
            store: Ext.create('NgcpCsc.store.CallForwardSourceset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardListA.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            })
        });
        var callForwardListBGrid = Ext.create('NgcpCsc.view.pages.callforward.CallForwardSourcesetGrid', {
            id: this._prefix + 'afterhours-cf-sourceset-list-b-grid',
            store: Ext.create('NgcpCsc.store.CallForwardSourceset', {
                proxy: {
                    type: 'ajax',
                    url: '/resources/data/callForwardListB.json',
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
                        userCls: 'big-33 small-100 cf-calls-curing-section',
                        items: [{
                            layout: 'hbox',
                            items: [{
                                xtype: 'container',
                                userCls: 'cf-calls-during',
                                html: 'For calls during always ...' // TODO: Locales
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
                },
                {
                    xtype: 'container',
                    userCls: 'cf-text',
                    html: Ngcp.csc.locales.callforward.for_calling_parties[localStorage.getItem('languageSelected')],
                    margin: '10 0 10 0'
                },
                {
                    xtype: 'segmentedbutton',
                    itemId: this._prefix + 'sourceButtons',
                    value: 'everybody',
                    defaults: {
                        handler: 'clickSegmentedButton'
                    },
                    ui: 'cf-segmentedbutton',
                    items: [{
                        value: 'everybody',
                        id: this._prefix + 'afterhours-everybodyButton',
                        reference: 'everybodyButton',
                        text: Ngcp.csc.locales.callforward.source_one[localStorage.getItem('languageSelected')]
                    }, {
                        value: 'listA',
                        id: this._prefix + 'afterhours-listAButton',
                        reference: 'listAButton',
                        text: Ngcp.csc.locales.callforward.source_two[localStorage.getItem('languageSelected')],
                        iconCls: Ngcp.csc.icons.pencil,
                        iconAlign: 'right'
                    }, {
                        value: 'listB',
                        id: this._prefix + 'afterhours-listBButton',
                        reference: 'listBButton',
                        text: Ngcp.csc.locales.callforward.source_three[localStorage.getItem('languageSelected')],
                        iconCls: Ngcp.csc.icons.pencil,
                        iconAlign: 'right'
                    }]
                }, {
                    xtype: 'container',
                    userCls: 'cf-embed-row',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        width: '33.5%'
                    },
                    items: [{
                        id: this._prefix + 'afterhours-everybodyButtonBelow'
                    }, {
                        id: this._prefix + 'afterhours-listAButtonBelow',
                        items: [{
                            reference: 'cf-list-a-widget',
                            bind: {
                                hidden: '{list_a}'
                            },
                            items: [{
                                xtype: 'panel',
                                ui: 'cf-widget',
                                width: '100%',
                                items: [
                                    callForwardListAGrid,
                                    {
                                        text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                                        xtype: 'button',
                                        id: this._prefix + 'afterhours-addListAButton',
                                        width: 135,
                                        margin: '15 0 0 0',
                                        listeners: {
                                            click: 'addEmptyRow'
                                        }
                                    }
                                ]
                            }]
                        }]
                    }, {
                        id: this._prefix + 'afterhours-listBHoursButtonBelow',
                        items: [{
                            reference: 'cf-list-b-widget',
                            bind: {
                                hidden: '{list_b}'
                            },
                            items: [{
                                xtype: 'panel',
                                ui: 'cf-widget',
                                width: '100%',
                                items: [
                                    callForwardListBGrid,
                                    {
                                        text: Ngcp.csc.locales.callforward.add_new_source[localStorage.getItem('languageSelected')],
                                        xtype: 'button',
                                        id: this._prefix + 'afterhours-addListBButton',
                                        width: 135,
                                        margin: '15 0 0 0',
                                        listeners: {
                                            click: 'addEmptyRow'
                                        }
                                    }
                                ]
                            }]
                        }]
                    }]
                }, {
                    xtype: 'statusbar',
                    reference: 'loadingBar'
                }, {
                xtype: 'afterhourstabs'
            }]
        }];
        this.callParent();
    }

});
