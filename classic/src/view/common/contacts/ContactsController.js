Ext.define('NgcpCsc.view.common.contacts.ContactsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contacts',

    listen: {
        controller: {
            '*': {
                initcontacts: 'showContactsPanel'
            }
        }
    },

    // TODO: Not firing
    showContactsPanel: function() {
        console.log('btn clicked');
        var panel = this.getView();
        // if(!newCall){
        //     var vm = this.getViewModel();
        //     var buddyUser = Ext.getStore('Chat').findRecord('uid', record.get('uid'));
        //     var number = (buddyUser) ? buddyUser.get('number') : record.get('caller') || record.get('source_cli') || record.get('mobile');
        //     this.getViewModel().set('title', Ext.String.format('{0}', number));
        //     vm.set('thumbnail', (buddyUser) ? buddyUser.get('thumbnail') : this.getViewModel().get('defaultThumbnail'));
        //     vm.set('status', Ext.String.format('calling {0} ...', (buddyUser) ? buddyUser.get('name') : ''));
        //     vm.set('callEnabled', true);
        //     vm.set('micEnabled', true);
        //     vm.set('videoEnabled', switchVideoOn || false);
        // }
        panel.show().expand();
    }

});
