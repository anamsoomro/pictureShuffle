class ApplicationController < ActionController::Base

  # protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token
  # whenever it makes a request rails looks for a authenticity token 
  # we do not have that in our app, so lets skip it 

end

