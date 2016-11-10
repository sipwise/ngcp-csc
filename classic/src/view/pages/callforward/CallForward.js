Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',

    viewModel: 'callforward',

    controller: 'callforward',

    referenceHolder: true,

    requires: [
        'NgcpCsc.view.pages.callforward.CallForwardTpl'
    ],

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    // TODO: 2. Create separate view with clickable cards - greyed out if they
    // are inactive (min one rule in the call forward group means it's active).
    // TODO: a. For now just create store inline dummy hardcoded data, which in
    // a for-loop defines what cards are greyed out, and which are white and
    // clickable
    // TODO: b. Css based "grey out"/"link", research onclick / :after
    // TODO: 3. Either
    //    a. Implement dropdown and choosing "other" appends a second form set
    // or b. Focus on stylin (4.), and present to Andreas for suggestions first
    // TODO: 4. Add ngcp-lg-card style to field container
    // TODO: 5. After card is clicked, and form filled, create logic to update
    // current record instead of creating a new

    initComponent: function() {
        var callforwardTpl = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTpl', {});

        this.items = [{
            height: 60,
            padding: '20 0 5 20',
            html: Ngcp.csc.locales.callforward.subtitle[localStorage.getItem('languageSelected')]
        }, {
            height: 60,
            padding: '5 0 0 20',
            html: Ext.String.format('<div class="callbarring-heading">{0} {1}</div>', Ngcp.csc.locales.callforward.user_label[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
        }, {
            xtype: 'callforward-form'
        }, {
            xtype: 'callforward-tpl'
        }],

        this.callParent();
    }

});
