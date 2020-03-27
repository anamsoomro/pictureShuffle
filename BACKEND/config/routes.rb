Rails.application.routes.draw do
  
  get "games/stats", to: "games#stats"
  get "images/stats", to: "images#stats"


  resources :users
  resources :games
  resources :images


  
end
