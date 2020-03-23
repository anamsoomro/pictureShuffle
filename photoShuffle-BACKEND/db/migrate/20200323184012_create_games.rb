class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t| 
      t.integer :user_id
      t.integer :image_id

      t.integer :moves
      t.datetime :time

      t.string :status 
      t.string :x1_y1
      t.string :x2_y1
      t.string :x3_y1
      t.string :x1_y2
      t.string :x2_y2
      t.string :x3_y2
      t.string :x1_y3
      t.string :x2_y3
      t.string :x3_y3

    # const arrangement = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "blank"]

    end
  end
end
