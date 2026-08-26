const student = {
    name: "Sunoo",
    age: 20,
    course: "BSIT",
    address: {
        city: "Iloilo"
    }
};

// Destructuring - get values from the object
const { name, age, course } = student;

// Spread Operator - copy the object and add new data
const updatedStudent = {
    ...student,
    yearLevel: 2
};

// Rest Parameters - collect multiple arguments
function showSubjects(...subjects) {
    return subjects;
}

// Store the returned subjects
const mySubjects = showSubjects(
    "JavaScript",
    "Networking",
    "Database"
);

// Template Literals - combine text and variables
console.log(`Hello! My name is ${name}.`);
console.log(`I am ${age} years old and I am taking ${course}.`);

// Optional Chaining - safely access a property
console.log(`City: ${student.address?.city}`);

// Nullish Coalescing - provide a default value
const section = student.section ?? "No section assigned";
console.log(`Section: ${section}`);

console.log("Updated Student:", updatedStudent);

console.log("My Subjects:", mySubjects);