Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    listen: {
        controller: {
            '*': {
                unmatchedroute: 'onRouteChange',
                confirmPbxCardRemoval: 'confirmPbxCardRemoval'
            }
        }
    },

    onRouteChange: function() {
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

    onEnterPressed: function(field, el) {
        var me = this;
        if (el.getKey() == el.ENTER) {
            var currentRoute = window.location.hash;
            var storeName = this.getStoreFromRoute(currentRoute);
            var recId = field.id.split("-")[3];
            var iconDivId = 'edit' + storeName.slice(0, -1) + '-' + recId;
            var iconDiv = document.getElementById(iconDivId);
            // NOTE: Cvenusino
            // console.log(field.events);
            // events returned without blur:
            // change
            // dirtychange
            // disable
            // enable
            // errorchange
            // focus
            // specialkey
            // validitychange
            me.saveCard(iconDiv);
        };
    },

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el]);
        };
    },

    nameRenderer: function(value, record) {
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
        Ext.defer(function() {
            view.grid.updateLayout();
        }, 50);
        if (currentRoute == '#pbxconfig/devices') {
            var grid = this.lookupReference('devicesGrid');
            var nodes = plugin.view.getNodes();

            grid.getSelectionModel().select(record);
            store.each(function(rec, index) {
                var node = Ext.fly(nodes[index]);
                if (rec.get('id') !== record.get('id') && node.getHeight() > 100) {
                    plugin.toggleRow(index, store.getAt(index)); // collapse all cards but the active one
                }
            });

        }
    },

    // Workaround, to prevent row from collapsings
    keepRowExpanded: function(grid, rec) {
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var plugin = grid.getPlugin('rowwidget' + storeName);
        var store = Ext.getStore(storeName);
        plugin.toggleRow(store.indexOf(rec), rec);
        plugin.toggleRow(store.indexOf(rec), rec);
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
        // NOTE: Cvenusino
        var elClassList = el.firstChild.classList;
        var recId = el.id.split("-")[1];
        var store = Ext.getStore(storeName);
        saved === true ?
            this.fireEvent('showmessage', true, Ngcp.csc.locales.pbxconfig.changes_saved[localStorage.getItem('languageSelected')]) :
            this.fireEvent('showmessage', false, Ngcp.csc.locales.pbxconfig.no_changes_saved[localStorage.getItem('languageSelected')]);
        elClassList.remove(Ngcp.csc.icons.floppy.split(' ')[1]);
        elClassList.add(Ngcp.csc.icons.edit.split(' ')[1]);
        el.dataset.callback = 'editCard';
        el.dataset.qtip = Ngcp.csc.locales.filters.tooltips.edit_entry[localStorage.getItem('languageSelected')];
        this.showHideFocusFieldsById(recId, storeName, 'hide');
        this.toggleCancelCard(el, 'off');
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
        var form = Ext.ComponentQuery.query('#' + storeName.toLowerCase() + '-' + recId)[0];
        var labels = form.query('label');
        var formFields = form.query('textfield, combo');
        var invalidFields = form.query("field{isValid()==false}");
        var invalidFieldsFiltered = invalidFields.filter(function(item) {
            switch (item.fieldLabel) {
                case 'User':
                    return false;
                    break;
                case 'Type':
                    return false;
                    break;
                default:
                    return true;
            };
        });
        var emptyCheck = 0;
        var invalidCheck = invalidFieldsFiltered.length;
        for (var field in formFields) {
            var fieldValue = formFields[field].value;
            if (!formFields[field]._skipSaveValidation && Ext.isEmpty(formFields[field].value)) {
                emptyCheck++;
            }
        };
        if (emptyCheck === 0 && invalidCheck === 0) {
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
                    this.keepRowExpanded(grid, rec);
                    me.showMsgSwitchIconHideFields(storeName, el, true);
                    break;
                case false:
                    me.showMsgSwitchIconHideFields(storeName, el, false);
                    break;
            };
        } else if (emptyCheck > 0) {
            me.fireEvent('showmessage', false, Ngcp.csc.locales.common.fields_required[localStorage.getItem('languageSelected')]);
        } else if (invalidCheck > 0) {
            me.fireEvent('showmessage', false, Ngcp.csc.locales.common.field_invalid[localStorage.getItem('languageSelected')]);
        }
    },

    addNewEmptyRowToGrid: function(store, storeName, newId) {
        var newRec;
        switch (storeName) {
            case 'Seats':
                newRec = store.add({
                    "id": newId,
                    "name": "",
                    "extension": "",
                    "group": "",
                    "numbers": "",
                    "phone_devices": ""
                });
                break;
            case 'Groups':
                newRec = store.add({
                    "id": newId,
                    "name": "",
                    "extension": "",
                    "hunt_policy": "",
                    "hunt_timeout": ""
                });
                break;
            case 'Devices':
                newRec = store.add({
                    "id": newId,
                    "name": "",
                    "device": "",
                    "mac": "",
                    "status": "",
                    "extension": "",
                    "extension2": ""
                });
                break;
        }
        this.getView().down('grid').getSelectionModel().select(newRec);
    },

    addPbx: function() {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = me.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var newId = Ext.id().replace('ext-', '');
        var grid = this.lookupReference(storeName.toLowerCase() + 'Grid');
        var plugin = grid.getPlugin('rowwidget' + storeName);
        me.addNewEmptyRowToGrid(store, storeName, newId);
        var rec = store.findRecord('id', newId);
        plugin.toggleRow(store.indexOf(rec), rec);
        Ext.defer(function() {
            me.showHideFocusFieldsById(newId, storeName, 'show');
            var el = document.getElementById('edit' + storeName.slice(0, -1) + '-' + newId);
            var elClassList = el.firstChild.classList;
            elClassList.remove(Ngcp.csc.icons.edit.split(' ')[1])
            elClassList.add(Ngcp.csc.icons.floppy.split(' ')[1]);
            el.dataset.callback = 'saveCard';
            el.dataset.qtip = Ngcp.csc.locales.filters.tooltips.save_entry[localStorage.getItem('languageSelected')];
            me.toggleCancelCard(el, 'on');
            grid.updateLayout();
        }, 50);
    },

    setFieldValue: function(cmp) {
        var recId = cmp.id.split("-")[3];
        var recKey = cmp.id.split("-")[2];
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var rec = store.findRecord('id', recId);
        if (!cmp.getValue() || cmp.getValue().length == 0) {
            cmp.setValue(rec.get(recKey));
        }
    },

    showHideFocusFieldsById: function(id, storeName, hideOrShow) {
        var labelHide = hideOrShow == 'show' ? true : false;
        var fieldHide = hideOrShow == 'show' ? false : true;
        var viewName = storeName.toLowerCase();
        var mainNameLabel = Ext.ComponentQuery.query('#' + viewName + '-label-mainname-' + id) || '';
        var nameField = Ext.ComponentQuery.query('#' + viewName + '-textfield-name-' + id) || '';
        var extensionField = Ext.ComponentQuery.query('#' + viewName + '-textfield-extension-' + id) || '';
        var extensionField2 = Ext.ComponentQuery.query('#' + viewName + '-textfield-extension2-' + id) || '';
        var primaryNumberField = Ext.ComponentQuery.query('#' + viewName + '-combo-primary_number-' + id) || '';
        var aliasNumbersField = Ext.ComponentQuery.query('#' + viewName + '-tagfield-alias_numbers-' + id) || '';
        var groupsField = Ext.ComponentQuery.query('#' + viewName + '-tagfield-groups-' + id) || '';
        var huntPolicyField = Ext.ComponentQuery.query('#' + viewName + '-combo-hunt_policy-' + id) || '';
        var huntTimeoutField = Ext.ComponentQuery.query('#' + viewName + '-textfield-hunt_timeout-' + id) || '';
        var deviceField = Ext.ComponentQuery.query('#' + viewName + '-textfield-device-' + id) || '';
        var macField = Ext.ComponentQuery.query('#' + viewName + '-textfield-mac-' + id) || '';
        var statusField = Ext.ComponentQuery.query('#' + viewName + '-textfield-status-' + id) || '';
        var extensionLabel = Ext.ComponentQuery.query('#' + viewName + '-label-extension-' + id) || '';
        var groupsLabel = Ext.ComponentQuery.query('#' + viewName + '-label-groups-' + id) || '';
        var primaryNumberLabel = Ext.ComponentQuery.query('#' + viewName + '-label-primary_number-' + id) || '';
        var aliasNumbersLabel = Ext.ComponentQuery.query('#' + viewName + '-label-alias_numbers-' + id) || '';
        var extensionLabel2 = Ext.ComponentQuery.query('#' + viewName + '-label-extension2-' + id) || '';
        var huntPolicyLabel = Ext.ComponentQuery.query('#' + viewName + '-label-hunt_policy-' + id) || '';
        var huntTimeoutLabel = Ext.ComponentQuery.query('#' + viewName + '-label-hunt_timeout-' + id) || '';
        var huntTimeoutPreLabel = Ext.ComponentQuery.query('#' + viewName + '-prelabel-hunt_timeout-' + id) || '';
        var huntTimeoutPostLabel = Ext.ComponentQuery.query('#' + viewName + '-postlabel-hunt_timeout-' + id) || '';
        var deviceLabel = Ext.ComponentQuery.query('#' + viewName + '-label-device-' + id) || '';
        var macLabel = Ext.ComponentQuery.query('#' + viewName + '-label-mac-' + id) || '';
        var statusLabel = Ext.ComponentQuery.query('#' + viewName + '-label-status-' + id) || '';
        // To make sure we always hide name label and field when not editing
        mainNameLabel[0].setHidden(hideOrShow == 'hide');
        nameField[0].setHidden(hideOrShow == 'hide');
        switch (viewName) {
            case 'seats':
                extensionLabel[0].setHidden(labelHide);
                primaryNumberLabel[0].setHidden(labelHide);
                aliasNumbersLabel[0].setHidden(labelHide);
                groupsLabel[0].setHidden(labelHide);
                extensionField[0].setHidden(fieldHide);
                primaryNumberField[0].setHidden(fieldHide);
                aliasNumbersField[0].setHidden(fieldHide);
                groupsField[0].setHidden(fieldHide);
                // Due to focus listener workaround. Focus listener fires setFieldValue() function
                groupsField[0].focus();
                aliasNumbersField[0].focus();
                primaryNumberField[0].focus();
                extensionField[0].focus();
                nameField[0].focus();
                break;
            case 'groups':
                extensionLabel[0].setHidden(labelHide);
                huntPolicyLabel[0].setHidden(labelHide);
                huntTimeoutLabel[0].setHidden(labelHide);
                // To adjust a little bit 'for' and 'seconds' labels downwards when fields are shown
                huntTimeoutPreLabel[0].toggleCls('pbx-margin-top');
                huntTimeoutPostLabel[0].toggleCls('pbx-margin-top');
                extensionField[0].setHidden(fieldHide);
                huntPolicyField[0].setHidden(fieldHide);
                huntTimeoutField[0].setHidden(fieldHide);
                huntTimeoutField[0].focus();
                huntPolicyField[0].focus();
                extensionField[0].focus();
                nameField[0].focus();
                break;
            case 'devices':
                deviceLabel[0].setHidden(labelHide);
                macLabel[0].setHidden(labelHide);
                nameField[0].setHidden(fieldHide);
                deviceField[0].setHidden(fieldHide);
                macField[0].setHidden(fieldHide);
                extensionLabel[0].setHidden(labelHide);
                extensionField[0].setHidden(fieldHide);
                extensionLabel2[0].setHidden(labelHide);
                extensionField2[0].setHidden(fieldHide);
                macField[0].focus();
                deviceField[0].focus();
                extensionField[0].focus();
                extensionField2[0].focus();
                Ext.defer(function() {
                    nameField[0].focus();
                }, 100)
                break;
        };
    },

    editCard: function(el) {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var recId = el.id.split("-")[1];
        var elClassList = el.firstChild.classList;
        this.toggleCancelCard(el, 'on');
        // Workaround with split(), since classList.add() does not allow strings
        // with spaces (https://developer.mozilla.org/en/docs/Web/API/Element/classList)
        elClassList.remove(Ngcp.csc.icons.edit.split(' ')[1]);
        elClassList.add(Ngcp.csc.icons.floppy.split(' ')[1]);
        el.dataset.callback = 'saveCard';
        el.dataset.qtip = Ngcp.csc.locales.filters.tooltips.save_entry[localStorage.getItem('languageSelected')];
        Ext.defer(function() {
            me.showHideFocusFieldsById(recId, storeName, 'show');
        }, 50);
    },

    removeCard: function(el) {
        var me = this;
        var currentRoute = window.location.hash;
        var storeName = this.getStoreFromRoute(currentRoute);
        var store = Ext.getStore(storeName);
        var recId = el.id.split("-")[1];
        var selectedRow = store.findRecord('id', recId);
        var title = Ngcp.csc.locales.common.delete[localStorage.getItem('languageSelected')];
        var question = Ngcp.csc.locales.common.remove_confirm[localStorage.getItem('languageSelected')];
        var sucessMsg = Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')];
        me.fireEvent('showconfirmbox', title, question, sucessMsg, 'confirmPbxCardRemoval', selectedRow);
    },

    confirmPbxCardRemoval:function(card){
        var store = card.store;
        store.remove(card);
    },

    toggleCancelCard: function(el, state) {
        var cancelCardId = el.id.replace(/edit|save/, 'cancel');
        var cancelCard = document.getElementById(cancelCardId);
        var elClassList = cancelCard.classList;
        switch (state) {
            case 'on':
                elClassList.remove('hidden');
                break;
            case 'off':
                elClassList.add('hidden');
                break;
        };
    },

    cancelCard: function(el, abortAdd) {
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
                me.toggleCancelCard(el, 'off');
                editCard.firstChild.classList.remove(Ngcp.csc.icons.floppy.split(' ')[1]);
                editCard.firstChild.classList.add(Ngcp.csc.icons.edit.split(' ')[1]);
                editCard.dataset.callback = 'editCard';
                break;
        }
    },

    fieldBlurred: function(event) {
        var me = this;
        var fields = this.getView().query('textfield');
        var anyFieldHasFocus = false;
        // console.log(event.events);
        // NOTE: Cvenusino
        // There was Ext.EventManager in ExtJS 4. Something like this in 6.2.0
        // events returned with blur:
        // blur
        // change
        // dirtychange
        // disable
        // enable
        // errorchange
        // focus
        // specialkey
        // validitychange
        // TODO: We need to check if specialkey already fired, but not sure
        // we can see that here
        Ext.defer(function() {
            for (i = 0; i < fields.length; i++) {
                if (fields[i].hasFocus) {
                    anyFieldHasFocus = true;
                }
            }
            if (!anyFieldHasFocus) {
                var currentRoute = window.location.hash;
                var storeName = me.getStoreFromRoute(currentRoute);
                var recId = event.id.split("-")[3];
                var iconDivId = 'edit' + storeName.slice(0, -1) + '-' + recId;
                var iconDiv = document.getElementById(iconDivId);
                me.saveCard(iconDiv);
            }
        }, 1);
    }

});
