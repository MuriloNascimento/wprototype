# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

type1 = ItemType.create({name: 'Type 1', color: '#21ed2f'})
type2 = ItemType.create({name: 'Type 2', color: '#ebc53f'})
type3 = ItemType.create({name: 'Type 3', color: '#fa2828'})
type4 = ItemType.create({name: 'Type 4', color: '#3d98d4'})

item1 = Item.create({name: 'Item 1', item_type: type1})
item2 = Item.create({name: 'Item 2', item_type: type3})
