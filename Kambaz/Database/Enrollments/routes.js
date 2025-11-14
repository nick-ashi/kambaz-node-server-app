import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // Enroll a user in a course
  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  // Unenroll a user from a course
  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  // Get all enrollments for a specific user
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  // Get all enrollments for a specific course
  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  // Get all users enrolled in a specific course
  const findUsersForCourse = (req, res) => {
    const { courseId } = req.params;
    const users = dao.findUsersForCourse(courseId);
    res.json(users);
  };

  // Get all courses a user is enrolled in
  const findCoursesForUser = (req, res) => {
    const { userId } = req.params;
    const courses = dao.findCoursesForUser(userId);
    res.json(courses);
  };

  // Register routes
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.get("/api/users/:userId/courses", findCoursesForUser);
}
