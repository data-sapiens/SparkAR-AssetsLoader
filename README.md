# SparkAR-AssetsLoader
Helper function for loading objects, materials, and textures in Spark AR Studio v85+. Note: This is still WIP, but the examples should be working.

## Usage
Simply add the `AssetsLoader.js` script to your project. Include it in your main project script file: 
```
import { AssetsLoader } from './AssetsLoader';
```
And configure it with the settings you want to control:
```
// List of all objects to load
const PROJECT_OBJECTS = [
	'plane0', 
	'myHorseObject', 
	'**/faceTracker0/*'
];

// List of all textures to load
const PROJECT_TEXTURES = [
	'ponyPattern', 
	'texture*'
];

// List of all materials to load
const PROJECT_MATERIALS = [
	'material0', 
	'horsFaceMaterial*'
];

// Load assets
AssetsLoader({
	objects: PROJECT_OBJECTS,
	materials: PROJECT_MATERIALS,
	textures: PROJECT_TEXTURES
}).then(assets => {
	// Now all the assets are loaded an ready to be used.
	// The objects are now stored in cache and can be edited this way
	assets.objects['myHorseObject'].transform.x = 0.5;

	// Loop trhough all sub objects of the faceTracker0
	assets.objects['**/faceTracker0/*'].forEach( (obj, i) => {
		obj.transform.y = 0.1 * i;
	});

	// The same is for materials and textures
	assets.materials['material0'].setTexture('diffuse', assets.textures['ponyPattern'].signal);

	// If you feel it's to much writing assets every time
	// you need to get something. You can use the destructuring assignment syntax
	// to unpack values from the assets object.
	const { objects, materials } = assets;

	// And then you can use it like this
	objects['myHorseObject'].transform.x = 0.5;
	// or
	materials['horsFaceMaterial*'].forEach(mat => {
		// Every material matched in the pattern
	});
});
```
Note: If you are using a pattern all the matches will be stored in a array.

## Data Sapiens
If you find this useful, make sure to follow [Data Sapiens on Instagram](https://www.instagram.com/datasapiens.life/) for more.
