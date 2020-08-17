import React from 'react';
import { AppConfig } from 'config/app';

function ScriptAdSense() {
  // function downloadJSAtOnload() {
  //   const element = document.createElement('script');

  //   element.src =
  //     'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  //   document.body.appendChild(element);
  // }
  // if (canUseDOM) {
  //   if (window.addEventListener) {
  //     window.addEventListener('load', downloadJSAtOnload, false);
  //   } else {
  //     window.onload = downloadJSAtOnload;
  //   }
  // }

  return (
    <script
      data-ad-client={AppConfig.GoogleAdSensePubId}
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />
  );
}

export default ScriptAdSense;
