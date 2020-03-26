class GamesController < ApplicationController

  # before_action :remove_bad_games, only: [:show, :create, :update, :destroy]

  def index 
    games = Game.all 
    render json: games
  end

  def show 
    game = Game.find(params[:id])
    render json: game
  end

  def create 
    new_game = Game.create(new_game_params)
    # byebug
    render json: new_game
  end

  def update
    current_game = Game.find(params[:id])
    current_game.update(update_game_params)
    render json: current_game
  end

  def destroy 
    current_game = Game.find(params[:id])
    current_game.destroy()
  end

  def remove_bad_games
    # delete games that were initiated but never saved. (person didnt hit pause)
    bad_games = Game.where( time: "0:00:00" )
    bad_games.destroy()
  end

  private

  def new_game_params 
    params.require(:game).permit(:user_id, :image_id, :status, :moves, :time)
  end

  def update_game_params 
    params.require(:game).permit(:moves, :time, :status, :x1_y3, :x2_y3, :x3_y3, :x1_y2, :x2_y2, :x3_y2, :x1_y1, :x2_y1, :x3_y1) 
  end
  
end
