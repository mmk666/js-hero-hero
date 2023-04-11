import data from './mock.json';
import mock from './mock2.json';

const getWOW = (item) => {
  const C_value = Math.round(item?.C_MEASURE_VAL);
  const P_value = Math.round(item?.P_MEASURE_VAL);

  if (C_value == 0) {
    return '-100%';
  } else if (P_value == 0) {
    return '-';
  }

  return `${Math.round((C_value / P_value - 1) * 100)}%`;
};

const getYOY = (item, type) => {
  const C_value = Math.round(item?.C_MEASURE_VAL);
  const P_value = Math.round(
    type === 'YoY-3'
      ? item?.PPPY_MEASURE_VAL
      : type === 'YoY-2'
      ? item?.PPY_MEASURE_VAL
      : item?.PY_MEASURE_VAL
  );

  if (C_value == 0) {
    return '-100%';
  } else if (P_value == 0) {
    return '-';
  } else {
    return `${Math.round((C_value / P_value - 1) * 100)}%`;
  }
};

const groupByKey = (data = [], key) => {
  const y = data?.reduce((obj, item) => {
    obj[item[key]] = obj[item[key]] ? [...obj[item[key]], item] : [item];
    return obj;
  }, {});

  return y;
};

const getValue = (x, y) => {
  if (
    x === '' ||
    x === null ||
    Math.round(x) === 0 ||
    y === '' ||
    y === null ||
    Math.round(y) === 0
  ) {
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

const getAARData = (data) => {
  const arr = data.map((item) => {
    return {
      FISCAL_WEEK_YEAR: item?.FISCAL_WEEK_YEAR,
      ATTACH_TYPE: item?.ATTACH_TYPE,
      ACCESSORY_DISPLAY_NAME: item?.ACCESSORY_DISPLAY_NAME,
      C_MEASURE_VAL: getValue(
        item.C_ACCESSORIES_MEASURE_VAL,
        item.C_HERO_MEASURE_VAL
      ),
      P_MEASURE_VAL: getValue(
        item.P_ACCESSORIES_MEASURE_VAL,
        item.P_HERO_MEASURE_VAL
      ),
      PY_MEASURE_VAL: getValue(
        item.PY_ACCESSORIES_MEASURE_VAL,
        item.PY_HERO_MEASURE_VAL
      ),
      PPY_MEASURE_VAL: getValue(
        item.PPY_ACCESSORIES_MEASURE_VAL,
        item.PPY_HERO_MEASURE_VAL
      ),
      PPPY_MEASURE_VAL: getValue(
        item.PPPY_ACCESSORIES_MEASURE_VAL,
        item.PPPY_HERO_MEASURE_VAL
      ),
    };
  });

  const group = groupByKey(arr, 'ACCESSORY_DISPLAY_NAME');
  return group;
};

console.log(getAARData(mock));
