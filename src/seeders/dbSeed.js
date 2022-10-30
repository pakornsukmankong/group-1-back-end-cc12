const {
  User,
  Property,
  PropertyType,
  PropertyImage,
  Facility,
  PropertyFacility,
  Reserve,
  Booking,
  PropertyReview,
  Wishlist,
  Category
} = require('../models');
const bcrypt = require('bcryptjs');

// const userSeed = async () => {
// 	const hashpassword = await bcrypt.hash('123456', 12);

// 	const userData = [
// 		{
// 			firstName: 'yor',
// 			lastName: 'forger',
// 			email: 'yor@gmail.com',
// 			password: hashpassword,
// 			gender: 'Female',
// 			phone: '0811111111',
// 		},
// 		{
// 			firstName: 'yuri',
// 			lastName: 'baiar',
// 			email: 'yuri@gmail.com',
// 			password: hashpassword,
// 			gender: 'Male',
// 			phone: '0822222222',
// 		},
// 		{
// 			firstName: 'justin',
// 			lastName: 'bieber',
// 			email: 'justin@gmail.com',
// 			password: hashpassword,
// 			gender: 'Male',
// 			phone: '0833333333',
// 		},
// 		{
// 			firstName: 'loid',
// 			lastName: 'forger',
// 			email: 'loid@gmail.com',
// 			password: hashpassword,
// 			gender: 'Male',
// 			phone: '0844444444',
// 		},
// 		{
// 			firstName: 'anya',
// 			lastName: 'forger',
// 			email: 'anya@gmail.com',
// 			password: hashpassword,
// 			gender: 'Female',
// 			phone: '0855555555',
// 		},
// 	];
// 	let res = await User.bulkCreate(userData);
// 	console.log(res);
// 	process.exit(0);
// };
// userSeed();

// const propertyTypeSeed = async () => {
// 	const propertyTypeData = [
// 		{
// 			propertyTypeName: 'villa',
// 			propertyTypeIconImage:
// 				'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
// 		},
// 		{
// 			propertyTypeName: 'Design',
// 			propertyTypeIconImage:
// 				'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
// 		},
// 		{
// 			propertyTypeName: 'Beach',
// 			propertyTypeIconImage:
// 				'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
// 		},
// 		{
// 			propertyTypeName: 'Lake',
// 			propertyTypeIconImage:
// 				'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg',
// 		},
// 		{
// 			propertyTypeName: 'Castile',
// 			propertyTypeIconImage:
// 				'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg',
// 		},
// 	];
// 	let res = await PropertyType.bulkCreate(propertyTypeData);
// 	console.log(res);
// 	process.exit(0);
// };
// propertyTypeSeed();

// const propertySeed = async () => {
// 	const propertyData = [
// 		{
// 			propertyName: 'Samujana Twenty-Four',
// 			description:
// 				'The ideal spot for entertaining large groups, twenty-four is the biggest and most amenity filled villa in the Samujana development. Indoor and outdoor areas are spacious enough for a large amount of guests',
// 			address: 'Koh Samui',
// 			latitude: '9.528606912886573',
// 			longitude: '100.04410549112107',
// 			bedQty: '8',
// 			bedRoomQty: '8',
// 			bathRoomQty: '10',
// 			pricePerDate: '1500',
// 			roomAvaliable: '1',
// 			userHostId: 1,
// 			propertyTypeId: 1,
// 		},
// 		{
// 			propertyName: 'Tree House 10 mins drive fr center',
// 			description:
// 				'Viva Chiang Mai  nature home stay is the latest accommodation adding alternative for travelers searching for perfect place to stay during their visit to Chiang Mai.',
// 			address: 'Chiang Mai',
// 			latitude: '9.528606912886573',
// 			longitude: '100.04410549112107',
// 			bedQty: '1',
// 			bedRoomQty: '1',
// 			bathRoomQty: '1',
// 			pricePerDate: '1238',
// 			roomAvaliable: '1',
// 			userHostId: 2,

