/**
 * Created with JetBrains WebStorm.
 * User: user
 * Date: 3/29/14
 * Time: 11:32 AM
 * To change this template use File | Settings | File Templates.
 */

WebConstants = {
    CODE_SENTENCE : 7101,
    CORRECT_SENTENCE : 7105
};

CodeUtterances = {
    linechart:null,
    currServer: config.feedback_api,
    currFile: config.feedback_file,
    currentData:{},
    getUrl:function(){
        return this.currServer+this.currFile;
    },
    codeClient:function(){
        var utterance = {};
        utterance.text = log.response;
        //console.log(utterance.text);
        utterance.speaker="client";
        this.codeUtterance(utterance);
    },
    codeTherapist: function(){
        var utterance = {};
        utterance.text = log.response;
        //console.log(utterance.text);
        utterance.speaker="therapist";
        this.codeUtterance(utterance);
    },
    codeUtterance:function(utterance){
        var jsontext=JSON.stringify(utterance);
        this.getFunctionAsObjectJSON(WebConstants.CODE_SENTENCE,{jsonobj:jsontext},this.utteranceReady,this);
    },
    utteranceReady:function(json){
        utterrnn = json.utterancernn;
        utterdsf = json.utterancedsf;
        utterdsf.classprobs.series[0].name="DSF";
        utterrnn.classprobs.series[0].name="RNN";
        this.currentData=json;
        var text = utterrnn.text;
        var allseries = utterrnn.classprobs;
        allseries.series.push(utterdsf.classprobs.series[0]);
        log.qualifier = utterdsf.bestguess;
        //console.log(log.qualifier);
        if(log.qualifier == "reflection_complex" && problem.answerkey == "Reflection"){
            log.evaluation = "correct";
        }else if(log.qualifier == "reflection_simple" && problem.answerkey == "Reflection"){
            log.evaluation = "correct"; 
        }else{
            log.evaluation = "incorrect";
        }
        /*
        document.getElementById("DSF_best").innerText = utterdsf.bestguess;
        document.getElementById("RNN_best").innerText = utterrnn.bestguess;
        document.getElementById("Utterance").innerText = utterdsf.text;
        document.getElementById("Speaker").innerText = utterdsf.speaker;
        document.getElementById("DSF_Advise_wop").innerText = utterdsf.classprobs.series[0].data[0];
        document.getElementById("DSF_facilitate").innerText = utterdsf.classprobs.series[0].data[1];
        document.getElementById("DSF_advise_wp").innerText = utterdsf.classprobs.series[0].data[2];
        document.getElementById("DSF_reflection_complex").innerText = utterdsf.classprobs.series[0].data[3];
        document.getElementById("DSF_changetalk").innerText = utterdsf.classprobs.series[0].data[4];
        document.getElementById("DSF_confront").innerText = utterdsf.classprobs.series[0].data[5];
        document.getElementById("DSF_na_other").innerText = utterdsf.classprobs.series[0].data[6];
        document.getElementById("DSF_neutral").innerText = utterdsf.classprobs.series[0].data[7];
        document.getElementById("DSF_question_closed").innerText = utterdsf.classprobs.series[0].data[8];
        document.getElementById("DSF_structure").innerText = utterdsf.classprobs.series[0].data[9];
        document.getElementById("DSF_reflection_simple").innerText = utterdsf.classprobs.series[0].data[10];
        document.getElementById("DSF_affirm").innerText = utterdsf.classprobs.series[0].data[11];
        document.getElementById("DSF_givinginfo").innerText = utterdsf.classprobs.series[0].data[12];
        document.getElementById("DSF_question_open").innerText = utterdsf.classprobs.series[0].data[13];
        document.getElementById("DSF_sustain").innerText = utterdsf.classprobs.series[0].data[14];
        document.getElementById("RNN_Advise_wop").innerText = utterrnn.classprobs.series[0].data[0];
        document.getElementById("RNN_facilitate").innerText = utterrnn.classprobs.series[0].data[1];
        document.getElementById("RNN_advise_wp").innerText = utterrnn.classprobs.series[0].data[2];
        document.getElementById("RNN_reflection_complex").innerText = utterrnn.classprobs.series[0].data[3];
        document.getElementById("RNN_changetalk").innerText = utterrnn.classprobs.series[0].data[4];
        document.getElementById("RNN_confront").innerText = utterrnn.classprobs.series[0].data[5];
        document.getElementById("RNN_na_other").innerText = utterrnn.classprobs.series[0].data[6];
        document.getElementById("RNN_neutral").innerText = utterrnn.classprobs.series[0].data[7];
        document.getElementById("RNN_question_closed").innerText = utterrnn.classprobs.series[0].data[8];
        document.getElementById("RNN_structure").innerText = utterrnn.classprobs.series[0].data[9];
        document.getElementById("RNN_reflection_simple").innerText = utterrnn.classprobs.series[0].data[10];
        document.getElementById("RNN_affirm").innerText = utterrnn.classprobs.series[0].data[11];
        document.getElementById("RNN_givinginfo").innerText = utterrnn.classprobs.series[0].data[12];
        document.getElementById("RNN_question_open").innerText = utterrnn.classprobs.series[0].data[13];
        document.getElementById("RNN_sustain").innerText = utterrnn.classprobs.series[0].data[14];
        drawChart();
        drawChart2();
        // Log performance data to MySQL database - lab evaluation EP 11 10 2018
        d = new Date();
        n = d.toUTCString();
        docurl = document.URL;
        console.log(utterrnn);
        console.log(utterdsf);
        view_controller("export");
        downloadCSV();*/
        /*$.post("http://localhost/KentEllsworthMAThesisFall2018MITutorFeedbackStudy/NIHdepthlabfall2018Corrective/admin/apilog.php",{logtimestamp: n, logwebpage: docurl, session: sessionStorage.sessionid, username: sessionStorage.username, logutterrnn: JSON.stringify(utterrnn), logutterdsf: JSON.stringify(utterdsf)});*/
    },
    getFunctionAsObjectJSON: function (functionid, params, onComplete, context) {
        params["function"] = functionid;
        params["json"] = true;
        params["nocache"] = new Date().getTime();
        var thisurl = this.getUrl();
        var request = $.ajax({
            type: "POST",
            url: thisurl, //Requesting simple.xml
            dataType: "json",
            data: params,
            context: context
        });
        request.done( function (data, textStatus, jqXHR) {
                var json = data;
                if(json.hasOwnProperty("error")){
                    ModelTracking.alert(json.error);
                }
                onComplete.call(this, json);
            }
        );
        request.fail(CodeUtterances.errorFunction);
    },
    errorFunction:function(jqXHR, textStatus, errorThrown){
        CodeUtterances.alert("Problem connecting: "+textStatus);
    },
    alert:function(text){
        console.log(text);
    },
    formatDate:function(date){
        if(date==null)return "";
        else if (!(date instanceof Date)){
            date = new Date(date);
        }
        return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' +  date.getUTCFullYear();
    }
}

function extractMonthFromDate(date){
    if(date==null)return"";
    else{
        var month=new Array();
        month[0]="January";
        month[1]="February";
        month[2]="March";
        month[3]="April";
        month[4]="May";
        month[5]="June";
        month[6]="July";
        month[7]="August";
        month[8]="September";
        month[9]="October";
        month[10]="November";
        month[11]="December";
        var n = month[date.getMonth()];
        return n;
    }
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    //local.setMinutes(this.getMinutes() );
    return local.toJSON().slice(0,10);
});

function roundToHundreths(value){
    if(value!=null){
        value=Math.round(100*value)/100
    }
    return value;
}