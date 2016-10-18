class ArticlesController < ApplicationController

  if Rails.env == 'development'
    skip_before_action :verify_authenticity_token
  end

  def index

    articles = Article.preload(:user,:comments).to_json(
        :include => [
          :comments,
          :user => {
            :only => 'name'
          }
        ]
    )
    # render json: JSON.parse(articles).reverse().to_json
    render json: articles

  end

  def create

    user_id = session[:current_user_id]
    @user = user_id ? User.find(user_id):nil
    unless @user
      render :json=>{:msg => 'no such user'}.to_json,status: 400
      return
    end
    @article = @user.articles.create(article_params)
    render :json=>{:article => {:id => @article.id}}
    # render :json=>{:msg => 'no such user'}.to_json,status: 400
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    render :json=>{:msg => 'success'}.to_json
  end

  def article_params
    params.require(:article).permit(:content)
  end
end
