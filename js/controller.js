// Controllers for MITutor

function set_modulelist_MITutor(){
    //console.log(bar_mitutor_mod_1);
    //console.log(bar_mitutor_mod_2);
    //console.log(bar_mitutor_mod_3);
    //console.log(module_list_MITutor);
    //console.log(module_index_MITutor);
    //console.log(module_count_MITutor);
    // Reset list of modules, buttons, titles, and progress bar
    reset_modulelist_MITutor();
    // Get list of unique modules and display in dropdown using standard index of 0
    for(var i = 0; i < problem_list.length; i++){
        if(module_list_MITutor.includes(problem_list[i].module)){
            // module already included in list of unique module names - skip it
        }else{
            module_list_MITutor.push(problem_list[i].module);
        }
    }
    module_count_MITutor = Array(module_list_MITutor.length).fill(0);
    // Get count of problems by unique module names
    for (var j = 0; j < module_count_MITutor.length; j++){
        for(var i = 0; i < problem_list.length; i++){
            if(problem_list[i].module == module_list_MITutor[j]){
                // Increment value
                module_count_MITutor[j] += 1;
            }else{
                // Value is different - skip it
            }
        }
    }
    module_completioncount_MITutor = Array(module_list_MITutor.length).fill(0);
    // Get count of problems completed by the user - TODO update confi file user id based on AUTH authentication display name
    for (var j = 0; j < module_completioncount_MITutor.length; j++){
        for(var i = 0; i < log_list.length; i++){
            if(log_list[i].module == module_list_MITutor[j] && log_list[i].student == config.user_id && log_list[i].attempt == 0){
                // Increment value
                module_completioncount_MITutor[j] += 1;
            }else{
                // Value is different - skip it
            }
        }
    }
    // Return the list of unique module names, count of problems, and count of completed problems
    //console.log(module_list_MITutor);
    //console.log(module_count_MITutor);
    //console.log(module_completioncount_MITutor);
    // Display module names in dropdown menu
    set_text_modulelist(module_list_MITutor[module_index_MITutor], module_list_MITutor[module_index_MITutor+1], module_list_MITutor[module_index_MITutor+2]);
    // Display value now in progress bar
    set_valuenow_bars(module_completioncount_MITutor[module_index_MITutor], module_completioncount_MITutor[module_index_MITutor+1], module_completioncount_MITutor[module_index_MITutor+2]);
    // Set max value in progress bar
    set_valuemax_bars(module_count_MITutor[module_index_MITutor], module_count_MITutor[module_index_MITutor+1], module_count_MITutor[module_index_MITutor+2]);
    // Set width of progress indicator in bar
    set_width_bars();
    btn_mitutor_showmore.disabled = false;
}

function set_text_modulelist(text_1, text_2, text_3){
    problem_module_1.textContent = text_1;
    problem_module_2.textContent = text_2;
    problem_module_3.textContent = text_3;
}

function set_valuenow_bars(value_1, value_2, value_3){
    bar_mitutor_mod_1.setAttribute('aria-valuenow',value_1);
    bar_mitutor_mod_2.setAttribute('aria-valuenow',value_2);
    bar_mitutor_mod_3.setAttribute('aria-valuenow',value_3);
}

function set_valuemax_bars(value_1, value_2, value_3){
    bar_mitutor_mod_1.setAttribute('aria-valuemax',value_1);
    bar_mitutor_mod_2.setAttribute('aria-valuemax',value_2);
    bar_mitutor_mod_3.setAttribute('aria-valuemax',value_3);
}

function set_width_bars(){
    var value_1 = bar_mitutor_mod_1.getAttribute('aria-valuenow',value_1) / bar_mitutor_mod_1.getAttribute('aria-valuemax',value_1) * 100;
    var value_2 = bar_mitutor_mod_2.getAttribute('aria-valuenow',value_2) / bar_mitutor_mod_2.getAttribute('aria-valuemax',value_2) * 100;
    var value_3 = bar_mitutor_mod_3.getAttribute('aria-valuenow',value_3) / bar_mitutor_mod_3.getAttribute('aria-valuemax',value_3) * 100;
    bar_mitutor_mod_1.style.width = value_1.toString() + "%";
    bar_mitutor_mod_2.style.width = value_2.toString() + "%";
    bar_mitutor_mod_3.style.width = value_3.toString() + "%";
}

function reset_modulelist_MITutor(){
    module_index_MITutor = 0;
    module_list_MITutor = [];
    btn_mitutor_showmore.disabled = true;
    problem_module_1.textContent = "";
    problem_module_2.textContent = "";
    problem_module_3.textContent = "";
    bar_mitutor_mod_1.setAttribute('aria-valuenow',0);
    bar_mitutor_mod_1.style.width = "0%";
    bar_mitutor_mod_2.setAttribute('aria-valuenow',0);
    bar_mitutor_mod_2.style.width = "0%";
    bar_mitutor_mod_3.setAttribute('aria-valuenow',0);
    bar_mitutor_mod_3.style.width = "0%";
}

