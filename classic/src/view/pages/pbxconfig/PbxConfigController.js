Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
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
        var store = Ext.getStore('Seats')
        plugin.toggleRow(store.indexOf(record), record);
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
        var currentShowHideState = vm.get('show_hide_fields');
        var recId = el.id.split("-")[1];
        var savedCount = 0;
        var fieldLabelPairs = [
            [me.getFieldComponent('extension', recId), me.getLabelComponent('extension', recId)],
            [me.getFieldComponent('groups', recId), me.getLabelComponent('groups', recId)],
            [me.getFieldComponent('numbers', recId), me.getLabelComponent('numbers', recId)],
            [me.getFieldComponent('phone', recId), me.getLabelComponent('phone', recId)]
        ];
        fieldLabelPairs.forEach(function (pair) {
            var field = pair[0][0];
            var label = pair[1][0];

            if (field.value != label.text) {
                var record = store.findRecord('id', recId);
                label.setText(field.value);
                savedCount ++;
            }
        });
        savedCount > 0 ? me.fireEvent('showmessage', true, 'Changes saved.') : me.fireEvent('showmessage', false, 'No changes saved.') // TODO: Locales
        elClassList.remove('fa-floppy-o')
        elClassList.add('fa-edit');
        el.dataset.callback = 'editSeat';
        this.hideAllFieldsById(recId);
    },

    addPbx: function() {
        // TODO
    },

    showAllFieldsById: function(id) {
        var vm = this.getViewModel();
        var extensionField = Ext.ComponentQuery.query('#textfield-extension-' + id);
        var groupsField = Ext.ComponentQuery.query('#textfield-groups-' + id);
        var numbersField = Ext.ComponentQuery.query('#textfield-numbers-' + id);
        var phoneField = Ext.ComponentQuery.query('#textfield-phone-' + id);
        var extensionLabel = Ext.ComponentQuery.query('#label-extension-' + id);
        var groupsLabel = Ext.ComponentQuery.query('#label-groups-' + id);
        var numbersLabel = Ext.ComponentQuery.query('#label-numbers-' + id);
        var phoneLabel = Ext.ComponentQuery.query('#label-phone-' + id);
        extensionLabel[0].setHidden(true);
        groupsLabel[0].setHidden(true);
        numbersLabel[0].setHidden(true);
        phoneLabel[0].setHidden(true);
        extensionField[0].setHidden(false);
        groupsField[0].setHidden(false);
        numbersField[0].setHidden(false);
        phoneField[0].setHidden(false);
        // TODO: Workaround due to focus listener workaround
        phoneField[0].focus();
        numbersField[0].focus();
        groupsField[0].focus();
        extensionField[0].focus();
    },

    hideAllFieldsById: function(id) {
        var vm = this.getViewModel();
        var extensionField = Ext.ComponentQuery.query('#textfield-extension-' + id);
        var groupsField = Ext.ComponentQuery.query('#textfield-groups-' + id);
        var numbersField = Ext.ComponentQuery.query('#textfield-numbers-' + id);
        var phoneField = Ext.ComponentQuery.query('#textfield-phone-' + id);
        var extensionLabel = Ext.ComponentQuery.query('#label-extension-' + id);
        var groupsLabel = Ext.ComponentQuery.query('#label-groups-' + id);
        var numbersLabel = Ext.ComponentQuery.query('#label-numbers-' + id);
        var phoneLabel = Ext.ComponentQuery.query('#label-phone-' + id);
        extensionField[0].setHidden(true);
        groupsField[0].setHidden(true);
        numbersField[0].setHidden(true);
        phoneField[0].setHidden(true);
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

    removeSeat: function(el) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var selectedRow = store.findRecord('id', recId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    removeGroup: function(el) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var selectedRow = store.findRecord('id', recId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    removeDevice: function(el) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var selectedRow = store.findRecord('id', recId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    }

});
