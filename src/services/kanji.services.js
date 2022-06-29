import service from "./config.services";

const kanjiService = (userId) => {
  return service.get(`/kanji/${userId}`);
};
