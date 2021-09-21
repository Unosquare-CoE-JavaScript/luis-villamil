const deepJS = defineWorkshop();

deepJS.addStundet(313, "Frank", true);
deepJS.addStundet(410, "Suzy", true);
deepJS.addStundet(709, "Brian", false);
deepJS.addStundet(105, "Henry", false);
deepJS.addStundet(502, "Mary", true);
deepJS.addStundet(664, "Bob", false);
deepJS.addStundet(250, "Peter", true);
deepJS.addStundet(375, "Sarah", true);
deepJS.addStundet(867, "Greg", false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);


deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
deepJS.printCurrentEnrollment();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/


// ********************************

function defineWorkshop() {
	let studentRecords = [];
	let currentEnrollment = [];

	return {
		addStundet,
		enrollStudent,
		printCurrentEnrollment,
		enrollPaidStudents,
		remindUnpaidStudents,
	}

	// Public

	function addStundet(id, name, paid) {
		studentRecords = [...studentRecords, { id, name, paid }];
	}

	function enrollStudent(id) {
		if (!currentEnrollment.includes(id)) {
			currentEnrollment = [...currentEnrollment, id];
		}
	}

	function printCurrentEnrollment() {
		printRecords(currentEnrollment);
	}

	function enrollPaidStudents() {
		currentEnrollment = paidStudentsToEnroll();
	}

	function remindUnpaidStudents() {
		var unpaidIds = currentEnrollment.filter(notYetPaid);
		printRecords(unpaidIds);
	}

	// Private

	function printRecords(recordIds) {
		var records = recordIds.map(getStudentFromId);
	
		records.sort(sortByNameAsc);
		records.forEach(printRecord);
	}

	function getStudentFromId(studentId) {
		return studentRecords.find(matchId);
	
		// *************************
	
		function matchId(record) {
			return (record.id == studentId);
		}
	}
	
	function sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	}
	
	function printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	}
	
	function paidStudentsToEnroll() {
		var recordsToEnroll = studentRecords.filter(needToEnroll);
	
		var idsToEnroll = recordsToEnroll.map(getStudentId);
	
		return [ ...currentEnrollment, ...idsToEnroll ];
	}

	function needToEnroll(record) {
		return (record.paid && !currentEnrollment.includes(record.id));
	}
	
	function getStudentId(record) {
		return record.id;
	}
	
	function notYetPaid(studentId) {
		var record = getStudentFromId(studentId);
		return !record.paid;
	}
	

}





