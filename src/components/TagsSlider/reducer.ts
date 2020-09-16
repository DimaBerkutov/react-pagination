export const TYPES = {
  SET_SELECTED_INDEX: 'SET_SELECTED_INDEX',
  SET_SLIDES: 'SET_SLIDES',
};

interface TagsSliderReducer {
  selectedIndex: number;
  slides: boolean[];
}

export const initialState: TagsSliderReducer = {
  selectedIndex: 0,
  slides: [],
}

export default function reducer(state = initialState, action: any): TagsSliderReducer {
  switch (action.type) {
    case TYPES.SET_SELECTED_INDEX:
      return {
        ...state,
        selectedIndex: action.selectedIndex,
      };
    case TYPES.SET_SLIDES:
      return {
        ...state,
        slides: action.slides,
      };
    default:
      return state;
  }
}
