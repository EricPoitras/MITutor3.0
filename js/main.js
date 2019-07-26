

//Set the id for the user session
input_session_id.value = Math.random().toString(36).substring(7);
problem.session = input_session_id.value;

// Initialize the view in MICreator
set_input_values(micreator_problem_index);

// Initialize the view in MITutor
// TODO : Choose a problem from the list - then set the values from the list to the problem object in order to display it within the app in this following step
set_problem_index("random");

set_problem_values(problem_list_order[mitutor_problem_index]);

// Initialize the view in MIDash
 chart.render();

// TODO: Initialize the view when done with development
router('section_main');

//console.log("App load event");
