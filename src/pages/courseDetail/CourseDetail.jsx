import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Checkbox,
	Typography,
} from "@mui/material";
import { db } from "db/firebase/firebaseConfig";
import { getDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CourseDetail = () => {
	const { courseName } = useParams();

	const videoPlayerRef = useRef(null);
	const [classes, setClasses] = useState([
		{
			id: 1,
			title: "Seccion 1",
			lessons: [
				{
					id: 1,
					title: "Clase 1",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
				},
				{
					id: 2,
					title: "Clase 2",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
				},
			],
		},
		{
			id: 2,
			title: "Seccion 2",
			lessons: [
				{
					id: 1,
					title: "Clase 3",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
				},
				{
					id: 2,
					title: "Clase 4",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
				},
				{
					id: 3,
					title: "Clase 5",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
				},
				{
					id: 4,
					title: "Clase 6",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
					is_completed: false,
				},
				{
					id: 5,
					title: "Clase 7",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
					is_completed: false,
				},
				{
					id: 6,
					title: "Clase 8",
					path: "javascript.mp4",
					thumbnail: "introduction_thumbnail.jpeg",
				},
			],
		},
	]);
	// const [classes, setClasses] = useState([]);
	const [url, setUrl] = useState({
		thumbnail: "",
		videoUrl: "",
		title: "",
	});
	console.log(url);
	const [seekValue, setSeekValue] = useState(JSON.parse(localStorage.getItem("time")) || 0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [flag, setFlag] = useState(true);

	// SOLO PARA EL PROGRESO

	const [completedClasses, setCompletedClasses] = useState([]);

	const getMediaUrl = (media) => {
		return `${process.env.REACT_APP_STORAGE_TRUNK_URL}${media}?alt=media&token=${process.env.REACT_APP_STORAGE_TOKEN}`;
	};
	console.log(completedClasses);

	useEffect(() => {
		if (isPlaying && flag) {
			videoPlayerRef.current.seekTo(seekValue);
			setFlag(false);
		}
	}, [isPlaying, seekValue, flag]);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	useEffect(() => {
		const getClasses = async () => {
			const coursesCollection = collection(db, "courses");
			const docRef = doc(coursesCollection, courseName);
			// const res = await getDoc(docRef);

			const coursesCollection2 = collection(
				db,
				`registered_users/4W9Goxosi7Mo3VlPWUVEmJmS3by2/cursos`,
			);
			const docRef2 = doc(coursesCollection2, courseName);
			// const res2 = await getDoc(docRef2);

			Promise.all([getDoc(docRef), getDoc(docRef2)]).then((classes, lessons) => {
				// const mergeData = [...classes.data()]
				console.log({ classes });
				console.log({ lessons });
			});

			// setClasses(res.data().classes);
			// setUrl({
			// 	...url,
			// 	videoUrl: `${courseName}%2F${res.data().classes[0].lessons[0].path}`,
			// 	thumbnail: `${courseName}%2F${res.data().classes[0].lessons[0].thumbnail}`,
			// });
		};

		getClasses();
	}, [courseName]);

	// useEffect(() => {
	// 	const getProgess = async () => {
	// 		const coursesCollection = collection(
	// 			db,
	// 			`registered_users/4W9Goxosi7Mo3VlPWUVEmJmS3by2/cursos`,
	// 		);
	// 		const docRef = doc(coursesCollection, courseName);
	// 		const res = await getDoc(docRef);
	// 		// const arrayStrings = res.data().lessons.map((e) => {
	// 		// 	return e.title;
	// 		// });
	// 		setCompletedClasses( res.data().lessons);

	// 	};

	// 	getProgess();
	// }, [courseName]);

	const handleCompleteClass = () => {
		setCompletedClasses([...completedClasses, url.title]);
	};

	return (
		<>
			<div style={{ marginBottom: "5px" }}>
				<h2 style={{ color: "white", textTransform: "capitalize" }}>
					{url.videoUrl.replace(`${courseName}%2F`, " ").replace(".mp4", " ")}
				</h2>
			</div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: { xs: "column", lg: "row" },
					gap: "20px",
					position: "relative",
				}}
			>
				<Box
					sx={{
						flex: { xs: "1", lg: "0.7" },
					}}
				>
					<ReactPlayer
						width={"100%"}
						height={"100%"}
						ref={videoPlayerRef}
						// url={getMediaUrl(url.videoUrl)}
						url={
							"https://firebasestorage.googleapis.com/v0/b/practice-f9b79.appspot.com/o/html%2Fetiquetas_basicas.mp4?alt=media&token=6a4225f6-3284-43dd-892b-0cb31c102205&_gl=1*1l20vn4*_ga*MTg2Mjk4ODQzMS4xNjczNjIxOTI3*_ga_CW55HF8NVT*MTY5ODg1NzI2My4xNDAuMS4xNjk4ODU3ODM0LjYwLjAuMA.."
						}
						volume={0.1}
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
						onEnded={handleCompleteClass}
					/>
				</Box>

				<Box
					sx={{
						flex: { xs: "1", lg: "0.3" },
						maxHeight: { xs: "300px", lg: "700px" },
						overflow: "auto",
						// backgroundColor: "red",
						position: { lg: "absolute" },
						top: 0,
						right: 0,
						width: { lg: "28%" },
					}}
				>
					{classes?.map((seccion) => {
						return (
							<Accordion key={seccion.id} sx={{ margin: "0 !important", width: "100%" }}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>{seccion.title}</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ padding: 0 }}>
									{seccion?.lessons?.map((clase) => {
										return (
											<Box
												sx={{
													color: "white",
													paddingLeft: "35px",
													paddingRight: "35px",
													marginBottom: "5px",
												}}
												key={clase.id}
												onClick={() =>
													setUrl({
														videoUrl: `${courseName}%2F${clase.path}`,
														thumbnail: `${courseName}%2F${clase.thumbnail}`,
														title: clase.title,
													})
												}
											>
												<Checkbox checked={completedClasses.includes(clase.title)} />
												{clase.title}
											</Box>
										);
									})}
								</AccordionDetails>
							</Accordion>
						);
					})}
				</Box>
			</Box>
			<Box
				sx={{
					marginTop: { xs: "25px", md: "50px" },
					width: { xs: "100%", lg: "70%" },
				}}
			>
				<h3 style={{ color: "white" }}>
					ESTA Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illum est facere fuga
					um accusamus animi sunt vero commodi! Consequuntur voluptatem nostrum fugit deserunt!
					Neque voluptatem dolores repellat exercitationem, reprehenderit, autem earum deleniti vel
					aperiam accusamus, consequuntur necessitatibus accusantium et nam in est. Nihil, numquam
					fugiat corrupti, minus sed placeat beatae autem commodi dignissimos et dolores mollitia
					odio deleniti natus magnam aliquid tempora voluptatum voluptatem possimus ut voluptate
					eaque quasi aspernatur nulla. Quibusdam fugiat, culpa voluptate iste qui delectus?
					Deserunt laudantium quibusdam doloremque quaerat nemo, iure est tenetur exercitationem,
					molestias illo iusto dolorem, nihil velit numquam modi architecto? Soluta nostrum id neque
					debitis nobis libero sed fugit pariatur dignissimos dicta voluptate natus voluptates
					incidunt iusto praesentium, error sunt, ex enim quas porro placeat qui vel odit. Ab quos
					non, molestias sequi, ipsam sapiente libero explicabo atque illum repellendus nemo magnam
					consectetur culpa amet excepturi aut laborum? Asperiores, facere, accusamus nam voluptates
					ratione eligendi corporis aperiam saepe nobis, repudiandae harum alias praesentium at
					rerum dolorem rem recusandae. Deserunt quibusdam laborum soluta. Quos, nesciunt atque! A,
					explicabo. Quidem quis necessitatibus reiciendis. Dolorem error, sapiente necessitatibus
					quidem, consectetur sed eveniet veniam iure, doloremque quam perferendis corrupti. Earum
					quae quod perspiciatis officia quidem magnam est harum facere eos temporibus amet, a, ipsa
					nihil. Facilis fugiat, ipsam dicta hic beatae libero error. Voluptatibus.
				</h3>
			</Box>
		</>
	);
};

export default CourseDetail;
