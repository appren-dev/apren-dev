import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { db } from "db/firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
	const [flag, setFlag] = useState(true);

	const getMediaUrl = (media) => {
		return `${process.env.REACT_APP_STORAGE_TRUNK_URL}${media}?alt=media&token=${process.env.REACT_APP_STORAGE_TOKEN}`;
	};
	console.log(seekValue);

	useEffect(() => {
		if (isPlaying && flag) {
			videoPlayerRef.current.seekTo(seekValue);
			setFlag(false);
		}
	}, [isPlaying, seekValue, flag]);

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
					/>
				</Box>

				{/* <ul style={{ backgroundColor: "blue", width: "20%" }}>
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
				</ul> */}
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
					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 1</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 2</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 3</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>

					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 4</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>

					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 5</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>

					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 6</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 7</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion sx={{ margin: "0 !important", width: "100%" }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Sección 8</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
								ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
				</Box>
			</Box>
			<Box
			// sx={{
			// 	marginTop: { md: "250px" },
			// }}
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
