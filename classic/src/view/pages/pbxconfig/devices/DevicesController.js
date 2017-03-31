Ext.define('NgcpCsc.view.pages.pbxconfig.DevicseController', {
    extend: 'NgcpCsc.view.pages.pbxconfig.PbxConfigController',
    alias: 'controller.devices',
    onIconClicked: function(event, el) {
        // overrides onIconClicked of PbxConfigController
        if (el.dataset.onseatclick) {
            Ext.Function.defer(eval('this.' + el.dataset.onseatclick), 1, this, [el]);
            return;
        };
        if (el.dataset.callback) {
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
        };
    },
    onMouseEntered: function(event, el) {
        var selectedRec = this.getSelectedRec();
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        if (el.dataset.onseathovered && !editPanel.isVisible()) {
            Ext.Function.defer(eval('this.' + el.dataset.onseathovered), 1, this, [el]);
        }
    },
    onMouseLeave: function() {
        var selectedRec = this.getSelectedRec();
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        showPanel.hide();
    },
    seatHovered: function(el) {
        this.setShowEditPanelFields(el);
    },
    setShowEditPanelFields: function(el) {
        var selectedRec = this.getSelectedRec();
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        var order = el.id.split('-')[2];
        var labelPositioning = Ext.fly(el.id).getPositioning();
        var seatData, offset;

        Ext.each(selectedRec.get('seats'), function(seat) {
            if (order == seat.order) {
                seatData = seat;
                return;
            }
        });
        offset = (seatData.position.anchor == "right") ? Ext.fly(el.id).getWidth() + 18 : -184;
        showPanel.down('[name=typeValue]').setHtml((seatData && seatData.type && seatData.name) ? seatData.type + ": " + seatData.name : "Unassigned");
        editPanel._user = seatData.name || null;
        editPanel._type = seatData.type || null;
        editPanel._order = seatData.order;
        editPanel.hide();
        showPanel.show();
        showPanel.getEl().setLeft(parseInt(labelPositioning.left.split('px')[0]) + offset);
        showPanel.getEl().setTop(parseInt(labelPositioning.top.split('px')[0]) + 20);
    },
    deviceSelected: function(combo, rec) {
        var grid = this.lookupReference('devicesGrid');
        var devicesListStore = Ext.getStore('DevicesList');
        var selectedRec = this.getSelectedRec();
        var selectedRecFromList = devicesListStore.findRecord('name', combo.getValue());
        var nameField = Ext.ComponentQuery.query('#devices-textfield-name-' + selectedRec.get('id'))[0];
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];

        if (selectedRec) {
            selectedRec.set('seats', selectedRecFromList.get('seats'))
            selectedRec.set('image', selectedRecFromList.get('image'));
            selectedRec.set('device', combo.getValue());
        }
        this.keepRowExpanded(grid, selectedRec);
        showPanel.hide();
        Ext.Function.defer(function() {
            grid.getView().refresh();
            nameField.focus();
        }, 50)
    },
    editSeat: function(el) {
        var selectedRec = this.getSelectedRec();
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        var labelPositioning = Ext.fly(el.id).getPositioning();
        var order = el.id.split('-')[2];
        var type, seatName, offset;

        Ext.each(selectedRec.get('seats'), function(seat) {
            if (order == seat.order) {
                seatData = seat;
                return;
            }
        });
        type = seatData.type || null;
        seatName = seatData.name || null;
        offset = (seatData.position.anchor == "right") ? Ext.fly(el.id).getWidth() + 18 : -184;
        if (!type || !seatName) {
            editPanel.removeCls('devices-seat-fieldset-assigned');
            editPanel.addCls('devices-seat-fieldset-unassigned');
        } else {
            editPanel.addCls('devices-seat-fieldset-assigned');
            editPanel.removeCls('devices-seat-fieldset-unassigned');
        }
        editPanel.down('[name=typeValue]').setValue(type);
        editPanel.down('[name=seat]').setValue(seatName);
        showPanel.hide();
        editPanel.show();
        editPanel.getEl().setLeft(parseInt(labelPositioning.left.split('px')[0]) + offset);
        editPanel.getEl().setTop(parseInt(labelPositioning.top.split('px')[0]) + 20);
    },
    deleteSeat: function() {
        var me = this;
        var grid = me.lookupReference('devicesGrid');
        var selectedRec = me.getSelectedRec();
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];

        Ext.each(selectedRec.get('seats'), function(seat) {
            if (seat.order == editPanel._order) {
                Ext.Msg.show({
                    message: Ext.String.format(Ngcp.csc.locales.pbxconfig.devices.delete_assignment[localStorage.getItem('languageSelected')], seat.order),
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            seat.name = null;
                            seat.type = null;
                            me.commitUnsavedChanges();
                            me.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
                            editPanel.hide();
                            grid.focus();
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
        var selectedRec = this.getSelectedRec();
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + selectedRec.get('id'))[0];
        var type = editPanel.down('[name=typeValue]').getValue();
        var user = editPanel.down('[name=seat]').getValue();
        if (!type || !user) {
            me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
            return;
        }
        Ext.each(selectedRec.get('seats'), function(seat) {
            if (seat.order == editPanel._order) {
                // workaround; TODO improve with binding in next iterations
                seat.name = user;
                seat.type = type;
                editPanel._user = user;
                editPanel._type = type;
                showPanel.down('[name=typeValue]').setHtml(type + ": " + user);
                me.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
                return;
            }
        });
        me.commitUnsavedChanges();
        editPanel.hide();
    },
    commitUnsavedChanges: function() {
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = this.getSelectedRec();
        var showPanel = Ext.ComponentQuery.query('#seat-show-panel-' + selectedRec.get('id'))[0];
        selectedRec.set('imageWithButtons', null, {
            silent: true
        });
        grid.getStore().commitChanges();
        this.keepRowExpanded(grid, selectedRec);
        Ext.Function.defer(function() {
            grid.getView().refresh();
        }, 50);
    },
    discardChanges: function() {
        var editPanel = Ext.ComponentQuery.query('#seat-edit-panel-' + this.getSelectedRec().get('id'))[0];
        editPanel.hide();
    },
    getSelectedRec: function() {
        var grid = this.lookupReference('devicesGrid');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        return selectedRec;
    }
});
