class UserTracksController < ApplicationController

  def new
    
  end

  def create
    
  end

  def index
    @user = User.find params[:user_id]
    @tracks = Tracks.all
  end
end
