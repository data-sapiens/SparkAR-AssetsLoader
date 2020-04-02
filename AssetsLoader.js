const Scene = require('Scene');
const Materials = require('Materials');
const Textures = require('Textures');

export const handleLoadedAssetGroup = (names, loadedAssets) => {
	const items = {};

	names.forEach((name, i) => {
		items[name] = loadedAssets[i];
	});

	return items;
}

export const AssetsLoader = ({
	objects = [],
	materials = [],
	textures = []
}) => {
	return new Promise(resolve => {
		Promise.all([
	   		Promise.all(objects.map(obj => obj.indexOf('*') > -1 ? Scene.root.findByPath(obj) : Scene.root.findFirst(obj))),
	   		Promise.all(materials.map(mat => mat.indexOf('*') > -1 ? Materials.findUsingPattern(mat) : Materials.findFirst(mat))),
	   		Promise.all(textures.map(tex => tex.indexOf('*') > -1 ? Textures.findUsingPattern(tex) : Textures.findFirst(tex))),
	   	]).then( assets => {
	   		resolve({
		   		objects: handleLoadedAssetGroup(objects, assets[0]),
		   		materials: handleLoadedAssetGroup(materials, assets[1]),
		   		textures: handleLoadedAssetGroup(textures, assets[2])	
	   		});
	   	})
	});
}
