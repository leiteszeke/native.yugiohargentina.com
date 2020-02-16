// Dependencies
import React from 'react';
// Services
import * as CardStatusService from '#services/card-status';

const CardStatusContext = React.createContext(null);

const CardStatusProvider = React.memo(({ children }) => {
  const [statuses, setStatuses] = React.useState(null);

  const fetchStatuses = () => CardStatusService.all().then(res => setStatuses(res.data));
  const getIconById = id => statuses.find(f => f.id === id).icon;

  React.useEffect(() => {
    fetchStatuses();
  }, [])

  return (
    <CardStatusContext.Provider value={{ getIconById, statuses }}>
      {children}
    </CardStatusContext.Provider>
  )
});

const useCardStatus = () => {
  const { getIconById, statuses } = React.useContext(CardStatusContext)
  return { getIconById, statuses }
}

export { CardStatusProvider, useCardStatus };