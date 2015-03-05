class UsersController < ApplicationController

  def new
    @user = User.new
  end

  # def create 
  #   @user = User.new user_params
  #   if @user.save
  #     session[:user_id] = @user.id
  #     redirect_to root_path
  #   else
  #     render :new
  #   end 
  # end 

  def create
    # binding.pry
    @user = User.new user_params
    # binding.pry
    if @user.save
      session[:user_id] = @user.id
      # format.html { redirect_to root_path }
      render json: { status: "OK" }
    else
      # format.html { render action: "new" }
      # binding.pry

      # respond_with @user.errors
      render json: @user.errors.messages
      # render :json => @user.errors
    end
  end


  def index
    @users = User.all
  end

  def edit 
    @user = User.find params[:id]
    
    unless @user == @current_user
      redirect_to root_path
    end
  end

  def show
    @user = User.find params[:id]
  end

  def update
    @user = User.find params[:id]
    @user.update user_params
    redirect_to @user
  end

  def signup_login
    session[:destination] ||= request.env["HTTP_REFERER"]
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end