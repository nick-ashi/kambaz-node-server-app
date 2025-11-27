import AssignmentsDao from "../Assignments/dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = async (req, res) => {
    const courseId = req.params.courseId;
    const assignment = req.body;
    assignment.course = courseId;
    const newAssignment = await dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  const deleteAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;
    await dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };

  const updateAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const assignmentUpdates = req.body;
    const updatedAssignment = await dao.updateAssignment(assignmentId, assignmentUpdates);
    res.json(updatedAssignment);
  };

  const findAssignmentById = async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/courses/assignments/:assignmentId", deleteAssignment);
  app.put("/api/courses/assignments/:assignmentId", updateAssignment);
  app.get("/api/courses/assignments/:assignmentId", findAssignmentById);
}