function update_modulelist_MITutor(){
    console.log(problem_module_1);
    console.log(problem_module_2);
    console.log(problem_module_3);
    console.log(module_list_MITutor);
    console.log(module_index_MITutor);
    // Update index of modules by incrementing the value by 1 (Disable button if reaches maximum value)
    module_index_MITutor += 1;
    if(module_list_MITutor.length < (module_index_MITutor + 3)){
        set_modulelist_MITutor();
    }else{
        // Update progress bar indicators for student completion rate
        // Display module names in dropdown menu
        set_text_modulelist(module_list_MITutor[module_index_MITutor], module_list_MITutor[module_index_MITutor+1], module_list_MITutor[module_index_MITutor+2]);
        // Display value now in progress bar
        set_valuenow_bars(module_completioncount_MITutor[module_index_MITutor], module_completioncount_MITutor[module_index_MITutor+1], module_completioncount_MITutor[module_index_MITutor+2]);
        // Set max value in progress bar
        set_valuemax_bars(module_count_MITutor[module_index_MITutor], module_count_MITutor[module_index_MITutor+1], module_count_MITutor[module_index_MITutor+2]);
        // Set width of progress indicator in bar
        set_width_bars();
    } 
}

async function set_log_values(){
    await evaluation_response();
    log.attempt = attempt_count;
    log.hint_request = hint_request_count;
    log.condition = problem.condition;
    log.elapsedtime = timeDiff;
    log.item = problem.item;
    log.kc = problem.kc;
    log.module = problem.module;
    log.session = problem.session;
    log.step = step_count;
    // TODO: Get this value from Firebase auth to identify student by name
    log.student = config.user_id; 
    var d = new Date();
    var time = d.getTime().toString();
    log.time = time;
    
    //console.log(log);
    //console.log(problem);
}

function reset_log_values(){
    log.attempt = 0,
    log.hint_request = 0,
    log.condition = '',
    log.elapsedtime = 0,
    log.evaluation = '',
    log.item = '',
    log.kc = '',
    log.module = '',
    log.qualifier = '',
    log.response = '',
    log.session = '',
    log.step = 0,
    log.student = '',
    log.time = ''
}

function timer_start(){
    startTime = new Date();
}

function timer_end(){
    endTime = new Date();
    timeDiff = endTime - startTime;
}

function submit_response(){
    timer_end();

    set_log_values();

    problem_controls_submit.style.display = "none";
    problem_controls_hint.style.display = "none";

    setTimeout(function(){
        log_list.push(
        {
            attempt: log.attempt,
            hint_request: log.hint_request,
            condition: log.condition,
            elapsedtime: log.elapsedtime,
            evaluation: log.evaluation,
            item: log.item,
            kc: log.kc,
            module: log.module,
            qualifier: log.qualifier,
            response: log.response,
            session: log.session,
            step: log.step,
            student: log.student,
            time: log.time
        });
        //console.log(log_list);

        if(log.evaluation == "correct"){
            problem_positive_message.style.display = "block";
        }else{
            problem_negative_message.style.display = "block";
        }
        problem_controls_next.style.display = "block";
        problem_controls_repeat.style.display = "block";
    }, 5000);
    //console.log("Submit event");
}

async function evaluation_response(){
    if(problem.type=="Open"){
        await CodeUtterances.codeTherapist();
        /*
        0: "advise_wop"
        1: "facilitate"
        2: "advise_wp"
        3: "reflection_complex"
        4: "changetalk"
        5: "confront"
        6: "na_other"
        7: "neutral"
        8: "question_closed"
        9: "structure"
        10: "reflection_simple"
        11: "affirm"
        12: "givinginfo"
        13: "question_open"
        14: "sustain"
        */
    }else{
        if(log.response == problem.answerkey){
            log.evaluation = "correct";
        }else{
            log.evaluation = "incorrect";
        }
    }
}

function show_hint(count){
    hide_all_hints();
    if(count == 1){
        problem_hint_1_message.style.display = "block";
    }else if(count == 2){
        problem_hint_2_message.style.display = "block";
    }else if(count == 3){
        problem_hint_3_message.style.display = "block";
        problem_controls_hint.disabled = true;
    }else{
        console.log("Hint requests exceeded maximum limit...");
    }
}

function hide_all_hints(){
    problem_hint_1_message.style.display = "none";
    problem_hint_2_message.style.display = "none";
    problem_hint_3_message.style.display = "none";
}
// Select the problem for MITutor
function set_problem_index(selection_method){
    if(selection_method == "random"){
        problem_list_order = random_selection_method();
        //console.log(problem_list_order);
    }else{
        console.log("Error - set_problem_index() selection_method parameter not recognized.")
    }
}

function random_selection_method(){
    var nums = [];
    for(var i=0;i<problem_list.length;i++){
        nums.push(i);
    }
    //console.log(nums);
    var ranNums = [],
    i = nums.length,
    j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }
    //console.log(ranNums);
    return ranNums;
}

