get '/' do
  @user = User.find(1)
  session[:score] =
  erb :layout
end

post '/' do
  @user = User.find(1)
  @user.update_attribute(:score, params[:score])
  redirect '/'
end
