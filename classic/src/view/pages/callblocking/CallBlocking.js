Ext.define('NgcpCsc.view.pages.callblocking.CallBlocking', {
    extend: 'Ext.panel.Panel',

    xtype: 'callblocking',

    viewModel: 'callblocking',

    controller: 'callblocking',

    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.toggle-section'
        },
        afterrender: 'afterCBRendered'
    },

    initComponent: function() {
        var instructionText = window.location.hash === '#callblocking/incoming' ? Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')] + ' ' + Ngcp.csc.locales.callblocking.new_entry_anonymous[localStorage.getItem('languageSelected')] : Ngcp.csc.locales.callblocking.new_entry_instructions[localStorage.getItem('languageSelected')];
        var vm = this.getViewModel();
        var submoduleStates = vm.get(this._vmPrefix + 'block_mode') === 'on' ? ['', 'on', ' grey'] : [' grey', 'off', ''];
        var submoduleName = this._vmPrefix.slice(0, -1);

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'callblocking-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    userCls: 'callblocking-header',
                    html: Ngcp.csc.locales.callblocking.submodules[submoduleName].header[localStorage.getItem('languageSelected')],
                    margin: '0 0 10 0'
                }, {
                    xtype: 'panel',
                    html: '<div id="toggleBlockCalls-' + submoduleName + '" class="toggle-section" data-callback="toggleBlockCalls">' +
                    '<span id="toggleTextPrefix-' + submoduleName + '" class="toggle-prefix' + submoduleStates[0] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].prefix[localStorage.getItem('languageSelected')] + '</span>' +
                    '<i id="iconAllowBlock-' + submoduleName + '" class="pointer toggle-icon ' + Ngcp.csc.icons.toggle[submoduleStates[1] + '2x'] + '" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' +
                    '<span id="toggleTextSuffix-' + submoduleName + '" class="toggle-suffix' + submoduleStates[2] + '">' + Ngcp.csc.locales.callblocking.submodules[submoduleName].suffix[localStorage.getItem('languageSelected')] + '</span>' +
                    '</div>'
                }, {
                    userCls: 'callblocking-header',
                    html: Ngcp.csc.locales.callblocking.add_number[localStorage.getItem('languageSelected')],
                    margin: '20 0 10 0',
                    hidden: !this._displayIncomingOutgoingSection
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    hidden: !this._displayIncomingOutgoingSection,
                    margin: '0 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        width: 300,
                        bind: '{new_number}',
                        height: 35,
                        listeners: {
                            specialkey: 'onEnterPressed'
                        }
                    }, {
                        xtype: 'button',
                        height: 35,
                        margin: '0 0 0 10',
                        text: Ngcp.csc.locales.common.save_caps[localStorage.getItem('languageSelected')],
                        handler: 'addNewNumber'
                    }]
                }, {
                    xtype: 'container',
                    html: instructionText,
                    hidden: !this._displayIncomingOutgoingSection
                }]
            }]
        }];

        this.callParent();
    }
});
