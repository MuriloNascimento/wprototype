class ItemType < ApplicationRecord
    validates :name, presence: true

    TABLE_COLUMNS = [
        { name: 'id', label: '', field: 'id', sortable: true, align: 'left'},
        { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left'},
        { name: 'color', label: 'Color', field: 'color', sortable: true, align: 'left', type: 'color'}
    ].to_json
end
