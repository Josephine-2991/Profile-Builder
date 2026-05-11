// Developer Profile Builder

const developers = [
  {
    id: 1,
    name: "Amara Johnson",
    track: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    projects: { completed: 8, ongoing: 2 },
    isAvailable: true,
    mentor: { name: "Sarah Chen", specialty: "React" }
  },
  {
    id: 2,
    name: "Chidi Okafor",
    track: "Backend",
    skills: ["Python", "Django", "SQL"],
    projects: { completed: 5, ongoing: 3 },
    isAvailable: false,
    mentor: { name: "James Udo", specialty: "System Design" }
  },
  {
    id: 3,
    name: "Fatima Hassan",
    track: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "Vue", "TypeScript"],
    projects: { completed: 10, ongoing: 1 },
    isAvailable: true,
    mentor: null
  },
  {
    id: 4,
    name: "Emeka Nwosu",
    track: "Mobile",
    skills: ["Dart", "Flutter"],
    projects: { completed: 3, ongoing: 1 },
    isAvailable: true,
    mentor: { name: "Femi Adeyemi", specialty: "Mobile Architecture" }
  },
  {
    id: 5,
    name: "Zara Ahmed",
    track: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
    projects: { completed: 7, ongoing: 2 },
    isAvailable: true,
    mentor: null
  },
  {
    id: 6,
    name: "Grace Eze",
    track: "Frontend",
    skills: [],
    projects: { completed: 0, ongoing: 0 },
    isAvailable: false,
    mentor: { name: "Sarah Chen", specialty: "React" }
  }
];


// STEP 1: PROFILE CARDS
console.log("========== STEP 1: PROFILE CARDS ==========");

const buildProfileCard = ({
  name,
  track,
  skills,
  projects,
  isAvailable,
  mentor
}) => {
  const availability = isAvailable
    ? "Available"
    : "Not Available";

  const mentorName =
    mentor?.name ?? "No mentor assigned";

  const skillsList =
    skills.length > 0
      ? skills.join(", ")
      : "No skills listed yet";

  return `
Developer: ${name}
Track: ${track}
Skills: ${skillsList}
Projects Completed: ${projects.completed}
Projects Ongoing: ${projects.ongoing}
Availability: ${availability}
Mentor: ${mentorName}
----------------------------------------`;
};

developers
  .map(buildProfileCard)
  .forEach(card => console.log(card));



// STEP 2: UNIQUE SKILLS POOL


console.log('========== STEP 2: UNIQUE SKILLS POOL ==========')

const allSkills = developers.flatMap(
  ({ skills }) => skills
);

const uniqueSkills = [...new Set(allSkills)].sort();

console.log(uniqueSkills);


console.log("\n========== STEP 3: TRACK SUMMARY ==========\n");

const uniqueTracks = [
  ...new Set(developers.map(({ track }) => track))
];

const trackSummary = uniqueTracks.map(trackName => {
  const trackDevelopers = developers.filter(
    ({ track }) => track === trackName
  );

  const availableCount = trackDevelopers.filter(
    ({ isAvailable }) => isAvailable
  ).length;

  const totalCompletedProjects = trackDevelopers.reduce(
    (total, { projects }) =>
      total + projects.completed,
    0
  );

  return `
Track: ${trackName}
Developers: ${trackDevelopers.length}
Available: ${availableCount}
Completed Projects: ${totalCompletedProjects}
----------------------------------------`;
});

trackSummary.forEach(summary => console.log(summary));



console.log("\n========== STEP 4: ADD A NEW DEVELOPER ==========\n");

const addDeveloper = (developerList, newDeveloper) => {
  return [...developerList, newDeveloper];
};

const newDeveloper = {
  id: 7,
  name: "Tolu Adebayo",
  track: "DevOps",
  skills: ["Docker", "Kubernetes", "AWS"],
  projects: { completed: 4, ongoing: 1 },
  isAvailable: true,
  mentor: {
    name: "Michael Peters",
    specialty: "Cloud Engineering"
  }
};

const updatedDevelopers = addDeveloper(
  developers,
  newDeveloper
);

console.log(
  `Original Length: ${developers.length}`
);

console.log(
  `New Length: ${updatedDevelopers.length}`
);



console.log("\n========== STEP 5: UPDATE A DEVELOPER ==========\n");

const updateDeveloper = (
  developerList,
  id,
  updates
) => {
  return developerList.map(developer =>
    developer.id === id
      ? { ...developer, ...updates }
      : developer
  );
};

const emekaUpdates = {
  skills: ["Dart", "Flutter", "Firebase", "React Native"],
  isAvailable: false
};

const developersAfterUpdate = updateDeveloper(
  developers,
  4,
  emekaUpdates
);

const updatedEmeka = developersAfterUpdate.find(
  ({ id }) => id === 4
);

console.log(updatedEmeka);


console.log("\n========== STEP 6: MENTOR WORKLOAD ==========\n");

const mentorWorkload = developers.reduce(
  (accumulator, { mentor }) => {
    const mentorName =
      mentor?.name ?? "Unassigned";

    accumulator[mentorName] =
      (accumulator[mentorName] ?? 0) + 1;

    return accumulator;
  },
  {}
);

console.log(mentorWorkload);



console.log("\n========== STEP 7: EXPERIENCE RANKING ==========\n");

const rankedDevelopers = [...developers]
  .sort(
    (
      { projects: projectsA },
      { projects: projectsB }
    ) => {
      const totalA =
        projectsA.completed + projectsA.ongoing;

      const totalB =
        projectsB.completed + projectsB.ongoing;

      return totalB - totalA;
    }
  )
  .map((developer, index) => {
    const totalProjects =
      developer.projects.completed +
      developer.projects.ongoing;

    const medal =
      index === 0
        ? "🥇"
        : index === 1
        ? "🥈"
        : index === 2
        ? "🥉"
        : "";

    return `${medal} ${index + 1}. ${developer.name} - ${totalProjects} total projects`;
  });

rankedDevelopers.forEach(rank =>
  console.log(rank)
);