import service from "./config.services";

const getKanjiService = (userId) => {
  return service.get(`/kanji/${userId}`);
};

const changeKanjiDateService = (kanji) => {
    return service.put(`/kanji/dateupdate/${kanji}`);
  };
  

export { getKanjiService, changeKanjiDateService }