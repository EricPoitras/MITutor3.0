Version 1.0 - 7/22/2019

1. Firebase Database Documentation
----------------------------------



2. List of Database Tables
----------------------------------

mitutordatabase
    |log
        |document_id
            |attempt
    |problem
        |problem_id
            |agent_1_src
    
2.1. Log (log and log_list in data.js)
----------------------------------

- attempt
    
    Description: Number of attempts made by a student to solve a given problem. Students make another attempt at solving the problem by selecting "Repeat" in MITutor. The value is incremented for each attempt, and set to a value of 0 when students select "Next".
    
    Range: Integer; Continuous (0,1,2,...); Default: 0
    
    Variable: attempt_count

- hint_request

    Description: Number of hints requested by a student while solving a given problem. Students can make up to a total of 3 requests, with default being no request made to view a hint (since hints are initially hidden) in MITutor. The value is incremented for each request, and set to a value of 0 when students select "Next".
    
    Range: Integer; Continuous (0,1,2,3); Default: 0
    
    Variable: hint_request_count

- condition

    Description: Metadata added by an instructor in MICreator. It's purpose is to be used as part of studies to evaluate different versions of MICreator. The value for condition is added to the config.js document as a means to serve as a conditional statement in controllers and routers - meaning that information will be displayed or treated different depending on the condition value. 
    
    Range: String; Example: Treatment_Fall_2019_Poitras
    
    Variable: config.condition (see config.js)

- elapsedtime

    Description: The elapsed time in milliseconds spent by a student solving a problem in MITutor. 
    
    timer_start() function is called when the problem data, controls, and containers are initialized in MITutor (i.e., set_problem_values()).
    
    timer_end() function is called when user clicks the "Submit" button in MITutor.
    
    The timeDiff variable is set to the difference between both timer_end and timer_start new Date() objects. The Date object represents the current date and time, specified in the local time zone, as of the time of instantiation. The returned result will be a score that represents the millisecond duration on problem. 
    
    The values for startTime, endTime, and timeDiff are set to 0 when the user clicks on the "Next" button. 
    
    Range: Integer; Continuous (0 - ...); Default: 0
    
    Variable: startTime, endTime, timeDiff

- evaluation

    Description: The evaluation score is binomial, either "correct" or "incorrect".
    
    The problem.answerkey is matched with the log.response variables to determine correctness. In the case of textual responses, with open ended questions, the API results in a classification 'reflection_complex', which is stored in log.qualifier. The log.qualifier value is matched to the problem.answerkey to determine correctness. In the case of radio button items (i.e., TrueFalse or Multi) the value or textContent of the label for the radiobutton is assigned to log.response and compared to problem.answerkey.
    
    To allow for the API to score the response and push the resulting object to the list, there is a delay of 5 seconds until the feedback is delivered to the learner. 

    Range: Binomial; String ("correct","incorrect"); Default: ""
    
    Variable: config.feedback_api, config.feedback_file
    
- item
    
    Description: The item serves as an identifier for the problem, which is stored in both the problem and log tables, allowing for alignment of each. The value consists of a series of random characters and cannot be edited by instructors. A new value is generated when the user clicks on the "New" button in MICreator. 
    
    Range: Nominal; String ("6rzxxi")
    
    Variable: N/A (see function new_problem_input_values() in controller.js)

- kc

    Description: An identifier for the knowledge component or skill acquired by student and related to the problem. For instance, an open-ended, multiple-choice, or true and false item may all be used to assess and instruct students on how to make a "reflection". 
    
    Range: Nominal; String ("reflection"); Default ("NA" - Set when an instructor creates a new problem)
    
    Variable: N/A (see input_response_kc for list of supported knowledge components in MITutor)

- module

    Description: An identifier for the type of module or group of similar problems. For instance, modules may support students to identify, categorize, or elaborate their own reflections. 
    
    Range: Nominal; String ("Identify Reflection"); Default ("" - Set when an instructor creates a new problem)
    
    Variable: N/A (see input_module for textbox where instructors can define modules in MITutor)

- qualifier

    Description: A label assigned by the API to score utterances according to Motivational Interview skills. For example, an utterance may be scored as "reflection_simple". MITutor considers both "reflection_simple" and "reflection_complex" as equal to "Reflection" in the answer key used to evaluate a response as correct. The result of the evaluation is stored in "log.evaluation". For the complete list of labels, see  the following:
    
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
    
    Range: Nominal; String ("reflection_complex"); Default ("" - Set when a student clicks next in MITutor to begin a new problem)
    
    Variable: N/A (see CodeUtterances.js for API call to assign label to the response)

