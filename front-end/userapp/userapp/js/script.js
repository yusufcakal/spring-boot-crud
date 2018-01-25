$(document).ready(function(){

    $("#update").hide();

    assignDataToTable();

    $('table').on('click', 'button[id="delete"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       
       $.ajax({
            type:"DELETE",
            url:"http://localhost:8080/api/users/" + id,
            success: function(data){
                alertUsing("Silindi.", true);
                assignDataToTable();
            },
            error: function(err) {  
                console.log(err);
                alert(err);
            }
        });

    })

    $('table').on('click', 'button[id="edit"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       var name = $(this).closest('tr').children('td:nth-child(2)').text(); 
       var age = $(this).closest('tr').children('td:nth-child(3)').text(); 
       var book = $(this).closest('tr').children('td:nth-child(4)').text(); 

        $("#name").val(name);
        $("#age").val(age);
        $("#book").val(book);

        $("#update").show();
        $("#save").hide();

        $("#update").click(function() {

            var ageNum = parseInt($("#age").val());

            var jsonVar = {
                name: $("#name").val(),
                age: ageNum,
                book: $("#book").val()
            };

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"http://localhost:8080/api/users/" + id,
                success: function(data){
                    alertUsing("Düzenlendi.", true);
                    $("#update").hide();
                    $("#save").show();
                    $("#name").val("");
                    $("#age").val("");
                    $("#book").val("");
                    assignDataToTable();
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });

    });

    })

    var age = $("#age");

    age.keypress(function(key){
        if(key.charCode > 48 && key.charCode < 57){
            if(age.val().length < 3){
                return true;
            }else{
                alertUsing("3 Haneyi Aştınız.", false);
                return false;
            }
        }else{
            alertUsing("Sayı Giriniz.", false);
            return false;
        }
    });

    $("#save").click(function() {

        var jsonVar = {
            name: $("#name").val(),
            age: $("#age").val(),
            book: $("#book").val()
        };

        $.ajax({
            type:"POST",
            url:"http://localhost:8080/api/users",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });

    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:8080/api/users",
          success: function(data) {
            var users = JSON.parse(JSON.stringify(data));
            for (var i in users) {
                $("tbody").
                append("<tr> \
                            <td>" +  users[i].id + "</td> \
                            <td>" +  users[i].name + "</td> \
                            <td>" +  users[i].age + "</td> \
                            <td>" +  users[i].book + "</td> \
                            <td> \ <button id='delete' class='btn btn-danger'>Sil</button> \
                           <button id='edit' class='btn btn-warning'>Düzenle</button> \ </td> \
                        </tr>");
            }
          },
          error: function(data) { 
            console.log(data);
            }
        });
       
    }

function alertUsing(text, flag) {

    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }

});