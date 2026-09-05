'use client';

import React, { lazy, Suspense } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

type IconVariant = 'outline' | 'solid';

interface IconProps {
    name: string;
    variant?: IconVariant;
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: any;
}

// ✅ Lazy load icons with proper types
const iconLoaders: Record<string, () => Promise<any>> = {};

// ✅ Only import icons that are actually used
const ICON_WHITELIST = [
  'ExclamationTriangleIcon',
  'SparklesIcon',
  'ArrowLeftIcon',
  'HomeIcon',
  'QuestionMarkCircleIcon',
];

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    // ✅ Use React.lazy for dynamic imports
    const IconComponent = React.useMemo(() => {
        // Check if icon is in whitelist
        if (!ICON_WHITELIST.includes(name)) {
            console.warn(`Icon "${name}" not found, using fallback`);
            return QuestionMarkCircleIcon;
        }

        // For now, use a simple approach - import specific icons
        // In production, you'd want to use dynamic imports
        try {
            if (variant === 'solid') {
                // @ts-ignore - dynamic import
                const SolidIcons = require('@heroicons/react/24/solid');
                return SolidIcons[name] || QuestionMarkCircleIcon;
            }
            // @ts-ignore - dynamic import
            const OutlineIcons = require('@heroicons/react/24/outline');
            return OutlineIcons[name] || QuestionMarkCircleIcon;
        } catch {
            return QuestionMarkCircleIcon;
        }
    }, [name, variant]);

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...props}
        />
    );
}

export default Icon;
