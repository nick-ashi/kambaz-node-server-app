const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
const module = {
    id: "123",
    name: "NodeJS Basics",
    description: "Learn the basics of NodeJS and ExpressJS",
    course: "Web Development",
  }

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  const setScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  };
  const setCompleted = (req, res) => {
    const { newCompletedState } = req.params;
    assignment.completed = newCompletedState;
    res.json(assignment);
  };

  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };

  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/completed/:newCompletedState", setCompleted);
  app.get("/lab5/assignment/score/:newScore", setScore);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
}
