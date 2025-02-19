function OfficeQuestionBankXBlockAdmin(runtime, element) {
    var handlerUrl = runtime.handlerUrl(element, 'save_question_bank');

    if ($('#xb_field_edit_is_scorable').val() == '1'){
        $(element).find('.scorable').show();
    }else{
        $(element).find('.scorable').hide();
    }

    $('#xb_field_edit_is_scorable').change(function() {
        if($(this).val() == '1') {
            $(element).find('.scorable').show();
        }
        else {
            $(element).find('.scorable').hide();
        }
    });

    $(element).find('.save-button').bind('click', function () {
        var form_data = new FormData();
        var display_name = $(element).find('input[name=xb_display_name]').val();
        var is_scorable = $(element).find('#xb_field_edit_is_scorable').val();
        var weight = $(element).find('input[name=xb_weight]').val();
        var points = $(element).find('input[name=xb_points]').val();
        var state_definitions = $(element).find('#xb_state_definitions').val();

        form_data.append('display_name', display_name);
        form_data.append('is_scorable', is_scorable);
        form_data.append('weight', weight);
        form_data.append('points', points);
        form_data.append('state_definitions', state_definitions);

        if ('notify' in runtime) { //xblock workbench runtime does not have `notify` method
            runtime.notify('save', { state: 'start' });
        }        

        $.ajax({
            url: handlerUrl,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: "POST",
            success: function (response) {
                if ('notify' in runtime) { //xblock workbench runtime does not have `notify` method
                    runtime.notify('save', { state: 'end' });
                }
            }
        });

    });

    $(element).find('.cancel-button').bind('click', function () {
        if ('notify' in runtime) { //xblock workbench runtime does not have `notify` method
            runtime.notify('cancel', {});
        }
    });

    // const getQuestionBankUrl = runtime.handlerUrl(element, "get_question_bank");
    // const saveQuestionBankUrl = runtime.handlerUrl(element, "save_question_bank");

    // $.post(getQuestionBankUrl, JSON.stringify({get: true}))
    // .then(
    //     function(response) {
    //         // Success callback
    //         console.log('Data received:', response);
    //         $("#question-bank-json").val(JSON.stringify(response.questions, null, 4));
    //     },
    //     function(error) {
    //         // Error callback
    //         console.error('Error occurred:', error);
    //     }
    // );

    // $("#save-question-bank").click(() => {
    //     const questions = JSON.parse($("#question-bank-json").val());
    //     $.post(saveQuestionBankUrl, JSON.stringify({ questions }))
    //     .then(
    //         function(response) {
    //             // Success callback
    //             console.log('Data received:', response);
    //             $("#admin-feedback").text(response.message);
    //         },
    //         function(error) {
    //             // Error callback
    //             console.error('Error occurred:', error);
    //         }
    //     );
    // });
}