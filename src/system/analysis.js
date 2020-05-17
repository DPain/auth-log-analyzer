const increment = (map, key) => {
  map.set(key, (map.get(key) != undefined ? map.get(key) : 0) + 1);
}

const sortByValue = (map) => {
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
}

const analyzeUserRank = (entries) => {
  let result = new Map();

  entries.forEach(element => {
    if (element.user != null) {
      if (typeof element.user === 'string' || element.user instanceof String) {
        increment(result, element.user);
      } else {
        throw new TypeError();
      }
    }
  });

  return sortByValue(result);
}

const analyzeIPRank = (entries) => {
  let result = new Map();

  entries.forEach(element => {
    if (element.rhost != null) {
      if (typeof element.rhost === 'string' || element.rhost instanceof String) {
        increment(result, element.rhost);
      } else {
        throw new TypeError();
      }
    }
  });

  return sortByValue(result);
}

const analyzeTimeSeries = (entries) => {
  let result = {};

  entries.forEach(element => {
    if (element.time != null) {
      if (typeof element.time === 'string' || element.time instanceof String) {
        let date = new Date(element.time).toLocaleDateString("en-US");

        result[date] = (result[date] + 1) || 1 ;
      } else {
        throw new TypeError();
      }
    }
  });

  return result;
}

export {
  analyzeUserRank,
  analyzeIPRank,
  analyzeTimeSeries
};
