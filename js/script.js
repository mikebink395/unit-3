
$("fieldset").first().children()[2].focus()
//Focuses on the first textbox

$('#name').keyup(()=>{
    if($('#name')[0].value==''){
        $('#nameVal').show()
        console.log('SHPW')
    }else{
        $('#nameVal').hide()
    }
})//validates whether or not the name field is blank

$('#mail').keyup(()=>{
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#mail')[0].value)){
        $('#mailVal').hide()
        console.log('SHPW')
    }else if($('#mail')[0].value==''){
        $('#mailVal').show()
        document.getElementById('mailVal').innerHTML="<font color='red'>Please make sure Email is not blank</font>"
    }else{
        console.log('HERE')
        $('#mailVal').show()
        document.getElementById('mailVal').innerHTML="<font color='red'>Please make sure Email is formatted correctly</font>"
    }
})//dynamically validates whether the email field is blank, not formatted correctly, or formatted correctly

$("#other-title").hide()
$("fieldset").first().children().filter("select").change(()=>{
    if($("fieldset").first().children().filter("select")[0].value=='other'){
        $("#other-title").show()
    }else{
        $("#other-title").hide()
    }
})//shows or hides the additional 'other' fild if 'other' is selected as the job role

$("fieldset.shirt").children().last().children().last().prepend(new Option("Please select a T-shirt theme", 'default', true, true,))
    //Adds temporary instructions to pick a color in the color select
$('#colors-js-puns').hide()
$("#design").change(()=>{//This function displays either the pun or heart colors when the given theme is selected
    if($("#design")[0].value=="js puns"){
        $('#colors-js-puns').show()
        $("#color").children().each((index, value)=>{
            if(index<4 && index>0){
                $(value).show()
            }else{
                $(value).hide()
            }
        })
    }else if($("#design")[0].value=="heart js"){
        $('#colors-js-puns').show()
        $("#color").children().each((index, value)=>{
            if(index>=4){
                $(value).show()
            }else{
                $(value).hide()
            }
        })
    }else{
        $("#color").children().each((index, value)=>{
            $(value).hide()
        })
        $('#colors-js-puns').hide()
    }
})

$('fieldset.activities').children().last().append($('<label>').attr({id: 'price'}).text('Price: 0'))
    //The price label is added beneath the different activities



$('[type=checkbox]').change(()=>{// the following occur when a checkbox is clicked or unclicked
    if($('[type=checkbox]:checked').length==0){
        $('#activityVal').show()
    }else{
        $('#activityVal').hide()
    }
    $('[type=checkbox]').each((index, value)=>{
        $(value).attr("disabled", false)
        $(value).parent().css("text-decoration", "")
    })
    let $selected=$('[type=checkbox]:checked')
    let conflicts=[]
    let p=0
    $selected.each((index, value)=>{
        $('[type=checkbox]').each((index2, value2)=>{
            if($(value).attr("data-day-and-time")==$(value2).attr("data-day-and-time")){
                if(value!==value2){
                    conflicts.push(value2)
                }
            }
        })
        p+=parseInt($(value).attr('data-cost').replace('$',''))
    })
    for(x of conflicts){
        $(x).attr("disabled", true)
        $(x).parent().css("text-decoration", "line-through")
    }
    $('#price').text('Price: '+p.toString())//Updates the price 
})

$('#payment').children().first().attr('disabled', true)//Makes the credit card the default payment type
$($('#payment').children()[1]).attr('selected', true)
$('#paypal').hide()
$('#bitcoin').hide()
console.log($('#payment'))

$('#payment').change(()=>{//Changes the payment based on which payment type is selected
    console.log($('[type=checkbox]:checked').length)
    if($('#payment')[0].value=='Credit Card'){
        $('#credit-card').show()
        $('#paypal').hide()
        $('#bitcoin').hide()
    }else if($('#payment')[0].value=='PayPal'){
        $('#credit-card').hide()
        $('#paypal').show()
        $('#bitcoin').hide()
    } else if($('#payment')[0].value=='Bitcoin'){
        $('#credit-card').hide()
        $('#paypal').hide()
        $('#bitcoin').show()
    }
})

$('#cvv').keyup(()=>{//Creates the validation message for the CVV
    if(/^\d{3}$/.test($('#cvv')[0].value)){
        $('#cvvVal').hide()
    }else{
        $('#cvvVal').show()
    }
})

$('#zip').keyup(()=>{//Creates the validation message for the ZIP
    if(/^\d{5}$/.test($('#zip')[0].value)){
        $('#zipVal').hide()
    }else{
        $('#zipVal').show()
    }
})

$('#cc-num').keyup(()=>{//Creates the validation message for the Credit Cart 
    if(/^\d{13,16}$/.test($('#cc-num')[0].value)){
        $('#cc-numVal').hide()
    }else{
        $('#cc-numVal').show()
    }
})





$('button[type=submit]').click((event)=>{//Checks each of the necessary validations and 
    //changes the validations based on whetehr or not the credit card is selected
    //If validations are not met, the form will not submit
    if($('#payment')[0].value=='Credit Card'){
        if($('[type=checkbox]:checked').length!==0 && /^\d{13,16}$/.test($('#cc-num')[0].value) && /^\d{5}$/.test($('#zip')[0].value) && /^\d{3}$/.test($('#cvv')[0].value) && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#mail')[0].value) && !$('#name')[0].value==''){
            
        }else{
            event.preventDefault()
            console.log($('[type=checkbox]:checked').length!==0, /^\d{13,16}$/.test($('#cc-num')[0].value),/^\d{5}$/.test($('#zip')[0].value),/^\d{3}$/.test($('#cvv')[0].value),/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#mail')[0].value),!$('#name')[0].value=='')
        }
    }else{
        if($('[type=checkbox]:checked').length!==0 && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#mail')[0].value) && !$('#name')[0].value==''){
            
        }else{
            event.preventDefault()
            console.log($('[type=checkbox]:checked').length!==0, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#mail')[0].value), !$('#name')[0].value=='')
            console.log('NOT CREDIT BAD')
        }
    }
})


