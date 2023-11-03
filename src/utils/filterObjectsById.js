export function filterObjectsById(arrId, arrObj1) {
    const arrObj2 = arrObj1?.filter(obj => arrId.includes(obj.id));
    return arrObj2;
  }
  