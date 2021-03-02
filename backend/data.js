const bcrypt = require("bcrypt");

const data = {
  users: [
    {
      name: "chinedu",
      email: "chinedu.test@gmail.com",
      password: bcrypt.hashSync("password100", 8),
      isAdmin: true
    },
    {
      name: "emma",
      email: "emma.test@gmail.com",
      password: bcrypt.hashSync("password100", 8),
      isAdmin: false
    }
  ],
  products: [
    {
      name: "Sony WH-1000XM4",
      category: "Headphones",
      image: "/Images/p1.jpg",
      price: 299,
      brand: "Sony",
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      reviews: 9247,
      description: "Wireless Industry Leading Noise Cancelling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Blue"
    },
    {
      name: "Airpods Max",
      category: "Headphones",
      image: "/Images/p2.jpg",
      price: 599,
      brand: "Apple",
      countInStock: 20,
      rating: 4.5,
      numReviews: 10,
      reviews: 969,
      description: "New Apple Airpods Max - Pink"
    },
    {
      name: "Bose Headphones 700",
      category: "Headphones",
      image: "/Images/p3.jpg",
      price: 379,
      brand: "Sony",
      countInStock: 15,
      rating: 4.5,
      numReviews: 10,
      reviews: 9247,
      description: "Bose Noise Cancelliing Wireless Bluetooth Headphones 700, with Alexa Voice control, Black"
    },
    {
      name: "Plantronics BackBeat PRO2",
      category: "Headphones",
      image: "/Images/p4.jpg",
      price: 137,
      brand: "Plantronics",
      countInStock: 0,
      rating: 4.6,
      numReviews: 10,
      reviews: 254,
      description: "Plantronics BlackBeat PRO2 Noise Cancelling Black"
    },
    {
      name: "Sony WHXB900N",
      category: "Headphones",
      image: "/Images/p5.jpg",
      price: 248,
      brand: "Sony",
      countInStock: 5,
      rating: 4.5,
      numReviews: 10,
      reviews: 9247,
      description: "Sony WHXB900N Noise Cancelling Headphones, Wireless Bluetooth Over the Ear Headset with Mic for Phone-Call and Alexa Voice Control - Black"
    },
    {
      name: "Bose QuietComfort 35 II",
      category: "Headphones",
      image: "/Images/p6.jpg",
      price: 299,
      brand: "Bose",
      countInStock: 7,
      rating: 4.7,
      numReviews: 10,
      reviews: 41889,
      description: "Bose Noise-Cancelling, with Alexa Voice Control - Black"
    }
  ]
};

// export default data;
module.exports = data;