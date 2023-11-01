import CourseCard from "components/CourseCard";
import { popular_courses } from "db/mock_data";
import { StyledBox } from "./styled";

const Home = () => {
  return (
    <StyledBox component="div">
      {
        popular_courses.map((course) => (
          <CourseCard key={course.id}
            {...course}
          />
        ))
      }
    </StyledBox>
  );
};

export default Home;