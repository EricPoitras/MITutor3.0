// Counters
var hint_request_count = 0;
var attempt_count = 0;
var step_count = 0;
var startTime = 0, endTime = 0, timeDiff = 0;
var micreator_problem_index = 0;
var mitutor_problem_index = 0;
var problem_list_order = [];
var graph_type_learningcurve = "Knowledge Component";
var graph_unit_analysis = "Error Rate";
var graph_case_example = "reflection";
var yAxis = new Array(20).fill(0);
var yAxis_observations = new Array(20).fill(0);
var arr_measure_assistance_score = new Array(20).fill(0);
var arr_error_rate = new Array(20).fill(0);
var arr_step_duration = new Array(20).fill(0);
var arr_correct_step_duration = new Array(20).fill(0);
var arr_incorrect_step_duration = new Array(20).fill(0);
var arr_number_incorrect = new Array(20).fill(0);
var arr_number_hints = new Array(20).fill(0);
var search_results_MICreator = [];
var search_index_MICreator = 0;
var search_results_MIDash = [];
var search_index_MIDash = 0;
var module_list_MITutor = [];
var module_index_MITutor = 0;
var module_count_MITutor = [];
var module_completioncount_MITutor = [];

// UI Views
var section_nav = document.getElementById("section_nav");
var section_main = document.getElementById("section_main");
var section_dashboard = document.getElementById("section_dashboard");
var section_micreator = document.getElementById("section_micreator");
var section_mitutor = document.getElementById("section_mitutor");
var section_midash = document.getElementById("section_midash");

// User Inputs
var btn_sign_in = document.getElementById("btn_sign_in");
var btn_mitutor = document.getElementById("btn_mitutor");
var btn_micreator = document.getElementById("btn_micreator");
var btn_midash = document.getElementById("btn_midash");
var btn_settings_dashboard = document.getElementById("btn_settings_dashboard");

var btn_micreator_previous = document.getElementById("btn_micreator_previous");
var btn_micreator_next = document.getElementById("btn_micreator_next");
var btn_micreator_delete = document.getElementById("btn_micreator_delete");
var btn_micreator_update = document.getElementById("btn_micreator_update");
var btn_micreator_save = document.getElementById("btn_micreator_save");
var btn_micreator_new = document.getElementById("btn_micreator_new");

var btn_micreator_dropdown = document.getElementById("btn_micreator_dropdown");
var btn_micreator_search1 = document.getElementById("btn_micreator_search1");
var btn_micreator_search2 = document.getElementById("btn_micreator_search2");
var btn_micreator_search3 = document.getElementById("btn_micreator_search3");
var btn_micreator_showmore = document.getElementById("btn_micreator_showmore");
var input_micreator_query = document.getElementById("input_micreator_query");
var btn_micreator_search = document.getElementById("btn_micreator_search");

var btn_mitutor_mod = document.getElementById("btn_mitutor_mod");
var btn_mitutor_mod_1 = document.getElementById("btn_mitutor_mod_1");
var btn_mitutor_mod_2 = document.getElementById("btn_mitutor_mod_2");
var btn_mitutor_mod_3 = document.getElementById("btn_mitutor_mod_3");
var bar_mitutor_mod_1 = document.getElementById("bar_mitutor_mod_1");
var bar_mitutor_mod_2 = document.getElementById("bar_mitutor_mod_2");
var bar_mitutor_mod_3 = document.getElementById("bar_mitutor_mod_3");
var btn_mitutor_showmore = document.getElementById("btn_mitutor_showmore");

var btn_midash_curves = document.getElementById("btn_midash_curves");
var btn_midash_bykc = document.getElementById("btn_midash_bykc");
var btn_midash_bystudent = document.getElementById("btn_midash_bystudent");
var btn_midash_assistance = document.getElementById("btn_midash_assistance");
var btn_midash_error = document.getElementById("btn_midash_error");
var btn_midash_incorrect = document.getElementById("btn_midash_incorrect");
var btn_midash_hints = document.getElementById("btn_midash_hints");
var btn_midash_stepduration = document.getElementById("btn_midash_stepduration");
var btn_midash_corstepduration = document.getElementById("btn_midash_corstepduration");
var btn_midash_errorstepduration = document.getElementById("btn_midash_errorstepduration");
var btn_midash_learnmore = document.getElementById("btn_midash_learnmore");
var btn_midash_search = document.getElementById("btn_midash_search");
var btn_midash_previous = document.getElementById("btn_midash_previous");
var btn_midash_next = document.getElementById("btn_midash_next");