// Initialize view and data for MITutor
function set_problem_values(index){
    // Set the data
    problem.item = problem_list[index].item;
    problem.module = problem_list[index].module;
    problem.instructor = problem_list[index].instructor;
    problem.condition = problem_list[index].condition;
    problem.instruction = problem_list[index].instruction;
    problem.kc = problem_list[index].kc;
    problem.type = problem_list[index].type;
    problem.agent_1_src = problem_list[index].agent_1_src;
    problem.agent_1_statement = problem_list[index].agent_1_statement;
    problem.agent_2_src = problem_list[index].agent_2_src;
    problem.agent_2_statement = problem_list[index].agent_2_statement;
    problem.item_1_label = problem_list[index].item_1_label;
    problem.item_2_label = problem_list[index].item_2_label;
    problem.item_3_label = problem_list[index].item_3_label;
    problem.item_4_label = problem_list[index].item_4_label;
    problem.answerkey = problem_list[index].answerkey;
    problem.feedback_pos = problem_list[index].feedback_pos;
    problem.feedback_neg = problem_list[index].feedback_neg;
    problem.hint_1 = problem_list[index].hint_1;
    problem.hint_2 = problem_list[index].hint_2;
    problem.hint_3 = problem_list[index].hint_3;
    problem.validation = problem_list[index].validation;
    
    //Initialize the view
    problem_controls_next.style.display = "none";
    problem_controls_repeat.style.display = "none";
    problem_controls_submit.style.display = "block";
    problem_controls_hint.disabled = false;
    problem_controls_hint.style.display = "block";
    if(problem.type == "TrueFalse"){
        // Toggle display of the problem elements and containers
        cont_problem_radio_1.style.display = "block";
        cont_problem_radio_2.style.display = "block";
        cont_problem_client.style.display = "none";
        cont_problem_radio_3.style.display = "none";
        cont_problem_radio_4.style.display = "none";
        cont_problem_textarea.style.display = "none";
        problem_positive_message.style.display = "none";
        problem_negative_message.style.display = "none";
        problem_hint_1_message.style.display = "none";
        problem_hint_2_message.style.display = "none";
        problem_hint_3_message.style.display = "none";
        problem_validation_message.style.display = "none";
        
        // Update text content of elements and input labels
        problem_instruction_message.textContent = problem.instruction;
        problem_therapist_statement.textContent = problem.agent_2_statement;
        problem_therapist_avatar.src = problem.agent_2_src;
        problem_radio_1_label.textContent = problem.item_1_label;
        problem_radio_2_label.textContent = problem.item_2_label;
        problem_radio_1.value = problem.item_1_label;
        problem_radio_2.value = problem.item_2_label;
        // Update text content of hints, feedback, and validation messages
        problem_negative_message.textContent = problem.feedback_neg;
        problem_positive_message.textContent = problem.feedback_pos;
        problem_hint_1_message.textContent = problem.hint_1;
        problem_hint_2_message.textContent = problem.hint_2;
        problem_hint_3_message.textContent = problem.hint_3;
        problem_validation_message.textContent = problem.validation;
        
        log.response = problem_radio_1.value;
        problem_radio_1.checked = true;
    }else if(problem.type == "Multi"){
        // Toggle display of the problem elements and containers
        cont_problem_radio_1.style.display = "block";
        cont_problem_radio_2.style.display = "block";
        cont_problem_radio_3.style.display = "block";
        cont_problem_radio_4.style.display = "block";
        cont_problem_client.style.display = "none";
        cont_problem_textarea.style.display = "none";
        problem_positive_message.style.display = "none";
        problem_negative_message.style.display = "none";
        problem_hint_1_message.style.display = "none";
        problem_hint_2_message.style.display = "none";
        problem_hint_3_message.style.display = "none";
        problem_validation_message.style.display = "none";
        
        // Update text content of elements and input labels
        problem_instruction_message.textContent = problem.instruction;
        problem_therapist_statement.textContent = problem.agent_2_statement;
        problem_therapist_avatar.src = problem.agent_2_src;
        problem_radio_1_label.textContent = problem.item_1_label;
        problem_radio_2_label.textContent = problem.item_2_label;
        problem_radio_3_label.textContent = problem.item_3_label;
        problem_radio_4_label.textContent = problem.item_4_label;
        problem_radio_1.value = problem.item_1_label;
        problem_radio_2.value = problem.item_2_label;
        problem_radio_3.value = problem.item_3_label;
        problem_radio_4.value = problem.item_4_label;
        
        // Update text content of hints, feedback, and validation messages
        problem_negative_message.textContent = problem.feedback_neg;
        problem_positive_message.textContent = problem.feedback_pos;
        problem_hint_1_message.textContent = problem.hint_1;
        problem_hint_2_message.textContent = problem.hint_2;
        problem_hint_3_message.textContent = problem.hint_3;
        problem_validation_message.textContent = problem.validation;
        
        log.response = problem_radio_1.value;
        problem_radio_1.checked = true;
    }else if(problem.type == "Open"){
        // Toggle display of the problem elements and containers
        cont_problem_radio_1.style.display = "none";
        cont_problem_radio_2.style.display = "none";
        cont_problem_radio_3.style.display = "none";
        cont_problem_radio_4.style.display = "none";
        cont_problem_textarea.style.display = "block";
        problem_positive_message.style.display = "none";
        problem_negative_message.style.display = "none";
        problem_hint_1_message.style.display = "none";
        problem_hint_2_message.style.display = "none";
        problem_hint_3_message.style.display = "none";
        problem_validation_message.style.display = "none";
        
        // Update text content of elements and input labels
        problem_instruction_message.textContent = problem.instruction;
        problem_therapist_statement.textContent = problem.agent_2_statement;
        problem_therapist_avatar.src = problem.agent_2_src;
        problem_client_statement.textContent = problem.agent_1_statement;
        problem_client_avatar.src = problem.agent_1_src;
        
        // Update text content of hints, feedback, and validation messages
        problem_negative_message.textContent = problem.feedback_neg;
        problem_positive_message.textContent = problem.feedback_pos;
        problem_hint_1_message.textContent = problem.hint_1;
        problem_hint_2_message.textContent = problem.hint_2;
        problem_hint_3_message.textContent = problem.hint_3;
        problem_validation_message.textContent = problem.validation;
    }
    //console.log(log);
    //console.log(problem);
    timer_start();
}

