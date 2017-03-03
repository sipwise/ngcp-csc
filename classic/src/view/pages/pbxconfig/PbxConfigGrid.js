Ext.define('NgcpCsc.view.pages.PbxConfigGrid', {
    extend: 'NgcpCsc.view.core.GridCards',
    cls: 'card-grid',
    header: false,
    rowLines: false,
    listeners: {
        click: {
            fn: 'onIconClicked',
            element: 'el',
            delegate: 'div.card-icon'
        },
        cellclick: 'expandPbxCard',
        rowbodyclick: 'expandPbxCard'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: false,
        enableTextSelection: true
    },
    columns: {
        defaults: {
            menuDisabled: true,
            resizable: false
        },
        items: [{
            flex: 1,
            dataIndex: 'name'
        }]
    },
    userCls: Ext.os.is.Desktop ? 'big-820' : 'small-100',

    // TODO: 0. Cvenusino: Problem with textfields not being editable in "Seats"
    // cards. They are defined in the rowbody 'content', and are visible and
    // clickable, but can not input text. Fyi "edit seats" button toggles text
    // and field visibility for now. Tried uncommenting listeners and
    // enableTextSelection. No difference. To do with rowbody default behavior.
    // If so, can it be changed?

    // TODO: 1. Map this out in a flow chart (or other way), to clearly define
    // how to handle the id-to-row relationship for tasks below
    // TODO: 2. Change addSeat() to only toggle in same row id
    // TODO: 3. Add onclick listeners for toggling only specific fields
    // TODO: 4. Add onchange listeners to all fields, and autosave in controller
    // TODO: 5. Refactor controller functions in the end, once all grunt work
    // is done

    initComponent: function() {
        var me = this;

        me.features = [{
            ftype: 'rowbody',
            getAdditionalData: function(data, idx, record) {
                var content;
                switch (window.location.hash) {
                    case '#pbxconfig/seats':
                    var content = '<div class="card-wrapper hidden pointer" id="seatsCard-' + record.get('id') + '">' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')] + '</b>: <span class="pbx-data-value">' + record.get('extension') + '</span><span class="pbx-data-field"><input type="text" id="seatsExtensionInput-' + record.get('id') + '" /></span></div>' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.groups[localStorage.getItem('languageSelected')] + '</b>: <span class="pbx-data-value">' + record.get('groups') + '</span><span class="pbx-data-field"><input type="text" id="seatsGroupsInput-' + record.get('id') + '" /></span></div>' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.numbers[localStorage.getItem('languageSelected')] + '</b>: <span class="pbx-data-value">' + record.get('numbers') + '</span><span class="pbx-data-field"><input type="text" id="seatsNumbersInput-' + record.get('id') + '" /></span></div>' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.phone_devices[localStorage.getItem('languageSelected')] + '</b>: <span class="pbx-data-value">' + record.get('phone_devices') + '</span><span class="pbx-data-field"><input type="text" id="seatsPhoneDevicesInput-' + record.get('id') + '" /></span></div>' +
                        '<div class="card-icon-row">' +
                        '<div id="editSeat-' + record.get('id') + '" class="card-icon" data-callback="editSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                        '<div id="removeSeat-' + record.get('id') + '" class="card-icon" data-callback="removeSeat" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_seat[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                        '</div></div>';
                        break;
                    case '#pbxconfig/groups':
                    var content = '<div class="card-wrapper hidden pointer" id="groupsCard-' + record.get('id') + '">' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.extension[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('extension') + '</div>' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.hunt_policy[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('hunt_policy') + '</div>' +
                        '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.hunt_timeout[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('hunt_timeout') + '</div>' +
                        '<div class="card-icon-row">' +
                        '<div id="editGroup-' + record.get('id') + '" class="card-icon" data-callback="editGroup" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_group[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                        '<div id="removeGroup-' + record.get('id') + '" class="card-icon" data-callback="removeGroup" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_group[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                        '</div></div>';
                        break;
                    case '#pbxconfig/devices':
                        content = '<div class="card-wrapper hidden pointer" id="devicesCard-' + record.get('id') + '">' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.pbxconfig.device_profile[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('device') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.mac[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('mac') + '</div>' +
                            '<div class="card-data-row"><span></span><b>' + Ngcp.csc.locales.filters.status[localStorage.getItem('languageSelected')] + '</b>: ' + record.get('status') + '</div>' +
                            '<div class="img-row"><img src="' + record.get('image') + '"></div>' +
                            '<div class="card-icon-row">' +
                            '<div id="editGroup-' + record.get('id') + '" class="card-icon" data-callback="editDevice" data-qtip="' + Ngcp.csc.locales.filters.tooltips.edit_device[localStorage.getItem('languageSelected')] + '"><i class="fa fa-edit green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '<div id="removeDevice-' + record.get('id') + '" class="card-icon" data-callback="removeDevice" data-qtip="' + Ngcp.csc.locales.filters.tooltips.remove_device[localStorage.getItem('languageSelected')] + '"><i class="fa fa-trash green-icon fa-2x pointer" aria-hidden="true"></i></div>' +
                            '</div></div>';
                        break;
                };
                return {
                    rowBody: content
                };
            }
        }];
        this.callParent();
    }
})
