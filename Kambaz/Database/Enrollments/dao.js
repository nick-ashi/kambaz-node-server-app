import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function EnrollmentsDao(db) {
  
  function enrollUserInCourse(userId, courseId) {
    return model.create({
     user: userId,
     course: courseId,
     _id: `${userId}-${courseId}`,
   });
  }

  async function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function findEnrollmentsForCourse(courseId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.course === courseId);
  }

  function findUsersForCourse(courseId) {
    const { enrollments, users } = db;
    const enrolledUserIds = enrollments
      .filter((enrollment) => enrollment.course === courseId)
      .map((enrollment) => enrollment.user);
    return users.filter((user) => enrolledUserIds.includes(user._id));
  }

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  function unenrollAllUsersFromCourse(courseId) {
   return model.deleteMany({ course: courseId });
  }


  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    findUsersForCourse,
    findCoursesForUser,
    unenrollAllUsersFromCourse,
  };
}
