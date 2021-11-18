# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#Resource.create({name: 'Home', path: '/', position: 1})
#Resource.create({name: 'Bill Types', path: '/bill_types', position: 2})

suprimentos = BillType.create({name: 'Suprimento', color: '#21ed2f'})
transporte = BillType.create({name: 'Transporte', color: '#ebc53f'})
moradia = BillType.create({name: 'Moradia', color: '#fa2828'})
banco = BillType.create({name: 'Banco', color: '#3d98d4'})

aluguel = Bill.create({name: 'Aluguel', bill_type: moradia})
cartao = Bill.create({name: 'Cartão', bill_type: banco})

#BillEvent.create({bill: cartao, target_date: DateTime.now+1.day, value: 350})
#BillEvent.create({bill: cartao, target_date: DateTime.now+30.days, value: 350})
#BillEvent.create({bill: aluguel, target_date: DateTime.now+1.day, value: 800})
#BillEvent.create({bill: aluguel, target_date: DateTime.now+30.days, value: 800})