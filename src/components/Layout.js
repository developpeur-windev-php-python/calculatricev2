import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Layout({ children, title, description }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title ? `${title}` : 'Mon Site'}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      {children}
    </HelmetProvider>
  );
}

export default Layout;