// HTML Elements
var alert_dashboard_success = document.getElementById("alert_dashboard_success");
var alert_dashboard_warning = document.getElementById("alert_dashboard_warning");

// User Inputs - MI Creator
var input_session_id = document.getElementById("input_session_id");
var input_problem_id = document.getElementById("input_problem_id");
var input_module = document.getElementById("input_module");
var input_instructor = document.getElementById("input_instructor");
var input_condition = document.getElementById("input_condition");
var input_response_type = document.getElementById("input_response_type");
var input_response_kc = document.getElementById("input_response_kc");
var input_response_option_1 = document.getElementById("input_response_option_1");
var input_response_option_2 = document.getElementById("input_response_option_2");
var input_response_option_3 = document.getElementById("input_response_option_3");
var input_response_option_4 = document.getElementById("input_response_option_4");
var input_answer_key = document.getElementById("input_answer_key");
var input_instruction = document.getElementById("input_instruction");
var input_client_avatar = document.getElementById("input_client_avatar");
var input_client_statement = document.getElementById("input_client_statement");
var input_therapist_avatar = document.getElementById("input_therapist_avatar");
var input_therapist_statement = document.getElementById("input_therapist_statement");
var input_feedback_pos = document.getElementById("input_feedback_pos");
var input_feedback_neg = document.getElementById("input_feedback_neg");
var input_hint_1 = document.getElementById("input_hint_1");
var input_hint_2 = document.getElementById("input_hint_2");
var input_hint_3 = document.getElementById("input_hint_3");
var input_validation = document.getElementById("input_validation");
var input_answer_key_1 = document.getElementById("input_answer_key_1");
var input_answer_key_2 = document.getElementById("input_answer_key_2");
var input_answer_key_3 = document.getElementById("input_answer_key_3");
var input_answer_key_4 = document.getElementById("input_answer_key_4");

// HTML Elements - MICreator
var preview_instruction = document.getElementById("preview_instruction");
var preview_client_avatar = document.getElementById("preview_client_avatar");
var preview_client_statement = document.getElementById("preview_client_statement");
var preview_therapist_statement = document.getElementById("preview_therapist_statement");
var preview_therapist_avatar = document.getElementById("preview_therapist_avatar");
var preview_positive_message = document.getElementById("preview_positive_message");
var preview_negative_message = document.getElementById("preview_negative_message");
var preview_validation_message = document.getElementById("preview_validation_message");
var preview_hint_1_message = document.getElementById("preview_hint_1_message");
var preview_hint_2_message = document.getElementById("preview_hint_2_message");
var preview_hint_3_message = document.getElementById("preview_hint_3_message");
var preview_radio_1_label = document.getElementById("preview_radio_1_label");
var preview_radio_2_label = document.getElementById("preview_radio_2_label");
var preview_radio_3_label = document.getElementById("preview_radio_3_label");
var preview_radio_4_label = document.getElementById("preview_radio_4_label");
var preview_textarea = document.getElementById("preview_textarea");

// Containers - MICreator
var cont_response_option_1 = document.getElementById("cont_response_option_1");
var cont_response_option_2 = document.getElementById("cont_response_option_2");
var cont_response_option_3 = document.getElementById("cont_response_option_3");
var cont_response_option_4 = document.getElementById("cont_response_option_4");
var cont_preview_radio_1 = document.getElementById("cont_preview_radio_1");
var cont_preview_radio_2 = document.getElementById("cont_preview_radio_2");
var cont_preview_radio_3 = document.getElementById("cont_preview_radio_3");
var cont_preview_radio_4 = document.getElementById("cont_preview_radio_4");
var cont_preview_textarea = document.getElementById("cont_preview_textarea");
var cont_preview_client = document.getElementById("cont_preview_client");
var cont_preview_therapist = document.getElementById("cont_preview_therapist");
var cont_preview_response = document.getElementById("cont_preview_response");
var cont_response_client_avatar = document.getElementById("cont_response_client_avatar");
var cont_response_client_statement = document.getElementById("cont_response_client_statement");
var cont_response_therapist_avatar = document.getElementById("cont_response_therapist_avatar");
var cont_response_therapist_statement = document.getElementById("cont_response_therapist_statement");
var cont_input_answer_key = document.getElementById("cont_input_answer_key");
var cont_input_feedback_pos = document.getElementById("cont_input_feedback_pos");
var cont_input_feedback_neg = document.getElementById("cont_input_feedback_neg");
var cont_input_hint_1 = document.getElementById("cont_input_hint_1");
var cont_input_hint_2 = document.getElementById("cont_input_hint_2");
var cont_input_hint_3 = document.getElementById("cont_input_hint_3");
var cont_input_validation = document.getElementById("cont_input_validation");

