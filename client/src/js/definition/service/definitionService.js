export default {
  async changeWord(part) {
    return [
      part,
      part + part,
      part + part + part + '1',
    ];
  },
};
