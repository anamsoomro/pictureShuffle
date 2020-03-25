# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_23_184037) do

  create_table "games", force: :cascade do |t|
    t.integer "user_id"
    t.integer "image_id"
    t.integer "moves"
    t.string "time"
    t.string "status"
    t.string "x1_y1"
    t.string "x2_y1"
    t.string "x3_y1"
    t.string "x1_y2"
    t.string "x2_y2"
    t.string "x3_y2"
    t.string "x1_y3"
    t.string "x2_y3"
    t.string "x3_y3"
  end

  create_table "images", force: :cascade do |t|
    t.string "image_url"
    t.string "name"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
  end

end
