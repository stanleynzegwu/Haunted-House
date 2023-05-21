async function namesArr() {
    try {
      const response = await fetch('https://fakerapi.it/api/v1/persons?_quantity=50');
      const data = await response.json();
      return await data.data.map( ({firstname,lastname})=> `${firstname} ${lastname}`.slice(0,12));
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }

export { namesArr }