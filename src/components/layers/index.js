import BerkeleySafegraphPoisLayer from './BerkeleySafegraphPoisLayer';
import SfBikeStationsLayer from './SfBikeStationsLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    BerkeleySafegraphPoisLayer(),
    SfBikeStationsLayer(),
    // [hygen] Add layer
  ];
};
