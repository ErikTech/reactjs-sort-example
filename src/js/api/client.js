import axios from 'axios';

const bazaarvoiceProduct = (id, page = 1, sort) => {
    const END_POINT = 'http://stg.api.bazaarvoice.com/data/reviews.json'
    const API_VERSION = '5.4';
    const PASS_KEY = 'kuy3zj9pr3n7i0wxajrzj04xo'
    const LIMIT = 10;
    // sort=Rating:desc

    return axios.get(END_POINT, {
        params: {
            apiversion: API_VERSION,
            passkey: PASS_KEY,
            Filter: 'ProductId:' + id,
            Limit: LIMIT,
            Offset: (page - 1) * 10,
            Sort: `${sort}`
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  };

export default bazaarvoiceProduct;
