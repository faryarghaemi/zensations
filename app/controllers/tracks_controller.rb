class TracksController < ApplicationController
  def new
    @track = Track.new
  end

  def create
    @track = Track.new track_params
    if @track.save
      redirect_to root_path
    else
      render :new
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
