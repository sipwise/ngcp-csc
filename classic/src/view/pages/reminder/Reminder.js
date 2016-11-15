Ext.define('NgcpCsc.view.pages.reminder.Reminder', {
    extend: 'Ext.panel.Panel',

    xtype: 'reminder',

    viewModel: 'reminder',

    title: Ngcp.csc.locales.reminder.title[localStorage.getItem('languageSelected')],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            flex: 2,
            defaults: {
                padding: 20
            },
            items: [{
                height: 60,
                padding: '20 0 5 20',
                html: Ngcp.csc.locales.reminder.subtitle[localStorage.getItem('languageSelected')].toUpperCase()
            }, {
                height: 60,
                padding: '5 0 0 20',
                html: Ext.String.format('<div class="voicemails-heading">{0} {1}</div>', Ngcp.csc.locales.reminder.settings[localStorage.getItem('languageSelected')], localStorage.getItem('username'))
            }, {
                height: 30,
                padding: '5 0 5 20',
                html: Ngcp.csc.locales.common.when[localStorage.getItem('languageSelected')].toUpperCase()
            }, {
                xtype: 'timefield',
                fieldLabel: Ngcp.csc.locales.reminder.time[localStorage.getItem('languageSelected')],
                format: 'H:i',
                minValue: '0:00',
                maxValue: '23:50',
                increment: 10,
                width: 200,
                bind: {
                    value: '{timer}',
                    disabled: '{!reminder_status}'
                }
            }, {
                xtype: 'radiogroup',
                fieldLabel: Ngcp.csc.locales.reminder.recurrence[localStorage.getItem('languageSelected')],
                vertical: true,
                columns: 1,
                bind: {
                    value: '{recurrence}',
                    disabled: '{!reminder_status}'
                },
                defaults: {
                    name: 'value'
                },
                items: [{
                    boxLabel: Ngcp.csc.locales.reminder.never[localStorage.getItem('languageSelected')],
                    inputValue: 'value'
                }, {
                    boxLabel: Ngcp.csc.locales.reminder.weekdays[localStorage.getItem('languageSelected')],
                    inputValue: 'weekdays'
                }, {
                    boxLabel: Ngcp.csc.locales.reminder.always[localStorage.getItem('languageSelected')],
                    inputValue: 'always'
                }]
            }, {
                xtype: 'segmentedbutton',
                width: 350,
                items: [{
                    text: Ngcp.csc.locales.common.active[localStorage.getItem('languageSelected')],
                    margin: '0 5 0 0',
                    bind: {
                        pressed: '{reminder_status}'
                    }
                }, {
                    text: Ngcp.csc.locales.common.inactive[localStorage.getItem('languageSelected')],
                    bind: {
                        pressed: '{!reminder_status}'
                    }
                }]
            }]
        }];
        this.callParent();
    }
});
