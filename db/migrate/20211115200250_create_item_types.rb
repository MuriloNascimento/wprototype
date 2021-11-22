class CreateItemTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :item_types do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
