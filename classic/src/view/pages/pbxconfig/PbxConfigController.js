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
        console.log(value);
        if (value == '') {
            return 'Enter new seat';
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
        var plugin = view.grid.getPlugin('rowwidget');
        var store = Ext.getStore('Seats');
        plugin.toggleRow(store.indexOf(record), record);
        Ext.defer(function () {
            view.grid.updateLayout();
        }, 100);
    },

    getFieldComponent: function(key, id) {
        var fieldId = '#textfield-' + key + '-' + id;
        return Ext.ComponentQuery.query(fieldId);
    },

    getLabelComponent: function(key, id) {
        var labelId = '#label-' + key + '-' + id;
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

    saveSeat: function(el) {
        var me = this;
        var elClassList = el.firstChild.classList;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var vm = me.getViewModel();
        var recId = el.id.split("-")[1];
        var rec = store.findRecord('id', recId);
        var savedCount = 0;
        var nameField = me.getFieldComponent('name', recId)[0];
        var nameLabel = me.getLabelComponent('name', recId)[0];
        var currentNameInRecord = rec.get("name");
        var grid = this.lookupReference('seatsGrid');
        var plugin = grid.getPlugin('rowwidget');
        var fieldLabelPairs = [
            [me.getFieldComponent('extension', recId), me.getLabelComponent('extension', recId)],
            [me.getFieldComponent('groups', recId), me.getLabelComponent('groups', recId)],
            [me.getFieldComponent('numbers', recId), me.getLabelComponent('numbers', recId)],
            [me.getFieldComponent('phone_devices', recId), me.getLabelComponent('phone_devices', recId)]
        ];
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
        elClassList.remove('fa-floppy-o')
        elClassList.add('fa-edit');
        el.dataset.callback = 'editSeat';
        this.hideAllFieldsById(recId);
    },

    addPbx: function() {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var newId = store.getCount() + 1;
        var grid = this.lookupReference('seatsGrid');
        var plugin = grid.getPlugin('rowwidget');
        var rec = store.findRecord('id', newId);
        switch (storeName) {
            case 'Seats':
                store.add({ "id": newId, "name": "", "extension": "", "groups": "", "numbers": "", "phone_devices": "" });
                var rec = store.findRecord('id', newId);
                plugin.toggleRow(store.indexOf(rec), rec);
                Ext.defer(function () {
                    me.showAllFieldsById(newId);
                }, 50);
                break;
            case 'Groups':
                // TODO
                console.log('groups');
                break;
            case 'Devices':
                // TODO
                console.log('devices');
                break;
        }
    },

    setFieldValue: function (cmp) {
        var recId = cmp.id.split("-")[2];
        var recKey = cmp.id.split("-")[1];
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var rec = store.findRecord('id', recId);
        cmp.setValue(rec.get(recKey));
        // TODO: 3c. Add placeholder text if empty "name" value (or fill in value)
        // if (nameField[0].value == '') {
        //     console.log('hi');
        //     console.log(nameField[0]);
        //     nameField[0].value = 'Enter new seat';
        //     console.log(nameField[0]);
        // }
    },

    showAllFieldsById: function(id) {
        var mainNameLabel = Ext.ComponentQuery.query('#mainlabel-name-' + id);
        var nameField = Ext.ComponentQuery.query('#textfield-name-' + id);
        var extensionField = Ext.ComponentQuery.query('#textfield-extension-' + id);
        var groupsField = Ext.ComponentQuery.query('#textfield-groups-' + id);
        var numbersField = Ext.ComponentQuery.query('#textfield-numbers-' + id);
        var phoneField = Ext.ComponentQuery.query('#textfield-phone_devices-' + id);
        var nameLabel = Ext.ComponentQuery.query('#label-name-' + id);
        var extensionLabel = Ext.ComponentQuery.query('#label-extension-' + id);
        var groupsLabel = Ext.ComponentQuery.query('#label-groups-' + id);
        var numbersLabel = Ext.ComponentQuery.query('#label-numbers-' + id);
        var phoneLabel = Ext.ComponentQuery.query('#label-phone_devices-' + id);
        mainNameLabel[0].setHidden(false);
        nameLabel[0].setHidden(true);
        extensionLabel[0].setHidden(true);
        groupsLabel[0].setHidden(true);
        numbersLabel[0].setHidden(true);
        phoneLabel[0].setHidden(true);
        nameField[0].setHidden(false);
        extensionField[0].setHidden(false);
        groupsField[0].setHidden(false);
        numbersField[0].setHidden(false);
        phoneField[0].setHidden(false);
        // TODO: Workaround, due to focus listener workaround
        phoneField[0].focus();
        numbersField[0].focus();
        groupsField[0].focus();
        extensionField[0].focus();
        nameField[0].focus();
    },

    hideAllFieldsById: function(id) {
        var mainNameLabel = Ext.ComponentQuery.query('#mainlabel-name-' + id);
        var nameField = Ext.ComponentQuery.query('#textfield-name-' + id);
        var extensionField = Ext.ComponentQuery.query('#textfield-extension-' + id);
        var groupsField = Ext.ComponentQuery.query('#textfield-groups-' + id);
        var numbersField = Ext.ComponentQuery.query('#textfield-numbers-' + id);
        var phoneField = Ext.ComponentQuery.query('#textfield-phone_devices-' + id);
        var nameLabel = Ext.ComponentQuery.query('#label-name-' + id);
        var extensionLabel = Ext.ComponentQuery.query('#label-extension-' + id);
        var groupsLabel = Ext.ComponentQuery.query('#label-groups-' + id);
        var numbersLabel = Ext.ComponentQuery.query('#label-numbers-' + id);
        var phoneLabel = Ext.ComponentQuery.query('#label-phone_devices-' + id);
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

    editSeat: function(el) {
        var vm = this.getViewModel();
        var recId = el.id.split("-")[1];
        var elClassList = el.firstChild.classList;
        elClassList.remove('fa-edit')
        elClassList.add('fa-floppy-o');
        el.dataset.callback = 'saveSeat';
        this.showAllFieldsById(recId);
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
