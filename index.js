import data from './mock.json';

const groupByKey = (data = [], key) => {
  const y = data?.reduce((obj, item) => {
    obj[item[key]] = obj[item[key]] ? [...obj[item[key]], item] : [item];
    return obj;
  }, {});

  return y;
};

const getValue = (x, y) => {
  if (x === '' || x === null || x === 0 || y === '' || y === null || y === 0) {
    return 0;
  }

  return (x / y).toFixed(2);
};

const generateData = (data = [], key, val) => {
  return data?.map((item) => {
    const obj = data.find(
      (subItem) =>
        subItem.FISCAL_WEEK_YEAR === item.FISCAL_WEEK_YEAR &&
        subItem[key] === val
    );
    if (obj) {
      return {
        ...item,
        C_MEASURE_VAL: getValue(item.C_MEASURE_VAL, obj.C_MEASURE_VAL),
        P_MEASURE_VAL: getValue(item.P_MEASURE_VAL, obj.P_MEASURE_VAL),
        PY_MEASURE_VAL: getValue(item.PY_MEASURE_VAL, obj.PY_MEASURE_VAL),
        PPY_MEASURE_VAL: getValue(item.PPY_MEASURE_VAL, obj.PPY_MEASURE_VAL),
        PPPY_MEASURE_VAL: getValue(item.PPPY_MEASURE_VAL, obj.PPPY_MEASURE_VAL),
      };
    } else {
      return {
        ...item,
        C_MEASURE_VAL: 0,
        P_MEASURE_VAL: 0,
        PY_MEASURE_VAL: 0,
        PPY_MEASURE_VAL: 0,
        PPPY_MEASURE_VAL: 0,
      };
    }
  });
};

const getData = (data = [], key, val, groupKey) => {
  if (Array.isArray(data)) {
    const arr = generateData(data, key, val);
    const obj = groupByKey(arr, groupKey);
    return obj;
  }
  return {};
};

console.log(getData(data, 'LOB_VAL', 'iPhone', 'LOB_VAL'));