// Controllers for MICreator 
function set_searchlist_MICreator(){
    search_results_MICreator = [];
    btn_micreator_showmore.disabled = true;
    btn_micreator_search1.classList.add("d-none");
    btn_micreator_search2.classList.add("d-none");
    btn_micreator_search3.classList.add("d-none");
    // Search for a match - store the results in array
    for(var i = 0; i < problem_list.length; i++){
        //console.log(problem_list[i].module);
        //console.log(input_micreator_query.value);
        if(problem_list[i].module.indexOf(input_micreator_query.value) > -1){
            //console.log("Partial match");
            search_results_MICreator.push(i);
        }
    }
    // Display results of search in dropdown menu list
    if(search_results_MICreator.length == 0){
        
    }else if(search_results_MICreator.length == 1){
        btn_micreator_search1.textContent = problem_list[search_results_MICreator[0]].module;
        btn_micreator_search1.classList.remove("d-none");
    }else if(search_results_MICreator.length == 2){
        btn_micreator_search1.textContent = problem_list[search_results_MICreator[0]].module;
        btn_micreator_search2.textContent = problem_list[search_results_MICreator[1]].module;
        btn_micreator_search1.classList.remove("d-none");
        btn_micreator_search2.classList.remove("d-none");
    }else if(search_results_MICreator.length >= 3){
        btn_micreator_search1.textContent = problem_list[search_results_MICreator[0]].module;
        btn_micreator_search2.textContent = problem_list[search_results_MICreator[1]].module;
        btn_micreator_search3.textContent = problem_list[search_results_MICreator[2]].module;
        btn_micreator_search1.classList.remove("d-none");
        btn_micreator_search2.classList.remove("d-none");
        btn_micreator_search3.classList.remove("d-none");
        btn_micreator_showmore.disabled = false;
    }
    search_index_MICreator = 0;
}

function update_searchlist_MICreator(){
    if((search_index_MICreator + 3) >= search_results_MICreator.length-1){
        btn_micreator_showmore.disabled = true;
        search_index_MICreator += 1;
        btn_micreator_search1.textContent = problem_list[search_results_MICreator[search_index_MICreator]].module;
        btn_micreator_search2.textContent = problem_list[search_results_MICreator[search_index_MICreator+1]].module;
        btn_micreator_search3.textContent = problem_list[search_results_MICreator[search_index_MICreator+2]].module;
    }else{
        search_index_MICreator += 1;
        btn_micreator_search1.textContent = problem_list[search_results_MICreator[search_index_MICreator]].module;
        btn_micreator_search2.textContent = problem_list[search_results_MICreator[search_index_MICreator+1]].module;
        btn_micreator_search3.textContent = problem_list[search_results_MICreator[search_index_MICreator+2]].module;
    }
}

function set_problem_type(type_value){
    hide_all_input_properties();
    switch(type_value){
        case 'NA':
            //console.log('No selection made');
        break;
        case 'TrueFalse':
            //console.log('TrueFalse');
            show_truefalse();
        break;
        case 'Multi':
            //console.log('Multi');
            show_multi();
        break;
        case 'Open':
            //console.log('Open');
            show_open();
        break;
        default:
            console.log('Error - set_problem_type() in controller.js');
        break;
    }
}

function hide_all_input_properties(){
    cont_response_option_1.style.display = "none";
    cont_response_option_2.style.display = "none";
    cont_response_option_3.style.display = "none";
    cont_response_option_4.style.display = "none";
    cont_preview_radio_1.style.display = "none";
    cont_preview_radio_2.style.display = "none";
    cont_preview_radio_3.style.display = "none";
    cont_preview_radio_4.style.display = "none";
    cont_preview_textarea.style.display = "none";
    cont_preview_client.style.display = "none";
    cont_preview_therapist.style.display = "none";
    preview_positive_message.style.display = "none";
    preview_negative_message.style.display = "none";
    preview_hint_1_message.style.display = "none";
    preview_hint_2_message.style.display = "none";
    preview_hint_3_message.style.display = "none";
    preview_validation_message.style.display = "none";
    cont_preview_response.style.display = "none";
    cont_response_client_avatar.style.display = "none";
    cont_response_client_statement.style.display = "none";
    cont_response_therapist_avatar.style.display = "none";
    cont_response_therapist_statement.style.display = "none";
    cont_input_answer_key.style.display = "none";
    cont_input_feedback_pos.style.display = "none";
    cont_input_feedback_neg.style.display = "none";
    cont_input_hint_1.style.display = "none";
    cont_input_hint_2.style.display = "none";
    cont_input_hint_3.style.display = "none";
    cont_input_validation.style.display = "none";
    input_answer_key_1.style.display = "none";
    input_answer_key_2.style.display = "none";
    input_answer_key_3.style.display = "none";
    input_answer_key_4.style.display = "none";
}

