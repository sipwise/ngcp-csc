Ext.define('NgcpCsc.model.Device', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'device',
        type: 'string'
    }, {
        name: 'mac',
        type: 'string'
    }, {
        name: 'image',
        type: 'string'
    }, {
        name: 'image',
        type: 'string'
    }, {
        name: 'image',
        type: 'string'
    }, {
        name: 'seats',
        type: 'auto'
    }, {
        name: 'imageWithButtons',
        depends: ['image'],
        persist: false,
        convert: function(v, rec) {
            var retVal = "<div><img width=500 height=500 src='" + rec.get('image') + "'></div>";
            var shiftPosition = false;
            Ext.each(rec.get('seats'), function(seat) {
                var buttonCls = seat.name ? 'assigned-button' : 'free-button';
                var buttonInfoCls = seat.name ? 'button-info-assigned' : 'button-info-unassigned';
                var lineHorizontalCls = seat.name ? 'connection-left-right-assigned' : 'connection-left-right-unassigned';
                var lineVerticalCls = seat.name ? 'connection-top-bottom-assigned' : 'connection-top-bottom-unassigned';
                var btnPos = "top:" + seat.position.top + ";left:" + seat.position.left;
                var store = Ext.getStore('Seats');
                var seatNameToFullName = seat.name ? store.findRecord('id', seat.name).get('name') : '';
                var rectPos,
                    top = seat.position.top,
                    left = seat.position.left,
                    lineWidth = shiftPosition ? "35%" : "20%",
                    lineHeight = shiftPosition ? "18%" : "10%",
                    lineTop = top,
                    lineLeft = seat.position.left,
                    lineCls = seat.position.anchor == 'left' || seat.position.anchor == 'right' ? lineHorizontalCls : lineVerticalCls,
                    orderClsPrefix = (!seat.name || !seat.type) ? 'un' : ''
                switch (seat.position.anchor) {
                    case "left":
                        lineHeight = "1%";
                        left = (parseInt(seat.position.left.split('%')[0]) + (shiftPosition ? 30 : 10)).toString() + "%";
                        top = (parseInt(seat.position.top.split('%')[0]) - 1).toString() + "%";
                        break;
                    case "right":
                        left = (parseInt(seat.position.left.split('%')[0]) - (shiftPosition ? 35 : 20)).toString() + "%";
                        top = (parseInt(seat.position.top.split('%')[0]) - 1).toString() + "%";
                        lineLeft = left;
                        lineHeight = "1%";
                        break;
                    case "top":
                        lineLeft = (parseInt(seat.position.left.split('%')[0]) + 1).toString() + "%";
                        top = (parseInt(seat.position.top.split('%')[0]) + (shiftPosition ? 14 : 7)).toString() + "%";
                        break;
                    case "bottom":
                        lineLeft = (parseInt(seat.position.left.split('%')[0]) + 1).toString() + "%";
                        top = (parseInt(seat.position.top.split('%')[0]) - (shiftPosition ? 14 : 7)).toString() + "%";
                        break;
                }

                retVal += '<div><span data-qtip="' + Ngcp.csc.locales.pbxconfig.devices.tooltip.click[localStorage.getItem('languageSelected')] + '" data-onseathovered="seatHovered" data-onseatclick="editSeat" class="' + buttonInfoCls + ' pointer card-icon" style="top:' +
                    top + ';left:' + left + ';" id="seat-info' +
                    rec.get('id') + "-" + seat.order + '">' +
                    '<span class="button-info-order-' + orderClsPrefix + 'assigned">' + seat.order + '</span>' + (seatNameToFullName || '') + '</span><span class="' +
                    lineCls + '" style="height:' + lineHeight + ';width:' +
                    lineWidth + ';top:' + lineTop + ';left:' +
                    lineLeft + ';"></span><span id="seat-"' +
                    rec.get('id') + "-" + seat.order + '" class="' +
                    buttonCls + '" style="' +
                    btnPos + '"></span></div>';
                shiftPosition = !shiftPosition;
            });
            return retVal;
        }
    }]
});
