class CreateUserTracks < ActiveRecord::Migration
  def change
    create_table :user_tracks do |t|
      t.integer :user_id
      t.integer :track_id
      t.timestamps
    end
  end
end
