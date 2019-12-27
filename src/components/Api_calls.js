const APIURL = 'https://allergy-api.herokuapp.com/rest-auth/login/'

export default {
   async fetchInitialDeals() {
    fetch(APIURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'root',
          secondParam: '',
          thirdParam: 'hotdogs',
        }),
      });
    }
}