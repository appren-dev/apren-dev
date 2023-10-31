import { Box } from "@mui/material";
import CourseCard from "components/CourseCard";
import { db } from "db/firebase/firebaseConfig";
import { popular_courses } from "db/mock_data";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Home = () => {
	const [classes, setClasses] = useState([]);
	const [url, setUrl] = useState({
		thumbnail: "",
		videoUrl: "",
	});

  console.log(url)

	const getMediaUrl = (media) => {
		return `${process.env.REACT_APP_STORAGE_TRUNK_URL}${media}?alt=media&token=${process.env.REACT_APP_STORAGE_TOKEN}`;
	};

	console.log(getMediaUrl(url));

	useEffect(() => {
		const getClasses = async () => {
			const coursesCollection = collection(db, "courses");
			const docRef = doc(coursesCollection, "react");
			const res = await getDoc(docRef);
			setClasses(res.data().classes);
			setUrl({
				videoUrl: `react%2F${res.data().classes[0].path}`,
				thumbnail: `react%2F${res.data().classes[0].thumbnail}`,
			});
		};

		getClasses();
	}, []);
	return (
		<Box
			component="div"
			sx={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}
		>
			{/* {
        popular_courses.map((course) => (
          <CourseCard key={course.id}
            {...course}
          />
        ))
      } */}
			<ul>
				{classes.map((clase) => {
					return (
						<li
							onClick={() =>
								setUrl({
									videoUrl: `react%2F${clase.path}`,
									thumbnail: `react%2F${clase.thumbnail}`,
								})
							}
							style={{ color: "white" }}
							key={clase.id}
						>
							{clase.title}
						</li>
					);
				})}
			</ul>
			<ReactPlayer
				url={getMediaUrl(url.videoUrl)}
				controls
				playing
				volume={0.2}
				config={{ file: { attributes: { controlsList: "nodownload" } } }}
        light={getMediaUrl(url.thumbnail)}

			/>
			<h2 style={{ color: "white" }}>
				La clase seleccionada es {url.videoUrl.replace("react%2F", " ")}
			</h2>
		</Box>
	);
};

export default Home;