function show_truefalse(){
    cont_response_option_1.style.display = "block";
    cont_response_option_2.style.display = "block";
    cont_preview_radio_1.style.display = "block";
    cont_preview_radio_2.style.display = "block";
    cont_preview_therapist.style.display = "block";
    
    preview_positive_message.style.display = "block";
    preview_negative_message.style.display = "block";
    preview_hint_1_message.style.display = "block";
    preview_hint_2_message.style.display = "block";
    preview_hint_3_message.style.display = "block";
    preview_validation_message.style.display = "block";
    cont_preview_response.style.display = "block";
    
    cont_response_therapist_avatar.style.display = "block";
    cont_response_therapist_statement.style.display = "block";
    
    cont_input_answer_key.style.display = "block";
    cont_input_feedback_pos.style.display = "block";
    cont_input_feedback_neg.style.display = "block";
    cont_input_hint_1.style.display = "block";
    cont_input_hint_2.style.display = "block";
    cont_input_hint_3.style.display = "block";
    cont_input_validation.style.display = "block";
    
    input_answer_key_1.style.display = "block";
    input_answer_key_2.style.display = "block";
    input_answer_key_1.textContent = input_response_option_1.value;
    input_answer_key_2.textContent = input_response_option_2.value;
    input_answer_key_1.value = input_response_option_1.value;
    input_answer_key_2.value = input_response_option_2.value;
    input_answer_key.value = problem.answerkey;
}

function show_multi(){
    cont_response_option_1.style.display = "block";
    cont_response_option_2.style.display = "block";
    cont_response_option_3.style.display = "block";
    cont_response_option_4.style.display = "block";
    cont_preview_radio_1.style.display = "block";
    cont_preview_radio_2.style.display = "block";
    cont_preview_radio_3.style.display = "block";
    cont_preview_radio_4.style.display = "block";
    cont_preview_therapist.style.display = "block";
    
    preview_positive_message.style.display = "block";
    preview_negative_message.style.display = "block";
    preview_hint_1_message.style.display = "block";
    preview_hint_2_message.style.display = "block";
    preview_hint_3_message.style.display = "block";
    preview_validation_message.style.display = "block";
    cont_preview_response.style.display = "block";
    
    cont_response_therapist_avatar.style.display = "block";
    cont_response_therapist_statement.style.display = "block";
    
    cont_input_answer_key.style.display = "block";
    cont_input_feedback_pos.style.display = "block";
    cont_input_feedback_neg.style.display = "block";
    cont_input_hint_1.style.display = "block";
    cont_input_hint_2.style.display = "block";
    cont_input_hint_3.style.display = "block";
    cont_input_validation.style.display = "block";
    
    input_answer_key_1.style.display = "block";
    input_answer_key_2.style.display = "block";
    input_answer_key_3.style.display = "block";
    input_answer_key_4.style.display = "block";
    input_answer_key_1.textContent = input_response_option_1.value;
    input_answer_key_2.textContent = input_response_option_2.value;
    input_answer_key_3.textContent = input_response_option_3.value;
    input_answer_key_4.textContent = input_response_option_4.value;
    input_answer_key_1.value = input_response_option_1.value;
    input_answer_key_2.value = input_response_option_2.value;
    input_answer_key_3.value = input_response_option_3.value;
    input_answer_key_4.value = input_response_option_4.value;
    input_answer_key.value = problem.answerkey;
}

function show_open(){
    cont_preview_textarea.style.display="block";
    cont_preview_client.style.display = "block";
    cont_preview_therapist.style.display = "block";
    
    preview_positive_message.style.display = "block";
    preview_negative_message.style.display = "block";
    preview_hint_1_message.style.display = "block";
    preview_hint_2_message.style.display = "block";
    preview_hint_3_message.style.display = "block";
    preview_validation_message.style.display = "block";
    cont_preview_response.style.display = "block";
    
    cont_response_client_avatar.style.display = "block";
    cont_response_client_statement.style.display = "block";
    cont_response_therapist_avatar.style.display = "block";
    cont_response_therapist_statement.style.display = "block";
    
    cont_input_answer_key.style.display = "block";
    cont_input_feedback_pos.style.display = "block";
    cont_input_feedback_neg.style.display = "block";
    cont_input_hint_1.style.display = "block";
    cont_input_hint_2.style.display = "block";
    cont_input_hint_3.style.display = "block";
    cont_input_validation.style.display = "block";
    
    input_answer_key_1.style.display = "block";
    input_answer_key_1.textContent = "reflection";
    input_answer_key.value = problem.answerkey;
}

function new_problem_input_values(){
    input_problem_id.value = Math.random().toString(36).substring(7);
    problem.item = input_problem_id.value;
    // TO DO: Add an item to the array of problems READ from Firebase
    //console.log(problem.instructor);
    input_instructor.value = "";
    problem.instructor = "";
    input_condition.value = "";
    problem.condition = "";
    input_module.value = "";
    problem.module = "";
    input_instruction.value = "";
    problem.instruction = "";
    input_response_kc.value = "NA";
    problem.kc = "NA";
    input_response_type.value = "NA";
    problem.type = "NA";
    input_client_avatar.value = "asset/avatar1.png";
    problem.agent_1_src = "asset/avatar1.png";
    input_client_statement.value = "";
    problem.agent_1_statement = "";
    input_therapist_avatar.value = "asset/avatar2.png";
    problem.agent_2_src = "asset/avatar2.png";
    input_therapist_statement.value = "";
    input_response_option_1.value = "";
    input_response_option_2.value = "";
    input_response_option_3.value = "";
    input_response_option_4.value = "";
    problem.item_1_label = "";
    problem.item_2_label = "";
    problem.item_3_label = "";
    problem.item_4_label = "";
    input_answer_key.value = "NA";
    problem.answerkey = "NA";
    input_feedback_pos.value = "";
    problem.feedback_pos = "";
    input_feedback_neg.value = "";
    problem.feedback_neg = "";
    input_hint_1.value = "";
    problem.hint_1 = "";
    input_hint_2.value = "";
    problem.hint_2 = "";
    input_hint_3.value = "";
    problem.hint_3 = "";
    input_validation.value = "";
    problem.validation = "";
    hide_all_input_properties();
}

