Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :welcome, only: [:index]

  namespace :api, defaults: { format: :json } do
    # resources :resources, only: [:index]
    resources :bill_types, only: [:index, :create, :update, :destroy]
  end

  root :to => "welcome#index"
end