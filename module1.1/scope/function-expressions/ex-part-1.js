function printRecords(recordIds) {
	studentRecords
		.filter(function getStudent(student) {
			return recordIds.includes(student.id);
		})
		.sort(sortByStudentName)
		.forEach(printStudent);
}

function paidStudentsToEnroll() {
	return [
		...currentEnrollment,
		...studentRecords
		.filter(function getPaidStudentsToEnroll(student) {
			return student.paid && !currentEnrollment.includes(student.id)
		})
		.map(getStudentById)
	]
}

function remindUnpaid(recordIds) {
	const remaindUnPaidStudents = 	
		studentRecords
			.filter(function getStudent(student) {
				return recordIds.includes(student.id) && !student.paid;
			})
			.map(getStudentById);
	printRecords(remaindUnPaidStudents);
}

function getStudentById(student) {
	return student.id;
}

function printStudent(student) {
	console.log(`${student.name} (${student.id}): ${student.paid ? 'Paid' : 'Not Paid'}`)
}

function sortByStudentName (a, b) {
	if ( a.name < b.name ){
		return -1;
	}
	if ( a.name > b.name ){
		return 1;
	}
	return 0;
}



// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

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
