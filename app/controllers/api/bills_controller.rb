module Api
	class BillsController < ActionController::API
		def index
			resources = Bill.select('id', 'name', 'bill_type_id').all.as_json
			render json: resources.to_json, status: :ok
		end

		def create
			bill = Bill.new(bill_params)
			if bill.save
				render json: {status: 'SUCCESS', message:'Create bill', data:bill}, status: :ok
			else
				render json: {status: 'ERROR', message:'bill not crate', data:bill.errors},status: :unprocessable_entity
			end
		end

		def update
			bill = Bill.find(params[:id])
			if bill.update bill_params
				render json: {status: 'SUCCESS', message:'Saved bill', data:bill}, status: :ok
			else
				render json: {status: 'ERROR', message:'bill not saved', data:bill.errors},status: :unprocessable_entity
			end
		end

		def destroy
			bill = Bill.find(params[:id])
			if bill.destroy
				render json: {status: 'SUCCESS', message:'Destroy bill', data:bill}, status: :ok
			else
				render json: {status: 'ERROR', message:'bill not delete', data:bill.errors},status: :unprocessable_entity
			end
		end

		private
		def bill_params
			params.require(:bill).permit(:id, :name, :bill_type_id)
		end
	end
end