- response

    Description: A string of text that characterizes the student response. For true and false items or multiple-choice, the value of the radio button is assigned as the response. The response value is compared against the answer key to determine whether a problem is correct or incorrect, the resulting value is stored in log.evaluation (see evaluation_response() in controller.js). For open-ended items, the value of the text area input is assigned as the response. 
    
    Range: Nominal; String ("It seems like you feel bad today.); Default ("" - Set when a student clicks next in MITutor to begin a new problem)
    
    Variable: N/A (see evaluation_response() for evaluation of radio button responses; otherwise event listeners assign the value of the input event)

- session

    Description: The session serves as an identifier for the student session, which is set when the application loads in the web browser, and is stored as a constant value throughout solving multiple problems or creating several problems. The value consists of a series of random characters and cannot be edited by instructors.
    
    Range: Nominal; String ("6rzxxi")
    
    Variable: N/A (see main.js)

- step 

    Description: Since the order of problems of each session is randomized, the step in combination with the attempt number, can be used to determine the actual order of problems delivered to any particular students. 
    
    Range: Integer; Continuous (0 - ...); Default: 0
    
    Variable: step_count (assigned to log.step in set_log_values(); incremented when the student clicks on next - multiple attempts, 0, 1, 2 will all be assigned to the same step, e.g., 2 )

- student

    Description: An identifier in MITutor for the student. The display name written during the user authentification process in Firebase is assigned when the user will sign into the app. The value is set to null when the user signs out of the app, at which point the app is refreshed in the browser to start a new session.
    
    Range: Nominal; String ("Eric Poitras")
    
    Variable: N/A (assigned in set_log_values(); set to "" in reset_log_values())

- time

    Description: The number of milliseconds since midnight, January 1, 1970 (the internal clock in JavaScript).
    
    Range: String; Numeric Converted to String ("12652454345363");
    
    Variable: time (assigned in set_log_values(); set to "" in reset_log_values())


2.2. Problem Table Values
----------------------------------

- agent_1_src

    Description: The value of the src attribute to the file path of the agent avatar image. The agent_1 refers to the client (shown at the left) in the preview window of MICreator. 
    
    Range: String; ("asset/avatar1.png"; up to a maximum of avatar9.png); set to avatar1.png by default
    
    Variable: N/A (assigned via an event listener associated to input_client_avatar)

- agent_1_statement

    Description: The value of the paragraph displayed in the card adjacent to the client avatar. The paragraph is assigned a string of text, which represents what utterance was spoken by the client. 
    
    Range: String ("I've been drinking heavily.")
    
    Variable: N/A (assigned via an input event listener associated to input_client_statement)

- agent_2_src

    Description: The value of the src attribute to the file path of the agent avatar image. The agent_2 refers to the therapist (shown at the right) in the preview window of MICreator. 
    
    Range: String; ("asset/avatar1.png"; up to a maximum of avatar9.png); set to avatar1.png by default
    
    Variable: N/A (assigned via an event listener associated to input_therapist_avatar)

- agent_2_statement

    Description: The value of the paragraph displayed in the card adjacent to the client avatar. The paragraph is assigned a string of text, which represents what utterance was spoken by the client. 
    
    Range: String ("You seem to be feeling bad.")
    
    Variable: N/A (assigned via an input event listener associated to input_client_statement)

- answerkey

    Description: The value of the ideal or correct response as set by the instructor and used by the system to evaluate the student response. For true and false or multiple choice items, the value of the answerkey is set to the text Content of the label, which is synonymous with the value of each input. For open-ended items, the value of the answer is set to "reflection", or any other knowledge component supported by the system.
    
    Range: String; ("reflection", "You seem to be feeling bad")
    
    Variable: N/A (assigned via an input event listener associated to input_answer_key).

- condition

    Description: The value of the experimental condition or version of MITutor tested in a study. 
    
    Range: String ("Treatment Fall 2019 v3.01 Poitras")
    
    Variable: N/A (assigned via an input event listener associated to input_condition)

- feedback_neg

    Description: The value of the feedback to be delivered to the student if their response is evaluated by the system as negative.
    
    Range: String ("That is incorrect. You may want to consider saying something ...")
    
    Variable: N/A (assigned via an input event listener associated to input_feedback_neg)

- feedback_pos

    Description: The value of the feedback to be delivered to the student if their response is evaluated by the system as positive.
    
    Range: String ("That is correct. You may want to consider saying something ...")
    
    Variable: N/A (assigned via an input event listener associated to input_feedback_pos)

- hint_1

    Description: The value of the hint message to be delivered to the student on their initial request.
    
    Range: String ("Try perhaps ...")
    
    Variable: N/A (assigned via an input event listener associated to input_hint_1)

- hint_2

    Description: The value of the hint message to be delivered to the student on their second request.
    
    Range: String ("You may want to try...")
    
    Variable: N/A (assigned via an input event listener associated to input_hint_2)

- hint_3

    Description: The value of the hint message to be delivered to the student on their last request.
    
    Range: String ("Let's try to ...")
    
    Variable: N/A (assigned via an input event listener associated to input_hint_3)

- instruction

    Description: The value of the instruction message to be delivered to the student on how to solve the problem.
    
    Range: String ("Reflections are... In this case, try to rephrase what the client said by re-writing what the therapist has said.")
    
    Variable: N/A (assigned via an input event listener associated to input_instruction)

- instructor

    Description: The name of the instructor who created the problem in MICreator.
    
    Range: String ("Eric Poitras")
    
    Variable: N/A (assigned via an input event listener associated to input_instructor)

- item

    Description: The item serves as an identifier for the new item created by an instructor, which is set when the instructor creates a new problem in MICreator, and is stored as a constant value as multiple students solve the same problem. The value consists of a series of random characters and cannot be edited by instructors.
    
    Range: Nominal; String ("6rzxxi")
    
    Variable: N/A (see new_problem_input_values() in controller.js)

- item_1_label

    Description: The label of a radio button, which is set using both the textContent of the label and value of the radio input. The value of the radio input is only set for true and false items (if applicable) and multiple choice items.
    
    Range: String ("You sound like...")
    
    Variable: N/A (assigned via an input event listener associated to input_response_option_1)

- item_2_label

    Description: The label of a radio button, which is set using both the textContent of the label and value of the radio input. The value of the radio input is only set for true and false items (if applicable) and multiple choice items.
    
    Range: String ("You must feel that...")
    
    Variable: N/A (assigned via an input event listener associated to input_response_option_2)

- item_3_label

    Description: The label of a radio button, which is set using both the textContent of the label and value of the radio input. The value of the radio input is only set for true and false items (if applicable) and multiple choice items.
    
    Range: String ("You drink a lot.")
    
    Variable: N/A (assigned via an input event listener associated to input_response_option_3)

- item_4_label

    Description: The label of a radio button, which is set using both the textContent of the label and value of the radio input. The value of the radio input is only set for true and false items (if applicable) and multiple choice items.
    
    Range: String ("You crazy man, you just crazy.")
    
    Variable: N/A (assigned via an input event listener associated to input_response_option_4)

- module

    Description: An identifier for the type of module or group of similar problems. For instance, modules may support students to identify, categorize, or elaborate their own reflections. 
    
    Range: Nominal; String ("Identify Reflection"); Default ("" - Set when an instructor creates a new problem)
    
    Variable: N/A (see input_module for textbox where instructors can define modules in MITutor)

- session

    Description: The session serves as an identifier for the student session, which is set when the application loads in the web browser, and is stored as a constant value throughout solving multiple problems or creating several problems. The value consists of a series of random characters and cannot be edited by instructors.
    
    Range: Nominal; String ("6rzxxi")
    
    Variable: N/A (see main.js)

- type

    Description: The type of problem created by an instructor. For example, the values may range from NA (default - not specified), TrueFalse (True/False items), Multi (Multi-choice items), Open (Open-ended item). The value property of each item option in the dropdown menu is assigned to problem.type. 
    
    Range: Nominal; String (NA, TrueFalse, Multi, Open)
    
    Variable: N/A (see input_response_type event listener and set_problem_type() in controller.js)

- validation

    Description: The value of the validation message to be delivered to the student if their response fails to meet certain criteria. The criteria for open-ended items is for the response to have a length greater than 1 character.
    
    Range: String ("Oops, it looks like you didn't write enough for your response. Try again.")
    
    Variable: N/A (assigned via an input event listener associated to input_validation; The validation conditions are set at the problem_controls_submit() listener) 
    
- kc

    Description: An identifier for the knowledge component or skill acquired by student and related to the problem. For instance, an open-ended, multiple-choice, or true and false item may all be used to assess and instruct students on how to make a "reflection". 
    
    Range: Nominal; String ("reflection"); Default ("NA" - Set when an instructor creates a new problem)
    
    Variable: N/A (see input_response_kc for list of supported knowledge components in MITutor)


