# == Schema Information
#
# Table name: user_tracks
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  track_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class UserTrack < ActiveRecord::Base
  belongs_to :user
end
