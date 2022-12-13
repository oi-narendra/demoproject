class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show edit update destroy ]

  skip_before_action :verify_authenticity_token, only: [:destroy]

  # GET /comments or /comments.json
  def index
    @comments = Comment.all
  end

  # GET /comments/1 or /comments/1.json
  def show
  end

  # GET /comments/new
  def new
    @comment = Comment.new
    @post = Post.find(params[:post_id])
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments or /comments.json
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user_id = 1
    respond_to do |format|
      if @comment.save
        format.turbo_stream {render turbo_stream: [
          turbo_stream.prepend("comments_index_frame", partial: "comments/comment", locals: { comment: @comment }),
          turbo_stream.replace("new_comment", partial: "comments/form", locals: { comment: Comment.new, post: @post })] }
        format.json { render :show, status: :created, location: @comment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /comments/1 or /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
         format.turbo_stream { render turbo_stream: turbo_stream.replace(@comment, partial: "comments/comment", locals: { comment: @comment }) }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1 or /comments/1.json
  def destroy
    @comment.destroy
    @comment.reply.destroy if @comment.reply.present?

    respond_to do |format|
      format.html { redirect_to comments_url, notice: "Comment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:description, :post_id)
    end
end
