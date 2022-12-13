json.extract! reply, :id, :description, :comment_id, :user_id, :created_at, :updated_at
json.url reply_url(reply, format: :json)
