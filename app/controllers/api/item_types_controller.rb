module Api
	class ItemTypesController < ActionController::API
		def index
			resources = ItemType.select('id', 'name', 'color').all.as_json
			render json: resources.to_json, status: :ok
		end

		def create
			item_type = ItemType.new(item_type_params)
			if item_type.save
				render json: {status: 'SUCCESS', message:'Create item type', data:item_type}, status: :ok
			else
				render json: {status: 'ERROR', message:'Item type not crate', data:item_type.errors}, status: :unprocessable_entity
			end
		end

		def update
			item_type = ItemType.find(params[:id])
			if item_type.update item_type_params
				render json: {status: 'SUCCESS', message:'Saved item type', data:item_type}, status: :ok
			else
				render json: {status: 'ERROR', message:'Item type not saved', data:item_type.errors}, status: :unprocessable_entity
			end
		end

		def destroy
			item_type = ItemType.find(params[:id])
			if item_type.destroy
				render json: {status: 'SUCCESS', message:'Destroy item type', data:item_type}, status: :ok
			else
				render json: {status: 'ERROR', message:'Item type not delete', data:item_type.errors}, status: :unprocessable_entity
			end
		end

		private
		def item_type_params
			params.require(:item_type).permit(:id, :name, :color)
		end
	end
end