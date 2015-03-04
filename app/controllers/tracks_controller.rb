class TracksController < ApplicationController

  def index
    @tracks = Track.all
    respond_to do |format|
      format.json { render :json => @tracks }
    end
  end

  def new
    @track = Track.new
  end

  def create
    if @current_user
      @track = Track.create track_params
      @current_user.tracks << @track
    end

    respond_to do |format|
      format.json { render :json => Track.all }
    end
  end

  def index
    @tracks = Track.all
  end

  private
  def track_params
    params.require(:track).permit(:soundcloud_id ,:title ,:stream_url ,:artist_name ,:artwork_url ,:video_url)
  end
end   
