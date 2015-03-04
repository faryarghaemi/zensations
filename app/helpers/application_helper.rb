module ApplicationHelper
  def nav_menu_right

    if @current_user.present?
      links = "<li>#{ link_to('Sign Out ' + @current_user.name, login_path, :method => :delete) }</li>"
    else
      links = "<li>#{ link_to('Sign Up', new_user_path) }</li><li>#{ link_to('Log In', login_path) }</li>"
    end

    links
  end 
end