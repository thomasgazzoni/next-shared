import { useCallback, useRef, useState } from 'react';

const useToggle = (isExpanded: boolean) => {
  const [toggledState, setToggledState] = useState(isExpanded || false);

  const eventHandler = useCallback(() => {
    setToggledState(!toggledState);
  }, [toggledState]);

  const ref = useRef();

  return [toggledState, eventHandler, ref];
};

export default useToggle;
