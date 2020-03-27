class Game < ApplicationRecord
  belongs_to :user 
  belongs_to :image

  # def move_update
  #   self.moves 
  # end

  def self.top_games 
    order = self.all.sort_by{|game| game.moves}
    [order[0], order[1], order[3]]
  end

  

  
  











end
