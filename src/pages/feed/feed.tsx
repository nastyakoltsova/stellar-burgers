import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { fetchFeeds } from '../../services/slices/feedsSlice';
import { useFeedsSocket } from '../../hooks/useFeedsSocket';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeedsOrders,
  selectFeedsLoading,
  selectFeedsError
} from '../../services/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useFeedsSocket();

  const orders = useSelector(selectFeedsOrders);
  const isLoading = useSelector(selectFeedsLoading);
  const error = useSelector(selectFeedsError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  return (
    <>
      {error && (
        <p className={`text text_type_main-default pb-6 pl-5`}>{error}</p>
      )}
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
    </>
  );
};
