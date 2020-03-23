class UsersController < ApplicationController

  def index 
    users = User.all 
    render json: users
  end

  def create 
    # byebug
    user = User.find_or_create_by(username: strong_params[:username])
    # this gives us our current user
    render json: user
  end

  private 

  def strong_params
    params.require(:user).permit(:username)
  end

end