function set_input_values(index){
    input_problem_id.value = problem_list[index].item;
    problem.item = problem_list[index].item;
    
    input_module.value = problem_list[index].module;
    problem.module = problem_list[index].module;
    
    input_instructor.value = problem_list[index].instructor;
    problem.instructor = problem_list[index].instructor;
    
    input_condition.value = problem_list[index].condition;
    problem.condition = problem_list[index].condition;
    
    preview_instruction.textContent = problem_list[index].instruction;
    input_instruction.value = problem_list[index].instruction;
    problem.instruction = problem_list[index].instruction;
    
    input_response_kc.value = problem_list[index].kc;
    problem.kc = problem_list[index].kc;
    
    input_response_type.value = problem_list[index].type;
    problem.type = problem_list[index].type;
    
    preview_client_avatar.src = problem_list[index].agent_1_src;
    input_client_avatar.src = problem_list[index].agent_1_src;
    problem.agent_1_src = problem_list[index].agent_1_src;
    
    preview_client_statement.textContent = problem_list[index].agent_1_statement;
    input_client_statement.value = problem_list[index].agent_1_statement;
    problem.agent_1_statement = problem_list[index].agent_1_statement;
    
    preview_therapist_avatar.src = problem_list[index].agent_2_src;
    input_therapist_avatar.src = problem_list[index].agent_2_src;
    problem.agent_2_src = problem_list[index].agent_2_src;
    
    preview_therapist_statement.textContent = problem_list[index].agent_2_statement;
    input_therapist_statement.value = problem_list[index].agent_2_statement;
    problem.agent_2_statement = problem_list[index].agent_2_statement;
    
    preview_radio_1_label.textContent = problem_list[index].item_1_label;
    preview_radio_2_label.textContent = problem_list[index].item_2_label;
    preview_radio_3_label.textContent = problem_list[index].item_3_label;
    preview_radio_4_label.textContent = problem_list[index].item_4_label;
    input_response_option_1.value = problem_list[index].item_1_label;
    input_response_option_2.value = problem_list[index].item_2_label;
    input_response_option_3.value = problem_list[index].item_3_label;
    input_response_option_4.value = problem_list[index].item_4_label;
    problem.item_1_label = problem_list[index].item_1_label;
    problem.item_2_label = problem_list[index].item_2_label;
    problem.item_3_label = problem_list[index].item_3_label;
    problem.item_4_label = problem_list[index].item_4_label;
    
    input_answer_key.value = problem_list[index].answerkey;
    problem.answerkey = problem_list[index].answerkey;
    
    preview_positive_message.textContent = problem_list[index].feedback_pos;
    input_feedback_pos.value = problem_list[index].feedback_pos;
    problem.feedback_pos = problem_list[index].feedback_pos;
    
    preview_negative_message.textContent = problem_list[index].feedback_neg;
    input_feedback_neg.value = problem_list[index].feedback_neg;
    problem.feedback_neg = problem_list[index].feedback_neg;
    
    preview_hint_1_message.textContent = problem_list[index].hint_1;
    input_hint_1.value = problem_list[index].hint_1;
    problem.hint_1 = problem_list[index].hint_1;
    
    preview_hint_2_message.textContent = problem_list[index].hint_2;
    input_hint_2.value = problem_list[index].hint_2;
    problem.hint_2 = problem_list[index].hint_2;
    
    preview_hint_3_message.textContent = problem_list[index].hint_3;
    input_hint_3.value = problem_list[index].hint_3;
    problem.hint_3 = problem_list[index].hint_3;
    
    preview_validation_message.textContent = problem_list[index].validation; 
    input_validation.value = problem_list[index].validation;
    problem.validation = problem_list[index].validation;

    set_problem_type(problem.type);
}

// Controllers for MIDash

