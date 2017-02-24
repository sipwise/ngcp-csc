Ext.define('NgcpCsc.view.pages.pbxconfig.devices.DevicesController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.devices',

    onIconClicked: function(event, el) {
        if (el.dataset.callback) {
            // eval is never the best option
            Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
        };
    },

    expandPbxCard: function(view, td, cellindex, record, tr) {
        var me = this;
        if (cellindex.target && cellindex.target.classList.contains('green-icon')) {
            return;
        };
        if (cellindex == 4) {
            switch (record.get('conversation_type')) {
                case 'call':
                case 'fax':
                case 'sms':
                case 'chat':
                    this.openCallPanel();
                break;
            };
        } else {
            var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
            var id = record.get('id');
            var row = document.getElementById('devicesCard-' + id);
            if (row.classList.contains('hidden')) {
                record.set('expanded', true);
                row.classList.remove('hidden');
            } else {
                record.set('expanded', false);
                row.classList.add('hidden');
            };
        };
        view.grid.updateLayout();
    },

    addDevice: function() {
        // var grid = this.getView().down('devices-grid');
        // var form = this.lookupReference('add-new-device');
        // var store = Ext.getStore('Devices');
        // var destinationsGrid = this.getView().down('destinations-grid');
        // store.clearFilter();
        // var newRec = store.insert(0, {
        //     id: Ext.id(),
        //     expanded: true,
        //     status: 'disabled',
        //     newRec: true
        // })[0];
        // grid.getPlugin('rowexpander').toggleRow(0, newRec);
        // grid.getSelectionModel().select(newRec);
        // destinationsGrid.getStore().removeAll();
        // this.toggleNewDeviceBtn(false);
        // form.show();
        // form.down('[name=deviceName]').focus();
    },

    editDevice: function(id, destination) {
        // var form = this.lookupReference('add-new-device');
        // var grid = this.getView().down('devices-grid');
        // var store = Ext.getStore('Devices');
        // var selectedRow = store.findRecord('id', id);
        // grid.getSelectionModel().select(selectedRow);
        // this.deviceSelected();
        // this.toggleNewDeviceBtn(false);
        // form.show();
        // form.down('[name=deviceName]').focus();
    },

    toggleNewDeviceBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    getIdPrefixCharCount: function (idPrefix) {
        return idPrefix.length;
    },

    removeDevice: function(id) {
        var recordId = id.substring(this.getIdPrefixCharCount('removeDevice-'));
        var store = Ext.getStore('Devices');
        var selectedRow = store.findRecord('id', recordId);
        store.remove(selectedRow);
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    deviceSelected: function() {
        var grid = this.getView().down('devices-grid');
        var destinationsGrid = this.getView().down('destinations-grid');
        var devicesListStore = Ext.getStore('DevicesList');
        var devicesStore = Ext.getStore('Devices');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        var selectedDevice = selectedRec.get('device');
        var selectedRecFromList = devicesListStore.findRecord('name', selectedDevice);
        var destinations = [];
        selectedRec.set('image', selectedRecFromList.get('image'));
        selectedRec.set('destinations', selectedRecFromList.get('destinations'));
        Ext.each(selectedRec.get('destinations'), function(destination) {
            destinations.push({
                "position": destination.order,
                "destination": destination.name,
                "sound": destination.sound
            })
        });
        destinationsGrid.getStore().removeAll();
        destinationsGrid.getStore().add(destinations);
    },

    resetChanges: function() {
        var form = this.lookupReference('add-new-device');
        var grid = this.getView().down('devices-grid');
        var store = Ext.getStore('Devices');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        if(selectedRec.get('newRec')){
            store.remove(selectedRec)
        }else{
            selectedRec.reject();
        }
        grid.getSelectionModel().deselectAll();
        this.toggleNewDeviceBtn(true);
        form.hide();
    },

    saveChanges: function() {
        var form = this.lookupReference('add-new-device');
        if (!form.isValid()) {
            return;
        }
        var store = Ext.getStore('Devices');
        var grid = this.getView().down('devices-grid');
        Ext.each(store.getModifiedRecords(), function(rec){
            if(rec.get('newRec')){
                rec.set('newRec', null);
            }
        });
        store.commitChanges();
        grid.getSelectionModel().deselectAll();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
        this.toggleNewDeviceBtn(true);
        form.hide();
    }
});
