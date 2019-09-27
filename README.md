DB設計
-----------
## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|name|integer|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|

### Association
- has_many :groups
- has_many :chats
## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|groupname|string|null: false, foreign_key: true|

### Association
- has_many :users
- has_many :chats

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
|id|integer|null: false, foreign_key: true|
|chat|string|null: false, foreign_key: true|

### Association
- belong_to :group
- belong_to :user

## chat_userテーブル

|Column|Type|Options|
|------|----|-------|
|chat_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :chat
- belongs_to :user

## chat_groupテーブル

|Column|Type|Options|
|------|----|-------|
|chat_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :chat
- belongs_to :group

