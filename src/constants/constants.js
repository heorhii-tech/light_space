import imageOfCard1 from "../assets/image-of-card-1.jpg";
import imageOfCard2 from "../assets/image1.png";
import imageOfCard3 from "../assets/eventCard2.png";
import imageOfCard4 from "../assets/aboutInfoCard2.png";
import imgValue1 from "../assets/light.png";
import imgValue2 from "../assets/circle.png";
import imgValue3 from "../assets/colloboration.png";
import imgValue4 from "../assets/Responsibility.png";
import imgValue5 from "../assets/users.png";
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
const aboutUsPageText = [
  {
    title: `We are a young team of professionals engaged in the development and management of Svitlo Space.`,
  },
  {
    text: [
      `Our founders are three resilient women who recognized the importance of a workspace that stimulates and inspires creativity.`,
      `We started our journey in 2022 with the goal of creating the best coworking space in the city.`,
      `Our team consists of talented professionals from various fields, each bringing unique knowledge and experience. We come together to create a space where our clients can work, learn, and connect.`,
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
const valuesData = [
  {
    img: imgValue1,
    text: `Innovation: We constantly stay updated with trends and implement new ideas in our work.`,
    bgColor: `#D2D2D2`,
  },
  {
    img: imgValue2,
    text: `Flexibility: We find optimal solutions for each client.`,
    bgColor: `#687D6B`,
    color: `white`,
  },
  {
    img: imgValue3,
    text: `Collaboration: We believe that only by working together can we achieve greater success.`,
    bgColor: `#D2D2D2`,
  },
  {
    img: imgValue4,
    text: `Responsibility: We strive to achieve the best possible results in our work..`,
    bgColor: `#687D6B`,
    color: `white`,
  },
  {
    img: imgValue5,
    text: `Customer Focus: We always prioritize the needs of our clients.`,
    bgColor: `#474E54`,
    color: `white`,
  },
];
const addres = `Laboratorniy provylok 7, Kyiv Ukraine`;
const tel = `+31638699561`;
export {
  headerMenu,
  homePageText,
  infoCards,
  addres,
  tel,
  aboutUsPageText,
  valuesData,
};
