class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  if Rails.env == 'development'
    skip_before_action :verify_authenticity_token
  end

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    exist_user  = User.find_by_name(@user.name)

    if exist_user
      render :json=>{:msg => 'user exists'}.to_json, status=>'500'
    elsif @user.save
      render :json=>{:msg => 'success',:id=>@user.id}.to_json, status=>'200'
    else
      render :json=>{:msg => 'fail'}.to_json, status=>'500'
    end
  end

  def login
    @user = User.new(user_params)

    exist_user  = User.find_by_name(@user.name)
    if exist_user
      old_id = session[:current_user_id]
      old_cookies_id = cookies[:user_id]
      session[:current_user_id] = exist_user.id
      cookies[:user_id] = {:value => exist_user.id,:expires => 2.weeks.from_now.utc}
      res =  exist_user.email != @user.email ? {:msg => 'password not match'}:{:msg => 'success',:id=>exist_user.id}
      render :json => res.to_json
    else
      render :json =>{:msg => 'user not found'}.to_json, status=>'500'
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email)
    end
end
