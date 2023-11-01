import { Box } from "@mui/material";
import CourseCard from "components/CourseCard";
import { popular_courses } from "db/mock_data";

const Home = () => {
	return (
		<Box
			component="div"
			sx={{
				display: "flex",
				gap: "30px",
				flexWrap: "wrap",
				justifyContent: "center",
			}}
		>
			{popular_courses.map((course) => (
				<CourseCard key={course.id} {...course} />
			))}
		</Box>
	);
};

export default Home;
