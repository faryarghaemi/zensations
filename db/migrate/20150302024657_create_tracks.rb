class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :soundcloud_id
      t.string :title
      t.text :stream_url
      t.string :artist_name
      t.text :artwork_url
      t.text :video_url
      t.timestamps
    end
  end
end