function learningcurve(type, unit, case_example){
    // Set options for graph to update values
    var update_title_text = unit + " By " + type + " for " + case_example.charAt(0).toUpperCase() + case_example.slice(1);
    var update_yaxis_min;
    var update_yaxis_max;
    
    // TO DO: How to calculate new series - https://pslcdatashop.web.cmu.edu/help?page=learningCurveAlgorithm
    
    // TO DO: How to update series in charts - https://apexcharts.com/docs/methods/#updateSeries
    
    switch(unit){
        case 'Measure Assistance Score':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_measure_assistance_score));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_measure_assistance_score));
            break;
        case 'Error Rate':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_error_rate));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_error_rate));
            break;
        case 'Number of Incorrects':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_number_incorrect));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_number_incorrect));
            break;
        case 'Number of Hints':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_number_hints));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_number_hints));
            break;
        case 'Step Duration':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_step_duration));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_step_duration));
            break;
        case 'Correct Step Duration':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_correct_step_duration));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_correct_step_duration));
            break;
        case 'Error Step Duration':
            update_yaxis_min = Math.round(Math.min.apply(null, arr_incorrect_step_duration));
            update_yaxis_max =  Math.round(Math.max.apply(null, arr_incorrect_step_duration));
            break;
        default:
            console.log("Error - learningcurve() switch statement for unit parameter not recognized.");
            break;
   }
    
    chart.updateOptions({
        title:{
            text: update_title_text
        },
        yaxis:{
            decimalsInFloat: 1,
            title:{
                text: unit,
                style: {
                    fontSize: '16px'
                }   
            },
        labels: {
          style:{
              fontSize: '16px'
          }
        },
        min: update_yaxis_min,
        max: update_yaxis_max
        }
    });
}

// TODO: Call this function from the event listeners and begin to debug
function learningcurve_yAxis(){
    yAxis.fill(0);
    yAxis_observations.fill(0);
    arr_measure_assistance_score.fill(0);
    arr_error_rate.fill(0);
    arr_step_duration.fill(0);
    arr_correct_step_duration.fill(0);
    arr_incorrect_step_duration.fill(0);
    arr_number_incorrect.fill(0);
    arr_number_hints.fill(0);
    for(var i = 0; i < log_list.length; i++){
        
        if(graph_type_learningcurve == "Knowledge Component"){
            if(log_list[i].kc == graph_case_example){
                learningcurve_calculation(i,graph_unit_analysis);
            }
        }else{
            if(log_list[i].student == graph_case_example){
                learningcurve_calculation(i,graph_unit_analysis);
            }
        }
    }
}

function learningcurve_calculation(index, unit_analysis){
    switch(unit_analysis){
        case 'Measure Assistance Score':
            measure_assistance_score(index);
            break;
        case 'Error Rate':
            error_rate(index);
            break;
        case 'Number of Incorrects':
            number_incorrects(index);
            break;
        case 'Number of Hints':
            number_hints(index);
            break;
        case 'Step Duration':
            step_duration(index);
            break;
        case 'Correct Step Duration':
            correct_step_duration(index);
            break;
        case 'Error Step Duration':
            error_step_duration(index);
            break;
        default:
            // Error handling
            console.log("Error learningcurve_calculation function");
            break;
    }
}

function measure_assistance_score(index){
    // Count of assistance - incorrect or hint
    if(log_list[index].evaluation == "incorrect" || log_list[index].hint_request >= 1){
        yAxis[log_list[index].step] += 1;  
    }
    // Count of observations
    if(log_list[index].attempt == 0){
        yAxis_observations[log_list[index].step] += 1;
        
    }
    // Calculate assistance score
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_measure_assistance_score[i] = yAxis[i]/yAxis_observations[i];
        if(Number.isNaN(arr_measure_assistance_score[i])){
            arr_measure_assistance_score[i] = 0;
        }
    }
    console.log(arr_measure_assistance_score);
    // Update learning curve values
    chart.updateSeries([{
        data: arr_measure_assistance_score
    }])
}

function error_rate(index){
    // Count of errors
    console.log(index);
    if(log_list[index].evaluation == "incorrect" && log_list[index].attempt == 0){
        yAxis[log_list[index].step] += 1;
    }
    console.log(yAxis);
    // Count of observations
    if(log_list[index].attempt == 0){
        yAxis_observations[log_list[index].step] += 1;
    }
    console.log(yAxis_observations);
    // Calculate error rate
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_error_rate[i] = yAxis[i]/yAxis_observations[i]*100;
        if(Number.isNaN(arr_error_rate[i])){
            arr_error_rate[i] = 0;
        }
    }
    console.log(arr_error_rate);
    // Update learning curve values
    chart.updateSeries([{
        data: arr_error_rate
    }])
}

function number_incorrects(index){
    // Count of incorrect
    if(log_list[index].evaluation == "incorrect"){
        yAxis[log_list[index].step] += 1;
    }
    // Count of observations
    yAxis_observations[log_list[index].step] += 1;
    // Calculate incorrect count
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_number_incorrect[i] = yAxis[i];
        if(Number.isNaN(arr_number_incorrect[i])){
            arr_number_incorrect[i] = 0;
        }
    }
    console.log(arr_number_incorrect);
    // Update learning curve values
    chart.updateSeries([{
        data: arr_number_incorrect
    }])
}

function number_hints(index){
    // Count of hint
    if(log_list[index].hint_request >= 1){
        yAxis[log_list[index].step] += 1;
    }
    // Count of observations
    yAxis_observations[log_list[index].step] += 1;
    // Calculate hint count
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_number_hints[i] = yAxis[i];
        if(Number.isNaN(arr_number_hints[i])){
            arr_number_hints[i] = 0;
        }
    }
    console.log(arr_number_hints);
    // Update learning curve values
    chart.updateSeries([{
        data: arr_number_hints
    }])
}

