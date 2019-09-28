DB設計
-----------
## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|

### Association
- has_many :chats
- has_many :group_members
- has_many :groups through, :group_members
## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :chats
- has_many :group_members
- has_many :users through, :group_members

## group_memberテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## chatテーブル

|Column|Type|Options|
|------|----|-------|
|chat|text||
|picture|blob||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to :group
- belong_to :user
