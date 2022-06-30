import service from "./config.services";

const getKanjiService = (userId) => {
  return service.get(`/kanji/${userId}`);
};

export { getKanjiService }