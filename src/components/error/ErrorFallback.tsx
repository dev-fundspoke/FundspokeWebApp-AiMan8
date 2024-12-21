import React from 'react';
import { SciFiCard } from '../common/SciFiCard';
import { GlowingText } from '../common/GlowingText';
import { darkTheme } from '../../styles/themes/dark';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SciFiCard className="p-6 w-full max-w-lg">
        <GlowingText 
          className="text-xl font-semibold mb-4"
          color={darkTheme.colors.accent.tertiary}
        >
          Something went wrong
        </GlowingText>
        
        {error && (
          <pre className="text-sm bg-opacity-10 bg-white p-4 rounded mb-4 overflow-auto">
            {error.message}
          </pre>
        )}
        
        {resetError && (
          <button
            onClick={resetError}
            className="px-4 py-2 rounded bg-opacity-20 bg-white hover:bg-opacity-30 transition-all"
          >
            Try again
          </button>
        )}
      </SciFiCard>
    </div>
  );
};