// 			propertyTypeId: 2,
// 		},
// 		{
// 			propertyName: 'a magic horizon of coziness',
// 			description:
// 				'Every booking includes free protection from Host cancellations',
// 			address: 'Kamala',
// 			latitude: '9.528606912886573',
// 			longitude: '100.04410549112107',
// 			bedQty: '2',
// 			bedRoomQty: '2',
// 			bathRoomQty: '2',
// 			pricePerDate: '3990',
// 			roomAvaliable: '1',
// 			userHostId: 3,

// 			propertyTypeId: 3,
// 		},
// 		{
// 			propertyName: 'the naked house',
// 			description:
// 				'Every booking includes free protection from Host cancellations',
// 			address: 'Koh Samui',
// 			latitude: '9.528606912886573',
// 			longitude: '100.04410549112107',
// 			bedQty: '6',
// 			bedRoomQty: '7',
// 			bathRoomQty: '5',
// 			pricePerDate: '7365',
// 			roomAvaliable: '1',
// 			userHostId: 4,
// 			propertyTypeId: 4,
// 		},
// 		{
// 			propertyName: 'Private townhouse',
// 			description:
// 				'Every booking includes free protection from Host cancellations',
// 			address: 'Krung Thep Maha Nakhon',
// 			latitude: '9.528606912886573',
// 			longitude: '100.04410549112107',
// 			bedQty: '2',
// 			bedRoomQty: '2',
// 			bathRoomQty: '2',
// 			pricePerDate: '3309',
// 			roomAvaliable: '1',
// 			userHostId: 5,

// 			propertyTypeId: 5,
// 		},
// 	];
// 	let res = await Property.bulkCreate(propertyData);
// 	console.log(res);
// 	process.exit(0);
// };
// propertySeed();

// const propertyImagesSeed = async () => {
// 	const propertyImagesData = [
// 		{
// 			propertyImage:
// 				'https://a0.muscache.com/im/pictures/ade75bc6-9a2a-453f-9d6d-b7919ff7bd4a.jpg?im_w=720',
// 			propertyId: 1,
// 		},
// 		{
// 			propertyImage:
// 				'https://a0.muscache.com/im/pictures/f255c96c-a0f0-44f0-a975-fcb63ec74e71.jpg?im_w=720',
// 			propertyId: 2,
// 		},
// 		{
// 			propertyImage:
// 				'https://a0.muscache.com/im/pictures/70bca335-129b-4a83-bfe0-6a8c52baf448.jpg?im_w=720',
// 			propertyId: 3,
// 		},
// 		{
// 			propertyImage:
// 				'https://a0.muscache.com/im/pictures/4abb7e2c-ad31-4f84-a36a-40e1a8b15084.jpg?im_w=720',
// 			propertyId: 4,
// 		},
// 		{
// 			propertyImage:
// 				'https://a0.muscache.com/im/pictures/ffadcfe3-75de-4c1d-b94c-2c609bf96c38.jpg?im_w=720',
// 			propertyId: 5,
// 		},
// 	];
// 	let res = await PropertyImage.bulkCreate(propertyImagesData);
// 	console.log(res);
// 	process.exit(0);
// };
// propertyImagesSeed();

// const facilitySeed = async () => {
// 	const facilityData = [
// 		{
// 			facilityName: 'Free parking on premises',
// 			facilityIconImage:
// 				'https://cdn-icons-png.flaticon.com/512/768/768960.png',
// 		},
// 		{
// 			facilityName: 'Wifi',
// 			facilityIconImage:
// 				'https://cdn-icons-png.flaticon.com/512/3287/3287922.png',
// 		},
// 		{
// 			facilityName: 'Pets allowed',
// 			facilityIconImage:
// 				'https://cdn-icons-png.flaticon.com/512/1076/1076877.png',
// 		},
// 		{
// 			facilityName: 'EV charger',
// 			facilityIconImage:
// 				'https://cdn-icons-png.flaticon.com/512/7030/7030596.png',
// 		},
// 		{
// 			facilityName: 'Kitchen',
// 			facilityIconImage:
// 				'https://cdn-icons-png.flaticon.com/512/1839/1839736.png',
// 		},
// 	];
// 	let res = await Facility.bulkCreate(facilityData);
// 	console.log(res);
// 	process.exit(0);
// };
// facilitySeed();

