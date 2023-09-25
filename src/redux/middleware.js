export const roleMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  // Check if the user is a student or an instructor
  const userRole = state.auth.role; // Assuming you have a 'role' property in your auth state

  // Depending on the role, you can perform different actions or modifications here
  if (userRole === "Student") {
    // Handle actions specific to students
    switch (action.type) {
      case "STUDENT_ACTION":
        // Perform student-specific action
        break;
      // Other student-specific actions can go here
      default:
        break;
    }
  } else if (userRole === "Instructor") {
    // Handle actions specific to instructors
    switch (action.type) {
      case "INSTRUCTOR_ACTION":
        // Perform instructor-specific action
        break;
      // Other instructor-specific actions can go here
      default:
        break;
    }
  }

  // Continue the action to the next middleware or reducers
  return next(action);
};
