Ext.define('NgcpCsc.view.pages.reminder.Reminder', {
    extend: 'Ext.panel.Panel',

    xtype: 'reminder',

    controller: 'reminder',

    viewModel: 'reminder',

    initComponent: function() {
        var vm = this.getViewModel();
        var submoduleStates = vm.get('reminder.reminder_status') ? ['', 'on', ' grey'] : [' grey', 'off', ''];

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'center',
            ui: 'reminder-tbar',
            items: [{
                xtype: 'core-container',
                margin: Ext.os.is.Desktop ? '-5 0 0 20' : '-5 0 0 0',
                width: Ext.os.is.Desktop ? 810 : '100%',
                items: [{
                    userCls: 'reminder-header',
                    html: Ngcp.csc.locales.reminder.is[localStorage.getItem('languageSelected')],
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'panel',
                    html: '<div id="toggleReminderActive" class="toggle-section" data-callback="toggleReminderActive">' +
                    '<span id="toggleTextPrefix-Reminder" class="toggle-prefix' + submoduleStates[0] + '">' + 'Active' + '</span>' + // TODO: Locales
                    '<i id="iconAllowBlock-Reminder" class="pointer toggle-icon ' + Ngcp.csc.icons.toggle[submoduleStates[1] + '2x'] + '" aria-hidden="true" data-qtip="' + Ngcp.csc.locales.callblocking.enable_or_disable[localStorage.getItem('languageSelected')] + '"></i>' + // TODO: Locales
                    '<span id="toggleTextSuffix-Reminder" class="toggle-suffix' + submoduleStates[2] + '">' + 'Inactive' + '</span>' + // TODO: Locales
                    '</div>'
                },
                // {
                //     xtype: 'segmentedbutton',
                //     margin: '0 0 20 0',
                //     defaults: {
                //         handler: 'clickActiveInactiveButton'
                //     },
                //     items: [{
                //         text: Ngcp.csc.locales.common.active[localStorage.getItem('languageSelected')],
                //         bind: {
                //             pressed: '{reminder.reminder_status}'
                //         }
                //     }, {
                //         text: Ngcp.csc.locales.common.inactive[localStorage.getItem('languageSelected')],
                //         bind: {
                //             pressed: '{!reminder.reminder_status}'
                //         }
                //     }]
                // },
                {
                    xtype: 'form',
                    layout: 'responsivecolumn',
                    defaults:{
                        listeners: {
                            change: 'saveReminder'
                        }
                    },
                    items: [{
                        flex: 1,
                        userCls: 'small-100 big-50',
                        xtype: 'timefield',
                        fieldLabel: Ngcp.csc.locales.reminder.time[localStorage.getItem('languageSelected')],
                        format: 'H:i:s',
                        minValue: '0:00:00',
                        maxValue: '23:50:00',
                        increment: 5,
                        editable: false,
                        bind: {
                            value: '{reminder.time}',
                            disabled: '{!reminder.reminder_status}'
                        }
                    }, {
                        flex: 1,
                        userCls: 'small-100 big-50',
                        xtype: 'radiogroup',
                        margin: '0 0 0 40',
                        fieldLabel: Ngcp.csc.locales.reminder.recurrence[localStorage.getItem('languageSelected')],
                        vertical: true,
                        columns: 1,
                        simpleValue: true,
                        bind: {
                            value: '{reminder.recur}',
                            disabled: '{!reminder.reminder_status}'
                        },
                        defaults: {
                            name: 'value'
                        },
                        items: [{
                            boxLabel: Ngcp.csc.locales.reminder.never[localStorage.getItem('languageSelected')],
                            inputValue: 'never'
                        }, {
                            boxLabel: Ngcp.csc.locales.reminder.weekdays[localStorage.getItem('languageSelected')],
                            inputValue: 'weekdays'
                        }, {
                            boxLabel: Ngcp.csc.locales.reminder.always[localStorage.getItem('languageSelected')],
                            inputValue: 'always'
                        }]
                    }]
                }]
            }]
        }];
        this.callParent();
    }
});
