import { ReactNode, useEffect } from 'react';

import {
  addModal,
  addUserExercisesData,
  hideLoader,
  history,
  removeNavData,
  showLoader,
  useLazyGetExerciseQuery,
} from '../../../../redux';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { MenuItemsTypes, ROUTE_PATHS, ModalWindowTypes } from '../../../../constants';

type NavButtonWrapperType = {
  children: ReactNode;
};

export const NavButtonWrapperComponent: React.FC<NavButtonWrapperType> = ({ children }) => {
  const [trigger, { data: allUserExercises }] = useLazyGetExerciseQuery();

  const dispatch = useAppDispatch();
  const { typeNav } = useAppSelector((state) => state.navigation);

  useEffect(() => {
    switch (typeNav) {
      case MenuItemsTypes.Calendar:
        dispatch(showLoader());
        trigger({})
          .unwrap()
          .then((data) => {
            dispatch(addUserExercisesData({ userExercises: data }));
            history.push(ROUTE_PATHS.calendar);
          })
          .catch(() => {
            dispatch(addModal({ type: ModalWindowTypes.ServerErrorExercise }));
          })
          .finally(() => dispatch(hideLoader()));
        dispatch(removeNavData());
        break;
      case MenuItemsTypes.Profile:
        dispatch(showLoader());
        trigger({})
          .unwrap()
          .then((data) => {
            dispatch(addUserExercisesData({ userExercises: data }));
            history.push(ROUTE_PATHS.profile);
          })
          .catch(() => {
            dispatch(addModal({ type: ModalWindowTypes.ServerErrorExercise }));
          })
          .finally(() => dispatch(hideLoader()));
        dispatch(removeNavData());
        break;
      case MenuItemsTypes.Exercise:
        dispatch(showLoader());
        trigger({})
          .unwrap()
          .then((data) => {
            dispatch(addUserExercisesData({ userExercises: data }));
            history.push(ROUTE_PATHS.workouts);
          })
          .catch(() => {
            dispatch(addModal({ type: ModalWindowTypes.ServerErrorExercise }));
          })
          .finally(() => dispatch(hideLoader()));
        dispatch(removeNavData());
        break;
      case MenuItemsTypes.Achievements:
        dispatch(showLoader());
        trigger({})
          .unwrap()
          .then((data) => {
            dispatch(addUserExercisesData({ userExercises: data }));
            history.push(ROUTE_PATHS.achievements);
          })
          .catch(() => {
            dispatch(addModal({ type: ModalWindowTypes.ServerErrorExercise }));
          })
          .finally(() => dispatch(hideLoader()));
        dispatch(removeNavData());
        break;
      default:
        break;
    }
  }, [typeNav, dispatch, trigger]);

  useEffect(() => {
    if (allUserExercises) {
      dispatch(addUserExercisesData({ userExercises: allUserExercises }));
    }
  }, [allUserExercises, dispatch]);

  return children;
};
