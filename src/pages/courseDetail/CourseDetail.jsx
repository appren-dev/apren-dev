import { Box } from "@mui/material";
import { db } from "db/firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";

const CourseDetail = () => {
	const { courseName } = useParams();

	const videoPlayerRef = useRef(null);
	const [classes, setClasses] = useState([]);
	const [url, setUrl] = useState({
		thumbnail: "",
		videoUrl: "",
	});
	const [seekValue, setSeekValue] = useState(JSON.parse(localStorage.getItem("time")) || 0);
	const [isPlaying, setIsPlaying] = useState(false);

	const getMediaUrl = (media) => {
		return `${process.env.REACT_APP_STORAGE_TRUNK_URL}${media}?alt=media&token=${process.env.REACT_APP_STORAGE_TOKEN}`;
	};
	console.log(seekValue);
	useEffect(() => {
		if (isPlaying) {
			videoPlayerRef.current.seekTo(seekValue);
		}
	}, [isPlaying, seekValue]);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	// useEffect(() => {
	// 	const getClasses = async () => {
	// 		const coursesCollection = collection(db, "courses");
	// 		const docRef = doc(coursesCollection, courseName);
	// 		const res = await getDoc(docRef);
	// 		setClasses(res.data().classes);
	// 		setUrl({
	// 			videoUrl: `${courseName}%2F${res.data().classes[0].path}`,
	// 			thumbnail: `${courseName}%2F${res.data().classes[0].thumbnail}`,
	// 		});
	// 	};

	// 	getClasses();
	// }, [courseName]);
	return (
		<>
			<div style={{ marginBottom: "5px" }}>
				<h2 style={{ color: "white" }}>
					Selectores {url.videoUrl.replace(`${courseName}%2F`, " ")}
				</h2>
			</div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: { xs: "column", md: "row" },
				}}
			>
				<Box
					sx={{
						width: { xs: "100%", md: "70%" },
					}}
				>
					<ReactPlayer
						height={"100%"}
						ref={videoPlayerRef}
						// url={getMediaUrl(url.videoUrl)}
						url={
							"https://firebasestorage.googleapis.com/v0/b/practice-f9b79.appspot.com/o/html%2Fetiquetas_basicas.mp4?alt=media&token=6a4225f6-3284-43dd-892b-0cb31c102205&_gl=1*1l20vn4*_ga*MTg2Mjk4ODQzMS4xNjczNjIxOTI3*_ga_CW55HF8NVT*MTY5ODg1NzI2My4xNDAuMS4xNjk4ODU3ODM0LjYwLjAuMA.."
						}
						controls
						playing
						config={{ file: { attributes: { controlsList: "nodownload" } } }}
						light={getMediaUrl(url.thumbnail)}
						onSeek={(value) => {
							setSeekValue(value);
						}}
						onPlay={() => {
							handlePlay();
						}}
						onPause={(event) =>
							localStorage.setItem("time", JSON.stringify(event.target.currentTime))
						}
						width={"100%"}
					/>
				</Box>

				<ul style={{ backgroundColor: "blue", width: "20%" }}>
					<li style={{ color: "white", listStyle: "none" }}>CLASE 1</li>
					{classes.map((clase) => {
						return (
							<li
								onClick={() =>
									setUrl({
										videoUrl: `${courseName}%2F${clase.path}`,
										thumbnail: `${courseName}%2F${clase.thumbnail}`,
									})
								}
								style={{ color: "white", listStyle: "none" }}
								key={clase.id}
							>
								{clase.title}
							</li>
						);
					})}
				</ul>
			</Box>
		</>
	);
};

export default CourseDetail;
