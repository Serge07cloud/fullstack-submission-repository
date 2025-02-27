const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      {name} {exercises}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((course) => (
        <Part key={course.id} name={course.name} exercises={course.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  const getTotal = course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <b>total of {getTotal} exercices</b>
    </div>
  );
};

export default Course;