function step_duration(index){
    // Sum step duration
    yAxis[log_list[index].step] = yAxis[log_list[index].step] + log_list[index].elapsedtime;
    // Count of observations
    yAxis_observations[log_list[index].step] += 1;
    // Average step duration
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_step_duration[i] = ((yAxis[i]/yAxis_observations[i])/1000);
        if(Number.isNaN(arr_step_duration[i])){
            arr_step_duration[i] = 0;
        }
    }
    console.log(arr_step_duration);
     // Update learning curve values
    chart.updateSeries([{
        data: arr_step_duration
    }])
}

function correct_step_duration(index){
    // Sum of correct step duration
    if(log_list[index].evaluation == "correct"){
        yAxis[log_list[index].step] = yAxis[log_list[index].step] + log_list[index].elapsedtime;
    }
    // Count of observations
    if(log_list[index].evaluation == "correct"){
        yAxis_observations[log_list[index].step] += 1;
    }
    // Averate correct step duration
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_correct_step_duration[i] = ((yAxis[i]/yAxis_observations[i])/1000);
        if(Number.isNaN(arr_correct_step_duration[i])){
            arr_correct_step_duration[i] = 0;
        }
    }
    console.log(arr_correct_step_duration);
    // Update learning curve values
    chart.updateSeries([{
        data: arr_correct_step_duration
    }])
}

function error_step_duration(index){
    // Sum of correct step duration
    if(log_list[index].evaluation == "incorrect"){
        yAxis[log_list[index].step] = yAxis[log_list[index].step] + log_list[index].elapsedtime;
    }
    // Count of observations
    if(log_list[index].evaluation == "incorrect"){
        yAxis_observations[log_list[index].step] += 1;
    }
    // Averate correct step duration
    for(var i = 0; i < yAxis_observations.length; i++){
        arr_incorrect_step_duration[i] = ((yAxis[i]/yAxis_observations[i])/1000);
        if(Number.isNaN(arr_incorrect_step_duration[i])){
            arr_incorrect_step_duration[i] = 0;
        }
    }
    console.log(arr_incorrect_step_duration);
    // Update learning curve values
    chart.updateSeries([{
        data: arr_incorrect_step_duration
    }])
}

function set_searchlist_MIDash(type,query){
    reset_searchlist_MIDash();
    var array = [];
    if(type == "Knowledge Component"){
        array = [
            graph_openquest,
            graph_closedquestquest,
            graph_reflection,
            graph_affirm,
            graph_advisewithper,
            graph_advisewithoutper,
            graph_confront,
            graph_givinginfo,
            graph_facilitate,
            graph_structure
        ];
    }else{
        array = [
            graph_student1,
            graph_student2,
            graph_student3,
            graph_student4,
            graph_student5,
            graph_student6,
            graph_student7,
            graph_student8,
            graph_student9,
            graph_student10
        ];
        get_student_searchlist_MIDash(array, search_index_MIDash);
    }
    for(var i = 0; i < array.length; i++){
        //console.log(array[i]);
        if(array[i].textContent.indexOf(query) > -1 && array[i].textContent != ""){
            array[i].classList.remove("d-none");
        }else{
            array[i].classList.add("d-none");
        }
    }
}

function reset_searchlist_MIDash(){
    graph_openquest.classList.remove("d-none");
    graph_closedquestquest.classList.remove("d-none");
    graph_reflection.classList.remove("d-none");
    graph_affirm.classList.remove("d-none");
    graph_advisewithper.classList.remove("d-none");
    graph_advisewithoutper.classList.remove("d-none");
    graph_confront.classList.remove("d-none");
    graph_givinginfo.classList.remove("d-none");
    graph_facilitate.classList.remove("d-none");
    graph_structure.classList.remove("d-none");
    graph_student1.classList.remove("d-none");
    graph_student2.classList.remove("d-none");
    graph_student3.classList.remove("d-none");
    graph_student4.classList.remove("d-none");
    graph_student5.classList.remove("d-none");
    graph_student6.classList.remove("d-none");
    graph_student7.classList.remove("d-none");
    graph_student8.classList.remove("d-none");
    graph_student9.classList.remove("d-none");
    graph_student10.classList.remove("d-none");
}

function get_student_searchlist_MIDash(array, index){
    console.log(index);
    for(var i = 0; i < log_list.length; i++){
        if(search_results_MIDash.includes(log_list[i].student)){
           // Skip
        }else{
            search_results_MIDash.push(log_list[i].student);
        }
    }
    console.log(array);
    console.log(search_results_MIDash);
    //console.log(search_results_MIDash.length);
    for(var j = 0; j < array.length; j++){
        if(j < search_results_MIDash.length){//console.log(search_results_MIDash[j]);
            array[j].textContent = search_results_MIDash[j+index];
        }
        else{
            array[j].textContent = "";
        }
    }
}

function increment_search_index_MIDash(){
    btn_midash_previous.disabled = true;
    btn_midash_next.disabled = true;
    search_index_MIDash += 1;
    console.log(search_index_MIDash);
    set_searchlist_MIDash(graph_type_learningcurve,graph_search_query.value);
    if(search_index_MIDash >= 1){
        btn_midash_previous.disabled = false;
    }
}

function decrement_search_index_MIDash(){
    btn_midash_previous.disabled = true;
    btn_midash_next.disabled = true;
    search_index_MIDash -= 1;
    console.log(search_index_MIDash);
    set_searchlist_MIDash(graph_type_learningcurve,graph_search_query.value);
    if(search_index_MIDash <= search_results_MIDash.length){
        btn_midash_next.disabled = false;
    }
}
