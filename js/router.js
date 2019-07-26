// TODO: Add sections for MITutor and MIDash

function router(view){
    hide_all_views();
    switch(view){
        case 'section_main':
            section_main.classList.remove("d-none");
        break;
        case 'section_dashboard':
            section_dashboard.classList.remove("d-none");
        break;
        case 'section_micreator':
            section_micreator.classList.remove("d-none");
        break;
        case 'section_mitutor':
            section_mitutor.classList.remove("d-none");
        break;
        case 'section_midash':
            section_midash.classList.remove("d-none");
        break;
        default:
            section_main.classList.remove("d-none");
        break;
   }
}

function hide_all_views(){
    section_main.classList.add("d-none");
    section_dashboard.classList.add("d-none");
    section_micreator.classList.add("d-none");
    section_mitutor.classList.add("d-none");
    section_midash.classList.add("d-none");
}