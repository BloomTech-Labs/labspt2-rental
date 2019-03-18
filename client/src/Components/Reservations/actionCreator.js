import axios from "axios";
import * as actions from "./actions";
import config from "config";

export const getReservations = (filterSort = {}) => dispatch => {
  const { filter, sort, page, pageSize, search } = filterSort;

  dispatch({ type: actions.RESERVATION_STARTED });

  return axios
    .get(
      `${config.apiUrl}/api/reservations?search=${search ||
        ""}&filter=${JSON.stringify(filter) ||
        ""}&sort=${sort}&limit=${pageSize}&skip=${(page - 1) * pageSize}`
    )
    .then(({ data }) => {
      dispatch({ type: actions.RESERVATION_SUCCESS, reservations: data.data });
    })
    .catch(err => {
      dispatch({ type: actions.RESERVATION_FAILURE, error: err });
    });
};
