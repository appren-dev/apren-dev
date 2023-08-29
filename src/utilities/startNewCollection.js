export const startNewCollection = (data, addNewDocument) => {
	for (const i of data) {
		addNewDocument(i.id, i);
	}
	return "Agregados existosamente";
};
