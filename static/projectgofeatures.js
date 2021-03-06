$(document).ready(function() {

    bootdatepickers(); //external file datepickerLoad.js

    $("#stime").timepicker({ 'scrollDefaultNow': true });
    $("#etime").timepicker({ 'scrollDefaultNow': true });
});

$("#stime").change(function(){
    var thetime = $("#stime").timepicker('getTime');
    var hours = thetime.getHours();
    var etime = $("#etime").timepicker('getTime');
    const HR_MILI = 3600000;

    if(etime == null || etime.getTime() < thetime.getTime() + HR_MILI)
    {
        $("#etime").timepicker('setTime', new Date(thetime.setHours(thetime.getHours() + 1)));
    }
});

$("#name").focusout(function(){
    var nm = $("#name").val();

    if(nm.length > 20 || nm.length == 0 )
    {
        $.bootstrapGrowl("Name must be between 1 and 20 characters in length!", {
            type: 'info',
            align: 'center',
            width: 'auto',
            allow_dismiss: true,
            offset: {from: 'top', amount: 200}
        });
        $('#name2').css('background-color', '');
        $('#name2').css('background-color', 'red');
    }
    else
    {
        $('#name2').css('background-color', '');
    }
});

$("#description").focusout(function() {

    var desc = $("#description").val().length;
    if(desc > 200)
    {
        $.bootstrapGrowl("Description must be less than 20 characters in length! (You're currently at" + desc.toString(), {
            type: 'info',
            align: 'center',
            width: 'auto',
            allow_dismiss: true,
            offset: {from: 'top', amount: 200}
        });

        $('#description2').css('background-color', '');
        $('#description2').css('background-color', 'red');
    }
    else
    {
        $('#description2').css('background-color', '');
    }
});

$("#pri").focusout(function() {

    if(!$.isNumeric($("#pri").val()))
    {
        $.bootstrapGrowl("Priority must be a number!", {
            type: 'info',
            align: 'center',
            width: 'auto',
            allow_dismiss: true,
            offset: {from: 'top', amount: 200}
        });

        $('#pri2').css('background-color', '');
        $('#pri2').css('background-color', 'red');
    }
    else
    {
        $('#pri2').css('background-color', '');
    }
});

$("#cat").focusout(function() {

    if(!$.isNumeric($("#cat").val()))
    {
        $.bootstrapGrowl("Category must be a number!", {
            type: 'info',
            align: 'center',
            width: 'auto',
            allow_dismiss: true,
            offset: {from: 'top', amount: 200}
        });

        $('#cat2').css('background-color', '');
        $('#cat2').css('background-color', 'red');
    }
    else
    {
        $('#cat2').css('background-color', '');
    }
});

$('#clear').click(function() { 
    $("#name").val("");
    $("#description").val("");
    $("#datepickerstart").val("");
    $("#datepickerend").val("");
    $('#stime').val("");
    $('#etime').val("");
    $("#pri").val("");
    $("#stat").val("");
    $("#cat").val("");
})


$('#submit1').click(function() { 
    
    //basic client side validation
    var nm = $("#name").val();
    var desc = $("#description").val();
    var stardate = $("#datepickerstart").datepicker('getDate');
    var enddate = $("#datepickerend").datepicker('getDate');
    var startime = $('#stime').timepicker('getTime');
    var endtime =$('#etime').timepicker('getTime');
    var pri = $("#pri").val();
    var stat = $("#stat").val();
    var cat = $("#cat").val();
    var errMsg = "";
    var cont = true;

    if(nm.length > 20 || nm.length == 0 )
    {
        cont = false;
        $('#name2').css('background-color', 'red');
    }
    if(desc.length > 200)
    {
        cont = false;
        $('#description2').css('background-color', 'red');
    }
    if(!$.isNumeric(pri))
    {
        cont = false;
        $('#pri2').css('background-color', 'red');
    }
	//New errorcheck for dropdown status bar
    if(stat > 4 && stat < 0)
    {
		cont = false;
        $('#stat2').css('background-color', 'red');
    }
    if(!$.isNumeric(cat))
    {
        cont = false;
        $('#cat2').css('background-color', 'red');
    }

    //Check if dates are same day and the time is legal (no due date before date start)
    if (stardate == null && enddate == null)
    {
        $('#datepickerstart2').css('background-color', 'red');
        $('#datepickerend2').css('background-color', 'red');
        cont = false;

        $.bootstrapGrowl("You must set an end date or a range of days for your obligation to take place!", {
            type: 'info',
            align: 'center',
            width: 'auto',
            allow_dismiss: true,
            offset: {from: 'top', amount: 200}
        });
    }

    if(startime != null && endtime == null)
    {
        $('#stime2').css('background-color', 'red');
        $('#etime2').css('background-color', 'red');
        cont= false;

        $.bootstrapGrowl("You need an end time or if you only want an end time, please remove the start time.", {
            type: 'info',
            align: 'center',
            width: 'auto',
            allow_dismiss: true,
            offset: {from: 'top', amount: 200}
        });
    }

    else if(startime != null && endtime != null)
    {
        if(stardate.getTime() == enddate.getTime() && startime.getTime() > endtime.getTime())
        {
            $('#stime2').css('background-color', 'red');
            $('#etime2').css('background-color', 'red');
            cont= false;

            $.bootstrapGrowl("Your end time is after your start time! Fix this by adjusting your times.", {
                type: 'info',
                align: 'center',
                width: 'auto',
                allow_dismiss: true,
                offset: {from: 'top', amount: 200}
            });
        }
    }

    if(cont)
    {
        //Convert dates into properly formatted types
        starttim2 = convertDateTimes(stardate, startime); //external file datePickerLoad.js
        endtime2 = convertDateTimes(enddate, endtime);     //external file datePickerLoad.js

        $.post('/obligations', {
                userid:"1",
                name: nm,
                description: desc,
                starttime: starttim2,
                endtime: endtime2,
                priority: pri,
                status: stat,
                category: cat
            })
            .done(function (data) {
                  setTimeout(function() {
                    $.bootstrapGrowl("Data successfully received!", { 
                        type: 'success',
                        allow_dismiss: true,
                        align: 'center',
                        width: 'auto',
                        offset: {from: 'top', amount: 200}
                    });
                });
            })
            .fail(function (data) {
                $.bootstrapGrowl("Failed to send in Obligation information! Please retry.", {
                type: 'info',
                align: 'center',
                width: 'auto',
                offset: {from: 'top', amount: 200},
                allow_dismiss: true,
                delay: 5000,
              });
        });
    }
    else
    {
        $.bootstrapGrowl("Please fix the selections labeled in red before trying to submit your obligation", {
        type: 'info',
        align: 'center',
        width: 'auto',
        offset: {from: 'top', amount: 200},
        allow_dismiss: true,
        delay: 5000,
      });
    }
})

//used in conjuction with a delete button with class=delete1 and value=obligation_id
$('.delete1').on('click', function() { 
    var path = "/obligations/" + this.value;
    $.ajax({
        url: path,
        type: 'DELETE',
        success: function() {
            alert('Obligation has successfully been Deleted.');
        },
        error: function(){
            alert('error! could not delete ' + this.value);
        }
    });
})
