resumeModule = angular.module("resume", []);

resumeModule.filter("shouldShow", function() {
	return function(items, filter) {
		return items.filter(function(item) {
			if ('filter' in item) {
				var itemFilter = item.filter;
				if (angular.isArray(itemFilter) && itemFilter.length == 0) return true;
				else {
					if (filter == null) return false;
					else {
						return (itemFilter.indexOf(filter) != -1);
					}
				}
			} else {
				return true;
			}
		});

	}
});

resumeModule.controller('resume', function($scope, $location) {

	$scope.$watch(function() { return $location.search(); }, function(query) {
		$scope.filter = ('for' in query) ? query.for : null;
		$scope.highlight = ('highlight' in query) ? query.highlight : null;
	});

	$scope.shouldHighlight = function(item) {
		if ($scope.highlight == null) return false;
		if ('highlight' in item && angular.isArray(item.highlight)) {
			return (item.highlight.indexOf($scope.highlight) != -1);
		}
	};

	$scope.experiences = [
		{
			place: "Ab Initio Software",
			link: "http://www.abinitio.com",
			position: "Development intern",
			dates: "6/14 - 8/14",
			items: [
				{
					text: "Designed algorithm to find optimal aggregation path in data cubes",
					filter: [],
					highlight: ["avatech"]
				},
				{
					text: "Wrote Python codegeneration library to metaprogram aggregation code for Ab Initio language",
					filter: []
				},
				{
					text: "Wrote test code & integrated with production codebase",
					filter: []
				},
			]
		},
		{
			place: "Center for Engineering Education and Outreach",
			link: "http://www.ceeo.tufts.edu",
			position: "Research Assistant",
			dates: "5/13 - 6/14",
			items: [
				{
					text: "Consulted with education researchers to improve data collection methods",
					filter: ["gov", "full"],
				},
				{
					text: "Designed & developed system for multiplexed speech & video recording in noisy classrooms",
					filter: []
				},
				{
					text: "Programmed signal processing algorithm to synchronize concurrent audio and video recordings",
					filter: [],
					highlight: ["avatech"]
				},
				{
					text: "Developed web interface for researchers to view synchronized recordings",
					filter: []
				}
			]
		},
		{
			place: "Center for Engineering Education and Outreach",
			link: "http://www.ceeo.tufts.edu",
			position: "Research Assistant",
			dates: "5/12 - 7/12",
			items: [
				{
					text: "Created data protocol between Arduinos and optical touchscreens via IR light patterns",
					filter: [],
					highlight: ["avatech"]
				},
				{
					text: "Prototyped Java visualizations to analyze children's interaction with dynamic datasets",
					filter: []
				},
				{
					text: "Programmed TUIO LabVIEW library for touch interaction",
					filter: ["gov", "full"],
				}
			]
		}
	];

	$scope.courses = [
		{text: "Distributed Systems", highlight: ["avatech"], filter: []},
		{text: "Machine Learning", highlight: ["avatech"], filter: []},
		{text: "Visualization", highlight: ["avatech"], filter: []},
		{text: "Web Programming", highlight: ["avatech"], filter: []},
		{text: "Computer Vision", highlight: ["avatech"], filter: []},
		{text: "Algorithms", highlight: ["avatech"], filter: []},
		{text: "Operating Systems", filter: []},
		{text: "Machine Structure & Assembly", filter: []},
		{text: "Computation Theory", filter: []},
		{text: "Linear Algebra", filter: []},
	];

	$scope.skills = {
		"Languages": [
			{text: "Python (+NumPy, SciPy, pandas)", highlight: ["avatech"], filter: []},
			{text: "JavaScript", filter: []},
			{text: "HTML5/CSS3 (+Angular, jQuery)", highlight: ["avatech"], filter: []},
			{text: "C", filter: []},
			{text: "C++", filter: []},
			{text: "PHP", filter: []},
			{text: "SQL", highlight: ["avatech"], filter: []},
			{text: "LabVIEW", filter: []},
			{text: "Processing (Java)", filter: []},
			{text: "Spanish", filter: []},
		],
		"Software": [
			{text: "Photoshop", filter: []},
			{text: "Illustrator", filter: []},
			{text: "AfterEffects", filter: []},
			{text: "Premiere", filter: []},
			{text: "InDesign", filter: []},
			{text: "Final Cut", filter: []},
			{text: "Motion", filter: []},
		]
	};

	$scope.leadership = [
		{
			place: "Tufts Mountain Club",
			link: "http://www.tuftsmountainclub.org/trips",
			position: "Web developer",
			dates: "2013 - 2015",
			items: [
				{
					text: "Create quick-turnaround web services to help club functions",
					filter: [],
					highlight: []
				},
				{
					text: "Integrate new systems with old code base and design",
					filter: []
				}
			]
		},
		{
			place: "Tufts Mountain Club",
			link: "http://www.tuftsmountainclub.org/trips",
			position: "President",
			dates: "2014",
			items: [
				{
					text: "Oversee operations of 700-member outdoor club with lodge and vehicles",
					filter: [],
					highlight: []
				},
				{
					text: "Supervise executive board and delegate responsibilities",
					filter: []
				},
				{
					text: "Collaborate with university administrators to improve club function",
					filter: []
				},
				{
					text: "Develop and lead long-term technical and safety curriculum",
					filter: []
				},
				{
					text: "Budget income between programs, equipment, facilities, and long-term projects",
					filter: ["gov", "full"]
				}
			]
		},
		{
			place: "Tufts Mountain Club",
			link: "http://www.tuftsmountainclub.org/trips",
			position: "Technical Skills & Safety director",
			dates: "2011 - 2013",
			filter: ["full"]
		},
		{
			place: "Tufts Wilderness Orientation",
			link: "http://www.tuftswildernessorientation.com",
			position: "trip leader",
			dates: "2013 - 2014",
			filter: ["full"]
		}
	];

});