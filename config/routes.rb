Rails.application.routes.draw do
  get 'tracks/new'

  root :to => 'pages#visualizer'
  
  resources :users, :except => [:destroy] do
    resources :tracks, :only => [:new, :create, :index] do
    end
  end
  
  resources :tracks

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end