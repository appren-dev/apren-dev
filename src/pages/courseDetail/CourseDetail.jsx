import { Box } from "@mui/material";
import { db } from "db/firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";

const CourseDetail = () => {
	const { courseName } = useParams();
	console.log(courseName);
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

	useEffect(() => {
		if (isPlaying) {
			videoPlayerRef.current.seekTo(seekValue);
		}
	}, [isPlaying, seekValue]);

	const handlePlay = () => {
		setIsPlaying(true);
	};
    console.log(classes)

	useEffect(() => {
		const getClasses = async () => {
			const coursesCollection = collection(db, "courses");
			const docRef = doc(coursesCollection, courseName);
			const res = await getDoc(docRef);
			setClasses(res.data().classes);
			setUrl({
				videoUrl: `${courseName}%2F${res.data().classes[0].path}`,
				thumbnail: `${courseName}%2F${res.data().classes[0].thumbnail}`,
			});
		};

		getClasses();
	}, [courseName]);
	return (
		<Box
			component="div"
			sx={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}
		>
			<ul>
				{classes.map((clase) => {
					return (
						<li
							onClick={() =>
								setUrl({
									videoUrl: `${courseName}%2F${clase.path}`,
									thumbnail: `${courseName}%2F${clase.thumbnail}`,
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
				ref={videoPlayerRef}
				url={getMediaUrl(url.videoUrl)}
				controls
				playing
				// volume={0.2}
				config={{ file: { attributes: { controlsList: "nodownload" } } }}
				light={getMediaUrl(url.thumbnail)}
				onSeek={(value) => {
					setSeekValue(value);
				}}
				onPlay={() => {
					handlePlay();
				}}
				onPause={(event) => localStorage.setItem("time", JSON.stringify(event.target.currentTime))}
			/>
			<h2 style={{ color: "white" }}>
				La clase seleccionada es {url.videoUrl.replace(`${courseName}%2F`, " ")}
			</h2>
		</Box>
	);
};

export default CourseDetail;
