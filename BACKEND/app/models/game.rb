class Game < ApplicationRecord
  belongs_to :user 
  belongs_to :image

  # def move_update
  #   self.moves 
  # end

  def self.orderByMoves 
    order = self.all.sort_by{|game| game.moves}
    [order[0], order[1], order[3]]
  end

  def self.orderByTime
    self.all.sort_by{|game| game.time}
    [order[0], order[1], order[3]]
  end

  def game_speed
    moves = game.moves
    time = game.time
    game_speed = moves / time 
  end

  
  




  # def self.game_speed
  #   self.all.sort_by{|game| game.}
  # end






end
