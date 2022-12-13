class RepliesController < ApplicationController
  before_action :set_reply, only: %i[ show edit update]
   skip_before_action :verify_authenticity_token, only: [:destroy]

  # GET /replies or /replies.json
  def index
    @replies = Reply.all
  end

  # GET /replies/1 or /replies/1.json
  def show
  end

  # GET /replies/new
  def new
    @reply = Reply.new
    @comment = Comment.find(params[:comment_id])
    @post = @comment.post
  end

  # GET /replies/1/edit
  def edit
  end

  # POST /replies or /replies.json
  def create
    @reply = Reply.new(reply_params)
    @comment = Comment.find(params[:comment_id])
    @reply.comment = @comment
    @reply.user_id = 1
    respond_to do |format|
      if @reply.save
        format.turbo_stream { render turbo_stream: turbo_stream.replace(@comment, partial: "comments/comment", locals: { comment: @comment, post: @comment.post }) }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @reply.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /replies/1 or /replies/1.json
  def update
    respond_to do |format|
      if @reply.update(reply_params)
         format.turbo_stream { render turbo_stream: turbo_stream.replace(@reply, partial: "replies/reply", locals: { reply: @reply }) }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reply.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /replies/1 or /replies/1.json
  def destroy
    @comment = Comment.find(params[:comment_id])
    @reply = @comment.reply
    @reply.destroy
    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.replace(@comment, partial: "comments/comment", locals: { comment: @comment, post: @comment.post }) }
      format.html { redirect_to replies_url, notice: "Reply was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reply
      @reply = Reply.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def reply_params
      params.require(:reply).permit(:description)
    end
end
