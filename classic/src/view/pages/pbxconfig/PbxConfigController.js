Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
        };
    },

    nameRenderer: function (value, record) {
        if (value == '') {
            return 'Enter new name';
        } else {
            return value;
        };
    },

    getRowBasedOnRoute: function(route) {
        switch (route) {
            case ('#pbxconfig/groups'):
                return 'groupsCard-';
                break;
            case ('#pbxconfig/seats'):
                return 'seatsCard-';
                break;
            case ('#pbxconfig/devices'):
                return 'devicesCard-';
                break;
        };
    },

    expandRow: function(view, td, cellindex, record, tr) {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var plugin = view.grid.getPlugin('rowwidget' + storeName);
        plugin.toggleRow(store.indexOf(record), record);
        Ext.defer(function () {
            view.grid.updateLayout();
        }, 100);
    },

    getFieldComponent: function(view, key, id) {
        var fieldId = '#' + view + '-textfield-' + key + '-' + id;
        return Ext.ComponentQuery.query(fieldId);
    },

    getLabelComponent: function(view, key, id) {
        var labelId = '#' + view + '-label-' + key + '-' + id;
        return Ext.ComponentQuery.query(labelId);
    },

    getStoreFromRoute: function(currentRoute) {
        switch (true) {
            case (currentRoute == '#pbxconfig/devices'):
                return 'Devices';
                break;
            case (currentRoute == '#pbxconfig/groups'):
                return 'Groups';
                break;
            case (currentRoute == '#pbxconfig/seats'):
                return 'Seats';
                break;
        };
    },

    saveMsgSwitchIconHideFields: function(savedCount, recId, storeName, el) {
        var elClassList = el.firstChild.classList;
        savedCount > 0
            ? this.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
            : this.fireEvent('showmessage', false, Ngcp.csc.locales.pbxconfig.no_changes_saved[localStorage.getItem('languageSelected')]);
        elClassList.remove('fa-floppy-o');
        elClassList.add('fa-edit');
        el.dataset.callback = 'editCard';
        this.showHideFieldsById(recId, storeName, 'hide');
    },

    // TODO: Cvenusino: I know several of the functions in this controller could
    // use another round of refactoring, especially saveCard. I started writing
    // this controller for 'Seats' module only, and then it grew into a mess as
    // I had to account for the other modules.I propose to merge to master as
    // is, as it works and is ready for feedback from Andreas. Then I propose to
    // create a task to refactor controller. What do you think?
    saveCard: function(el) {
        var me = this;
        var elClassList = el.firstChild.classList;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var vm = me.getViewModel();
        var recId = el.id.split("-")[1];
        var rec = store.findRecord('id', recId);
        var savedCount = 0;
        var nameField = me.getFieldComponent(storeName.toLowerCase(), 'name', recId)[0];
        var nameLabel = me.getLabelComponent(storeName.toLowerCase(), 'name', recId)[0];
        var currentNameInRecord = rec.get("name");
        var grid = this.lookupReference(storeName.toLowerCase() + 'Grid');
        var plugin = grid.getPlugin('rowwidget' + storeName);
        var fieldLabelPairsByView = [
            [[me.getFieldComponent('seats', 'extension', recId), me.getLabelComponent('seats', 'extension', recId)], // NOTE: Seats
            [me.getFieldComponent('seats', 'groups', recId), me.getLabelComponent('seats', 'groups', recId)],
            [me.getFieldComponent('seats', 'numbers', recId), me.getLabelComponent('seats', 'numbers', recId)],
            [me.getFieldComponent('seats', 'phone_devices', recId), me.getLabelComponent('seats', 'phone_devices', recId)]],
            [[me.getFieldComponent('groups', 'extension', recId), me.getLabelComponent('groups', 'extension', recId)], // NOTE: Groups
            [me.getFieldComponent('groups', 'hunt_policy', recId), me.getLabelComponent('groups', 'hunt_policy', recId)],
            [me.getFieldComponent('groups', 'hunt_timeout', recId), me.getLabelComponent('groups', 'hunt_timeout', recId)]],
            [[me.getFieldComponent('devices', 'device', recId), me.getLabelComponent('devices', 'device', recId)], // NOTE: Devices
            [me.getFieldComponent('devices', 'mac', recId), me.getLabelComponent('devices', 'mac', recId)],
            [me.getFieldComponent('devices', 'status', recId), me.getLabelComponent('devices', 'status', recId)]]
        ];
        switch (storeName) {
            case 'Seats':
                var seatsFieldLabelPairs = fieldLabelPairsByView[0];
                if (nameField.value.length > 0 &&
                    seatsFieldLabelPairs[0][0][0].value.length > 0 &&
                    seatsFieldLabelPairs[1][0][0].value.length > 0 &&
                    seatsFieldLabelPairs[2][0][0].value.length > 0 &&
                    seatsFieldLabelPairs[3][0][0].value.length > 0) {
                        if (nameField.value != currentNameInRecord) {
                            nameLabel.setText(nameField.value);
                            rec.set("name", nameField.value);
                            // XXX: Cvenusino: Workaround since rec.set() causes row to
                            // collapse. Is there prettier way to do this, or leave as is?
                            plugin.toggleRow(store.indexOf(rec), rec);
                            plugin.toggleRow(store.indexOf(rec), rec);
                            savedCount ++;
                        };
                        seatsFieldLabelPairs.forEach(function (fieldLabelPair) {
                            var field = fieldLabelPair[0][0];
                            var label = fieldLabelPair[1][0];
                            if (field.value != label.text && field.value.indexOf('textfield-name-') > -1) {
                                label.setText(field.value);
                                savedCount ++;
                            } else if (field.value != label.text) {
                                label.setText(field.value);
                                savedCount ++;
                            }
                        });
                        me.saveMsgSwitchIconHideFields(savedCount, recId, storeName, el);
                } else {
                    me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
                };
                break;
            case 'Groups':
                var groupsFieldLabelPairs = fieldLabelPairsByView[1];
                if (nameField.value.length > 0 &&
                    groupsFieldLabelPairs[0][0][0].value.length > 0 &&
                    groupsFieldLabelPairs[1][0][0].value.length > 0 &&
                    groupsFieldLabelPairs[2][0][0].value.length > 0) {
                        if (nameField.value != currentNameInRecord) {
                            nameLabel.setText(nameField.value);
                            rec.set("name", nameField.value);
                            plugin.toggleRow(store.indexOf(rec), rec);
                            plugin.toggleRow(store.indexOf(rec), rec);
                            savedCount ++;
                        };
                        groupsFieldLabelPairs.forEach(function (fieldLabelPair) {
                            var field = fieldLabelPair[0][0];
                            var label = fieldLabelPair[1][0];
                            if (field.value != label.text && field.value.indexOf('textfield-name-') > -1) {
                                label.setText(field.value);
                                savedCount ++;
                            } else if (field.value != label.text) {
                                label.setText(field.value);
                                savedCount ++;
                            }
                        });
                        me.saveMsgSwitchIconHideFields(savedCount, recId, storeName, el);
                } else {
                    me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
                };
                break;
            case 'Devices':
                var devicesFieldLabelPairs = fieldLabelPairsByView[2];
                if (nameField.value.length > 0 &&
                    devicesFieldLabelPairs[0][0][0].value.length > 0 &&
                    devicesFieldLabelPairs[1][0][0].value.length > 0 &&
                    devicesFieldLabelPairs[2][0][0].value.length > 0) {
                        if (nameField.value != currentNameInRecord) {
                            nameLabel.setText(nameField.value);
                            rec.set("name", nameField.value);
                            plugin.toggleRow(store.indexOf(rec), rec);
                            plugin.toggleRow(store.indexOf(rec), rec);
                            savedCount ++;
                        };
                        devicesFieldLabelPairs.forEach(function (fieldLabelPair) {
                            var field = fieldLabelPair[0][0];
                            var label = fieldLabelPair[1][0];
                            if (field.value != label.text && field.value.indexOf('textfield-name-') > -1) {
                                label.setText(field.value);
                                savedCount ++;
                            } else if (field.value != label.text) {
                                label.setText(field.value);
                                savedCount ++;
                            }
                        });
                        me.saveMsgSwitchIconHideFields(savedCount, recId, storeName, el);
                } else {
                    me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
                };
                break;
        };
    },

    addNewEmptyRowToGrid: function (store, storeName, newId) {
        switch (storeName) {
            case 'Seats':
                store.add({ "id": newId, "name": "", "extension": "", "groups": "", "numbers": "", "phone_devices": "" });
                break;
            case 'Groups':
                store.add({ "id": newId, "name": "", "extension": "", "hunt_policy": "", "hunt_timeout": "" });
                break;
            case 'Devices':
                store.add({ "id": newId, "name": "", "device": "", "mac": "", "status": "" });
                break;
        }
    },

    addPbx: function() {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var newId = store.getCount() + 1;
        var grid = this.lookupReference(storeName.toLowerCase() + 'Grid');
        var plugin = grid.getPlugin('rowwidget' + storeName);
        me.addNewEmptyRowToGrid(store, storeName, newId);
        var rec = store.findRecord('id', newId);
        plugin.toggleRow(store.indexOf(rec), rec);
        Ext.defer(function () {
            me.showHideFieldsById(newId, storeName, 'show');
            var el = document.getElementById('edit' + storeName.slice(0, -1) + '-' + newId);
            var elClassList = el.firstChild.classList;
            elClassList.remove('fa-edit')
            elClassList.add('fa-floppy-o');
            el.dataset.callback = 'saveCard';
        }, 50);
    },

    setFieldValue: function (cmp) {
        var recId = cmp.id.split("-")[3];
        var recKey = cmp.id.split("-")[2];
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var rec = store.findRecord('id', recId);
        cmp.setValue(rec.get(recKey));
    },

    showHideFieldsById: function(id, storeName, hideOrShow) {
        var labelHide = hideOrShow == 'show' ? true : false;
        var fieldHide = hideOrShow == 'show' ? false : true;
        var viewName = storeName.toLowerCase();
        var mainNameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-mainname-' + id) || '';
        var nameField = Ext.ComponentQuery.query('#' + viewName + '-textfield-name-' + id) || '';
        var extensionField = Ext.ComponentQuery.query('#' + viewName + '-textfield-extension-' + id) || '';
        var groupsField = Ext.ComponentQuery.query('#' + viewName + '-textfield-groups-' + id) || '';
        var numbersField = Ext.ComponentQuery.query('#' + viewName + '-textfield-numbers-' + id) || '';
        var phoneField = Ext.ComponentQuery.query('#' + viewName + '-textfield-phone_devices-' + id) || '';
        var huntPolicyField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_policy-' + id) || '';
        var huntTimeoutField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_timeout-' + id) || '';
        var deviceField = Ext.ComponentQuery.query('#' + viewName + '-textfield-device-' + id) || '';
        var macField = Ext.ComponentQuery.query('#' + viewName + '-textfield-mac-' + id) || '';
        var statusField = Ext.ComponentQuery.query('#' + viewName + '-textfield-status-' + id) || '';
        var nameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-name-' + id) || '';
        var extensionLabel = Ext.ComponentQuery.query('#' + viewName + '-label-extension-' + id) || '';
        var groupsLabel = Ext.ComponentQuery.query('#' + viewName + '-label-groups-' + id) || '';
        var numbersLabel = Ext.ComponentQuery.query('#' + viewName + '-label-numbers-' + id) || '';
        var phoneLabel = Ext.ComponentQuery.query('#' + viewName + '-label-phone_devices-' + id) || '';
        var huntPolicyLabel = Ext.ComponentQuery.query('#' + viewName + '-label-hunt_policy-' + id) || '';
        var huntTimeoutLabel = Ext.ComponentQuery.query('#' + viewName + '-label-hunt_timeout-' + id) || '';
        var deviceLabel = Ext.ComponentQuery.query('#' + viewName + '-label-device-' + id) || '';
        var macLabel = Ext.ComponentQuery.query('#' + viewName + '-label-mac-' + id) || '';
        var statusLabel = Ext.ComponentQuery.query('#' + viewName + '-label-status-' + id) || '';
        mainNameLabel[0].setHidden(false);
        switch (viewName) {
            case 'seats':
                nameLabel[0].setHidden(labelHide);
                extensionLabel[0].setHidden(labelHide);
                groupsLabel[0].setHidden(labelHide);
                numbersLabel[0].setHidden(labelHide);
                phoneLabel[0].setHidden(labelHide);
                nameField[0].setHidden(fieldHide);
                extensionField[0].setHidden(fieldHide);
                groupsField[0].setHidden(fieldHide);
                numbersField[0].setHidden(fieldHide);
                phoneField[0].setHidden(fieldHide);
                // NOTE: Workaround, due to focus listener workaround
                phoneField[0].focus();
                numbersField[0].focus();
                groupsField[0].focus();
                extensionField[0].focus();
                nameField[0].focus();
                break;
            case 'groups':
                nameLabel[0].setHidden(labelHide);
                extensionLabel[0].setHidden(labelHide);
                huntPolicyLabel[0].setHidden(labelHide);
                huntTimeoutLabel[0].setHidden(labelHide);
                nameField[0].setHidden(fieldHide);
                extensionField[0].setHidden(fieldHide);
                huntPolicyField[0].setHidden(fieldHide);
                huntTimeoutField[0].setHidden(fieldHide);
                huntTimeoutField[0].focus();
                huntPolicyField[0].focus();
                extensionField[0].focus();
                nameField[0].focus();
                break;
            case 'devices':
                nameLabel[0].setHidden(labelHide);
                deviceLabel[0].setHidden(labelHide);
                macLabel[0].setHidden(labelHide);
                statusLabel[0].setHidden(labelHide);
                nameField[0].setHidden(fieldHide);
                deviceField[0].setHidden(fieldHide);
                macField[0].setHidden(fieldHide);
                statusField[0].setHidden(fieldHide);
                statusField[0].focus();
                macField[0].focus();
                deviceField[0].focus();
                nameField[0].focus();
                break;
        };
    },

    editCard: function(el) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var recId = el.id.split("-")[1];
        var elClassList = el.firstChild.classList;
        elClassList.remove('fa-edit')
        elClassList.add('fa-floppy-o');
        el.dataset.callback = 'saveCard';
        this.showHideFieldsById(recId, storeName, 'show');
    },

    removeCard: function(el) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var selectedRow = store.findRecord('id', recId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    }

});
