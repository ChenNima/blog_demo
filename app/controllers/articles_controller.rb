class ArticlesController < ApplicationController

  if Rails.env == 'development'
    skip_before_action :verify_authenticity_token
  end

  def index
    articles = Article.find_by_sql("SELECT name,content,articles.created_at,articles.id FROM articles
  INNER JOIN users ON articles.user_id = users.id")
  #   new_articles = []
  #   articles.each do |article|
  #     new_articles.push({:id => article.id,:content=>article.content,:comments=>article.comments,:name=>article.name,:created_at=>article.created_at})
  #   end

    # remder json: Article.joins(:comments).pluck(:comments).to_json

    # render json: Article.preload(:comments).to_json(include: :comments)
    render json: articles.to_json(include: :comments)
    # json_array = []
    # Article.preload(:comments).map do |article|
    #   json_array.push({:id => article.id,:content=>article.content,:comments=>article.comments,:created_at=>article.created_at})
    # end
    # render json: json_array.to_json


  #   articles = Article.joins(:comments)
  #   render :json => Article.preload(:comments).to_json

  end

  def create

    user_id = session[:current_user_id]
    @user = user_id ? User.find(user_id):nil
    unless @user
      render :json=>{:msg => 'no such user'}.to_json
      return
    end
    @article = @user.articles.create(article_params)
    render :json=>{:msg => 'success',:article_id => @article.id}.to_json
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
