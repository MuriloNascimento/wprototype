module Api
	class BillTypesController < ActionController::API
		def index
			resources = BillType.select('id', 'name', 'color').all.order(:name).as_json
			render json: resources.to_json, status: :ok
		end

		def create
			bill_type = BillType.new(bill_type_params)
			if bill_type.save
				render json: {status: 'SUCCESS', message:'Create bill type', data:bill_type}, status: :ok
			else
				render json: {status: 'ERROR', message:'Bill type not crate', data:bill_type.errors},status: :unprocessable_entity
			end
		end

		def update
			bill_type = BillType.find(params[:id])
			if bill_type.update bill_type_params
				render json: {status: 'SUCCESS', message:'Saved bill type', data:bill_type}, status: :ok
			else
				render json: {status: 'ERROR', message:'Bill type not saved', data:bill_type.errors},status: :unprocessable_entity
			end
		end

		def destroy
			bill_type = BillType.find(params[:id])
			if bill_type.destroy
				render json: {status: 'SUCCESS', message:'Destroy bill type', data:bill_type}, status: :ok
			else
				render json: {status: 'ERROR', message:'Bill type not delete', data:bill_type.errors},status: :unprocessable_entity
			end
		end

	  private
	  def bill_type_params
		params.permit(:name, :color)
	  end
	end
end