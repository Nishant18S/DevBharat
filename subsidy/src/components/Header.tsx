import React, { useEffect } from 'react';
import { Sprout, Globe } from 'lucide-react';

// Remove the unused interface since we're not using language props
// interface HeaderProps {
//   language: string;
//   onLanguageChange: (lang: string) => void;
// }

// Declare Google Translate types
declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
            multilanguagePage: boolean;
          }, elementId: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export const Header: React.FC = () => {
  useEffect(() => {
    // Define the Google Translate initialization function
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,or,bn,te,ta,ml,kn,gu,pa,ur,as,mr',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          },
          'google_translate_element'
        );
      }
    };

    // Load Google Translate script if not already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      // If script already exists, just initialize
      if (window.googleTranslateElementInit) {
        window.googleTranslateElementInit();
      }
    }

    // Additional cleanup to hide banner after component loads
    const hideGoogleTranslateBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        (banner as HTMLElement).style.display = 'none';
      }
      
      // Also hide any other Google elements
      const elements = document.querySelectorAll('.goog-te-ftab, .goog-te-balloon-frame');
      elements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      
      // Remove the top margin that Google Translate adds to body
      document.body.style.top = '0px';
      document.body.style.position = 'static';
    };

    // Run the cleanup function periodically to catch dynamically added elements
    const interval = setInterval(hideGoogleTranslateBanner, 100);
    
    // Cleanup interval after 5 seconds
    setTimeout(() => clearInterval(interval), 5000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
      <div className="absolute top-8 right-20 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Sprout className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Agricultural Subsidy Management System
              </h1>
              <p className="text-lg opacity-90">
                Complete your farming steps and get eligible for government subsidies
              </p>
            </div>
          </div>

          {/* Google Translate Widget */}
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-white" />
            <div className="flex items-center relative">
              <div 
                id="google_translate_element"
                className="google-translate-container"
              ></div>
              <div className="translate-label text-sm text-white opacity-75 absolute -bottom-5 left-0 whitespace-nowrap">
                Select Language
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Google Translate Styles */}
      <style jsx global>{`
        /* HIDE ALL GOOGLE TRANSLATE BANNERS AND FRAMES */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        .goog-te-ftab,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          max-height: 0 !important;
        }

        /* Prevent body displacement */
        body {
          top: 0 !important;
          position: static !important;
        }

        html body {
          top: 0 !important;
        }

        /* Style the Google Translate widget */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }

        .goog-te-gadget-simple {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15)) !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          border-radius: 12px !important;
          padding: 10px 16px !important;
          font-size: 14px !important;
          color: white !important;
          font-family: inherit !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          transition: all 0.3s ease !important;
          min-width: 140px !important;
          text-align: center !important;
        }

        .goog-te-gadget-simple:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25)) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
        }

        .goog-te-gadget-simple .goog-te-menu-value {
          color: white !important;
          font-weight: 500 !important;
        }

        .goog-te-gadget-simple .goog-te-menu-value span {
          color: white !important;
        }

        .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }

        /* Hide the default icon */
        .goog-te-gadget-icon {
          display: none !important;
        }


        /* Remove any links styling */
        .goog-te-gadget .goog-te-gadget-simple a {
          text-decoration: none !important;
        }

        /* Additional cleanup for any remaining elements */
        .skiptranslate iframe {
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
        }

        /* Force hide notification frame */
        .goog-te-spinner-pos {
          display: none !important;
        }
      `}</style>
    </header>
  );
};