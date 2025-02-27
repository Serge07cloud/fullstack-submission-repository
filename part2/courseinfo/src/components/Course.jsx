const Course = ({ course }) => {
  const getTotal = course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

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
      <b>total of {getTotal} exercices</b>
    </div>
  );
};

export default Course;