// User Inputs - MI Tutor
var problem_radio_1 = document.getElementById("problem_radio_1");
var problem_radio_2 = document.getElementById("problem_radio_2");
var problem_radio_3 = document.getElementById("problem_radio_3");
var problem_radio_4 = document.getElementById("problem_radio_4");
var problem_textarea = document.getElementById("problem_textarea");
var problem_controls_submit = document.getElementById("problem_controls_submit");
var problem_controls_hint = document.getElementById("problem_controls_hint");
var problem_controls_repeat = document.getElementById("problem_controls_repeat");
var problem_controls_next = document.getElementById("problem_controls_next");

// HTML Elements - MITutor
var problem_instruction_message = document.getElementById("problem_instruction_message");
var problem_client_avatar = document.getElementById("problem_client_avatar");
var problem_client_statement = document.getElementById("problem_client_statement");
var problem_therapist_avatar = document.getElementById("problem_therapist_avatar");
var problem_therapist_statement = document.getElementById("problem_therapist_statement");
var problem_positive_message = document.getElementById("problem_positive_message");
var problem_negative_message = document.getElementById("problem_negative_message");
var problem_hint_1_message = document.getElementById("problem_hint_1_message");
var problem_hint_2_message = document.getElementById("problem_hint_2_message");
var problem_hint_3_message = document.getElementById("problem_hint_3_message");
var problem_validation_message = document.getElementById("problem_validation_message");
var problem_radio_1_label = document.getElementById("problem_radio_1_label");
var problem_radio_2_label = document.getElementById("problem_radio_2_label");
var problem_radio_3_label = document.getElementById("problem_radio_3_label");
var problem_radio_4_label = document.getElementById("problem_radio_4_label");
var problem_module_1 = document.getElementById("problem_module_1");
var problem_module_2 = document.getElementById("problem_module_2");
var problem_module_3 = document.getElementById("problem_module_3");

// Containers - MITutor
var cont_problem_client = document.getElementById("cont_problem_client");
var cont_problem_therapist = document.getElementById("cont_problem_therapist");
var cont_problem_response = document.getElementById("cont_problem_response");
var cont_problem_radio_1 = document.getElementById("cont_problem_radio_1");
var cont_problem_radio_2 = document.getElementById("cont_problem_radio_2");
var cont_problem_radio_3 = document.getElementById("cont_problem_radio_3");
var cont_problem_radio_4 = document.getElementById("cont_problem_radio_4");
var cont_problem_textarea = document.getElementById("cont_problem_textarea");
var cont_problem_controls = document.getElementById("cont_problem_controls");

// User Inputs - MIDash
var graph_search_query = document.getElementById("graph_search_query");
var graph_openquest = document.getElementById("graph_openquest");
var graph_closedquestquest = document.getElementById("graph_closedquestquest");
var graph_reflection = document.getElementById("graph_reflection");
var graph_affirm = document.getElementById("graph_affirm");
var graph_advisewithper = document.getElementById("graph_advisewithper");
var graph_advisewithoutper = document.getElementById("graph_advisewithoutper");
var graph_confront = document.getElementById("graph_confront");
var graph_givinginfo = document.getElementById("graph_givinginfo");
var graph_facilitate = document.getElementById("graph_facilitate");
var graph_structure = document.getElementById("graph_structure");

var graph_student1 = document.getElementById("graph_student1");
var graph_student2 = document.getElementById("graph_student2");
var graph_student3 = document.getElementById("graph_student3");
var graph_student4 = document.getElementById("graph_student4");
var graph_student5 = document.getElementById("graph_student5");
var graph_student6 = document.getElementById("graph_student6");
var graph_student7 = document.getElementById("graph_student7");
var graph_student8 = document.getElementById("graph_student8");
var graph_student9 = document.getElementById("graph_student9");
var graph_student10 = document.getElementById("graph_student10");

// Containers - MIDash
var cont_knowledge_components = document.getElementById("cont_knowledge_components");
var cont_listgroup_controls = document.getElementById("cont_listgroup_controls");
var cont_students = document.getElementById("cont_students");
