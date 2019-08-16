module.exports = {
	"presets": [
		"module:metro-react-native-babel-preset",
	],
	"plugins": [
		[
			"@babel/plugin-proposal-decorators",
			{
				"legacy": true
			}
		],
		"wildcard",
		[
			"module-resolver",
			{
				"alias": {
					"__proj": ".",
					"__src": "./src",
					"__npm": "./node_modules"
				}
			}
		]
	],
	"env": {
		"development": {
			"plugins": [
				"@babel/plugin-transform-react-jsx-source"
			]
		},
	}
}
