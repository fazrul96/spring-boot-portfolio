export const downloadFile = (fileUrl, fileName) => {
	const link = document.createElement('a');
	link.href = fileUrl;
	link.setAttribute('download', fileName);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};