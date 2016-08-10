export function createStubWord() {
  return {
    langs: {
      en: {
        spelling: 'scope',
        definition: 'the portion of source code in which a binding ' +
        'of a name with an entity applies',
      },
      by_narkam: {
        spelling: 'абсяг',
        definition: 'кавалак коду, у якім імя прывязваецца да сутнасці',
      },
    },
    meta: {
      tags: ['programming', 'scripts'],
    },
  };
}

export const resolveWith =
  response =>
    obj =>
      new Promise((resolve, reject) => resolve(response));

export const rejectWith =
  err =>
    obj =>
      new Promise((resolve, reject) => reject(err));
