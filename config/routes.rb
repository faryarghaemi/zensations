Rails.application.routes.draw do
  root :to => 'pages#home'
  
  resources :users, :except => [:destroy] do
    resources :tracks, :only => [:new, :create, :index] do
    end
  end
  
  resources :tracks, :only => [:index]

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end