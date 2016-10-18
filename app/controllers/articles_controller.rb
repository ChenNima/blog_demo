class ArticlesController < ApplicationController

  before_action :check_signed_in, only: [:create, :destroy]

  def index

    articles = Article.preload(:user,:comments).to_json(
        :include => [
          :comments,
          :user => {
            :only => 'name'
          }
        ]
    )

    render json: articles

  end

  def create
    begin
      @article = @user.articles.create(article_params)
    rescue => e
      render :json => e.to_json,status: 500
    end

    render :json=>{:article => {:id => @article.id}}

    # render :json=>{:article => {:id => @article.id}}
    # render :json=>{:msg => 'no such user'}.to_json,status: 400
  end

  def destroy
    @article = Article.find(params[:id])

    begin
    @article.destroy
    rescue => e
      render :json => e.to_json,status: 500
    end

    render :json=>{:msg => 'success'}.to_json
  end

  private

  def article_params
    params.require(:article).permit(:content)
  end

  def check_signed_in
    user_id = session[:current_user_id]
    @user = user_id ? User.find(user_id):nil
    unless @user
      render :json=>{:msg => 'no such user'}.to_json,status: 400
    end
  end
end
