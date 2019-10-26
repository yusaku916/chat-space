$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="chat" data-id="${message.id}">
                <div class="chat__upper-chat">
                  <p class="chat__upper-chat__user">
                    ${message.user_name}
                  </p>
                  <p class="chat__upper-chat__date">
                    ${message.date}
                  </p>
                </div>
                  <p class="chat__message">
                  ${content}
                  </div>
                  ${img}
                  </p>
                </div>`
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__right__chats').append(html);
      $('form')[0].reset();
      var target = $('.chat').last();
      var position = target.offset().top + $('.main__right__chats').scrollTop();
      $('.main__right__chats').animate({
        scrollTop: position
      }, 300, 'swing');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できません')
    })
    .always(function(data){
      $('.send').prop('disabled', false);
    })
  })
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var reloadMessages = function() {
      last_message_id = $('.chat:last').data("id")
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.main__right__chats').append(insertHTML);
        })
        var target = $('.chat').last();
        $('.main__right__chats').animate({scrollTop: $(".main__right__chats")[0].scrollHeight}, "fast");
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  setInterval(reloadMessages, 5000);
  };
});
