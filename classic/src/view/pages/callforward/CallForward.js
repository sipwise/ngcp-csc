Ext.define('NgcpCsc.view.pages.callforward.CallForward', {
    extend: 'Ext.panel.Panel',

    xtype: 'callforward',
    //store: 'CallForward',
    //viewModel: 'callforward',
    controller: 'callforward',

    requires: [
        'NgcpCsc.view.pages.callforward.CallForwardTpl'
    ],

    title: Ngcp.csc.locales.callforward.title[localStorage.getItem('languageSelected')],

    defaults: {
        padding: 20
    },

    // TODO: 1. Implement form logic to create card from fields
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

    initComponent: function() {
        var callforwardTpl = Ext.create('NgcpCsc.view.pages.callforward.CallForwardTpl', {});

        this.items = [{
            xtype: 'container',
            itemCls: [
                'ngcp-col-1-1',
                'ngcp-lg-card'
            ]
        }, {
            xtype: 'callforward-form'
        }, {
            xtype: 'callforward-tpl'
        }],

        this.callParent();
    }

});
