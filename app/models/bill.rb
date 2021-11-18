class Bill < ApplicationRecord
    belongs_to :bill_type

    validates :name, presence: true

    TABLE_COLUMNS = [
        { name: 'id', label: '', field: 'id', sortable: true, align: 'left'},
        { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left'},
        { name: 'bill_type_id', label: 'Bill Type', field: 'bill_type_id', sortable: true, align: 'left'}
    ].to_json

    FIELDS = [
        { name: 'name', label: 'Name', value: '', type: 'text'},
        { name: 'bill_type_id', label: 'Bill Type', value: '', type: 'text'}
    ].to_json
end
