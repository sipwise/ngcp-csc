Ext.define('NgcpCsc.view.pages.pbxconfig.groups.GroupsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.groups',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
    },

    toggleRowBodyHidden: function (record, classList, view) {
        console.log('t1');
        switch (classList.contains('hidden')) {
            case (true):
                console.log('t2');
                record.set('expanded', true);
                classList.remove('hidden');
                view.grid.updateLayout();
                break;
            case (false):
                console.log('t3');
                record.set('expanded', false);
                classList.add('hidden');
                view.grid.updateLayout();
                break;
        };
    },

    expandPbxCard: function(view, td, cellindex, record, tr) {
        // TODO: No matter what I've tried.. callback, defer, etc... On first
        // .. render it does not work. On reload it does.
        var me = this;
        var row;
        var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
        var id = record.get('id');
        if (cellindex.target && cellindex.target.classList.contains('green-icon')) {
            return;
        };
        function defineRowCallback(id, callback) {
            row = document.getElementById(id);
            callback();
        };
        defineRowCallback(id, function () {
            var classList = row.classList;
            me.toggleRowBodyHidden(record, classList, view);
        });
        // var row = document.getElementById(id);


        // if (cellindex == 4) {
        //     switch (record.get('conversation_type')) {
        //         case 'call':
        //         case 'fax':
        //         case 'sms':
        //         case 'chat':
        //             this.openCallPanel();
        //         break;
        //     };
        // } else {
        // var record = record.isModel ? record : view.getRecord(Ext.get(td).up(view.itemSelector));
        // var id = record.get('id');
        // var row = document.getElementById(id);
        // Ext.defer(function () {
        //     me.toggleRowBodyHidden(record, row.classList, view);
        // }, 200);
        // if (row.classList.contains('hidden')) {
        //     record.set('expanded', true);
        //     row.classList.remove('hidden');
        // } else {
        //     record.set('expanded', false);
        //     row.classList.add('hidden');
        // };
        // // };
        // Ext.defer(function () {
        //     view.grid.updateLayout();
        // }, 100);
    },

    addGroup: function() {
        var grid = this.getView().down('groups-grid');
        var form = this.lookupReference('add-new-group');
        var store = Ext.getStore('Groups');
        var newRec = store.insert(0,{
            id: Ext.id(),
            expanded: true,
            newRec:true
        })[0];
        grid.getPlugin('rowexpander').toggleRow(0, newRec);
        grid.getSelectionModel().select(newRec);
        this.toggleNewGroupBtn(false);
        form.show();
        form.down('[name=groupName]').focus();
    },

    editGroup: function(id) {
        var form = this.lookupReference('add-new-group');
        var grid = this.getView().down('groups-grid');
        var store = Ext.getStore('Groups');
        var selectedRow = store.findRecord('id', id);
        grid.getSelectionModel().select(selectedRow);
        this.toggleNewGroupBtn(false);
        form.show();
        form.down('[name=groupName]').focus();
    },

    toggleNewGroupBtn: function(enabled) {
        var btn = this.lookupReference('addNewBtn');
        btn.setDisabled(!enabled);
    },

    removeGroup: function(id) {
        var form = this.lookupReference('add-new-group');
        var store = Ext.getStore('Groups');
        var selectedRow = store.findRecord('id', id);
        store.remove(selectedRow);
        this.toggleNewGroupBtn(true);
        form.hide();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.remove_success[localStorage.getItem('languageSelected')]);
    },

    resetChanges:function(){
        var form = this.lookupReference('add-new-group');
        var grid = this.getView().down('groups-grid');
        var store = Ext.getStore('Groups');
        var selectedRec = grid.getSelectionModel().getSelection()[0];
        if(selectedRec.get('newRec')){
            store.remove(selectedRec)
        }else{
            selectedRec.reject();
        }
        grid.getSelectionModel().deselectAll();
        this.toggleNewGroupBtn(true);
        form.hide();
    },

    saveChanges:function(){
        var form = this.lookupReference('add-new-group');
        if (!form.isValid()) {
            return;
        }
        var store = Ext.getStore('Groups');
        var grid = this.getView().down('groups-grid');
        Ext.each(store.getModifiedRecords(), function(rec){
            if(rec.get('newRec')){
                rec.set('newRec', null);
            }
        });
        store.commitChanges();
        grid.getSelectionModel().deselectAll();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
        this.toggleNewGroupBtn(true);
        form.hide();
    }

});
