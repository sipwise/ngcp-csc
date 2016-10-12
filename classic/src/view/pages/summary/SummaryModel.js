Ext.define('NgcpCsc.view.pages.summary.SummaryModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.summary',

    data: {
        initial_balance: 1.123,
        clients_total_count: 1,
        voicemails_total_count: 3,
        call_forward_active: true,
        reminder: true
    },

    formulas: {
        checkInitialBalance: function(get) {
            return get('initial_balance') == 0;
        },
        checkVoiceMails: function(get) {
            var count;
            count = (get('voicemails_total_count') == 0) ? Ngcp.csc.locales.common.no[Ext.manifest.locale] : get('voicemails_total_count');
            return Ext.String.format('{0} {1}', count, Ngcp.csc.locales.summary.new_voicemails[Ext.manifest.locale].toLowerCase());
        },
        checkCallFwd: function(get) {
            var active = get('call_forward_active') ? 'active' : 'inactive';
            return Ext.String.format('<span class="fa fa-rotate-left fa-3x"></span><span>{0} {1}</span>', Ngcp.csc.locales.summary.call_forwards[Ext.manifest.locale].toLowerCase(), active);
        },
        checkReminder: function() {
            return Ext.String.format('<span class="fa fa-exclamation fa-3x"></span><span>{0}</span>', Ngcp.csc.locales.calls.call_type.forwarded[Ext.manifest.locale]);
        }
    }
});
