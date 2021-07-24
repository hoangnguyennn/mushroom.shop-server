const mapping: { [key: string]: { telex: string; normalize: string } } = {
  á: {
    telex: 'as',
    normalize: 'a'
  },
  à: {
    telex: 'af',
    normalize: 'a'
  },
  ả: {
    telex: 'ar',
    normalize: 'a'
  },
  ã: {
    telex: 'ax',
    normalize: 'a'
  },
  ạ: {
    telex: 'aj',
    normalize: 'a'
  },
  ắ: {
    telex: 'aws',
    normalize: 'a'
  },
  ằ: {
    telex: 'awf',
    normalize: 'a'
  },
  ẳ: {
    telex: 'awr',
    normalize: 'a'
  },
  ẵ: {
    telex: 'awx',
    normalize: 'a'
  },
  ặ: {
    telex: 'awj',
    normalize: 'a'
  },
  ă: {
    telex: 'aw',
    normalize: 'a'
  },
  ấ: {
    telex: 'aas',
    normalize: 'a'
  },
  ầ: {
    telex: 'aaf',
    normalize: 'a'
  },
  ẩ: {
    telex: 'aar',
    normalize: 'a'
  },
  ẫ: {
    telex: 'aax',
    normalize: 'a'
  },
  ậ: {
    telex: 'aaj',
    normalize: 'a'
  },
  â: {
    telex: 'aa',
    normalize: 'a'
  },
  đ: {
    telex: 'dd',
    normalize: 'd'
  },
  é: {
    telex: 'es',
    normalize: 'e'
  },
  è: {
    telex: 'ef',
    normalize: 'e'
  },
  ẻ: {
    telex: 'er',
    normalize: 'e'
  },
  ẽ: {
    telex: 'ex',
    normalize: 'e'
  },
  ẹ: {
    telex: 'ej',
    normalize: 'e'
  },
  ế: {
    telex: 'ees',
    normalize: 'e'
  },
  ề: {
    telex: 'eef',
    normalize: 'e'
  },
  ể: {
    telex: 'eer',
    normalize: 'e'
  },
  ễ: {
    telex: 'eex',
    normalize: 'e'
  },
  ệ: {
    telex: 'eej',
    normalize: 'e'
  },
  ê: {
    telex: 'ee',
    normalize: 'e'
  },
  í: {
    telex: 'is',
    normalize: 'i'
  },
  ì: {
    telex: 'if',
    normalize: 'i'
  },
  ỉ: {
    telex: 'ir',
    normalize: 'i'
  },
  ĩ: {
    telex: 'ix',
    normalize: 'i'
  },
  ị: {
    telex: 'ij',
    normalize: 'i'
  },
  ó: {
    telex: 'os',
    normalize: 'o'
  },
  ò: {
    telex: 'of',
    normalize: 'o'
  },
  ỏ: {
    telex: 'or',
    normalize: 'o'
  },
  õ: {
    telex: 'ox',
    normalize: 'o'
  },
  ọ: {
    telex: 'oj',
    normalize: 'o'
  },
  ố: {
    telex: 'oos',
    normalize: 'o'
  },
  ồ: {
    telex: 'oof',
    normalize: 'o'
  },
  ổ: {
    telex: 'oor',
    normalize: 'o'
  },
  ỗ: {
    telex: 'oox',
    normalize: 'o'
  },
  ộ: {
    telex: 'ooj',
    normalize: 'o'
  },
  ô: {
    telex: 'oo',
    normalize: 'o'
  },
  ớ: {
    telex: 'ows',
    normalize: 'o'
  },
  ờ: {
    telex: 'owf',
    normalize: 'o'
  },
  ở: {
    telex: 'owr',
    normalize: 'o'
  },
  ỡ: {
    telex: 'owx',
    normalize: 'o'
  },
  ợ: {
    telex: 'owj',
    normalize: 'o'
  },
  ơ: {
    telex: 'ow',
    normalize: 'o'
  },
  ú: {
    telex: 'us',
    normalize: 'u'
  },
  ù: {
    telex: 'uf',
    normalize: 'u'
  },
  ủ: {
    telex: 'ur',
    normalize: 'u'
  },
  ũ: {
    telex: 'ux',
    normalize: 'u'
  },
  ụ: {
    telex: 'uj',
    normalize: 'u'
  },
  ứ: {
    telex: 'uws',
    normalize: 'u'
  },
  ừ: {
    telex: 'uwf',
    normalize: 'u'
  },
  ử: {
    telex: 'uwr',
    normalize: 'u'
  },
  ữ: {
    telex: 'uwx',
    normalize: 'u'
  },
  ự: {
    telex: 'uwj',
    normalize: 'u'
  },
  ư: {
    telex: 'uw',
    normalize: 'u'
  },
  ý: {
    telex: 'ys',
    normalize: 'y'
  },
  ỳ: {
    telex: 'yf',
    normalize: 'y'
  },
  ỷ: {
    telex: 'yr',
    normalize: 'y'
  },
  ỹ: {
    telex: 'yx',
    normalize: 'y'
  },
  ỵ: {
    telex: 'yj',
    normalize: 'y'
  }
};

export const normalize = (value: string) => {
  return value
    .toLowerCase()
    .split('')
    .map(char => mapping[char]?.normalize || char)
    .join('');
};
