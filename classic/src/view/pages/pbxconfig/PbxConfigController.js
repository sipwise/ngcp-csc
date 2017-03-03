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
        var nameField = me.getFieldComponent('seats', 'name', recId)[0];
        var nameLabel = me.getLabelComponent('seats', 'name', recId)[0];
        var currentNameInRecord = rec.get("name");
        var grid = this.lookupReference(storeName.toLowerCase() + 'Grid');
        var plugin = grid.getPlugin('rowwidget' + storeName);
        var fieldLabelPairs = [
            [[me.getFieldComponent('seats', 'extension', recId), me.getLabelComponent('seats', 'extension', recId)], // NOTE: Seats
            [me.getFieldComponent('seats', 'groups', recId), me.getLabelComponent('seats', 'groups', recId)],
            [me.getFieldComponent('seats', 'numbers', recId), me.getLabelComponent('seats', 'numbers', recId)],
            [me.getFieldComponent('seats', 'phone_devices', recId), me.getLabelComponent('seats', 'phone_devices', recId)]],
            [[me.getFieldComponent('groups', 'extension', recId), me.getLabelComponent('groups', 'extension', recId)], // NOTE: Groups
            [me.getFieldComponent('groups', 'groups', recId), me.getLabelComponent('groups', 'groups', recId)],
            [me.getFieldComponent('groups', 'numbers', recId), me.getLabelComponent('groups', 'numbers', recId)],
            [me.getFieldComponent('groups', 'phone_devices', recId), me.getLabelComponent('groups', 'phone_devices', recId)]]
        ];
        // TODO: Don't think it evaluates right in this if statement. Check
        if (nameField.value.length > 0 &&
            fieldLabelPairs[0][0][0][0].value.length > 0 &&
            fieldLabelPairs[0][1][0][0].value.length > 0 &&
            fieldLabelPairs[0][2][0][0].value.length > 0 &&
            fieldLabelPairs[0][3][0][0].value.length > 0) {
                if (nameField.value != currentNameInRecord) {
                    nameLabel.setText(nameField.value);
                    rec.set("name", nameField.value);
                    // XXX: Cvenusino: Workaround since rec.set() causes row to
                    // collapse. Is there prettier way to do this, or leave as is?
                    plugin.toggleRow(store.indexOf(rec), rec);
                    plugin.toggleRow(store.indexOf(rec), rec);
                    savedCount ++;
                };
                fieldLabelPairs.forEach(function (pair) {
                    var field = pair[0][0];
                    var label = pair[1][0];
                    if (field.value != label.text && field.value.indexOf('textfield-name-') > -1) {
                        label.setText(field.value);
                        savedCount ++;
                    } else if (field.value != label.text) {
                        label.setText(field.value);
                        savedCount ++;
                    }
                });
                savedCount > 0
                    ? me.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')])
                    : me.fireEvent('showmessage', false, Ngcp.csc.locales.pbxconfig.no_changes_saved[localStorage.getItem('languageSelected')]);
                elClassList.remove('fa-floppy-o');
                elClassList.add('fa-edit');
                el.dataset.callback = 'editCard';
                this.showHideFieldsById(recId, storeName, 'hide');
        } else {
            me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
        };
    },

    addPbx: function() {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var newId = store.getCount() + 1;
        var grid = this.lookupReference('seatsGrid');
        var plugin = grid.getPlugin('rowwidgetSeats');
        var rec = store.findRecord('id', newId);
        switch (storeName) {
            case 'Seats':
                store.add({ "id": newId, "name": "", "extension": "", "groups": "", "numbers": "", "phone_devices": "" });
                var rec = store.findRecord('id', newId);
                plugin.toggleRow(store.indexOf(rec), rec);
                Ext.defer(function () {
                    me.showHideFieldsById(newId, storeName, 'show');
                    var el = document.getElementById('editSeat-' + newId);
                    var elClassList = el.firstChild.classList;
                    elClassList.remove('fa-edit')
                    elClassList.add('fa-floppy-o');
                    el.dataset.callback = 'saveCard';
                }, 50);
                break;
            case 'Groups':
                // TODO
                break;
            case 'Devices':
                // TODO
                break;
        }
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
        var viewName = storeName.toLowerCase();
        var mainNameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-mainname-' + id) || '';
        var nameField = Ext.ComponentQuery.query('#' + viewName + '-textfield-name-' + id) || '';
        var extensionField = Ext.ComponentQuery.query('#' + viewName + '-textfield-extension-' + id) || '';
        var groupsField = Ext.ComponentQuery.query('#' + viewName + '-textfield-groups-' + id) || '';
        var numbersField = Ext.ComponentQuery.query('#' + viewName + '-textfield-numbers-' + id) || '';
        var phoneField = Ext.ComponentQuery.query('#' + viewName + '-textfield-phone_devices-' + id) || '';
        var huntPolicyField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_policy-' + id) || '';
        var huntTimeoutField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_timeout-' + id) || '';
        var nameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-name-' + id) || '';
        var extensionLabel = Ext.ComponentQuery.query('#' + viewName + '-label-extension-' + id) || '';
        var groupsLabel = Ext.ComponentQuery.query('#' + viewName + '-label-groups-' + id) || '';
        var numbersLabel = Ext.ComponentQuery.query('#' + viewName + '-label-numbers-' + id) || '';
        var phoneLabel = Ext.ComponentQuery.query('#' + viewName + '-label-phone_devices-' + id) || '';
        var huntPolicyLabel = Ext.ComponentQuery.query('#' + viewName + '-label-hunt_policy-' + id) || '';
        var huntTimeoutLabel = Ext.ComponentQuery.query('#' + viewName + '-label-hunt_timeout-' + id) || '';
        mainNameLabel[0].setHidden(false);
        switch (viewName) {
            case 'seats':
                var labelHide = hideOrShow == 'show' ? true : false;
                var fieldHide = hideOrShow == 'show' ? false : true;
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
                var labelHide = hideOrShow == 'show' ? true : false;
                var fieldHide = hideOrShow == 'show' ? false : true;
                nameLabel[0].setHidden(labelHide);
                extensionLabel[0].setHidden(labelHide);
                huntPolicyLabel[0].setHidden(labelHide);
                huntTimeoutLabel[0].setHidden(labelHide);
                nameField[0].setHidden(fieldHide);
                extensionField[0].setHidden(fieldHide);
                huntPolicyField[0].setHidden(fieldHide);
                huntTimeoutField[0].setHidden(fieldHide);
                nameField[0].focus();
                extensionField[0].focus();
                huntPolicyField[0].focus();
                huntTimeoutField[0].focus();
                break;
            case 'devices':
                break;
        };
    },

    hideAllFieldsById: function(id, storeName) {
        var viewName = storeName.toLowerCase();
        var mainNameLabel = Ext.ComponentQuery.query('#seats-label-mainname-' + id);
        var nameField = Ext.ComponentQuery.query('#seats-textfield-name-' + id);
        var extensionField = Ext.ComponentQuery.query('#seats-textfield-extension-' + id);
        var groupsField = Ext.ComponentQuery.query('#seats-textfield-groups-' + id);
        var numbersField = Ext.ComponentQuery.query('#seats-textfield-numbers-' + id);
        var phoneField = Ext.ComponentQuery.query('#seats-textfield-phone_devices-' + id);
        var nameLabel = Ext.ComponentQuery.query('#seats-label-name-' + id);
        var extensionLabel = Ext.ComponentQuery.query('#seats-label-extension-' + id);
        var groupsLabel = Ext.ComponentQuery.query('#seats-label-groups-' + id);
        var numbersLabel = Ext.ComponentQuery.query('#seats-label-numbers-' + id);
        var phoneLabel = Ext.ComponentQuery.query('#seats-label-phone_devices-' + id);
        nameField[0].setHidden(true);
        extensionField[0].setHidden(true);
        groupsField[0].setHidden(true);
        numbersField[0].setHidden(true);
        phoneField[0].setHidden(true);
        mainNameLabel[0].setHidden(true);
        nameLabel[0].setHidden(true);
        extensionLabel[0].setHidden(false);
        groupsLabel[0].setHidden(false);
        numbersLabel[0].setHidden(false);
        phoneLabel[0].setHidden(false);
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
