const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');

dotenv.config();

const doctors = [
  {
    name: "Dr. Marcus Thompson",
    title: "MD",
    specialty: "Primary Care",
    gender: "Male",
    photo: "marcus.jpg",
    bio: "Dr. Marcus Thompson is a board-certified primary care physician with over 10 years of experience serving the DFW community. He is passionate about preventive care and building long-term relationships with his patients.",
    location: { city: "Dallas", state: "TX", area: "South Dallas" },
    contact: { phone: "214-555-0101", website: "www.drthompson.com" },
    booking: { url: "https://www.drthompson.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Adults", "Seniors"],
    experience: 10,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: false,
    insurance: ["Aetna", "BlueCross", "Cigna", "United"],
    languages: ["English"],
    rating: 4.8,
    isFictional: true
  },
  {
    name: "Dr. Aaliyah Johnson",
    title: "MD",
    specialty: "Pediatrics",
    gender: "Female",
    photo: "aaliyah.jpg",
    bio: "Dr. Aaliyah Johnson is a dedicated pediatrician who has been caring for children in the DFW area for 8 years. She creates a warm and welcoming environment for children and families of all backgrounds.",
    location: { city: "Fort Worth", state: "TX", area: "West Fort Worth" },
    contact: { phone: "817-555-0102", website: "www.drjohnsonpeds.com" },
    booking: { url: "https://www.drjohnsonpeds.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Children", "Teens"],
    experience: 8,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: true,
    insurance: ["Aetna", "BlueCross", "Medicaid", "CHIP"],
    languages: ["English", "Spanish"],
    rating: 4.9,
    isFictional: true
  },
  {
    name: "Dr. Simone Carter",
    title: "MD",
    specialty: "OB/GYN",
    gender: "Female",
    photo: "simone.jpg",
    bio: "Dr. Simone Carter is a compassionate OB/GYN who specializes in comprehensive women's health. She is committed to providing culturally sensitive care and ensuring every patient feels heard and respected.",
    location: { city: "Dallas", state: "TX", area: "North Dallas" },
    contact: { phone: "214-555-0103", website: "www.drcarterwomenshealth.com" },
    booking: { url: "https://www.drcarterwomenshealth.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: false },
    ageGroups: ["Teens", "Adults", "Seniors"],
    experience: 12,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: true,
    insurance: ["Aetna", "BlueCross", "Cigna", "United", "Humana"],
    languages: ["English"],
    rating: 4.7,
    isFictional: true
  },
  {
    name: "Dr. James Washington",
    title: "MD",
    specialty: "Psychiatry",
    gender: "Male",
    photo: "james.jpg",
    bio: "Dr. James Washington is a board-certified psychiatrist with a deep understanding of the unique mental health challenges faced by the Black community. He provides medication management and holistic psychiatric care.",
    location: { city: "Dallas", state: "TX", area: "Uptown Dallas" },
    contact: { phone: "214-555-0104", website: "www.drwashingtonpsych.com" },
    booking: { url: "https://www.drwashingtonpsych.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Teens", "Adults", "Seniors"],
    experience: 15,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: true,
    insurance: ["Aetna", "BlueCross", "Cigna", "United"],
    languages: ["English"],
    rating: 4.9,
    isFictional: true
  },
  {
    name: "Candy Jones",
    title: "LMFT-Associate",
    specialty: "Therapy & Counseling",
    gender: "Female",
    photo: "candace.jpg",
    bio: "Candy Jones is a Licensed Marriage and Family Therapist Associate dedicated to helping individuals and families navigate life's challenges. She specializes in trauma-informed care and culturally affirming therapy.",
    location: { city: "Dallas", state: "TX", area: "Dallas" },
    contact: { phone: "214-555-0105", website: "www.candacecodyjones.com" },
    booking: { url: "https://www.candyjones.com/book", platform: "SimplePractice" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Adults"],
    experience: 5,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: true,
    insurance: ["Aetna", "BlueCross"],
    languages: ["English"],
    rating: 5.0,
    isFictional: false
  },
  {
    name: "Dr. David Mitchell",
    title: "MD",
    specialty: "Dermatology",
    gender: "Male",
    photo: "david.jpg",
    bio: "Dr. David Mitchell is a board-certified dermatologist with expertise in treating skin conditions specific to melanated skin. He understands the unique dermatological needs of Black patients and provides culturally competent care.",
    location: { city: "Plano", state: "TX", area: "North Plano" },
    contact: { phone: "972-555-0106", website: "www.drmitchellderma.com" },
    booking: { url: "https://www.drmitchellderma.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: false },
    ageGroups: ["Children", "Teens", "Adults", "Seniors"],
    experience: 9,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: false,
    insurance: ["Aetna", "BlueCross", "Cigna", "United", "Humana"],
    languages: ["English"],
    rating: 4.6,
    isFictional: true
  },
  {
    name: "Dr. Keisha Brown",
    title: "MD",
    specialty: "Cardiology",
    gender: "Female",
    photo: "keisha.jpg",
    bio: "Dr. Keisha Brown is a cardiologist who is passionate about addressing the disproportionate impact of heart disease on the Black community. She combines cutting-edge treatment with compassionate patient education.",
    location: { city: "Dallas", state: "TX", area: "East Dallas" },
    contact: { phone: "214-555-0107", website: "www.drkbrownheart.com" },
    booking: { url: "https://www.drkbrownheart.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Adults", "Seniors"],
    experience: 14,
    acceptingPatients: false,
    lgbtqFriendly: true,
    genderAffirming: false,
    insurance: ["Aetna", "BlueCross", "Medicare", "United"],
    languages: ["English"],
    rating: 4.8,
    isFictional: true
  },
  {
    name: "Dr. Andre Robinson",
    title: "MD",
    specialty: "Orthopedics",
    gender: "Male",
    photo: "andre.jpg",
    bio: "Dr. Andre Robinson is an orthopedic surgeon specializing in sports medicine and joint replacement. He has a particular focus on helping active patients maintain their quality of life through both surgical and non-surgical treatments.",
    location: { city: "Arlington", state: "TX", area: "Central Arlington" },
    contact: { phone: "817-555-0108", website: "www.drrobinsonortho.com" },
    booking: { url: "https://www.drrobinsonortho.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: false },
    ageGroups: ["Teens", "Adults", "Seniors"],
    experience: 11,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: false,
    insurance: ["Aetna", "BlueCross", "Cigna", "United", "Medicare"],
    languages: ["English"],
    rating: 4.7,
    isFictional: true
  },
  {
    name: "Dr. Imani Davis",
    title: "MD",
    specialty: "Neurology",
    gender: "Female",
    photo: "imani.jpg",
    bio: "Dr. Imani Davis is a neurologist dedicated to diagnosing and treating disorders of the brain and nervous system. She takes a holistic approach to neurological care and is committed to making complex conditions understandable for her patients.",
    location: { city: "Irving", state: "TX", area: "Las Colinas" },
    contact: { phone: "972-555-0109", website: "www.drdavisneuro.com" },
    booking: { url: "https://www.drdavisneuro.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Adults", "Seniors"],
    experience: 7,
    acceptingPatients: true,
    lgbtqFriendly: true,
    genderAffirming: true,
    insurance: ["Aetna", "BlueCross", "Cigna", "Medicare"],
    languages: ["English", "French"],
    rating: 4.8,
    isFictional: true
  },
  {
    name: "Dr. Raymond Foster",
    title: "MD",
    specialty: "Internal Medicine",
    gender: "Male",
    photo: "raymond.jpg",
    bio: "Dr. Raymond Foster is an internal medicine physician with over 13 years of experience managing complex adult health conditions. He takes a comprehensive approach to patient care and emphasizes the importance of preventive medicine.",
    location: { city: "Garland", state: "TX", area: "Central Garland" },
    contact: { phone: "972-555-0110", website: "www.drfostermed.com" },
    booking: { url: "https://www.drfostermed.com/book", platform: "Internal" },
    visitType: { inPerson: true, virtual: true },
    ageGroups: ["Adults", "Seniors"],
    experience: 13,
    acceptingPatients: true,
    lgbtqFriendly: false,
    genderAffirming: false,
    insurance: ["Aetna", "BlueCross", "Cigna", "United", "Medicare", "Medicaid"],
    languages: ["English"],
    rating: 4.6,
    isFictional: true
  }
];

// connect to database and seed
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // clear existing doctors
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // insert all 10 doctors
    await Doctor.insertMany(doctors);
    console.log('10 doctors added successfully');

    mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();