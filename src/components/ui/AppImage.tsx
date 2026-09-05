'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';

interface AppImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    fill?: boolean;
    sizes?: string;
    onClick?: () => void;
    fallbackSrc?: string;
    loading?: 'lazy' | 'eager';
    unoptimized?: boolean;
    [key: string]: any;
}

// ✅ Move default fallback to constant outside component
const DEFAULT_FALLBACK = '/assets/images/no_image.png';

const AppImage = memo(function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 85,
    placeholder = 'empty',
    blurDataURL,
    fill = false,
    sizes,
    onClick,
    fallbackSrc = DEFAULT_FALLBACK,
    loading = 'lazy',
    unoptimized = false,
    ...props
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // ✅ Check if URL is external - memoized
    const isExternalUrl = useMemo(() => {
        if (typeof imageSrc !== 'string') return false;
        return imageSrc.startsWith('http://') || imageSrc.startsWith('https://');
    }, [imageSrc]);

    // ✅ Use unoptimized only for external URLs or when explicitly set
    const resolvedUnoptimized = useMemo(() => {
        return unoptimized || isExternalUrl;
    }, [unoptimized, isExternalUrl]);

    // ✅ Generate optimized sizes
    const defaultSizes = useMemo(() => {
        return sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }, [sizes]);

    // ✅ Handle error with proper state management
    const handleError = useCallback(() => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    }, [hasError, imageSrc, fallbackSrc]);

    // ✅ Handle load with proper state management
    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    // ✅ Memoize className
    const imageClassName = useMemo(() => {
        const classes = [className];
        if (isLoading) classes.push('bg-gray-200');
        if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
        return classes.filter(Boolean).join(' ');
    }, [className, isLoading, onClick]);

    // ✅ Memoize image props
    const imageProps = useMemo(() => {
        const baseProps: any = {
            src: imageSrc,
            alt,
            className: imageClassName,
            quality,
            placeholder,
            unoptimized: resolvedUnoptimized,
            onError: handleError,
            onLoad: handleLoad,
            onClick,
            sizes: defaultSizes,
        };

        if (priority) {
            baseProps.priority = true;
        } else {
            baseProps.loading = loading;
        }

        if (blurDataURL && placeholder === 'blur') {
            baseProps.blurDataURL = blurDataURL;
        }

        return baseProps;
    }, [
        imageSrc,
        alt,
        imageClassName,
        quality,
        placeholder,
        blurDataURL,
        resolvedUnoptimized,
        priority,
        loading,
        handleError,
        handleLoad,
        onClick,
        defaultSizes,
    ]);

    if (fill) {
        return (
            <div
                className="relative"
                style={{ width: '100%', height: '100%' }}
                aria-hidden={!alt}
            >
                <Image
                    {...imageProps}
                    fill
                    sizes={defaultSizes}
                    style={{ objectFit: 'cover' }}
                    {...props}
                />
            </div>
        );
    }

    return (
        <Image
            {...imageProps}
            width={width || 400}
            height={height || 300}
            {...props}
        />
    );
});

AppImage.displayName = 'AppImage';

export default AppImage;
