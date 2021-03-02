import { LegacyRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  createPopper,
  OptionsGeneric,
  Instance,
  VirtualElement,
} from '@popperjs/core';

const usePopper = (popperConfig: OptionsGeneric<any>) => {
  const [toggledState, setToggledState] = useState(false);
  const [popperInstance, setPopperInstance] = useState<Instance>();

  const triggerRef = useRef<Element | VirtualElement>();
  const popupRef = useRef();

  const showHandler = useCallback(() => {
    setToggledState(true);
  }, [toggledState]);

  const hideHandler = useCallback(() => {
    setToggledState(false);
  }, [toggledState]);

  useEffect(() => {
    const popper = createPopper(
      triggerRef.current,
      popupRef.current,
      popperConfig || {},
    );

    setPopperInstance(popper);

    return () => popper.destroy();
  }, [popperConfig]);

  useEffect(() => {
    toggledState === true && popperInstance.forceUpdate();
  }, [toggledState, popperInstance]);

  return [triggerRef, popupRef, toggledState, showHandler, hideHandler];
};

export default usePopper;
