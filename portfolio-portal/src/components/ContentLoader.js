import GraphGenerator from './common/GraphGenerator';
import Filepond from './filepond/Filepond';

const components = {
	GraphGenerator,
	Filepond,
};

const ContentLoader = ({ componentName }) => {
	const Component = components[componentName];
	return Component ? <Component /> : null;
};

export default ContentLoader;