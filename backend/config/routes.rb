Rails.application.routes.draw do
  resources :tasks do
    collection do
      put :reorder
    end
  end
end
