Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    listen: {
        component: {
            '*': {
                'label-clicked': 'toggleEdit'
            }
        }
    },

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
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

    expandPbxCard: function(view, td, cellindex, record, tr) {
        // TODO: Leaving this old function for now, as we need to make whole name
        // column card header clickable to expand/collapse
        var editor = new Ext.Editor({
            updateEl: true,
            alignment: 'l-l',
            autoSize: {
                width: 'boundEl'
            },
            field: {
                xtype: 'textfield'
            }
        });
        if (cellindex.target && cellindex.target.classList.contains('green-icon')) {
            return;
        };
        var me = this;
        var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
        var id = record.get('id');
        var route = window.location.hash;
        var row = document.getElementById(this.getRowBasedOnRoute(route) + id);
        var field = document.getElementById('seatsExtensionInput-1');
        editor.startEdit(field);
        if (row.classList.contains('hidden')) {
            record.set('expanded', true);
            row.classList.remove('hidden');
        } else {
            // TODO: Implement a way of disabling this else statement once
            // vm value show_hide_fields is set to 'show'

            // record.set('expanded', false);
            // row.classList.add('hidden');
        };
        view.grid.updateLayout();
    },

    getFieldComponent: function(key, id) {
        var fieldId = '#textfield-' + key + '-' + id;
        return Ext.ComponentQuery.query(fieldId);
    },

    getLabelComponent: function(key, id) {
        var labelId = '#label-' + key + '-' + id;
        return Ext.ComponentQuery.query(labelId);
    },

    showFieldHideLabel: function(field, cmp) {
        field[0].setHidden(false);
        cmp.setHidden(true);
    },

    showLabelHideField: function(label, cmp, id) {
        var vm = this.getViewModel();
        var currentShowHideState = vm.get('show_hide_fields');
        if (currentShowHideState === 'show') {
            this.hideAllFieldsById(id);
        } else {
            label[0].setHidden(false);
            cmp.setHidden(true);
        };
    },

    toggleEdit: function(cmp) {
        var cmpId = cmp.id;
        switch (true) {
            case (cmpId.indexOf('extension') > -1):
                var recordId = cmpId.substring(this.getIdPrefixCharCount('label-extension-'));
                var field = this.getFieldComponent('extension', recordId);
                this.showFieldHideLabel(field, cmp);
                field[0].focus();
                break;
            case (cmpId.indexOf('groups') > -1):
                var recordId = cmpId.substring(this.getIdPrefixCharCount('label-groups-'));
                var field = this.getFieldComponent('groups', recordId);
                this.showFieldHideLabel(field, cmp);
                field[0].focus();
                break;
            case (cmpId.indexOf('numbers') > -1):
                var recordId = cmpId.substring(this.getIdPrefixCharCount('label-numbers-'));
                var field = this.getFieldComponent('numbers', recordId);
                this.showFieldHideLabel(field, cmp);
                field[0].focus();
                break;
            case (cmpId.indexOf('phone') > -1):
                var recordId = cmpId.substring(this.getIdPrefixCharCount('label-phone-'));
                var field = this.getFieldComponent('phone', recordId);
                this.showFieldHideLabel(field, cmp);
                field[0].focus();
                break;
        };
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

    saveRecord: function(cmp) {
        // NOTE: Right now only saves the record of blurred field
        var cmpId = cmp.id;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var vm = this.getViewModel();
        var currentShowHideState = vm.get('show_hide_fields');
        switch (currentShowHideState) {
            case 'show':
                switch (true) {
                    case (cmpId.indexOf('extension') > -1):
                        // TODO: rewrite to use split (var recId = cmp.id.split("-")[2])
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-extension-'));
                        var record = store.findRecord('id', recordId); // TODO: Also write to store if dirty, or not applicable?
                        var label = this.getLabelComponent('extension', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.'); // TODO: Locales
                        break;
                    case (cmpId.indexOf('groups') > -1):
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-groups-'));
                        var record = store.findRecord('id', recordId);
                        var label = this.getLabelComponent('groups', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.');
                        break;
                    case (cmpId.indexOf('numbers') > -1):
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-numbers-'));
                        var record = store.findRecord('id', recordId);
                        var label = this.getLabelComponent('numbers', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.');
                        break;
                    case (cmpId.indexOf('phone') > -1):
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-phone-'));
                        var record = store.findRecord('id', recordId);
                        var label = this.getLabelComponent('phone', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.');
                        break;
                    };
                break;
            case 'hide':
                switch (true) {
                    case (cmpId.indexOf('extension') > -1):
                        // TODO: rewrite to use split (var recId = cmp.id.split("-")[2])
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-extension-'));
                        var record = store.findRecord('id', recordId); // TODO: Also write to store if dirty, or not applicable?
                        var label = this.getLabelComponent('extension', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.'); // TODO: Locales
                        break;
                    case (cmpId.indexOf('groups') > -1):
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-groups-'));
                        var record = store.findRecord('id', recordId);
                        var label = this.getLabelComponent('groups', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.');
                        break;
                    case (cmpId.indexOf('numbers') > -1):
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-numbers-'));
                        var record = store.findRecord('id', recordId);
                        var label = this.getLabelComponent('numbers', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.');
                        break;
                    case (cmpId.indexOf('phone') > -1):
                        var recordId = cmpId.substring(this.getIdPrefixCharCount('textfield-phone-'));
                        var record = store.findRecord('id', recordId);
                        var label = this.getLabelComponent('phone', recordId);
                        label[0].setText(cmp.getValue());
                        this.showLabelHideField(label, cmp, recordId);
                        this.fireEvent('showmessage', true, 'Record saved.');
                        break;
                };
                break;
        };
    },

    addPbx: function() {
        // TODO
    },

    showAllFieldsById: function (id) {
        var vm = this.getViewModel();
        vm.set('show_hide_fields', 'show');
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

    hideAllFieldsById: function (id) {
        var vm = this.getViewModel();
        vm.set('show_hide_fields', 'hide');
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

    editCard: function(id, element) {
        // TODO
        var recordId = id.substring(this.getIdPrefixCharCount('editCard-'));
        this.showAllFieldsById(recordId);
    },

    getIdPrefixCharCount: function(idPrefix) {
        return idPrefix.length;
    },

    removeCard: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeSeat-'));
        var store = Ext.getStore('Seats');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    removeGroup: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeGroup-'));
        var store = Ext.getStore('Groups');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    removeDevice: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeDevice-'));
        var store = Ext.getStore('Devices');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    }

});
