class BillType < ApplicationRecord
    validates :name, presence: true

    TABLE_COLUMNS = [
        { name: 'id', label: '', field: 'id', sortable: true, align: 'left'},
        { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left'},
        { name: 'color', label: 'Color', field: 'color', sortable: true, align: 'left', type: 'color'}
    ].to_json

    FIELDS = [
        { name: 'name', label: 'Name', value: '', type: 'text'},
        { name: 'color', label: 'Color', value: '', type: 'color'}
    ].to_json

    DEFAULT_VALUES = {id: nil, name: '', color: '', icon: ''}.to_json
end
