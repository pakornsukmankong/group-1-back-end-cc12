const {
	User,
	Transaction,
	Subdistrict,
	District,
	Province,
	Property,
	PropertyType,
	PropertyImage,
	Facility,
	PropertyFacility,
	Reserve,
	Booking,
	PropertyReview,
	Wishlist,
} = require('../models');
// const bcrypt = require('bcryptjs');

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

// const transactionSeed = async () => {
// 	const hashTransection = await bcrypt.hash('11223344', 12);

// 	const transactionData = [
// 		{ paymentInfo: hashTransection },
// 		{ paymentInfo: hashTransection },
// 		{ paymentInfo: hashTransection },
// 		{ paymentInfo: hashTransection },
// 		{ paymentInfo: hashTransection },
// 	];
// 	let res = await Transaction.bulkCreate(transactionData);
// 	console.log(res);
// 	process.exit(0);
// };
// transactionSeed();

// const propertyTypeSeed = async () => {
// 	const propertyTypeData = [
// 		{ propertyTypeName: 'villa', propertyTypeIconImage: 'icon villa' },
// 		{ propertyTypeName: 'Design', propertyTypeIconImage: 'icon Design' },
// 		{ propertyTypeName: 'Beach', propertyTypeIconImage: 'icon Beach' },
// 		{ propertyTypeName: 'Lake', propertyTypeIconImage: 'icon Lake' },
// 		{ propertyTypeName: 'Castile', propertyTypeIconImage: 'icon Castile' },
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
// 			pricePerDate: '฿131,131',
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
// 			pricePerDate: '฿1,238',
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
// 			pricePerDate: '฿3,990',
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
// 			pricePerDate: '฿7,365',
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
// 			pricePerDate: '฿3,309',
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
// 			propertyImage: 'house',
// 			propertyId: 1,
// 		},
// 		{
// 			propertyImage: 'house2',
// 			propertyId: 2,
// 		},
// 		{
// 			propertyImage: 'house3',
// 			propertyId: 3,
// 		},
// 		{
// 			propertyImage: 'house4',
// 			propertyId: 4,
// 		},
// 		{
// 			propertyImage: 'house5',
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
// 		{ facilityName: 'Free parking on premises', facilityIconImage: 'parking' },
// 		{ facilityName: 'Wifi', facilityIconImage: 'Wifi' },
// 		{ facilityName: 'Pets allowed', facilityIconImage: 'Pets allowed' },
// 		{ facilityName: 'EV charger', facilityIconImage: 'EV charger' },
// 		{ facilityName: 'Kitchen', facilityIconImage: 'Kitchen' },
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
// 			serviceFees: '4,386',
// 			amountPaid: '29,039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 1,
// 			userId: 1,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4,386',
// 			amountPaid: '29,039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 2,
// 			userId: 2,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4,386',
// 			amountPaid: '29,039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 3,
// 			userId: 3,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4,386',
// 			amountPaid: '29,039',
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			propertyId: 4,
// 			userId: 4,
// 		},
// 		{
// 			pricePerDate: '6,685',
// 			guestsCount: '4',
// 			cleaningFees: '450',
// 			serviceFees: '4,386',
// 			amountPaid: '29,039',
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
// 	const bookingData = [
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 1,
// 			userId: 1,
// 			transactionId: 1,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 2,
// 			userId: 2,
// 			transactionId: 2,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 3,
// 			userId: 3,
// 			transactionId: 3,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 4,
// 			userId: 4,
// 			transactionId: 4,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 5,
// 			userId: 5,
// 			transactionId: 5,
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
// 		{ comment: 'very good', propertyId: 2, userId: 2, bookingId: 2 },
// 		{ comment: 'very good', propertyId: 3, userId: 3, bookingId: 3 },
// 		{ comment: 'very good', propertyId: 4, userId: 4, bookingId: 4 },
// 		{ comment: 'very good', propertyId: 5, userId: 5, bookingId: 5 },
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
