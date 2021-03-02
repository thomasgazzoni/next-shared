import { OptionsGeneric } from '@popperjs/core';
import React, { ReactElement } from 'react';
import usePopper from '../hooks/usePopper';

const defaultConfig: OptionsGeneric<any> = {
  placement: 'top',
  strategy: 'fixed',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
    {
      name: 'arrow',
      options: {
        padding: 5,
      },
    },
  ],
};

interface IProps {
  config?: OptionsGeneric<any>;
  tooltip: ReactElement<any> | string;
  children: ReactElement<any>;
}

function Tooltip({ config = defaultConfig, tooltip, children }: IProps) {
  const [
    triggerRef,
    popupRef,
    isExpanded,
    showHandler,
    hideHandler,
  ] = usePopper(config);

  const tooltipProps = {
    onMouseEnter: showHandler,
    onMouseLeave: hideHandler,
    onFocus: showHandler,
    onBlur: hideHandler,
    ref: triggerRef,
  };

  return (
    <>
      {React.cloneElement(children, tooltipProps)}
      <div ref={popupRef as any} className="tooltip-popper">
        {isExpanded && (
          <>
            <div data-popper-arrow className="tooltip-arrow" />
            <div className="tooltip-container">
              <div className="tooltip-content">{tooltip}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Tooltip;
