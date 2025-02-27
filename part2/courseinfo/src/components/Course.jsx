const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <div>
        {course.parts.map((course) => (
          <div key={course.id}>
            {course.name} {course.exercises}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
