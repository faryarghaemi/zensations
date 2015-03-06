Rails.application.routes.draw do

  root :to => 'pages#visualizer'
  
  resources :users, :only => [:create] do
    resources :tracks, :only => [:create] do
    end
  end
  
  resources :tracks, :only => [:create, :index]

  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
  
end