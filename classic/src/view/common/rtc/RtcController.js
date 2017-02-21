Ext.define('NgcpCsc.view.common.rtc.RtcController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rtc',
    listen: {
        controller: {
            '*': {
                initrtc: 'showRtcPanel',
                startcall: 'startCall',
                pausecall: 'pauseCall',
                endcall: 'endCall',
                startvideocall: 'startVideoCall',
                pausevideocall: 'pauseVideoCall',
                endvideocall: 'endVideoCall'
            }
        }
    },

    // TODO
    // [DONE] 1. when calls are trigger from contacts, display the name in title
    // [DONE] 2. restore videocall icon toggle
    // >>> 3. create fields for phone, fax, sms composer
    // >>> 4. when sms or fax are triggered from conversation, pre-fill the fields
    // 5. when call, sms or fax are sent/triggered add entry in chat
    // 6. when chat is opened, display something (add fax, sms, call to chat data)
    // >>> 7. for call sidebar, create logic for toggling icons
    // >>>> 8. for call sidebar, create fullscreen mode
    // 9. for chat. create multiple submit btn (chat, sms, call)
    // 10. change how contacts look like in mobile
    // [DONE] 11. restore filters on top and fix position issue
    // 12. chat should not be a tabpanel anymore


    showRtcPanel: function(record, action, switchVideoOn) {
        var panel = this.getView();
        var vm = this.getViewModel();
        switch (action) {
            case 'startCall':
            case 'startVideoCall':
                var buddyUser = Ext.getStore('Chat').findRecord('uid', record.get('uid'));
                var number = (buddyUser) ? buddyUser.get('number') : record.get('caller') || record.get('source_cli') || record.get('mobile');
                var mainView = Ext.ComponentQuery.query('[name=mainView]')[0];
                vm.set('title', Ext.String.format('{0}', number));
                vm.set('thumbnail', (buddyUser) ? buddyUser.get('thumbnail') : this.getViewModel().get('defaultThumbnail'));
                vm.set('status', Ext.String.format('calling {0} ...', (buddyUser) ? buddyUser.get('name') : ''));
                vm.set('callEnabled', true);
                vm.set('micEnabled', true);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', false);
                vm.set('videoEnabled', switchVideoOn || false);
                mainView.getViewModel().set('sectionTitle', 'Conversation with ' + number);
                this.redirectTo('conversation-with');
                break;
            case 'phoneComposer':
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_call[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', false);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
                break;
            case 'faxComposer':
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_fax[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', false);
                vm.set('smsComposerHidden', true);
                vm.set('callPanelHidden', true);
                break;
            case 'smsComposer':
                vm.set('title', Ngcp.csc.locales.conversations.btns.new_sms[localStorage.getItem('languageSelected')]);
                vm.set('phoneComposerHidden', true);
                vm.set('faxComposerHidden', true);
                vm.set('smsComposerHidden', false);
                vm.set('callPanelHidden', true);
                break;
        }
        panel.show().expand();
    },

    toogleChat: function(btn) {
        this.fireEvent('togglechat', btn.pressed);
    },

    onBeforeClose: function() {
        this.getView().hide();
        return false;
    },
    startCall: function() {
        //TODO
    },

    pauseCall: function() {
        //TODO
    },

    endCall: function() {
        //TODO
    },

    startVideoCall: function() {
        //TODO
    },

    pauseVideoCall: function() {
        //TODO
    },

    endVideoCall: function() {
        //TODO
    },

    onPressSubmitBtn: function() {
        // TODO
    },
    onPressEnter: function() {
        // TODO
    },
    showPhoneComposer: function() {
        var vm = this.getViewModel();
        vm.set('phoneKeyboardHidden', false);
    },
    digitNumber:function(btn){
        var vm = this.getViewModel();
        var currentNum = vm.get('numberToCall');
        vm.set('numberToCall', currentNum + btn.getText())
    },
    startNewCall:function(){
        var vm = this.getViewModel();
        var currentNum = vm.get('numberToCall');
        var record = Ext.create('NgcpCsc.model.Conversation', {
            caller: currentNum
        });
        this.showRtcPanel(record,'startCall');
    }
});
