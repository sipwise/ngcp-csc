Ext.define('NgcpCsc.view.pages.pbxconfig.groups.GroupsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.groups',

    onIconClicked: function(event, el) {
        // eval is never the best option
        Ext.Function.defer(eval('this.' + el.dataset.callback), 1, this, [el.id]);
    },

    addGroup: function() {
        var grid = this.getView().down('groups-grid');
        var form = this.lookupReference('add-new-group');
        var store = Ext.getStore('Groups');
        var newRec = store.insert(0,{
            id: Ext.id(),
            expanded: true
        })[0];
        grid.getPlugin('rowexpander').toggleRow(0, newRec);
        grid.getSelectionModel().select(newRec);
        this.toggleNewGroupBtn(false);
        form.down('[name=groupName]').focus();
        form.show();
    },

    editGroup: function(id) {
        var form = this.lookupReference('add-new-group');
        var grid = this.getView().down('groups-grid');
        var store = Ext.getStore('Groups');
        var selectedRow = store.findRecord('id', id);
        grid.getSelectionModel().select(selectedRow);
        this.toggleNewGroupBtn(false);
        form.down('[name=groupName]').focus();
        form.show();
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
        store.rejectChanges();
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
        store.commitChanges();
        grid.getSelectionModel().deselectAll();
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
        this.toggleNewGroupBtn(true);
        form.hide();
    }

});
