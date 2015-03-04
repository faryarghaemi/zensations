# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password_digest :string
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  has_secure_password
  has_and_belongs_to_many :tracks, -> { uniq }
  validates :name, :presence => true
  validates :email, :presence => true, :uniqueness => true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
end
