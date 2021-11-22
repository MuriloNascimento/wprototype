class Item < ApplicationRecord
    belongs_to :item_type

    validates :name, presence: true

    TABLE_COLUMNS = [
        { name: 'id', label: '', field: 'id', sortable: true, align: 'left'},
        { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left'},
        { name: 'item_type_id', label: 'Item Type', field: 'item_type_id', sortable: true, align: 'left'}
    ].to_json

    FIELDS = [
        { name: 'name', label: 'Name', value: '', type: 'text'},
        { name: 'item_type_id', label: 'Item Type', value: '', type: 'text'}
    ].to_json
end
