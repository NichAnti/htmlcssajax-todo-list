function deleteAll() {
  $("main").empty();
}

function createNote(id, content) {

  var data = {
    id: id,
    content: content
  }

  var template= $("#note-template").html();
  var compiled = Handlebars.compile(template);
  var note = compiled(data);

  $("main").append(note);
}

function readFromServer() {

  $.ajax({
    url:"http://157.230.17.132:3001/todos",
    method: "GET",
    data: {},
    success: function(inData) {

      deleteAll();

      for (var i = 0; i < inData.length; i++) {

        var id = inData[i].id;
        var content = inData[i].value;

        createNote(id, content);
      }
    },
    error: function() {},
  })
}

function createNewNote() {

  var content = $("textarea").val();

  var outData = {

    value: content
  }

  $.ajax({
    url:"http://157.230.17.132:3001/todos",
    method: "POST",
    data: outData,
    success: function() {

      readFromServer();
      $("textarea").val("");
    },
    error: function() {}
  })
}

function deleteAllFromServer() {

  var notes = $(".note");
  var notesNum = notes.length;

  for (var i = 0; i < notesNum; i++) {

    var id = $(".note").eq(i).find(".id").text();

    $.ajax({
      url:"http://157.230.17.132:3001/todos/" + id,
      method: "DELETE",
      data: {},
      success: function() {},
      error: function() {},
    });
  }

  readFromServer();
}

function editMessage(id) {

  var content = $("textarea").val();

  var outData = {

    value: content
  }


  $.ajax({
    url:"http://157.230.17.132:3001/todos/" + id,
    method: "PUT",
    data: outData,
    success: function() {

      readFromServer();
      $("textarea").val("");
    },
    error: function() {},
  });
}

function deleteMessage(id) {

  $.ajax({
    url:"http://157.230.17.132:3001/todos/" + id,
    method: "DELETE",
    data: {},
    success: function() {

      readFromServer();
    },
    error: function() {},
  });
}


function init() {
  readFromServer();
  $(".delete-all").click(deleteAllFromServer);
  $(".plus").click(createNewNote);
  $(document).on("click", ".edit", function() {
    var id = $(this).siblings(".id").text();

    editMessage(id);
  });
  $(document).on("click", ".delete", function() {
    var id = $(this).siblings(".id").text();

    deleteMessage(id);
  });
}

$(init);
