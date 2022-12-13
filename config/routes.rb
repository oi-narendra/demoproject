Rails.application.routes.draw do
  resources :users
  resources :posts do 
    resources :comments do 
      resource :reply
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
