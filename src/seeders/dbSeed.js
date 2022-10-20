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
// 			phone: '0811111111',
// 		},
// 		{
// 			firstName: 'yuri',
// 			lastName: 'baiar',
// 			email: 'yuri@gmail.com',
// 			password: hashpassword,
// 			phone: '0822222222',
// 		},
// 		{
// 			firstName: 'justin',
// 			lastName: 'bieber',
// 			email: 'justin@gmail.com',
// 			password: hashpassword,
// 			phone: '0833333333',
// 		},
// 		{
// 			firstName: 'loid',
// 			lastName: 'forger',
// 			email: 'loid@gmail.com',
// 			password: hashpassword,
// 			phone: '0844444444',
// 		},
// 		{
// 			firstName: 'anya',
// 			lastName: 'forger',
// 			email: 'anya@gmail.com',
// 			password: hashpassword,
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
// 		{ paymentInfo: hashTransection, bookingId: 1 },
// 		{ paymentInfo: hashTransection, bookingId: 2 },
// 		{ paymentInfo: hashTransection, bookingId: 3 },
// 		{ paymentInfo: hashTransection, bookingId: 4 },
// 		{ paymentInfo: hashTransection, bookingId: 5 },
// 	];
// 	let res = await Transaction.bulkCreate(transactionData);
// 	console.log(res);
// 	process.exit(0);
// };
// transactionSeed();

// const provinceSeed = async () => {
// 	const provinceData = [
// 		{ provinceName: 'Bangkok' },
// 		{ provinceName: 'Bangkok' },
// 		{ provinceName: 'Bangkok' },
// 		{ provinceName: 'Bangkok' },
// 		{ provinceName: 'Nontaburi' },
// 	];
// 	let res = await Province.bulkCreate(provinceData);
// 	console.log(res);
// 	process.exit(0);
// };
// provinceSeed();

// const districtSeed = async () => {
// 	const districtData = [
// 		{ districtName: 'Pathumwan', provinceId: 1 },
// 		{ districtName: 'Pathumwan', provinceId: 2 },
// 		{ districtName: 'Pathumwan', provinceId: 3 },
// 		{ districtName: 'Pathumwan', provinceId: 4 },
// 		{ districtName: 'Saimah', provinceId: 5 },
// 	];
// 	let res = await District.bulkCreate(districtData);
// 	console.log(res);
// 	process.exit(0);
// };
// districtSeed();

// const subdistrictSeed = async () => {
// 	const subDistrictData = [
// 		{ subdistrictName: 'LongMueng', districtId: 1 },
// 		{ subdistrictName: 'LongMueng', districtId: 2 },
// 		{ subdistrictName: 'LongMueng', districtId: 3 },
// 		{ subdistrictName: 'LongMueng', districtId: 4 },
// 		{ subdistrictName: 'Tarsai', districtId: 5 },
// 	];
// 	let res = await Subdistrict.bulkCreate(subDistrictData);
// 	console.log(res);
// 	process.exit(0);
// };
// subdistrictSeed();

// const propertyTypeSeed = async () => {
// 	const propertyTypeData = [
// 		{ propertyTypeName: 'villa' },
// 		{ propertyTypeName: 'Design' },
// 		{ propertyTypeName: 'Beach' },
// 		{ propertyTypeName: 'Lake' },
// 		{ propertyTypeName: 'Castile' },
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
// 			pricePerDay: '฿131,131',
// 			roomAvaliable: '1',
// 			userHostId: 1,
// 			provinceId: 1,
// 			districtId: 1,
// 			subdistrictId: 1,
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
// 			pricePerDay: '฿1,238',
// 			roomAvaliable: '1',
// 			userHostId: 2,
// 			provinceId: 2,
// 			districtId: 2,
// 			subdistrictId: 2,
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
// 			pricePerDay: '฿3,990',
// 			roomAvaliable: '1',
// 			userHostId: 3,
// 			provinceId: 3,
// 			districtId: 3,
// 			subdistrictId: 3,
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
// 			pricePerDay: '฿7,365',
// 			roomAvaliable: '1',
// 			userHostId: 4,
// 			provinceId: 4,
// 			districtId: 4,
// 			subdistrictId: 4,
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
// 			pricePerDay: '฿3,309',
// 			roomAvaliable: '1',
// 			userHostId: 5,
// 			provinceId: 5,
// 			districtId: 5,
// 			subdistrictId: 5,
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
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 2,
// 			userId: 2,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 3,
// 			userId: 3,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 4,
// 			userId: 4,
// 		},
// 		{
// 			checkInDate: '2022-10-20',
// 			checkOutDate: '2022-10-30',
// 			amountPaid: '29,039',
// 			guestsCount: '4',
// 			propertyId: 5,
// 			userId: 5,
// 		},
// 	];
// 	let res = await Booking.bulkCreate(bookingData);
// 	booking;
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
