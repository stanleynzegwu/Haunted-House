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

function generateRandomYears() {
  const startYear = 1800;
  const endYear = 1900;

  const year1 = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const year2 = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

  const min = Math.min(...[year1, year2])
  const max = Math.max(...[year1, year2])
  return `${min} - ${max}`
}

export { namesArr, generateRandomYears }