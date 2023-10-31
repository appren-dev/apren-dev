import { v4 } from "uuid";

export const popular_courses = [
	{
		id: v4(),
		course_name: "Ocean - Jon Buttler",
		course_description:
			"Aprenderás a crear sitios web desde cero. Descubriremos los fundamentos de HTML para estructurar el contenido y CSS para darle estilo. Además, exploraremos el diseño web responsivo y trabajaremos en un proyecto práctico.",
		course_thumbnail: "ocean_thumbnail.png?alt=media&token=",
		course_intro_url: "OCEAN%20-%20John%20Butler%20.mp4?alt=media&token=",
		course_level: "intermediate",
	},
	{
		id: v4(),
		course_name: "Clase de Meditación",
		course_description:
			"Aprenderás a crear sitios web desde cero. Descubriremos los fundamentos de HTML para estructurar el contenido y CSS para darle estilo. Además, exploraremos el diseño web responsivo y trabajaremos en un proyecto práctico.",
		course_thumbnail: "meditation_thumbnail.png?alt=media&token=",
		course_intro_url: "Meditation_subject.mp4?alt=media&token=",
		course_level: "basic",
	},
	{
		id: v4(),
		course_name: "Love Train",
		course_description:
			"Aprenderás a crear sitios web desde cero. Descubriremos los fundamentos de HTML para estructurar el contenido y CSS para darle estilo. Además, exploraremos el diseño web responsivo y trabajaremos en un proyecto práctico.",
		course_thumbnail: "love_train_thumbnail.jpeg?alt=media&token=",
		course_intro_url: "love_train.mp4?alt=media&token=",
		course_level: "advanced",
	},
];

// const course_model = {
// 	id: 1,
// 	raiting: 5,
// 	is_popular: true,
// 	uid: "la_relacion_de_la_carpeta_con_clases",
// 	clases: [
// 		{
// 			id: 1,
// 			title: "Clase 1: Introducción a React",
// 		},
// 	],
// 	rated_by: [
// 		{
// 			user_id: "id_del_usuario_que_evaluó",
// 			rating: 5,
// 		},
// 	],
// 	course_name: "",
// 	course_description: "",
// 	course_thumbnail: "",
// 	course_intro_url: "",
// };
