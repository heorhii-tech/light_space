import imageOfCard1 from "../assets/image-of-card-1.jpg";
import imageOfCard2 from "../assets/image1.png";
import imageOfCard3 from "../assets/eventCard2.png";
import imageOfCard4 from "../assets/aboutInfoCard2.png";
const headerMenu = [
  {
    item: `Home`,
    link: `/`,
  },
  {
    item: `About us`,
    link: `/about_us`,
  },
  {
    item: `Contact`,
    link: `/contact`,
  },
  {
    item: `Reservation`,
    link: `/reservation`,
  },
  {
    item: `Login`,
    link: `/login`,
  },
  {
    item: `Sign Up`,
    link: `/signup`,
  },
  {
    item: `My Account`,
    link: `/my_account`,
  },
];
const homePageText = [
  {
    title: `Welcome to Light Space`,
  },
  {
    text: [
      `Discover a dynamic and inspiring environment tailored for productivity and innovation.`,
      `Our coworking space offers flexible solutions to meet the diverse needs of freelancers, startups, and established businesses alike.`,
      `Whether you're looking for a private office, a dedicated desk, or a vibrant communal area, we provide the perfect setting to foster collaboration and growth.`,
    ],
  },
];
const infoCards = [
  {
    hashtag: `#light.space`,
    text: `Experience the vibrant energy of our coworking space!`,
    path: imageOfCard1,
  },
  {
    hashtag: `#light.space`,
    text: `Wait for you!`,
    path: imageOfCard2,
  },
  {
    hashtag: `#light.space`,
    text: `Experience the vibrant energy of our coworking space!`,
    path: imageOfCard3,
  },
  {
    hashtag: `#light.space`,
    text: `Wait for you!`,
    path: imageOfCard4,
  },
];
const addres = `Laboratorniy provylok 7, Kyiv Ukraine`;
const tel = `+31638699561`;
export { headerMenu, homePageText, infoCards, addres, tel };
