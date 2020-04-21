import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../Types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        loading: false,
        contacts: [action.payload.data, ...state.contacts],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        loading: false,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        loading: false,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload.err,
        loading: false,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.data,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        loading: false,
        current: null,
        error: null,
      };
    default:
      return state;
  }
};