// const propertyFacilitySeed = async () => {
// 	const propertyFacilityData = [
// 		{ facilityId: 1, propertyId: 1 },
// 		{ facilityId: 2, propertyId: 2 },
// 		{ facilityId: 3, propertyId: 3 },
// 		{ facilityId: 4, propertyId: 4 },
// 		{ facilityId: 5, propertyId: 5 },
// 	];
// 	let res = await PropertyFacility.bulkCreate(propertyFacilityData);
// 	console.log(res);
// 	process.exit(0);
// };
// propertyFacilitySeed();

// const reserveSeed = async () => {
// 	const reserveData = [
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4386',
// 			amountPaid: '29039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 1,
// 			userId: 1,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4386',
// 			amountPaid: '29039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 2,
// 			userId: 2,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4386',
// 			amountPaid: '29039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 3,
// 			userId: 3,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4386',
// 			amountPaid: '29039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 4,
// 			userId: 4,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4386',
// 			amountPaid: '29039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 5,
// 			userId: 5,
// 		},
// 	];
// 	let res = await Reserve.bulkCreate(reserveData);
// 	console.log(res);
// 	process.exit(0);
// };
// reserveSeed();

// const bookingSeed = async () => {
// 	const payment = await bcrypt.hash('1122334455', 12);
// 	const bookingData = [
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29039',
// 			guestsCount: '4',
// 			paymentInfo: payment,
// 			propertyId: 1,
// 			userId: 1,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29039',
// 			guestsCount: '4',
// 			paymentInfo: payment,
// 			propertyId: 2,
// 			userId: 2,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29039',
// 			guestsCount: '4',
// 			paymentInfo: payment,
// 			propertyId: 3,
// 			userId: 3,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29039',
// 			guestsCount: '4',
// 			paymentInfo: payment,
// 			propertyId: 4,
// 			userId: 4,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29039',
// 			guestsCount: '4',
// 			paymentInfo: payment,
// 			propertyId: 5,
// 			userId: 5,
// 		},
// 	];
// 	let res = await Booking.bulkCreate(bookingData);
// 	console.log(res);
// 	process.exit(0);
// };
// bookingSeed();

// const PropertyReviewSeed = async () => {
// 	const PropertyReviewData = [
// 		{ comment: 'very good', propertyId: 1, userId: 1, bookingId: 1 },
// 		{
// 			comment: 'Lovely cozy place. 👍',
// 			propertyId: 2,
// 			userId: 2,
// 			bookingId: 2,
// 		},
// 		{
// 			comment:
// 				'Very nice and clean place. Facilities are complemented. Recommend this place.',
// 			propertyId: 3,
// 			userId: 3,
// 			bookingId: 3,
// 		},
// 		{
// 			comment:
// 				'It is a great apartment. Enjoyed staying here and the view is also very good. Definitely recommended for 3 people',
// 			propertyId: 4,
// 			userId: 4,
// 			bookingId: 4,
// 		},
// 		{
// 			comment: 'Good place and location. Room is good.',
// 			propertyId: 5,
// 			userId: 5,
// 			bookingId: 5,
// 		},
// 	];
// 	let res = await PropertyReview.bulkCreate(PropertyReviewData);
// 	console.log(res);
// 	process.exit(0);
// };
// PropertyReviewSeed();

// const wishlistSeed = async () => {
// 	const wishlistData = [
// 		{
// 			propertyId: 1,
// 			userId: 1,
// 		},
// 		{
// 			propertyId: 2,
// 			userId: 2,
// 		},
// 		{
// 			propertyId: 3,
// 			userId: 3,
// 		},
// 		{
// 			propertyId: 4,
// 			userId: 4,
// 		},
// 		{
// 			propertyId: 5,
// 			userId: 5,
// 		},
// 	];
// 	let res = await Wishlist.bulkCreate(wishlistData);
// 	console.log(res);
// 	process.exit(0);
// };
// wishlistSeed();

