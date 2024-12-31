const initialState = {
  medicaments: [],
  loading: false,
  error: null
};

export const medicamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MEDICAMENTS':
      return {
        ...state,
        medicaments: action.payload,
        loading: false
      };

    case 'ADD_MEDICAMENT':
      return {
        ...state,
        medicaments: [...state.medicaments, action.payload],
        loading: false
      };

    case 'UPDATE_MEDICAMENT':
      return {
        ...state,
        medicaments: state.medicaments.map(med => 
          med.id === action.payload.id ? action.payload : med
        ),
        loading: false
      };

    case 'DELETE_MEDICAMENT':
      return {
        ...state,
        medicaments: state.medicaments.filter(med => med.id !== action.payload),
        loading: false
      };

    default:
      return state;
  }
}; 