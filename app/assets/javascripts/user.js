$(document).on('turbolinks:load', function() {
  function found(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
    return html;
  }
  function notfound(users){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    return html;
  }

  $(".chat-group-form__input-member").on("keyup", function() {
    var input = $(".chat-group-form__input-member").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length === 0) {
        var html = notfound(users)
        $('#user-search-result').append(html);
      }

      else {
        users.forEach(function(user){
          var html = found(user);
          $('#user-search-result').append(html);
        });
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });
  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var html = $(this).parent();
    console.log(html[0])
    $(html).remove();
    var html = `
          <div class='chat-group-user'>
            <input name='group[user_ids][]' type='hidden' value='${id}'>
            <p class='chat-group-user__name'>${name}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
          </div>`

  $('.js-add-user').append(html)
  });
  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function(){
    var html = $(this).parent();
    $(html).remove();
  })
});