Ext.define('NgcpCsc.view.pages.account.AccountModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.account',

    formulas: {
        checkInitialBalance: function(get) {
            return get('account.initial_balance') == 0;
        },
        checkVoiceMails: function(get) {
            var count;
            count = (get('account.voicemails_total_count') == 0) ? Ngcp.csc.locales.common.no[localStorage.getItem('languageSelected')] : get('account.voicemails_total_count');
            return Ext.String.format('{0} {1}', count, Ngcp.csc.locales.account.new_voicemails[localStorage.getItem('languageSelected')].toLowerCase());
        },
        checkCallFwd: function(get) {
            var active = get('account.call_forward_active') ? 'active' : 'inactive';
            return Ext.String.format('<span class="fa fa-rotate-left fa-3x"></span><span>{0} {1}</span>', Ngcp.csc.locales.account.call_forwards[localStorage.getItem('languageSelected')].toLowerCase(), active);
        },
        checkReminder: function() {
            return Ext.String.format('<span class="fa fa-exclamation fa-3x"></span><span>{0}</span>', Ngcp.csc.locales.conversations.forwarded[localStorage.getItem('languageSelected')]);
        }
    }
});
