const ROOT = 'src';

module.exports = function(plop) {

  // create util function
  plop.setGenerator('util', {
    description : 'Create Utility function',
    prompts : [
      {
        type : 'input',
        name : 'name',
        message : 'name: ',
        validate : function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a name is required';
				}
      },
      {
        type : 'input',
        name : 'description',
        message : 'description: '
      }
    ],
    actions : [
      {
        type: 'add',
        path : ROOT + '/utils/{{ dashCase name }}.js',
        templateFile : './plop-templates/util.txt'
      }
    ]
  });

	// create model
	plop.setGenerator('model', {
		description : 'Create model',
		prompts : [
			{
				type : 'input',
				name : 'name',
				message : 'name: ',
				validate : function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a name is required';
				}
			},
			{
				type : 'input',
				name : 'description',
				message : 'description: '
			}
		],
		actions : [
			{
				type: 'add',
				path : ROOT + '/models/{{ dashCase name }}.js',
				templateFile : './plop-templates/model.txt'
			},
			{
				type: 'modify',
				path: ROOT + '/models/index.js',
				pattern: /(\/\*import models\*\/)/gi,
				template: '$1\r\import {{properCase name}} from \'./{{dashCase name}}\';'
			},
			{
				type: 'modify',
				path: ROOT + '/models/index.js',
				pattern: /(\/\*export models\*\/)/gi,
				template: '$1\r\exports.{{properCase name}} = {{properCase name}};'
			},
		]
	});
	// -- end model

	// create route domain
	plop.setGenerator('route domain', {
		description : 'Create route domain',
		prompts : [
			{
				type: 'input',
				name: 'domain',
				message: 'domain: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a domain is required';
				}
			},
			{
				type: 'input',
				name: 'description',
				message: 'description: '
			},
		],
		actions : [
			{
				type: 'add',
				path : ROOT + '/routes/{{ dashCase domain }}.js',
				templateFile : './plop-templates/route.txt'
			},
			{
				type: 'modify',
				path: ROOT + '/api/index.js',
				pattern: /(\/\*import routes\*\/)/gi,
				template: '$1\r\import { } from \'../routes/{{dashCase filename}}\';'
			},
		]
	});
	// -- end route domain

	// create route
	plop.setGenerator('route', {
		description : 'Create route',
		prompts : [
			{
				type: 'input',
				name: 'domain',
				message: 'domain: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a domain is required';
				}
			},
			{
				type: 'input',
				name: 'route',
				message: 'route: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a route is required';
				}
			},
			{
				type: 'input',
				name: 'type',
				message: 'type: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a type is required';
				}
			},
			{
				type: 'input',
				name: 'function',
				message: 'function: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a function is required';
				}
			},
			{
				type: 'input',
				name: 'description',
				message: 'description: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a description is required';
				}
			},
		],
		actions : [
			{
				type: 'modify',
				path: ROOT + '/routes/{{dashCase domain}}.js',
				pattern: /(\/\*functions\*\/)/gi,
				templateFile: 'plop-templates/route-function.txt'
			},
			{
				type: 'modify',
				path: ROOT + '/api/index.js',
				pattern: /(\/\*set routes\*\/)/gi,
				template: '$1\r\	api.{{dashCase type}}(\'/{{pathCase route}}\', middleware, {{camelCase function}});'
			},
		]
	});
	// -- end route

	// create test
	plop.setGenerator('test', {
		description : 'Create test',
		prompts : [
			{
				type: 'input',
				name: 'domain',
				message: 'domain: ',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'a domain is required';
				}
			}
		],
		actions : [
			{
				type: 'add',
				path : 'test/{{ dashCase domain }}.js',
				templateFile : './plop-templates/test.txt'
			},
		]
	});
	// -- end test
}
