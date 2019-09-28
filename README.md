DB設計
-----------
## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|
|email|string|null: false|

### Association
- has_many :chats
- has_many :group_members
- has_many :groups throhgh :group_members
## groupテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, foreign_key: true|

### Association
- has_many :chats
- has_many :group_members
- has_many :users throhgh :group_members

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
|chat|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to :group
- belong_to :user
