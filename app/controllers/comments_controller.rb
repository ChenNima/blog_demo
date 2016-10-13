class CommentsController < ApplicationController

  if Rails.env == 'development'
    skip_before_action :verify_authenticity_token
  end

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    render :json => {:msg=>'success',:article_id => @article.id,:id => @comment.id}
  end

  private
  def comment_params
    params.require(:comment).permit(:commenter, :content)
  end
end
