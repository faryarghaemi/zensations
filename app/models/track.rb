# == Schema Information
#
# Table name: tracks
#
#  id            :integer          not null, primary key
#  soundcloud_id :integer
#  title         :string
#  stream_url    :text
#  artist_name   :string
#  artwork_url   :text
#  video_url     :text
#  created_at    :datetime
#  updated_at    :datetime
#

class Track < ActiveRecord::Base
  has_many :user_tracks
end