const InitDataBeforeCreateHostSeed = async () => {
  const hashpassword = await bcrypt.hash('123456789', 12);
  const userData = [
    {
      firstName: 'May',
      lastName: 'ApinYa',
      email: 'may2@gmail.com',
      password: hashpassword,
      phoneNumber: '+66836637502'
    }
  ];

  const categoryData = [
    {
      categoryName: 'Creative spaces',
      categoryIconImage:
        'https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg'
    },
    {
      categoryName: 'Design',
      categoryIconImage:
        'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg'
    },
    {
      categoryName: 'Amazing views',
      categoryIconImage:
        'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg'
    },
    {
      categoryName: 'Beachfront',
      categoryIconImage:
        'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg'
    },
    {
      categoryName: 'Castles',
      categoryIconImage:
        'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg'
    },
    {
      categoryName: 'Lake',
      categoryIconImage:
        'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg'
    },
    {
      categoryName: 'Beach',
      categoryIconImage:
        'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg'
    },
    {
      categoryName: 'Caves',
      categoryIconImage:
        'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg'
    },
    {
      categoryName: 'Islands',
      categoryIconImage:
        'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg'
    },
    {
      categoryName: 'Towers',
      categoryIconImage:
        'https://a0.muscache.com/pictures/d721318f-4752-417d-b4fa-77da3cbc3269.jpg'
    },
    {
      categoryName: 'Campers',
      categoryIconImage:
        'https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg'
    },
    {
      categoryName: 'National parks',
      categoryIconImage:
        'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg'
    }
  ];

  const facilityData = [
    {
      facilityName: 'Wifi',
      facilityIconImage: 'fa-solid fa-wifi'
    },
    {
      facilityName: 'TV',
      facilityIconImage: 'fa-solid fa-tv'
    },
    {
      facilityName: 'Kitchen',
      facilityIconImage: 'fa-solid fa-kitchen-set'
    },
    {
      facilityName: 'Washer',
      facilityIconImage: 'fa-solid fa-soap'
    },
    {
      facilityName: 'Free parking on premises',
      facilityIconImage: 'fa-solid fa-square-parking'
    },
    {
      facilityName: 'Pool',
      facilityIconImage: 'fa-solid fa-water-ladder'
    }
  ];

  const propertyTypeData = [
    {
      propertyTypeName: 'Apartment',
      propertyTypeIconImage:
        'https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg'
    },
    {
      propertyTypeName: 'House',
      propertyTypeIconImage:
        'https://a0.muscache.com/im/pictures/d1af74db-58eb-46bf-b3f5-e42b6c9892db.jpg'
    },
    {
      propertyTypeName: 'Secondary unit',
      propertyTypeIconImage:
        'https://a0.muscache.com/im/pictures/32897901-1870-4895-8e23-f08dc0e61750.jpg'
    },
    {
      propertyTypeName: 'Unique space',
      propertyTypeIconImage:
        'https://a0.muscache.com/im/pictures/7ad56bb1-ed9f-4dcb-a14c-2523da331b44.jpg'
    },
    {
      propertyTypeName: 'Bed and breakfast',
      propertyTypeIconImage:
        'https://a0.muscache.com/im/pictures/d52fb4e7-39a4-46df-9bf9-67e56d35eeca.jpg'
    },
    {
      propertyTypeName: 'Boutique hotel',
      propertyTypeIconImage:
        'https://a0.muscache.com/im/pictures/a2c9ad21-b159-4fd2-b417-d810fb23c6a9.jpg'
    }
  ];

  // insert data to db;
  let resUser = await User.bulkCreate(userData);
  let resCategory = await Category.bulkCreate(categoryData);
  let resFacility = await Facility.bulkCreate(facilityData);
  let resPropertyType = await PropertyType.bulkCreate(propertyTypeData);

  //   console.log(res);
  process.exit(0);
};

InitDataBeforeCreateHostSeed();
