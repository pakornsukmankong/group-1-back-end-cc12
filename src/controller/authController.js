// const validator = require('validator');

const client = require('twilio')(
	process.env.ACCOUNT_SID, // process.env.ACCOUNT_SID,
	process.env.AUTH_TOKEN // process.env.AUTH_TOKEN
);

// <=== function send OTP ===>

exports.otp = async (req, res, next) => {
	let { phoneNumber } = req.body;
	// console.log(phoneNumber);

	if (phoneNumber.startsWith('0')) {
		phoneNumber = phoneNumber.split(0)[1];
	}

	// console.log(phoneNumber);

	if (phoneNumber.length === 9) {
		try {
			const customerPhoneNumber = await client.verify
				.services(process.env.SERVICE_ID) //process.env.SERVICE_ID
				.verifications.create({
					to: `+66${phoneNumber}`,
					channel: 'sms',
				});

			console.log(customerPhoneNumber);

			res.status(200).json({
				message: `Verification is sent to 0${phoneNumber}`,
				data: customerPhoneNumber.to,
			});
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).json({ message: 'Wrong Number!' });
	}
};

// <=== function verify OTP ===>

exports.verify = async (req, res, next) => {
	const { code, phoneNumber } = req.body;

	console.log(code, phoneNumber);

	if (code.length === 6) {
		try {
			const data = await client.verify
				.services(process.env.SERVICE_ID) //process.env.SERVICE_ID
				.verificationChecks.create({
					to: `${phoneNumber}`,
					code: code,
				});

			if (data.status === 'approved') {
				console.log('User is Verified!!');
				res.status(200).json({
					message: 'User is Verified!!',
					data,
				});
			}
		} catch (err) {
			console.log('User Varifired Error');
			res.status(404).send('User Varifired Error');
		}
	} else {
		res.status(400).json({
			message: 'Wrong phone number or code :(',
			// phonenumber: req.query.phonenumber,
			// data,
		});
	}
};

// #################################################################################################
