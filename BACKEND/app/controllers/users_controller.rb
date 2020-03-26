class UsersController < ApplicationController

  def index 
    users = User.all 
    render json: users
  end

  def create 
    user = User.find_or_create_by(username: strong_params[:username])
    # everytime someone logs in. we delete the games that start and dont save
    # this also might make it slower
    bad_games = Game.all.select{|game| game.time == "0:00:00"}
    render json: user
  end

  def show 
    user = User.find(params[:id])
    users_open_games = user.games.select{|game| game.status == "open"}
    render json: users_open_games
  end

  private 

  def strong_params
    params.require(:user).permit(:username)
  end

end
