import { CronJob } from 'cron';

import ProductService from '../services/product';
import ImageService from '../services/image';
import UploadFileHelper from '../helpers/uploadFile';

export const cron = () => {
  // run delete images every minutes
  const deleteImagesJob = new CronJob('* * * * *', async function () {
    const products = await ProductService.get();
    const productImages = products
      .map(product => product.images)
      .filter(images => images)
      .reduce((total, images) => total?.concat(images || []), []);

    const imagesInDB = await ImageService.get();
    const imagesWillDelete = imagesInDB.filter(image => {
      const indexInProductImages =
        productImages?.findIndex(productImage => {
          return String(productImage._id) === String(image._id);
        }) ?? -1;

      return indexInProductImages === -1;
    });

    const deleteImagesPromises = imagesWillDelete.map(image =>
      UploadFileHelper.deleteSingle(image.publicId)
    );

    return Promise.all(deleteImagesPromises).then(values => {
      console.log(`${values.length} unused images have just been deleted`);
    });
  });

  deleteImagesJob.start();
};

export default () => undefined;
