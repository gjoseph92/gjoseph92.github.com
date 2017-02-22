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
			place: "Park City Mountain Resort",
			link: "http://www.parkcitymountain.com/",
			position: "Ski Patroller",
			dates: "Dec 2016 - Apr 2017",
			items: [
				{
					text: "Provide on-mountain emergency medical care to inured guests",
					filter: []
				},
				{
					text: "Safely ski injured guests in toboggans through all terrain",
					filter: []
				},
				{
					text: "Assist in avalanche control work using explosives and ski cuts",
					filter: []
				},
				{
					text: "Ski while carrying large boxes, foam pads, stacks of toilet paper, etc. obscuring face",
					filter: []
				},
				// {
				// 	text: "Shred gnar, with professionalism",
				// 	filter: []
				// }
			]
		},
		{
			place: "National Park Service, Natural Sounds & Night Skies Division",
			link: "http://www.nps.gov/orgs/1050/index.htm",
			position: "Software Engineer",
			dates: "Nov 2015 - May 2016",
			items: [
				{
					text: "Developed and documented open-source Python library for querying data & metadata contained in hierarchical file systems",
					filter: []
				},
				{
					text: "Wrote Python library to efficiently sub-select, parse, & process 200TB acoustic dataset",
					filter: []
				},
				{
					text: "Advocated for open-source release of government-developed code in the National Park Service",
					exclude: ["outdoor"]
				},
				{
					text: "Led or assisted with fieldwork installing sound monitoring equipment in National Parks",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Consulted with scientists to design unified software tool addressing needs of several distinct projects",
					filter: [],
					exclude: ["outdoor", "aaa"]
				}
			]
		},
		{
			place: "St. Elias Alpine Guides",
			link: "http://www.steliasguides.com/",
			position: "Lead Ice Climbing Guide",
			dates: "Jun 2016 - Sept 2016",
			items: [
				{
					text: "Led ice climbing & glacier hiking trips in Wrangell-St. Elias National Park, Alaska",
					filter: []
				},
				{
					text: "Constructed ice anchors & rope systems for bottom- and top-managed climbing sites, including rescue systems",
					filter: ["outdoor", "aaa"]
				},
				{
					text: "Managed group safety in remote wilderness settings and administered first aid as needed",
					filter: []
				},
				{
					text: "Presented interpretation of natural and cultural history on 2-hour mine town tours",
					filter: []
				},
				{
					text: "Operated information center to provide orientation to visitors",
					filter: ["outdoor", "aaa", "full"]
				},
				{
					text: "Transported clients safely in 15-passenger vans on unimproved roads",
					filter: ["outdoor", "aaa", "full"]
				},
				{
					text: "Burned trash, when necessary",
					filter: []
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
					text: "Developed Python library to query & access 1TB acoustic dataset",
					filter: [],
					exclude: ["outdoor", "aaa"]
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
					filter: ["axiom", "nsidc", "full"],
					exclude: ["outdoor", "aaa"]
				},
				{
					text: "Collaborated closely with regional soundscape scientist on maintenance, field logistics, and data analysis",
					filter: ["full"],
					exclude: ["outdoor", "aaa"]
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
					text: "Led overnight backcountry fieldwork with other researchers to maintain equipment",
					filter: [],
					highlight: ["elias"]
				},
				{
					text: "Arranged all logistics for backcountry travel, including ARCC itineraries, flight plans, and team equipment",
					filter: ["outdoor", "aaa", "full"],
					highlight: ["elias"]
				},
				{
					text: "Managed risks from wildlife, rivers, climate, and group decision-making while traveling in trail-less wilderness",
					filter: ["outdoor", "aaa", "full"],
					highlight: ["elias"]
				},
				{
					text: "Navigated through arboreal and fluvial obstacles to remote soundstations by topographic map, compass, and GPS",
					filter: ["outdoor", "aaa", "full"]
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
					filter: ["outdoor", "aaa", "full"]
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
				{
					text: "Supplied roommates with 1-2 yogurt cups per day from employee snackroom",
					filter: []
				}
			]
		},
		{
			place: "Center for Engineering Education and Outreach",
			link: "http://www.ceeo.tufts.edu",
			position: "Research Assistant",
			dates: "May 2013 - Jun 2014",
			exclude: ["outdoor", "aaa"],
			items: [
				{
					text: "Consulted with education researchers to improve data collection methods",
					filter: ["full", "nsidc", "axiom"],
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
			exclude: ["outdoor", "aaa"],
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
					filter: ["full", "axiom"],
				}
			]
		}
	];

	$scope.courses = [
		{text: "Distributed Systems", highlight: ["avatech"], filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Machine Learning", highlight: ["avatech"], filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Visual Analytics", highlight: ["avatech"], filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Visualization", highlight: ["avatech"], filter: ["full"], exclude: ["outdoor", "aaa"]},
		{text: "Web Programming", highlight: ["avatech"], filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Computer Vision", highlight: ["avatech"], filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Algorithms", highlight: ["avatech"], filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Operating Systems", filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Machine Structure & Assembly", filter: [], exclude: ["outdoor", "aaa"]},
		{text: "Computation Theory", filter: ["full"], exclude: ["outdoor", "aaa"]},
		{text: "Linear Algebra", filter: [], exclude: ["outdoor", "aaa"]},
		{text: "GIS", filter: []},
		{text: "Geomorphology", filter: ["outdoor", "aaa", "axiom", "nsidc", "full"]},
		{text: "Climate Science", filter: ["outdoor", "aaa", "axiom", "nsidc", "full"], highlight: ["elias"]},
		{text: "Paleoclimatology", filter: ["outdoor", "aaa", "axiom", "nsidc", "full"]},

		{text: "Wilderness First Responder (4/2016)", filter: ["outdoor", "aaa", "axiom", "full"], highlight: ["elias"]},
		{text: "AAI Level 1 Avalanche Fundamentals (12/2016)", filter: ["outdoor", "aaa", "full"]},
		{text: "CPR & AED (4/2016)", filter: ["outdoor", "aaa", "full"], highlight: ["elias"]},
		{text: "Wilderness First Aid (4/2012 & 4/2014)", filter: ["full"]},
		{text: "A-100 basic aviation safety (6/2015)", filter: ["outdoor", "aaa", "full"]},
		{text: "ASI ATV RiderCourse (6/2015)", filter: ["outdoor", "aaa", "full"]},
		{text: "Swiftwater Rescue (9/2012)", filter: ["outdoor", "aaa", "full"]},
	];

	$scope.skills = {
		"Languages": [
			{text: "Python (+NumPy, pandas, matplotlib)", highlight: ["avatech"], filter: []},
			{text: "JavaScript/HTML/CSS", highlight: ["avatech"], filter: []},
			{text: "Shell scripting (bash)", filter: []},
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
			link: "http://www.tuftsmountainclub.org/activities",
			position: "Web developer",
			dates: "2013 - 2015",
			exclude: ["outdoor", "aaa"],
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
					text: "Developed vehicle reservation, online shopping, trip-posting, reimbursement-processing, and budgeting systems",
					filter: []
				}
			]
		},
		{
			place: "Tufts Mountain Club",
			link: "http://www.tuftsmountainclub.org/activities",
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
					filter: ["outdoor", "aaa"],
					highlight: ["elias"]
				},
				{
					text: "Wrote emergency response protocols used by trip leaders and lodge caretakers",
					filter: ["outdoor", "aaa"],
					highlight: ["elias"]
				},
				{
					text: "Organized and taught seminars on outdoor skills, including rock climbing anchor building, rappelling safety, single-pitch climbing group and site management, lead climbing & belaying, ice climbing technique, rigging and pulley systems, map & compass navigation, winter hiking safety, basic whitewater kayak strokes & wet exiting, and rolling technique",
					filter: ["outdoor", "aaa"]
				},
				{
					text: "Supervised 17-member executive board and delegated responsibilities",
					filter: []
				},
				{
					text: "Collaborated with university administrators to improve club function",
					filter: [],
					exclude: ["outdoor", "aaa"]
				},
				{
					text: "Developed and led long-term technical and safety curriculum",
					filter: []
				},
				{
					text: "Managed response to outdoor emergencies on club trips in collaboration with emergency personnel and university Public Safety administrators",
					filter: ["outdoor", "aaa"],
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
			link: "http://www.tuftsmountainclub.org/activities",
			position: "Technical Skills & Safety director",
			dates: "2011 - 2013",
			filter: ["full"]
		},
		{
			place: "VICEfest",
			link: "https://viceaxe.com/events/vice-fest/",
			position: "Equipment Coordinator",
			dates: "2013 - 2015",
			filter: ["outdoor", "aaa", "full"],
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
					filter: ["full", "aaa"]
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
			filter: ["outdoor", "aaa", "full"],
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