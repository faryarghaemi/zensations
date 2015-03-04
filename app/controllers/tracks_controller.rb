class TracksController < ApplicationController
  before_action :check_if_logged_in

  def create
    current_track_id = params[:track][:soundcloud_id]

    @track = Track.find_by :soundcloud_id => current_track_id
    # If track does not exist in the database, create a new one
    if !@track
      @track = Track.create track_params
    end

    @current_user.tracks << @track

    respond_to do |format|
      format.json { render :json => Track.all }
    end
  end

  private
  def track_params
    params.require(:track).permit(:soundcloud_id ,:title ,:stream_url ,:artist_name ,:artwork_url ,:video_url)
  end

  def check_if_logged_in
    redirect_to(root_path) unless @current_user.present?
  end

end   
