resumeModule = angular.module("resume", []);

resumeModule.filter("shouldShow", function() {
	return function(items, filter) {
		return items.filter(function(item) {
			if (filter != null && 'exclude' in item) {
				var itemExclude = item.exclude;
				if (angular.isArray(itemExclude)) {
					if (itemExclude.indexOf(filter) != -1) return false;
				}
			}

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
			place: "National Park Service, Natural Sounds & Night Skies Division",
			link: "http://www.nps.gov/orgs/1050/index.htm",
			position: "Data Scientist",
			dates: "Nov 2015 - present",
			items: [
				{
					text: "Lead or assist with fieldwork installing sound monitoring equipment in National Parks around the country",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Develop and document open-source Python library for querying data and metadata contained in hierarchical file systems",
					filter: []
				},
				{
					text: "Consult with scientists to design unified software tool addressing needs of several distinct projects",
					filter: []
				},
				{
					text: "Program Python library to efficiently query & access 200TB acoustic dataset",
					filter: [],
					exclude: ["outdoor"]
				}
			]
		},
		{
			place: "Denali National Park & Preserve",
			link: "http://www.nps.gov/dena/learn/nature/soundscape.htm",
			position: "Soundscape Technician",
			dates: "Jun 2015 - Oct 2015",
			items: [
				{
					text: "Independently assembled, maintained, and removed sound recording stations in remote backcountry locations",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Developed Python library to query & access 1TB NPS acoustic dataset",
					filter: [],
					exclude: ["outdoor"]
				},
				{
					text: "Wrote code to examine and visualize trends across 10+ years of acoustic data",
					filter: []
				},
				{
					text: "Implemented GIS least-cost-path analysis to optimize potential overflight routes",
					filter: []
				},
				{
					text: "Developed interactive technology for public education of sound issues",
					filter: ["nsidc", "full"],
					exclude: ["outdoor"]
				},
				{
					text: "Collaborated closely with regional soundscape scientist on maintenance, field logistics, and data analysis",
					filter: [],
					exclude: ["mica", "outdoor"]
				},
				{
					text: "Fixed electronic & mechanical equipment failures with limited resources in the field",
					filter: ["full"]
				},
				{
					text: "Implemented scripts to identify, correct, or remove faulty data",
					filter: ["full"]
				},
				{
					text: "Led overnight backcountry field patrols with other researchers to maintain equipment",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Arranged all logistics for backcountry travel, including ARCC itineraries, flight plans, and team equipment",
					filter: ["outdoor", "mica", "full"],
					highlight: ["elias"]
				},
				{
					text: "Managed risks from wildlife, rivers, climate, and group decision-making while traveling in trail-less wilderness",
					filter: ["outdoor", "mica", "full"],
					highlight: ["elias"]
				},
				{
					text: "Navigated through arboreal and fluvial obstacles to remote soundstations by topographic map, compass, and GPS",
					filter: ["outdoor", "full"]
				},
				{
					text: "Operated government vehicles on unimproved roads while following park-specific road rules",
					filter: ["full"]
				},
				{
					text: "Collaborated with Backcountry and Law Enforcement rangers on field operations",
					filter: ["full"]
				},
				{
					text: "Served as A-100 air crew member to access soundstations by helicopter",
					filter: ["outdoor", "full"]
				},
				{
					text: "Completed ASI ATV RiderCourse and operated ATVs to access soundstations",
					filter: ["full"]
				},
				{
					text: "Accessed, inventoried, and maintained historic backcountry patrol cabins",
					filter: ["full"]
				},
				{
					text: "Identified noise events in recorded data by spectrogram analysis",
					filter: ["full"]
				},
				{
					text: "Performed audibility analysis by labeling sound events in recorded data",
					filter: ["full"]
				},
			]
		},
		{
			place: "Ab Initio Software",
			link: "http://www.abinitio.com",
			position: "Development Intern",
			dates: "Jun 2014 - Aug 2014",
			exclude: ["outdoor"],
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
			exclude: ["outdoor"],
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
			exclude: ["outdoor"],
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
		{text: "Distributed Systems", highlight: ["avatech"], filter: [], exclude: ["outdoor"]},
		{text: "Machine Learning", highlight: ["avatech"], filter: [], exclude: ["outdoor"]},
		{text: "Visual Analytics", highlight: ["avatech"], filter: [], exclude: ["outdoor"]},
		{text: "Visualization", highlight: ["avatech"], filter: ["full"], exclude: ["outdoor"]},
		{text: "Web Programming", highlight: ["avatech"], filter: [], exclude: ["outdoor"]},
		{text: "Computer Vision", highlight: ["avatech"], filter: [], exclude: ["outdoor"]},
		{text: "Algorithms", highlight: ["avatech"], filter: [], exclude: ["outdoor"]},
		{text: "Operating Systems", filter: [], exclude: ["outdoor"]},
		{text: "Machine Structure & Assembly", filter: [], exclude: ["outdoor"]},
		{text: "Computation Theory", filter: ["full"], exclude: ["outdoor"]},
		{text: "Linear Algebra", filter: [], exclude: ["outdoor"]},
		{text: "GIS", filter: []},
		{text: "Geomorphology", filter: ["outdoor", "mica", "nsidc", "full"]},
		{text: "Climate Science", filter: ["outdoor", "mica", "nsidc", "full"], highlight: ["elias"]},
		{text: "Paleoclimatology", filter: ["outdoor", "mica", "nsidc", "full"]},

		{text: "Wilderness First Aid (4/2012 & 4/2014)", filter: ["outdoor", "mica", "full"], highlight: ["elias"]},
		{text: "CPR & AED (4/2012 & 4/2014)", filter: ["outdoor", "mica", "full"], highlight: ["elias"]},
		{text: "A-100 basic aviation safety (6/2015)", filter: ["outdoor", "mica", "full"]},
		{text: "ASI ATV RiderCourse (6/2015)", filter: ["outdoor", "mica", "full"]},
		{text: "Swiftwater Rescue (9/2012)", filter: ["outdoor", "mica", "full"]},
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
			exclude: ["outdoor"],
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
					text: "Led outdoor instructional trips in ice climbing, single- and multi-pitch rock climbing, whitewater kayaking, backpacking, and hiking",
					filter: ["outdoor", "mica"],
					highlight: ["elias"]
				},
				{
					text: "Wrote emergency response protocols used by trip leaders and lodge caretakers",
					filter: ["outdoor", "mica"],
					highlight: ["elias"]
				},
				{
					text: "Organized and taught seminars on outdoor skills, including rock climbing anchor building, rappelling safety, single-pitch climbing group and site management, lead climbing & belaying, ice climbing technique, rigging and pulley systems, map & compass navigation, winter hiking safety, basic whitewater kayak strokes & wet exiting, and rolling technique",
					filter: ["outdoor"]
				},
				{
					text: "Supervised 17-member executive board and delegated responsibilities",
					filter: []
				},
				{
					text: "Collaborated with university administrators to improve club function",
					filter: [],
					exclude: ["outdoor"]
				},
				{
					text: "Developed and led long-term technical and safety curriculum",
					filter: []
				},
				{
					text: "Managed response to outdoor emergencies on club trips in collaboration with emergency personnel and university Public Safety administrators",
					filter: ["outdoor", "mica"],
					highlight: []
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
			place: "VICEfest",
			link: "https://viceaxe.com/events/vice-fest/",
			position: "Equipment Coordinator",
			dates: "2013 - 2015",
			filter: ["outdoor", "mica", "full"],
			items: [
				{
					text: "Supervised 5-person team in distributing and collecting hundreds of pieces of gear for ice climbing festival",
					filter: []
				},
				{
					text: "Presented safety talks on proper ice climbing equipment use, belaying, site safety, and basic ice climbing technique",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Designed inventory system allowing return of gear from dozens of sponsors to original owners with zero losses",
					filter: ["mica", "full"]
				},
				{
					text: "Assisted participants with fitting mountaineering boots and crampons",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Flexibly responded to complications in hectic and time-pressured environment",
					filter: ["full"]
				}
			]
		},
		{
			place: "Tufts Wilderness Orientation",
			link: "http://www.tuftswildernessorientation.com",
			position: "Trip Leader",
			dates: "2013 - 2014",
			filter: ["outdoor", "full"],
			items: [
				{
					text: "Co-led groups of 8 students on 5-day backpacking trips in New Hampshire",
					filter: []
				},
				{
					text: "Instructed participants and staff in campcraft, including stove use, bear-bagging, knots, and tarps",
					filter: []
				},
				{
					text: "Created immediate and lasting community to support students through their first year of college",
					filter: []
				}
			]
		}
	];

});