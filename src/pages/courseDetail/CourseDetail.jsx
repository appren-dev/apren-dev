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
					impedit totam? Animi repudiandae obcaecati quasi aspernatur minima. Harum illum molestiae
					quod et, pariatur rerum praesentium iusto? Quaerat, repudiandae facere velit quibusdam,
					quidem voluptates id maxime hic eveniet, voluptatibus animi quas doloremque error quo
					omnis quasi quisquam quam eum voluptatem dolorum accusantium doloribus quos? Possimus
					neque eius veritatis iusto quas aliquam repellendus veniam rerum ea iste necessitatibus,
					placeat tenetur, vero ut corporis perferendis ratione nostrum, dolor vel nisi commodi
					animi odio! Aliquam doloribus itaque quod, vero ipsa optio ea aliquid repellat nemo?
					Numquam porro consectetur reprehenderit! Ipsa doloribus a saepe cumque vel, adipisci
					pariatur quaerat voluptatibus, necessitatibus nisi, expedita exercitationem deserunt
					blanditiis? Voluptas, at debitis, odio minus natus repellat ipsum maiores nesciunt,
					perspiciatis voluptate doloremque! Nesciunt sequi reprehenderit, ab aliquid optio
					veritatis reiciendis asperiores ad. Explicabo excepturi tenetur exercitationem voluptate
					reprehenderit recusandae similique quasi neque harum est placeat velit sequi, aperiam
					pariatur expedita alias rerum cumque suscipit voluptatem totam molestias. Fugiat, nemo ea
					non porro alias facilis error similique hic voluptatibus debitis! Repellendus molestias
					ratione a voluptas. Impedit, est? Quibusdam totam fuga fugiat corrupti libero, expedita
					culpa necessitatibus provident deserunt eum repellat quae modi eius cumque quo recusandae,
					officia consequuntur porro blanditiis similique in ex vel reprehenderit! Aliquam odit
					aliquid quidem, magni sapiente asperiores labore quaerat sint a quibusdam, nostrum
					incidunt. Est soluta itaque sunt ullam aut ut quidem recusandae, explicabo quasi odio at
					ipsam enim! Eligendi qui tempora, nobis perferendis voluptatibus magnam delectus.
					Recusandae accusamus accusantium sit! Earum, blanditiis quis aut fugit rerum nisi
					perferendis quae repellat enim laboriosam, iure harum praesentium in dolores consequatur
					corrupti officia reiciendis fuga dolorem cupiditate corporis modi aliquid! Deleniti ex
					laborum magni ut aperiam maiores, at fuga, impedit quaerat atque quisquam debitis
					repellendus laboriosam placeat delectus reiciendis cupiditate asperiores molestiae enim
					sunt necessitatibus optio? Nam iusto sequi veritatis asperiores natus quod, odio beatae
					alias voluptatem, distinctio expedita modi odit itaque unde hic incidunt eum, minus culpa
					ex laborum adipisci doloribus eligendi vitae rem! Hic explicabo natus debitis alias veniam
					corrupti temporibus, vitae quibusdam sapiente laborum suscipit! Assumenda voluptates
					praesentium repudiandae quibusdam quia quae adipisci libero, perspiciatis dolorem tempore
					officia numquam qui voluptatibus consequuntur fugit quo beatae aspernatur doloribus
					molestiae voluptatum. Necessitatibus maiores magnam, laudantium saepe enim vitae culpa
					nihil explicabo, laborum veritatis architecto natus consequatur vel modi totam earum
					provident animi ut! Aperiam consequuntur impedit sequi at magni ducimus? Quas iste
					delectus hic. Fuga minima in, earum minus impedit magni quod, rem harum fugit eius atque
					esse ipsa magnam necessitatibus? Molestias ut, voluptatem dolores adipisci, mollitia cum
					vel consectetur cupiditate quasi, quaerat obcaecati minus explicabo asperiores. Velit
					tempora impedit nisi, alias explicabo eum amet, reprehenderit fugiat ipsam ratione, quia
					neque. Aspernatur consequuntur nulla perferendis ipsam, reiciendis impedit cum temporibus
					deserunt excepturi amet tenetur repellendus, adipisci eum dolor deleniti praesentium. Illo
					quibusdam voluptate minima magnam, assumenda ullam aliquam? Consequatur aliquam
					repellendus itaque harum optio illum a eum animi quas molestias pariatur quae rem labore
					voluptate suscipit inventore officiis corrupti tempora vero omnis soluta fugiat, amet
					doloremque! Possimus tenetur id, eligendi officia vel consequatur, necessitatibus
					asperiores, officiis maiores nulla fugit quae perferendis dolore incidunt tempora
					explicabo harum commodi error ab sed est mollitia. Ducimus, libero praesentium rerum ipsa
					vitae tenetur aut. Ullam placeat porro optio laboriosam ea nobis! Commodi ipsa consequatur
					minima aut nesciunt voluptatem sapiente qui, dignissimos voluptas soluta reprehenderit
					suscipit saepe porro esse sed, deserunt harum quisquam repellat officia quidem corrupti ut
					inventore dolores. Modi cum a illo vero mollitia repellendus quidem voluptates voluptatem,
					necessitatibus maxime beatae blanditiis delectus, exercitationem sequi odio? Iure
					dignissimos voluptatum dolore ipsa necessitatibus iusto atque ratione impedit unde
					exercitationem doloribus eligendi veniam, inventore dolor repudiandae deserunt sapiente id
					ipsum, provident voluptatem. Non voluptatum error quis eveniet harum ex aliquid illo rem
					adipisci voluptas eius commodi a consectetur maiores magnam sapiente aspernatur,
					temporibus dolore vel nemo. Suscipit quis obcaecati ab adipisci tempore praesentium odio
					corrupti! Minima ipsa alias ipsam, facere totam quas obcaecati libero at ut repellat.
					Suscipit illo, consequatur corporis itaque nisi quia eligendi quasi ipsa laborum impedit
					possimus hic saepe! Ipsum possimus veniam dolore doloribus id velit voluptas itaque
					corporis, odit at magni ex adipisci ipsam eaque aut quis, accusamus tempore tenetur
					facilis earum excepturi. Repellendus ex sit odit ut fugit expedita ipsa ab iusto libero
					consequuntur! Aliquam eveniet accusamus sed impedit quidem dolore a iure quam ducimus
					recusandae ratione consequatur quaerat distinctio aliquid, dolorum consectetur soluta
					voluptatem, ipsum fugit nam fugiat architecto cupiditate dignissimos commodi! Atque
					ducimus ea modi perspiciatis corporis officia, impedit et illo in nisi? Mollitia dolores
					vitae harum obcaecati similique inventore aut, sunt enim quia exercitationem. Nihil,
					consectetur ullam vitae natus voluptatibus ipsa omnis quos aspernatur obcaecati vero dicta
					aliquam molestiae facilis officia et ratione. Quia culpa numquam dolor suscipit asperiores
					ratione vel? Tempora non mollitia deleniti obcaecati corporis distinctio quidem neque
					repellat, hic minima laborum doloribus. Reiciendis porro excepturi distinctio illum modi
					provident officia laboriosam earum numquam officiis veniam, cum ratione dicta mollitia
					nulla eligendi obcaecati laborum? Dolorum dicta totam cumque molestias, consequatur
					dolores ratione ducimus reprehenderit asperiores sint sunt aliquid, consequuntur vitae
					inventore fugit aperiam, id nam reiciendis? Autem dolores odio, vel quis asperiores
					deleniti dolorum expedita optio sapiente suscipit beatae tenetur distinctio quae unde
					quidem qui voluptate est ut explicabo molestiae placeat voluptatibus. Corrupti ullam ea
					dignissimos, consequatur dolore corporis! Unde voluptatum blanditiis dicta amet numquam
					labore ad architecto aut nulla delectus quis, dolorum recusandae nihil consequatur
					possimus id inventore. Magni, sapiente molestias ex veniam delectus eligendi laudantium in
					laborum repellat et eos corporis vel reprehenderit debitis illum. Similique consectetur
					quas reiciendis ea vero, nam adipisci commodi veritatis eius accusantium! Fuga iusto ut
					dolor fugiat totam? Magnam deserunt, cupiditate placeat veritatis enim odit repellat unde
					vel, facilis vero quia ab vitae ad ullam facere ipsum sequi. Incidunt unde maiores
					similique necessitatibus pariatur tempora debitis sapiente aspernatur velit id, dolores
					voluptatibus cum est nam sint ratione totam esse cupiditate, ducimus dolorum architecto ea
					iste! Laudantium dicta praesentium sed magni ut eius, tempore quo necessitatibus deleniti,
					ipsam, optio sint perspiciatis voluptatum saepe aliquam quas. Sit, quaerat tempora, quasi
					cumque iste molestias qui vitae facere voluptas odit et, voluptate eius recusandae nobis
					illum perspiciatis alias error veritatis debitis quia autem obcaecati accusamus?
					Consequuntur laborum unde in reprehenderit molestias quas assumenda facere veniam saepe
					hic harum, debitis rem itaque eos voluptas dolorum iure minima voluptatem tempora, qui
					natus culpa. A cumque est minus veritatis consequatur. Ullam laborum, maxime, sint
					deserunt dolore perferendis beatae dolorem est accusantium fuga cumque voluptatem odio
					dignissimos nulla eligendi quia totam expedita vitae ducimus sapiente voluptates, sunt
					eveniet quisquam. Quis provident quos veniam quisquam suscipit, quae commodi. Alias veniam
					exercitationem repellat dolore sapiente fugit magni repellendus magnam, dolor saepe odit
					corrupti omnis molestiae explicabo enim et ducimus! Corporis tenetur sint impedit mollitia
					aliquid, ipsa repudiandae vel beatae vero earum at temporibus corrupti culpa officia
					reprehenderit natus quod, exercitationem ad eum est laboriosam velit quo a. Culpa a at sit
					suscipit deserunt consequuntur id, voluptas voluptate minus. Nulla numquam perferendis
					laborum quasi optio dolorem quia. Impedit, ipsam! Natus, voluptatibus ducimus eaque dicta
					error eos ratione culpa obcaecati eveniet repellat ipsam iusto labore accusantium
					reiciendis atque temporibus incidunt deleniti aperiam sapiente? Nulla nobis doloribus
					iusto cum pariatur obcaecati. Excepturi, pariatur ab laboriosam blanditiis dolores harum
					possimus! Ab fugiat atque cumque veritatis, odio id facilis deserunt placeat officiis esse
					nihil culpa laboriosam maiores magni quaerat sint, excepturi numquam saepe expedita
					mollitia corrupti labore aliquam! Laborum perferendis perspiciatis et placeat pariatur
					voluptates suscipit laudantium ipsam. Vel, voluptas in blanditiis similique a expedita
					officia quae aliquid rerum non vero, ipsa numquam nostrum aut quisquam molestias nobis
					veritatis obcaecati consequatur tempore quasi neque? Mollitia officiis dolor
					exercitationem eum facere, quaerat asperiores dolore sint molestiae at fugit inventore
					aliquid id et nisi a quisquam. Voluptatum quo placeat cum! Totam ratione eveniet debitis
					corrupti earum quae voluptate reprehenderit! Eius atque quo quos veritatis voluptate
					accusamus quae nam cupiditate soluta deleniti? Dolor inventore soluta pariatur
					exercitationem aliquam consequatur labore quasi debitis quas dolore omnis eveniet minima
					quibusdam iste, eaque est quis deserunt eligendi, aut alias adipisci sit nihil.
					Consequuntur, placeat voluptatibus impedit nihil nam deserunt excepturi autem quae?
					Praesentium, ipsa. Doloribus voluptatibus laboriosam excepturi eligendi est alias nisi
					velit deleniti tempora, officia suscipit nobis qui magnam rem harum debitis. Blanditiis
					necessitatibus velit doloribus architecto iste sit delectus accusamus amet aspernatur
					exercitationem, repudiandae veniam natus excepturi tenetur nihil id minus, ea in! Aperiam
					incidunt accusantium porro nulla veritatis nostrum vero, quasi magnam odio illum
					reprehenderit aspernatur optio sit natus temporibus pariatur modi soluta nisi dolorum
					maiores distinctio! Laudantium vero facere nulla adipisci hic obcaecati, eveniet eos
					quidem consequuntur! Voluptas temporibus officiis quas accusamus praesentium illo omnis
					minus aut saepe non corporis totam soluta animi ut, quasi molestias quaerat vitae suscipit
					in fugit doloremque voluptatum error? Nam vero numquam praesentium, obcaecati doloribus
					distinctio officia incidunt quaerat assumenda consequatur accusamus, inventore dicta quam
					vel delectus iure aperiam aliquam reiciendis aut ratione deserunt officiis ipsum placeat
					commodi! Mollitia molestiae quae laudantium quisquam fugiat quos temporibus ipsam cumque
					sunt illum in labore, deserunt molestias distinctio maxime. Vel expedita dolorum commodi
					aliquid quae, quidem dolores nostrum officiis amet error magnam aperiam, veniam illum,
					enim placeat atque accusamus? Incidunt blanditiis repudiandae dicta exercitationem
					distinctio, officiis, eligendi expedita nulla, quasi adipisci rerum itaque sint aspernatur
					maxime quo minus mollitia ratione obcaecati animi alias porro facilis ex ad fuga? Maxime
					id recusandae fugiat accusantium velit tempora aliquid quasi architecto, quidem a illo
					aperiam unde eveniet repudiandae laudantium delectus impedit in laboriosam consequatur at
					amet eius iusto! Quidem inventore consectetur earum harum molestias asperiores minus
					numquam a eveniet. Optio eius nam, possimus laborum eveniet illum voluptatem delectus,
					culpa blanditiis sunt fugiat, laboriosam vero! Eaque voluptates atque corporis ab deserunt
					quod veniam eum, reprehenderit labore dignissimos et cumque obcaecati debitis illo
					sapiente molestias, optio perspiciatis rem quae iste quis alias adipisci quisquam. Illum
					voluptatibus quo reprehenderit voluptas atque pariatur cumque provident, earum, dolores
					dolore illo consequatur unde iusto optio quia ad rerum sint exercitationem temporibus at
					officiis maiores, eum dolorem. Voluptas aliquid necessitatibus veniam veritatis voluptatum
					sit alias hic doloribus aut expedita adipisci, ullam, amet quasi delectus fugit, modi
					nostrum natus nobis debitis saepe cum. Necessitatibus voluptas ullam nobis, rerum
					veritatis voluptates voluptatum debitis minima. Blanditiis eveniet reprehenderit quae,
					harum veniam eum aliquid dolorem itaque porro quos vitae fugit possimus sequi quidem
					autem. Numquam reprehenderit molestias nisi pariatur dicta nulla ab in necessitatibus
					tempore id quae qui voluptas delectus repellat voluptatem rem distinctio totam, atque
					animi, sed unde magni! Dolor, commodi, repellendus atque laudantium corporis nostrum
					officiis eius consequatur quidem eligendi porro esse placeat impedit repudiandae,
					reprehenderit quaerat? Laborum sed aliquid nisi neque quam, possimus cupiditate fugit
					dignissimos ab officiis optio minima dolore, iure explicabo mollitia. Laudantium
					reprehenderit sit veritatis mollitia at molestias iusto. Rem delectus reiciendis quos
					voluptate culpa, mollitia vitae harum accusamus animi sunt vero commodi! Consequuntur
					voluptatem nostrum fugit deserunt! Neque voluptatem dolores repellat exercitationem,
					reprehenderit, autem earum deleniti vel aperiam accusamus, consequuntur necessitatibus
					accusantium et nam in est. Nihil, numquam fugiat corrupti, minus sed placeat beatae autem
					commodi dignissimos et dolores mollitia odio deleniti natus magnam aliquid tempora
					voluptatum voluptatem possimus ut voluptate eaque quasi aspernatur nulla. Quibusdam
					fugiat, culpa voluptate iste qui delectus? Deserunt laudantium quibusdam doloremque
					quaerat nemo, iure est tenetur exercitationem, molestias illo iusto dolorem, nihil velit
					numquam modi architecto? Soluta nostrum id neque debitis nobis libero sed fugit pariatur
					dignissimos dicta voluptate natus voluptates incidunt iusto praesentium, error sunt, ex
					enim quas porro placeat qui vel odit. Ab quos non, molestias sequi, ipsam sapiente libero
					explicabo atque illum repellendus nemo magnam consectetur culpa amet excepturi aut
					laborum? Asperiores, facere, accusamus nam voluptates ratione eligendi corporis aperiam
					saepe nobis, repudiandae harum alias praesentium at rerum dolorem rem recusandae. Deserunt
					quibusdam laborum soluta. Quos, nesciunt atque! A, explicabo. Quidem quis necessitatibus
					reiciendis. Dolorem error, sapiente necessitatibus quidem, consectetur sed eveniet veniam
					iure, doloremque quam perferendis corrupti. Earum quae quod perspiciatis officia quidem
					magnam est harum facere eos temporibus amet, a, ipsa nihil. Facilis fugiat, ipsam dicta
					hic beatae libero error. Voluptatibus.
				</h3>
			</Box>
		</>
	);
};

export default CourseDetail;
