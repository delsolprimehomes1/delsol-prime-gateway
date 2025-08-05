import { Helmet } from 'react-helmet-async';

interface SearchEngineVerificationProps {
  googleVerificationCode?: string;
  bingVerificationCode?: string;
  yandexVerificationCode?: string;
}

export function SearchEngineVerification({
  googleVerificationCode,
  bingVerificationCode,
  yandexVerificationCode
}: SearchEngineVerificationProps) {
  return (
    <Helmet>
      {/* Google Search Console Verification */}
      {googleVerificationCode && (
        <meta name="google-site-verification" content={googleVerificationCode} />
      )}
      
      {/* Bing Webmaster Tools Verification */}
      {bingVerificationCode && (
        <meta name="msvalidate.01" content={bingVerificationCode} />
      )}
      
      {/* Yandex Webmaster Verification */}
      {yandexVerificationCode && (
        <meta name="yandex-verification" content={yandexVerificationCode} />
      )}
      
      {/* Additional meta tags for better crawling */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Geo-targeting for Spain/Costa del Sol */}
      <meta name="geo.region" content="ES-AN" />
      <meta name="geo.placename" content="Costa del Sol, Spain" />
      <meta name="geo.position" content="36.5201;-4.8871" />
      <meta name="ICBM" content="36.5201, -4.8871" />
    </Helmet>
  );
}