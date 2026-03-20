'use client';

import Script from 'next/script';

export default function BookingWidget() {
  return (
    <>
      <Script
        src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
        strategy="afterInteractive"
      />
      <div className='overflow-y-scroll md:overflow-visible'
        dangerouslySetInnerHTML={{
          __html: `<hospitable-direct-mps identifier="83f73e42-8f5d-4ebf-9683-dd3078a96cec" type="custom" "></hospitable-direct-mps>`,
        }}
      />
    </>
  );
}