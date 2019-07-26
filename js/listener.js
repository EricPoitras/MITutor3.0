// TO DO: Search bar for MICreator - add functions to handle control inputs and search through data from Firebase

// Event Listeners for Main
btn_sign_in.addEventListener('click',function(){
    router('section_dashboard');
    btn_settings_dashboard.disabled = false;
    alert_dashboard_warning.classList.remove("d-none");
});

// Event Listeners for Dashboard
btn_mitutor.addEventListener('click',function(){
    router('section_mitutor');
});

btn_micreator.addEventListener('click',function(){
    router('section_micreator');
});

btn_midash.addEventListener('click',function(){
    router('section_midash');
    graph_type_learningcurve = "Knowledge Component";
    cont_knowledge_components.classList.remove("d-none");
    cont_listgroup_controls.classList.add("d-none");
    cont_students.classList.add("d-none");
    graph_search_query.placeholder = "Search for a knowledge component";
    // Set default option for graph case example
    graph_case_example = "Open Question";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_settings_dashboard.addEventListener('click',function(){
   router('section_dashboard'); 
});

// Event Listeners for MITutor
btn_mitutor_mod.addEventListener('click',function(){
    set_modulelist_MITutor();
});

//TODO: Load progress bars for progress made on modules for student
btn_mitutor_showmore.addEventListener('click',function(e){
    e.stopPropagation(); 
    e.preventDefault();
    console.log("click");
    update_modulelist_MITutor();
});

/* Next version...
btn_mitutor_mod_ide_ref.addEventListener('input',function(){
    //TODO: Load problems related to identification of reflections
});

btn_mitutor_mod_cat_ref.addEventListener('input',function(){
    //TODO: Load problems related to categorization of reflections
});

btn_mitutor_mod_ela_ref.addEventListener('input',function(){
    //TODO: Load problems related to elaboration of reflections
});
*/

problem_radio_1.addEventListener('input',function(){
    log.response = problem_radio_1.value;
    //console.log(log.response); 
});

problem_radio_2.addEventListener('input',function(){
    log.response = problem_radio_2.value;
    //console.log(log.response); 
});

problem_radio_3.addEventListener('input',function(){
    log.response = problem_radio_3.value;
    //console.log(log.response); 
});

problem_radio_4.addEventListener('input',function(){
    log.response = problem_radio_4.value;
    //console.log(log.response);
});

problem_textarea.addEventListener('input',function(){
    log.response = problem_textarea.value;
    //console.log(log.response);
});

problem_controls_submit.addEventListener('click',function(){
    if(problem.type=="Open"){
        if(problem_textarea.value.length >= 1){
            submit_response();
        }else{
            problem_validation_message.style.display = "block";
            console.log("validation event");
            console.log(problem_textarea.value.length);
        }
    }else{
        submit_response();                              
    }
});

problem_controls_hint.addEventListener('click',function(){
    hint_request_count++;
    show_hint(hint_request_count);
});

problem_controls_repeat.addEventListener('click',function(){
    attempt_count++;
    set_problem_values(problem_list_order[mitutor_problem_index]);
});

problem_controls_next.addEventListener('click',function(){
    // TO DO: Get the next problem from Firebase list
     reset_log_values();
    attempt_count = 0;
    hint_request_count = 0;
    startTime = 0;
    endTime = 0;
    timeDiff = 0;
    step_count++;
    mitutor_problem_index++;
    if(mitutor_problem_index < problem_list_order.length){
        set_problem_values(problem_list_order[mitutor_problem_index]);
    }else{
        router('section_dashboard');
        btn_mitutor.disabled = true;
        alert_dashboard_success.classList.remove("d-none");
    }
});

// Event Listeners for MICreator

btn_micreator_search1.addEventListener('click',function(){ 
    btn_micreator_delete.classList.remove("d-none");
    btn_micreator_update.classList.remove("d-none");
    btn_micreator_save.classList.add("d-none");
    btn_micreator_next.disabled = false;
    btn_micreator_previous.disabled = false;
    
    micreator_problem_index = search_results_MICreator[0];
    if(micreator_problem_index>=problem_list.length-1){
        micreator_problem_index = (problem_list.length-1);
        set_input_values(micreator_problem_index);
        btn_micreator_next.disabled = true;
    }else{
        set_input_values(micreator_problem_index);
    }
    console.log(problem);
    console.log(problem_list);
    console.log("search_result_1");
});

btn_micreator_search2.addEventListener('click',function(){
    btn_micreator_delete.classList.remove("d-none");
    btn_micreator_update.classList.remove("d-none");
    btn_micreator_save.classList.add("d-none");
    btn_micreator_next.disabled = false;
    btn_micreator_previous.disabled = false;
    
    micreator_problem_index = search_results_MICreator[1];
    if(micreator_problem_index>=problem_list.length-1){
        micreator_problem_index = (problem_list.length-1);
        set_input_values(micreator_problem_index);
        btn_micreator_next.disabled = true;
    }else{
        set_input_values(micreator_problem_index);
    }
    console.log(problem);
    console.log(problem_list);
    console.log("search_result_2");
});

btn_micreator_search3.addEventListener('click',function(){
    btn_micreator_delete.classList.remove("d-none");
    btn_micreator_update.classList.remove("d-none");
    btn_micreator_save.classList.add("d-none");
    btn_micreator_next.disabled = false;
    btn_micreator_previous.disabled = false;
    
    micreator_problem_index = search_results_MICreator[2];
    if(micreator_problem_index>=problem_list.length-1){
        micreator_problem_index = (problem_list.length-1);
        set_input_values(micreator_problem_index);
        btn_micreator_next.disabled = true;
    }else{
        set_input_values(micreator_problem_index);
    }
    console.log(problem);
    console.log(problem_list);
    console.log("search_result_3");
});

btn_micreator_showmore.addEventListener('click',function(e){
    e.stopPropagation(); 
    e.preventDefault(); 
    update_searchlist_MICreator();
});

btn_micreator_search.addEventListener('click',function(){
    set_searchlist_MICreator();
});

btn_micreator_previous.addEventListener('click',function(){
   btn_micreator_delete.classList.remove("d-none");
   btn_micreator_update.classList.remove("d-none");
   btn_micreator_save.classList.add("d-none");
   btn_micreator_next.disabled = false;
   btn_micreator_previous.disabled = false;
   micreator_problem_index--;
   if(micreator_problem_index<=0){
       micreator_problem_index = 0; 
       set_input_values(micreator_problem_index);
       btn_micreator_previous.disabled = true;
   }else{
        set_input_values(micreator_problem_index);
   }
   console.log(problem);
   console.log(problem_list);
   console.log("previous_event");
});

btn_micreator_next.addEventListener('click',function(){
    btn_micreator_delete.classList.remove("d-none");
    btn_micreator_update.classList.remove("d-none");
    btn_micreator_save.classList.add("d-none");
    btn_micreator_next.disabled = false;
    btn_micreator_previous.disabled = false;
    
    micreator_problem_index++;
    if(micreator_problem_index>=problem_list.length-1){
        micreator_problem_index = (problem_list.length-1);
        set_input_values(micreator_problem_index);
        btn_micreator_next.disabled = true;
    }else{
        set_input_values(micreator_problem_index);
    }
    console.log(problem);
    console.log(problem_list);
    console.log("next_event");
});

btn_micreator_delete.addEventListener('click',function(){ 
    
    if(problem_list.length <= 1){
        alert("There are no more problems to delete. Create a new problem or download problems from the server.")
    }else{
        problem_list.splice(micreator_problem_index,1);
    
        micreator_problem_index = 0;
        set_input_values(micreator_problem_index);
        btn_micreator_next.disabled = false;
        btn_micreator_previous.disabled = true;
    
        console.log(problem);
        console.log(problem_list);
        console.log("delete_event");
    }
    
});

btn_micreator_update.addEventListener('click',function(){
    problem_list[micreator_problem_index] = problem;
    console.log(problem);
    console.log(problem_list);
    console.log("update_event");
});

btn_micreator_save.addEventListener('click',function(){
    btn_micreator_delete.classList.remove("d-none");
    btn_micreator_update.classList.remove("d-none");
    btn_micreator_previous.classList.remove("d-none");
    btn_micreator_next.classList.remove("d-none");
    btn_micreator_save.classList.add("d-none");
    
    problem_list.push(
    {
        agent_1_src:problem.agent_1_src,
        agent_1_statement:problem.agent_1_statement,
        agent_2_src:problem.agent_2_src,
        agent_2_statement:problem.agent_2_statement,
        answerkey:problem.answerkey,
        condition:problem.condition,
        feedback_neg:problem.feedback_neg,
        feedback_pos:problem.feedback_pos,
        hint_1:problem.hint_1,
        hint_2:problem.hint_2,
        hint_3:problem.hint_3,
        instruction:problem.instruction,
        instructor:problem.instructor,
        item:problem.item,
        item_1_label:problem.item_1_label,
        item_2_label:problem.item_2_label,
        item_3_label:problem.item_3_label,
        item_4_label:problem.item_4_label,
        module:problem.module,
        session:problem.session,
        type:problem.type,
        validation:problem.validation,
        kc:problem.kc
    });
    
    micreator_problem_index = 0;
    set_input_values(micreator_problem_index);
    btn_micreator_next.disabled = false;
    btn_micreator_previous.disabled = true;
    
    // TO DO: POST to Firebase and implement auth and validation rules
    //console.log("POST to Firebase: "+JSON.stringify(problem_list));
    console.log(problem);
    console.log(problem_list);
    console.log("save_event");
});

btn_micreator_new.addEventListener('click',function(){
    btn_micreator_delete.classList.add("d-none");
    btn_micreator_update.classList.add("d-none");
    btn_micreator_previous.classList.add("d-none");
    btn_micreator_next.classList.add("d-none");
    btn_micreator_save.classList.remove("d-none");
    new_problem_input_values();
    console.log(problem);
    console.log(problem_list);
    console.log("new_event");
});

input_instructor.addEventListener('input',function(){
    problem.instructor = input_instructor.value;
    //console.log(problem.instructor);
});

input_condition.addEventListener('input',function(){
   problem.condition = input_condition.value;
   //console.log(problem.condition);
});

input_module.addEventListener('input',function(){
    problem.module = input_module.value;
});

input_instruction.addEventListener('input',function(){
    preview_instruction.textContent = input_instruction.value;
    problem.instruction = input_instruction.value;
    //console.log(problem.instruction);
});

input_response_kc.addEventListener('input',function(){
   problem.kc = input_response_kc.value; 
});

input_response_type.addEventListener('input',function(){
    set_problem_type(input_response_type.value);
    problem.type = input_response_type.value;
    //console.log(input_response_type.value);
});

input_client_avatar.addEventListener('input',function(){
    preview_client_avatar.src = input_client_avatar.value;
    problem.agent_1_src = input_client_avatar.value;
    //console.log(problem.agent_1_src);
});

input_therapist_avatar.addEventListener('input',function(){
    preview_therapist_avatar.src = input_therapist_avatar.value;
    problem.agent_2_src = input_therapist_avatar.value;
    //console.log(problem.agent_2_src);
});

input_client_statement.addEventListener('input',function(){
    preview_client_statement.textContent = input_client_statement.value;
    problem.agent_1_statement = input_client_statement.value;
    //console.log(problem.agent_1_statement);
});

input_therapist_statement.addEventListener('input',function(){
    preview_therapist_statement.textContent = input_therapist_statement.value;
    problem.agent_2_statement = input_therapist_statement.value;
    //console.log(problem.agent_2_statement);
});

input_response_option_1.addEventListener('input',function(){
    preview_radio_1_label.textContent = input_response_option_1.value;
    input_answer_key_1.textContent = input_response_option_1.value;
    input_answer_key_1.value = input_response_option_1.value;
    problem.item_1_label = input_response_option_1.value;
});

input_response_option_2.addEventListener('input',function(){
    preview_radio_2_label.textContent = input_response_option_2.value;
    input_answer_key_2.textContent = input_response_option_2.value;
    input_answer_key_2.value = input_response_option_2.value;
    problem.item_2_label = input_response_option_2.value;
});

input_response_option_3.addEventListener('input',function(){
    preview_radio_3_label.textContent = input_response_option_3.value;
    input_answer_key_3.textContent = input_response_option_3.value;
    input_answer_key_3.value = input_response_option_3.value;
    problem.item_3_label = input_response_option_3.value;
});

input_response_option_4.addEventListener('input',function(){
    preview_radio_4_label.textContent = input_response_option_4.value;
    input_answer_key_4.textContent = input_response_option_4.value;
    input_answer_key_4.value = input_response_option_4.value;
    problem.item_4_label = input_response_option_4.value;
});

input_answer_key.addEventListener('click',function(){
    problem.answerkey = input_answer_key.value;
    console.log(problem.answerkey); 
});

input_feedback_pos.addEventListener('input',function(){
    preview_positive_message.textContent = input_feedback_pos.value;
    problem.feedback_pos = input_feedback_pos.value;
});

input_feedback_neg.addEventListener('input',function(){
    preview_negative_message.textContent = input_feedback_neg.value;
    problem.feedback_neg = input_feedback_neg.value;
});

input_hint_1.addEventListener('input',function(){
    preview_hint_1_message.textContent = input_hint_1.value;
    problem.hint_1 = input_hint_1.value;
});

input_hint_2.addEventListener('input',function(){
    preview_hint_2_message.textContent = input_hint_2.value;
    problem.hint_2 = input_hint_2.value;
});

input_hint_3.addEventListener('input',function(){
    preview_hint_3_message.textContent = input_hint_3.value;
    problem.hint_3 = input_hint_3.value;
});

input_validation.addEventListener('input',function(){
    preview_validation_message.textContent = input_validation.value;
    problem.validation = input_validation.value;
});

// Event Listeners for MIDash

btn_midash_bykc.addEventListener('click',function(){
    graph_type_learningcurve = "Knowledge Component";
    cont_knowledge_components.classList.remove("d-none");
    cont_listgroup_controls.classList.add("d-none");
    cont_students.classList.add("d-none");
    graph_search_query.placeholder = "Search for a knowledge component";
    // Set default option for graph case example
    graph_case_example = "Open Question";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_bystudent.addEventListener('click',function(){
    graph_type_learningcurve = "Student";
    cont_knowledge_components.classList.add("d-none");
    cont_listgroup_controls.classList.remove("d-none");
    cont_students.classList.remove("d-none");
    graph_search_query.placeholder = "Search for the name of a student";
    // Set default option for graph case example
    set_searchlist_MIDash(graph_type_learningcurve,'');
    graph_case_example = graph_student1.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_assistance.addEventListener('click',function(){
    graph_unit_analysis = "Measure Assistance Score";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_error.addEventListener('click',function(){
    graph_unit_analysis = "Error Rate";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_incorrect.addEventListener('click',function(){
    graph_unit_analysis = "Number of Incorrects";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_hints.addEventListener('click',function(){
    graph_unit_analysis = "Number of Hints";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_stepduration.addEventListener('click',function(){
    graph_unit_analysis = "Step Duration";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_corstepduration.addEventListener('click',function(){
    graph_unit_analysis = "Correct Step Duration";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_errorstepduration.addEventListener('click',function(){
    graph_unit_analysis = "Error Step Duration";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_learnmore.addEventListener('click',function(){
    var learnmore_url = "https://pslcdatashop.web.cmu.edu/help?page=learningCurve#lc-types";
    window.open(learnmore_url, '_blank');
});

btn_midash_search.addEventListener('click',function(){
    search_index_MIDash = 0;
    set_searchlist_MIDash(graph_type_learningcurve,graph_search_query.value);
});

graph_openquest.addEventListener('click',function(){
    graph_case_example = "Open Question";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_closedquestquest.addEventListener('click',function(){
    graph_case_example = "Closed Question";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_reflection.addEventListener('click',function(){
    graph_case_example = "reflection";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
    
});

graph_affirm.addEventListener('click',function(){
    graph_case_example = "Affirmation";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_advisewithper.addEventListener('click',function(){
    graph_case_example = "Advise with Permission";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_advisewithoutper.addEventListener('click',function(){
    graph_case_example = "Advise Without Permission";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_confront.addEventListener('click',function(){
    graph_case_example = "Confront";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_givinginfo.addEventListener('click',function(){
    graph_case_example = "Giving Information";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_facilitate.addEventListener('click',function(){
    graph_case_example = "Facilitate";
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_structure.addEventListener('click',function(){
   graph_case_example = "Structure"; 
   learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student1.addEventListener('click',function(){
    graph_case_example = graph_student1.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student2.addEventListener('click',function(){
    graph_case_example = graph_student2.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student3.addEventListener('click',function(){
    graph_case_example = graph_student3.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student4.addEventListener('click',function(){
    graph_case_example = graph_student4.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student5.addEventListener('click',function(){
    graph_case_example = graph_student5.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student6.addEventListener('click',function(){
    graph_case_example = graph_student6.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student7.addEventListener('click',function(){
    graph_case_example = graph_student7.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student8.addEventListener('click',function(){
    graph_case_example = graph_student8.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student9.addEventListener('click',function(){
    graph_case_example = graph_student9.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

graph_student10.addEventListener('click',function(){
    graph_case_example = graph_student10.textContent;
    learningcurve_yAxis();
    learningcurve(graph_type_learningcurve, graph_unit_analysis, graph_case_example);
});

btn_midash_previous.addEventListener('click',function(){
    decrement_search_index_MIDash();
});

btn_midash_next.addEventListener('click',function(){
    increment_search_index_MIDash();
});