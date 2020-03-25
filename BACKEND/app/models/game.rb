class Game < ApplicationRecord
  belongs_to :user 
  belongs_to :image

  # def move_update
  #   self.moves 
  # end

  def self.orderByMoves 
    self.all.sort_by{|game| game.moves}
  end

  def self.orderByTime
    self.all.sort_by{|game| game.time}
  end

  def game_speed
    moves = game.moves
    time = game.time
    game_speed = moves / time 
    puts game_speed
  end

  def self.game_speed
    # self.all.sort_by{|game| game.}
  end
  





end
