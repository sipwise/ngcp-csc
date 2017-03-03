Ext.define('NgcpCsc.view.pages.pbxconfig.PbxConfigController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pbxconfig',

    listen: {
    	component: {
            '*' : {
                'label-clicked' : 'toggleEdit'
        	}
        }
    },

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
        };
    },

    getRowBasedOnRoute: function (route) {
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

    addPbx: function() {
        // TODO
    },

    renderMe: function () {
        return '<div style="color: #606060;"><b>Extension:</b></div>';
    },

    toggleEdit: function (cmpId) {
        // TODO: Check if itemId returns string, and not array
        console.log(cmpId);
        // var field = Ext.ComponentQuery.query('#textfield-extension-1');
        // field[0].setHidden(false);
    },

    // editSeat: function(id) {
    //     // TODO: Refactor when grunt work is done
    //     var vm = this.getViewModel();
    //     var dataValueStrings = document.querySelectorAll('.pbx-data-value');
    //     var dataFieldStrings = document.querySelectorAll('.pbx-data-field');
    //     var showOrHideFields = vm.get('show_hide_fields');
    //     function hideFieldsShowValues() {
    //         dataValueStrings.forEach(function(el) {
    //             el.style.display = 'inline-block';
    //         });
    //         dataFieldStrings.forEach(function(el) {
    //             el.style.display = 'none';
    //         });
    //     };
    //     function hideValuesShowFields() {
    //         dataValueStrings.forEach(function(el) {
    //             el.style.display = 'none';
    //         });
    //         dataFieldStrings.forEach(function(el) {
    //             el.style.display = 'inline-block';
    //         });
    //     };
    //     function toggleEdit() {
    //         switch (showOrHideFields) {
    //             case ('hide'):
    //               hideValuesShowFields();
    //               vm.set('show_hide_fields', 'show');
    //               break;
    //             case ('show'):
    //               hideFieldsShowValues();
    //               vm.set('show_hide_fields', 'hide');
    //               break;
    //         };
    //     };
    //     toggleEdit();
    // },

    editGroup: function(id) {
        // TODO
    },

    editDevice: function(id, destination) {
        // TODO
    },

    getIdPrefixCharCount: function (idPrefix) {
        return idPrefix.length;
    },

    toggleNewSeatBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    toggleNewGroupBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    toggleNewDeviceBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    removeSeat: function(id) {
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
    },

    resetChanges: function() {
        var form = this.lookupReference('add-new-seat');
        var grid = this.getView().down('seats-grid');
        var store = Ext.getStore('Seats');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        if (selectedRec.get('newRec')) {
            store.remove(selectedRec)
        } else {
            selectedRec.reject();
        }
        grid.getSelectionModel().deselectAll();
        this.toggleNewSeatBtn(true);
        form.hide();
    }

});
