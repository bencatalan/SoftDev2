function Obligation (obligationid,userid,name,description,startTime,endTime,priority,status,category)
{
    this.obligationid = obligationid;
    this.userid = userid;
	this.name = name
	this.description = description
	this.startTime = startTime
	this.endTime = endTime;
	this.priority = priority;
	this.status = status;
	this.category = category;
}

Obligation.prototype.toString = function() {
    return "Name: "+ this.name + "\nDescription: "+this.description+ "\nStart time:"+this.startTime+"\nEnd Time:"+this.endTime+"\n";
}

function deleteObligation(obligation_id) {
    var path = "/obligations/" + obligation_id;
    $.ajax({
        url: path,
        type: 'DELETE',
        success: function() {
            alert('Obligation has successfully been Deleted.');
            location.reload();
        },
        error: function(){
            alert('error! could not delete ' + obligation_id);
            location.reload();
        }
    });
}