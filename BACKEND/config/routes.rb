Rails.application.routes.draw do
  get '/games/stats', to: 'games#stats'
  resources :users
  resources :games
  resources :images

  
end
