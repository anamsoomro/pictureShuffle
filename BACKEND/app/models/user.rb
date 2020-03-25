class User < ApplicationRecord
  has_many :games 
  has_many :images, through: :games

  def move_count
    
    
    # self.games.each{|game| total + game.moves}
  
  end


end
