Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    listen: {
        controller: {
            '*': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    onRouteChange: function () {
        var vm = this.getViewModel();
        switch (window.location.hash) {
            case '#pbxconfig/seats':
                vm.set('add_new_button', Ngcp.csc.locales.pbxconfig.add_new_seat[localStorage.getItem('languageSelected')]);
                break;
            case '#pbxconfig/groups':
                vm.set('add_new_button', Ngcp.csc.locales.pbxconfig.add_new_group[localStorage.getItem('languageSelected')]);
                break;
            case '#pbxconfig/devices':
                vm.set('add_new_button', Ngcp.csc.locales.pbxconfig.add_new_device[localStorage.getItem('languageSelected')]);
                break;
        };
    },

    onEnterPressed: function (field, el) {
        var me = this;
        if (el.getKey() == el.ENTER) {
            var currentRoute = window.location.hash;
            var storeName = this.getStoreFromRoute(currentRoute);
            var recId = field.id.split("-")[3];
            var iconDivId = 'edit' + storeName.slice(0, -1) + '-' + recId;
            var iconDiv = document.getElementById(iconDivId)
            me.saveCard(iconDiv);
        };
    },

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

    showMsgSwitchIconHideFields: function(storeName, el, saved) {
        var elClassList = el.firstChild.classList;
        var recId = el.id.split("-")[1];
        var store = Ext.getStore(storeName);
        saved === true
            ? this.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
            : this.fireEvent('showmessage', false, Ngcp.csc.locales.pbxconfig.no_changes_saved[localStorage.getItem('languageSelected')]);
        elClassList.remove(Ngcp.csc.icons.floppy.split(' ')[1]);
        elClassList.add(Ngcp.csc.icons.edit.split(' ')[1]);
        el.dataset.callback = 'editCard';
        this.showHideFocusFieldsById(recId, storeName, 'hide');
        this.toggleCancelCard(el);
    },

    saveCard: function(el) {
        var me = this;
        var elClassList = el.firstChild.classList;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var rec = store.findRecord('id', recId);
        var currentNameInRecord = rec.get("name");
        var grid = this.lookupReference(storeName.toLowerCase() + 'Grid');
        var plugin = grid.getPlugin('rowwidget' + storeName);
        var form = Ext.ComponentQuery.query('#' + storeName.toLowerCase() + '-' + recId)[0];
        var formFields = form.query('textfield');
        var invalidCheck = 0;
        for (var field in formFields) {
            var recKey = formFields[field].id.split('-')[2];
            var fieldValue = formFields[field].value;
            if (Ext.isEmpty(formFields[field].value)) invalidCheck ++;
        };
        switch (invalidCheck === 0) {
            case true:
                for (var field in formFields) {
                    var recKey = formFields[field].id.split('-')[2];
                    var fieldValue = formFields[field].value;
                    if (rec.get(recKey) != fieldValue) {
                        rec.set(recKey, fieldValue);
                    };
                };
                switch (rec.dirty) {
                    case true:
                        store.commitChanges();
                        // Workaround, to prevent row from collapsing
                        plugin.toggleRow(store.indexOf(rec), rec);
                        plugin.toggleRow(store.indexOf(rec), rec);
                        me.showMsgSwitchIconHideFields(storeName, el, true);
                        break;
                    case false:
                        me.showMsgSwitchIconHideFields(storeName, el, false);
                        break;
                };
                break;
            case false:
                me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
                me.showHideFocusFieldsById(recId, storeName, 'show');
                break;
        };
    },

    addNewEmptyRowToGrid: function (store, storeName, newId) {
        switch (storeName) {
            case 'Seats':
                store.add({ "id": newId, "name": "", "extension": "", "group": "", "numbers": "", "phone_devices": "" });
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
            me.showHideFocusFieldsById(newId, storeName, 'show');
            var el = document.getElementById('edit' + storeName.slice(0, -1) + '-' + newId);
            var elClassList = el.firstChild.classList;
            elClassList.remove(Ngcp.csc.icons.edit.split(' ')[1])
            elClassList.add(Ngcp.csc.icons.floppy.split(' ')[1]);
            el.dataset.callback = 'saveCard';
            me.toggleCancelCard(el);
            grid.updateLayout();
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

    showHideFocusFieldsById: function(id, storeName, hideOrShow) {
        var labelHide = hideOrShow == 'show' ? true : false;
        var fieldHide = hideOrShow == 'show' ? false : true;
        var viewName = storeName.toLowerCase();
        var mainNameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-mainname-' + id) || '';
        var nameField = Ext.ComponentQuery.query('#' + viewName + '-textfield-name-' + id) || '';
        var extensionField = Ext.ComponentQuery.query('#' + viewName + '-textfield-extension-' + id) || '';
        var groupField = Ext.ComponentQuery.query('#' + viewName + '-textfield-group-' + id) || '';
        var numbersField = Ext.ComponentQuery.query('#' + viewName + '-textfield-numbers-' + id) || '';
        var phoneField = Ext.ComponentQuery.query('#' + viewName + '-textfield-phone_devices-' + id) || '';
        var huntPolicyField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_policy-' + id) || '';
        var huntTimeoutField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_timeout-' + id) || '';
        var deviceField = Ext.ComponentQuery.query('#' + viewName + '-textfield-device-' + id) || '';
        var macField = Ext.ComponentQuery.query('#' + viewName + '-textfield-mac-' + id) || '';
        var statusField = Ext.ComponentQuery.query('#' + viewName + '-textfield-status-' + id) || '';
        var nameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-name-' + id) || '';
        var extensionLabel = Ext.ComponentQuery.query('#' + viewName + '-label-extension-' + id) || '';
        var groupLabel = Ext.ComponentQuery.query('#' + viewName + '-label-group-' + id) || '';
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
                groupLabel[0].setHidden(labelHide);
                numbersLabel[0].setHidden(labelHide);
                phoneLabel[0].setHidden(labelHide);
                nameField[0].setHidden(fieldHide);
                extensionField[0].setHidden(fieldHide);
                groupField[0].setHidden(fieldHide);
                numbersField[0].setHidden(fieldHide);
                phoneField[0].setHidden(fieldHide);
                // Due to focus listener workaround
                phoneField[0].focus();
                numbersField[0].focus();
                groupField[0].focus();
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
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var recId = el.id.split("-")[1];
        var elClassList = el.firstChild.classList;
        this.toggleCancelCard(el); // TODO
        // Workaround with split(), since classList.add() does not allow strings
        // with spaces (https://developer.mozilla.org/en/docs/Web/API/Element/classList)
        elClassList.remove(Ngcp.csc.icons.edit.split(' ')[1]);
        elClassList.add(Ngcp.csc.icons.floppy.split(' ')[1]);
        el.dataset.callback = 'saveCard';
        Ext.defer(function () {
            me.showHideFocusFieldsById(recId, storeName, 'show');
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
    },

    toggleCancelCard: function (el) {
        var cancelCardId = el.id.replace(/edit|save/, 'cancel');
        var cancelCard = document.getElementById(cancelCardId);
        var elClassList = cancelCard.classList;
        switch (elClassList.contains('hidden')) {
            case true:
                elClassList.remove('hidden');
                break;
            case false:
                elClassList.add('hidden');
                break;
        };
    },

    cancelCard: function (el, abortAdd) {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var editCard = document.getElementById('edit' + storeName.slice(0, -1) + '-' + recId);
        var currentRoute = window.location.hash;
        var selectedRow = store.findRecord('id', recId);
        var nameRecord = selectedRow.get('name');
        switch (nameRecord === '') {
            case true:
                me.removeCard(el);
                break;
            case false:
                me.showHideFocusFieldsById(recId, storeName, 'hide');
                me.toggleCancelCard(el);
                editCard.firstChild.classList.remove(Ngcp.csc.icons.floppy.split(' ')[1]);
                editCard.firstChild.classList.add(Ngcp.csc.icons.edit.split(' ')[1]);
                editCard.dataset.callback = 'editCard';
                break;
        }
    }

});
