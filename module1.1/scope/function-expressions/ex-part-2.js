const printRecords = recordIds => {
	studentRecords
		.filter(student => recordIds.includes(student.id))
		.sort(sortByStudentName)
		.forEach(printStudent);
}

const paidStudentsToEnroll = () => [
		...currentEnrollment,
		...studentRecords
		.filter(student => student.paid && !currentEnrollment.includes(student.id))
		.map(getStudentById)
	]

const remindUnpaid = recordIds => {
	const remaindUnPaidStudents = 	
		studentRecords
			.filter(student => recordIds.includes(student.id) && !student.paid)
			.map(getStudentById);
	printRecords(remaindUnPaidStudents);
}

const getStudentById = student => student.id;

const printStudent = student => {
	console.log(`${student.name} (${student.id}): ${student.paid ? 'Paid' : 'Not Paid'}`)
}

const sortByStudentName = (a, b) => {
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
