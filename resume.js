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
			place: "Denali National Park & Preserve",
			link: "http://www.nps.gov/dena/learn/nature/soundscape.htm",
			position: "Soundscape Technician",
			dates: "Jun 2015 - present",
			items: [
				{
					text: "Develop Python library to query & access 1TB NPS acoustic dataset",
					filter: []
				},
				{
					text: "Write code to examine and visualize trends across 10+ years of data",
					filter: []
				},
				{
					text: "Implement GIS least-cost-path analysis to optimize potential overflight routes",
					filter: []
				},
				{
					text: "Develop interactive technology for public education of sound issues",
					filter: ["nsidc", "full"]
				},
				{
					text: "Collaborate closely with regional soundscape scientist on maintenance, field logistics, and data analysis",
					filter: []
				},
				{
					text: "Independently assemble, maintain, and remove sound recording stations in remote backcountry locations",
					filter: []
				},
				{
					text: "Fix electronic & mechanical equipment failures with limited resources in the field",
					filter: ["full"]
				},
				{
					text: "Implement scripts to identify, correct, or remove faulty data",
					filter: ["full"]
				},
				{
					text: "Lead overnight backcountry field patrols to maintain equipment",
					filter: []
				},
				{
					text: "Arrange all logistics for backcountry travel, including ARCC itineraries, flight plans, and team equipment",
					filter: ["full"]
				},
				{
					text: "Serve as A-100 air crew member to access soundstations by helicopter",
					filter: ["full"]
				},
				{
					text: "Identify noise events in recorded data by spectrogram analysis",
					filter: ["full"]
				},
				{
					text: "Perform audibility analysis by labeling sound events in recorded data",
					filter: ["full"]
				},
			]
		},
		{
			place: "Ab Initio Software",
			link: "http://www.abinitio.com",
			position: "Development Intern",
			dates: "Jun 2014 - Aug 2014",
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
			dates: "May 2013 - Jun 2014",
			items: [
				{
					text: "Consulted with education researchers to improve data collection methods",
					filter: ["full", "nsidc"],
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
			dates: "May 2012 - Aug 2012",
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
					filter: ["full"],
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
		{text: "Computation Theory", filter: ["full"]},
		{text: "Linear Algebra", filter: []},
		{text: "GIS", filter: []},
		{text: "Geomorphology", filter: ["nsidc", "full"]},
		{text: "Climate Science", filter: ["nsidc", "full"]},
		{text: "Paleoclimatoloy", filter: ["nsidc", "full"]},
	];

	$scope.skills = {
		"Languages": [
			{text: "Python (+NumPy, SciPy, pandas)", highlight: ["avatech"], filter: []},
			{text: "JavaScript/HTML5/CSS3 (+Angular, Meteor, jQuery)", highlight: ["avatech"], filter: []},
			{text: "C", filter: []},
			{text: "C++", filter: []},
			{text: "PHP", filter: []},
			{text: "SQL", highlight: ["avatech"], filter: []},
			{text: "LabVIEW", filter: []},
			{text: "Processing (Java)", filter: []},
			{text: "Spanish", filter: []},
		],
		"Software": [
			{text: "ArcGIS", filter: []},
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
					text: "Created quick-turnaround web services to help club functions",
					filter: [],
					highlight: []
				},
				{
					text: "Integrated new systems with old code base and design",
					filter: []
				},
				{
					text: "Developed vehicle reservation, online shopping, trip-posting, and reimbursement-processing systems",
					filter: ["full"]
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
					text: "Oversaw operations of 700-member outdoor club with lodge and vehicles",
					filter: [],
					highlight: []
				},
				{
					text: "Supervised executive board and delegated responsibilities",
					filter: []
				},
				{
					text: "Collaborated with university administrators to improve club function",
					filter: []
				},
				{
					text: "Developed and led long-term technical and safety curriculum",
					filter: []
				},
				{
					text: "Budgeted income between programs, equipment, facilities, and long-term projects",
					filter: ["full"]
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