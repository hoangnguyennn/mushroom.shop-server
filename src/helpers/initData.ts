import mongooseLoader from '../loaders/mongoose';

import { UserType } from '../interfaces/enums';
import AuthService from '../services/auth';
import PaymentMethodService from '../services/paymentMethod';

import data from './initData.json';

// export const generateProducts = async () => {
// 	console.log('init products');

// 	const unit = await ProductUnitService.create({ name: 'kg' });

// 	const image = await ImageService.create({
// 		url: 'https://res.cloudinary.com/hoangnguyennn/image/upload/v1621465858/yzzutbi4htoulq6zkbwb.png',
// 		publicId: '',
// 	});

// 	const productsPromise = Array.from(new Array(100)).map((_, index) =>
// 		ProductService.create({
// 			name: `Product ${index + 1}`,
// 			price: 100000,
// 			unitId: unit._id,
// 			description: `Product ${index + 1} description`,
// 			imagesId: [image._id],
// 			status: ProductStatus.SELLING,
// 		})
// 	);

// 	return Promise.all(productsPromise).then(() => {
// 		console.log('Products created');
// 	});
// };

export const generateUsers = async () => {
  console.log('init users');

  const users = data.users;

  const usersPromise = users.map(user =>
    AuthService.register({
      email: user.email,
      passwordHashed: user.passwordHashed,
      fullName: user.fullName,
      phone: user.phone,
      userType: user.userType as UserType,
      isActivated: user.isActivated
    })
  );

  return Promise.all(usersPromise).then(() => {
    console.log('users created');
  });
};

export const generatePaymentMethods = async () => {
  console.log('init payment methods');

  const paymentMethods = data.paymentMethods;
  const promises = paymentMethods.map(paymentMethod =>
    PaymentMethodService.create({
      name: paymentMethod.name,
      imageUrl: paymentMethod.imageUrl
    })
  );

  return Promise.all(promises).then(() => {
    console.log('payment methods created');
  });
};

const generate = async () => {
  await mongooseLoader();

  // await generateProducts();
  await generateUsers();
  await generatePaymentMethods();

  return 1;
};

generate();
