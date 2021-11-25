module Api
	class ItemsController < ActionController::API
		def index
			resources = Item.select('id', 'name', 'item_type_id').all.as_json
			render json: resources.to_json, status: :ok
		end

		def create
			item = Item.new(item_params)
			if item.save
				render json: {status: 'SUCCESS', message:'Create item', data:item}, status: :ok
			else
				render json: {status: 'ERROR', message:'item not crate', data:item.errors},status: :unprocessable_entity
			end
		end

		def update
			item = Item.find(params[:id])
			if item.update item_params
				render json: {status: 'SUCCESS', message:'Saved item', data:item}, status: :ok
			else
				render json: {status: 'ERROR', message:'item not saved', data:item.errors},status: :unprocessable_entity
			end
		end

		def destroy
			item = Item.find(params[:id])
			if item.destroy
				render json: {status: 'SUCCESS', message:'Destroy item', data:item}, status: :ok
			else
				render json: {status: 'ERROR', message:'item not delete', data:item.errors},status: :unprocessable_entity
			end
		end

		private
		def item_params
			params.permit(:id, :name, :item_type_id)
		end
	end
end