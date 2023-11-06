const getMediaUrl = (media) => {
	return `${process.env.REACT_APP_STORAGE_TRUNK_URL}${media}${process.env.REACT_APP_STORAGE_TOKEN}`;
};

export { getMediaUrl };
