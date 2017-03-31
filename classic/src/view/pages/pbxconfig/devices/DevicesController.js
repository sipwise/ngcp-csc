// TODO:
// - draw line (tooltip?)

// - actions
// -- fix save
// -- unassigned buttons 


Ext.define('NgcpCsc.view.pages.pbxconfig.DevicseController', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfigController',
    alias: 'controller.devices',
    onImgRendered: function(imgCmp) {
        var me = this;
        imgCmp.getEl().on('mouseover', this.attachTooltip, this);
        this.getView()._destinationTooltip = Ext.create('Ext.tip.ToolTip', {
            dismissDelay: 0,
            cls: 'devices-tooltip pointer',
            listeners: {
                render: function(ttip) {
                    var grid = me.lookupReference('devicesGrid');
                    var selectedRec = grid.getSelectionModel().getSelection()[0];
                    var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
                    var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
                    var seatData;

                    ttip.getEl().on('mouseenter', function() {
                        var order = ttip.id.split('-')[1];
                        Ext.each(selectedRec.get('destinations'), function(destination) {
                            if (order == destination.order) {
                                seatData = destination;
                                return;
                            }
                        });
                        showPanel.down('[name=editBtns]').hide();
                        showPanel.down('[name=typeValue]').setHtml(seatData.type + ": " + seatData.name);
                        editPanel._user = seatData.name;
                        editPanel._type = seatData.type;
                        editPanel._order = seatData.order;
                        showPanel.setTitle(seatData.order);
                        editPanel.setTitle('Edit ' + seatData.order);
                        editPanel.hide();
                        showPanel.show();
                    });
                    ttip.getEl().on('mouseleave', function() {
                        seatData = null;
                        if (showPanel.down('[name=editBtns]').hidden) {
                            showPanel.hide();
                            showPanel.setTitle(null);
                        }
                        ttip.hide();
                    });
                    ttip.getEl().on('click', function() {
                        showPanel.down('[name=editBtns]').show();
                    });
                }
            }
        });
    },
    attachTooltip: function(ev, target) {
        var classList = target.classList;
        if (classList.contains('assigned-button')) {
            var me = this;
            var store = Ext.getStore('Devices');
            var recId = target.id.split('-')[1];
            var destinationOrder = target.id.split('-')[2]
            var record = store.findRecord('id', recId);
            var ttip = me.getView()._destinationTooltip;

            Ext.each(record.get('destinations'), function(destination) {
                if (destination.order == destinationOrder) {
                    ttip.setHtml(destination.order + ' | ' + destination.name);
                    ttip.anchor = destination.position.anchor;
                    ttip.id = 'seat-' + destination.order;
                    ttip.hide();
                    ttip.showBy(target);
                }
            });
        }
    },
    deviceSelected: function(combo, rec) {
        var grid = this.lookupReference('devicesGrid');
        var devicesListStore = Ext.getStore('DevicesList');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var selectedRecFromList = devicesListStore.findRecord('name', combo.getValue());

        if (selectedRec) {
            selectedRec.set('destinations', selectedRecFromList.get('destinations'))
            selectedRec.set('image', selectedRecFromList.get('image'));
            selectedRec.set('device', combo.getValue());
        }
        this.keepRowExpanded(grid, selectedRec);
        Ext.Function.defer(function() {
            grid.getView().refresh();
        }, 50)
    },
    editSeat: function() {
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        var type = editPanel._type;
        var seatName = editPanel._user;
        editPanel.down('[name=typeValue]').setValue(type);
        editPanel.down('[name=seat]').setValue(seatName);
        showPanel.hide();
        editPanel.show();
    },
    deleteSeat: function() {
        var me = this;
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];

        Ext.each(selectedRec.get('destinations'), function(destination) {
            if (destination.order == editPanel._order) {
                Ext.Msg.show({
                    message: Ext.String.format(Ngcp.csc.locales.pbxconfig.devices.delete_assignment[localStorage.getItem('languageSelected')], destination.order),
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            destination.name = null;
                            destination.type = null;
                            selectedRec.set('imageWithButtons',null);
                            selectedRec.commit();
                            me.keepRowExpanded(grid, selectedRec);
                            me.fireEvent('showmessage', true,  Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
                            showPanel.hide();
                        }
                    }
                });
                return;
            }
        });

    },
    saveSeat: function() {
        var me = this;
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        var type = editPanel.down('[name=typeValue]').getValue();
        var user = editPanel.down('[name=seat]').getValue();
        Ext.each(selectedRec.get('destinations'), function(destination) {
            if (destination.order == editPanel._order) {
                // workaround; TODO improve with binding in next iterations
                destination.name = user;
                destination.type = type;
                editPanel._user = user;
                editPanel._type = type;
                showPanel.down('[name=typeValue]').setHtml(type + ": " + user);
                me.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
                return;
            }
        });
        showPanel.show();
        editPanel.hide();
    },
    discardChanges: function() {
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        showPanel.show();
        editPanel.hide();
    }
});
