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
            return Ngcp.csc.locales.pbxconfig.enter_new_name[localStorage.getItem('languageSelected')];
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
        var vm = me.getViewModel();
        vm.set('edit_in_progress', false);
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var plugin = view.grid.getPlugin('rowwidget' + storeName);
        plugin.toggleRow(store.indexOf(record), record);
        Ext.defer(function () {
            view.grid.updateLayout();
        }, 50);
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
        var vm = this.getViewModel();
        var elClassList = el.firstChild.classList;
        savedCount > 0
            ? this.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
            : this.fireEvent('showmessage', false, Ngcp.csc.locales.pbxconfig.no_changes_saved[localStorage.getItem('languageSelected')]);
        elClassList.remove(Ngcp.csc.icons.floppy.split(' ')[1]);
        elClassList.add(Ngcp.csc.icons.edit.split(' ')[1]);
        el.dataset.callback = 'editCard';
        vm.set('edit_in_progress', false);
    },

    // TODO: Implement according to cvenusino's review comments. From cvenusino:
    // A bit of overengineering here. What  this function should do is
    // 1. select all the textfields which belongs to the card parent of the save button (card panel will need an id like seats-[seatId] which is taken from the button el)
    // 2. iterate thru the textfields within the card
    //      if the field isDirty() update the associated field in record (which should automatically update the bound label)
    //      else do nothing
    // 3. when iteration is done check if the record is dirty
    //      if dirty, store commitChanges and showmessage "Successfully saved"
    //      else do nothing
    // 4. hide textfields and show labels in the card. some refs:
    // http://docs.sencha.com/extjs/6.2.0/classic/Ext.form.field.Text.html#method-isDirty
    // http://docs.sencha.com/extjs/6.2.0/classic/Ext.data.Model.html#property-dirty
    // http://docs.sencha.com/extjs/6.2.0/classic/Ext.data.Store.html#method-commitChanges
    saveCard: function(el) {
        var me = this;
        var vm = me.getViewModel();
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
                            rec.set("name", nameField.value);
                            // Workaround, as rec.set() causes row to collapse
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
        var vm = me.getViewModel();
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var newId = store.getCount() + 1;
        var grid = this.lookupReference(storeName.toLowerCase() + 'Grid');
        var plugin = grid.getPlugin('rowwidget' + storeName);
        vm.set('edit_in_progress', true);
        me.addNewEmptyRowToGrid(store, storeName, newId);
        var rec = store.findRecord('id', newId);
        plugin.toggleRow(store.indexOf(rec), rec);
        Ext.defer(function () {
            me.focusFieldsById(newId, storeName);
            var el = document.getElementById('edit' + storeName.slice(0, -1) + '-' + newId);
            var elClassList = el.firstChild.classList;
            elClassList.remove(Ngcp.csc.icons.fedit)
            elClassList.add(Ngcp.csc.icons.floppy.split(' ')[1]);
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

    focusFieldsById: function(id, storeName) {
        var viewName = storeName.toLowerCase();
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
        switch (viewName) {
            case 'seats':
                // Workaround, due to focus listener workaround
                phoneField[0].focus();
                numbersField[0].focus();
                groupsField[0].focus();
                extensionField[0].focus();
                nameField[0].focus();
                break;
            case 'groups':
                huntTimeoutField[0].focus();
                huntPolicyField[0].focus();
                extensionField[0].focus();
                nameField[0].focus();
                break;
            case 'devices':
                statusField[0].focus();
                macField[0].focus();
                deviceField[0].focus();
                nameField[0].focus();
                break;
        };
    },

    editCard: function(el) {
        var me = this;
        var vm = this.getViewModel();
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var recId = el.id.split("-")[1];
        var elClassList = el.firstChild.classList;
        // Workaround with split(), since classList.add() does not allow strings
        // with spaces (https://developer.mozilla.org/en/docs/Web/API/Element/classList)
        elClassList.remove(Ngcp.csc.icons.edit.split(' ')[1]);
        elClassList.add(Ngcp.csc.icons.floppy.split(' ')[1]);
        el.dataset.callback = 'saveCard';
        vm.set('edit_in_progress', true);
        Ext.defer(function () {
            me.focusFieldsById(recId, storeName);
        }, 50);
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
