get '/' do
  @user = User.find(1)
  erb :layout
end

post '/' do
  p params
  @user = User.find(1)
  @user.update(score: params[:score], name: params[:name])
  redirect '/'
end
