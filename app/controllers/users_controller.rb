class UsersController < ApplicationController


  def create
    @user = User.new(user_params)

    exist_user  = User.find_by_name(@user.name)

    if exist_user
      render :json=>{:msg => 'user exists',:code=>0}.to_json
    elsif @user.save
      session[:current_user_id] = @user.id
      render :json=>{:msg => 'success',:code=>1,:id=>@user.id,:name=>@user.name}.to_json
    else
      render :json=>{:msg => 'fail'}.to_json
    end
  end

  def cookie_login
    user_id = session[:current_user_id]
    @user = user_id ? User.find(user_id):nil
    if @user
      render :json => {:msg => 'success',:id=>@user.id,:name=>@user.name}.to_json
    else
      render :json =>{:msg => 'user not found'}.to_json
    end
  end

  def logout
    session[:current_user_id] = nil
    render :json =>{:msg => 'success'}.to_json
  end

  def login
    @user = User.new(user_params)

    exist_user  = User.find_by_name(@user.name)
    if exist_user
      session[:current_user_id] = exist_user.id
      res =  exist_user.email != @user.email ? {:msg => 'password not match',:code=>1}:{:msg => 'success',:code=>0,:id=>exist_user.id,:name=>exist_user.name}
      render :json => res.to_json
    else
      render :json =>{:msg => 'user not found',:code=>2}.to_json, status=>'500'
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email)
    end
end
