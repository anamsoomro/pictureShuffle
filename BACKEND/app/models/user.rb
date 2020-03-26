class User < ApplicationRecord
  has_many :games 
  has_many :images, through: :games

  # def self.top_user
  #   arr = User.all.sort_by{|user| user.avg_game_speed}
  
  # end

  #  def self.played_games
  #   Game.all.select{|game| game.self}
  # end

  # def game_speed
  #   Game.all.select{|game| game.
  # end

  # def avg_game_speed
  #   self.games
  # end

  def self.top3Users
     return the top 3 users with the lowest avg speeds
    order = User.all.sort_by do |user| 
      user.avgSpeed
    end
    [ order[0], order[1], order[3] ]
  end

  # def avgSpeed 
  #   look at all their closed games and return their avg speed
  #   closed_games = self.games.select{|game| game.status == "closed"}
  #   total = 0
  #   closed_games.each do |game| 
  #     total = total + game.game_speed
  #   end
  #   if closed_games.empty?
  #     avg = 0
  #   else 
  #     avg = total / closed_games.count
  #   end
  # end


  
  #  array of all the games a user has played 
  # iterate through array get game_speed of each game 
  # average all those game_speeds
  # => users average game_speed


end
