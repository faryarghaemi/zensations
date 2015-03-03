class CreateTracksUsers < ActiveRecord::Migration
  def change
    create_table :tracks_users, :id => false do |t|
      t.integer :track_id
      t.integer :user_id
    end
  end
end
