import AssignmentsDao from "../Assignments/dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const courseId = req.params.courseId;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = (req, res) => {
    const courseId = req.params.courseId;
    const assignment = req.body;
    assignment.course = courseId;
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  const deleteAssignment = (req, res) => {
    const assignmentId = req.params.assignmentId;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };

  const updateAssignment = (req, res) => {
    const assignmentId = req.params.assignmentId;
    const assignmentUpdates = req.body;
    const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(updatedAssignment);
  };

  const findAssignmentById = (req, res) => {
    const assignmentId = req.params.assignmentId;
    const assignment = dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/courses/assignments/:assignmentId", deleteAssignment);
  app.put("/api/courses/assignments/:assignmentId", updateAssignment);
  app.get("/api/courses/assignments/:assignmentId", findAssignmentById);
}