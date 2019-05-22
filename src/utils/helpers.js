export const getCountryCode = (country) => {
    switch (country) {
      case 'Poland': return 'PL';
      case 'Germany': return 'DE';
      case 'France': return 'FR';
      case 'Spain': return 'ES';
      default: return null
    }
  };

  export const filterResults = (res) => {
    const noDuplicates = [...new Set(res)];
    return noDuplicates.filter(el => el !== undefined);
  }