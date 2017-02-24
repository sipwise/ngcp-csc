## Div structure with classes of rowbody
div.card-wrapper.hidden.pointer + record.get('id')
    div.card-data-row
        Date: record.get('start_time')
    div.card-data-row
        Duration: record.get('duration')
    div.card-data-row
        Cost: record.get('charges')
    div.card-icon-row
        div.card-icon
            i.fa-envelope.green-icon
        div.card-icon
            i.fa-comment.green-icon
        div.card-icon
            i.fa-phone.green-icon
div.card-footer.pointer
    Time lapsed: record.get('start_time')
