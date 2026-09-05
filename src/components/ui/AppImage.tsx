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
    showLoadingState?: boolean;
    [key: string]: any;
}

const DEFAULT_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F3F4F6'/%3E%3Ctext x='200' y='155' font-family='system-ui, Arial, sans-serif' font-size='18' fill='%239CA3AF' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

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
    showLoadingState = true,
    ...props
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [loadStartTime] = useState(Date.now());

    // ✅ Check if URL is external, data URI, or SVG
    const isExternalUrl = useMemo(() => {
        if (typeof imageSrc !== 'string') return false;
        return imageSrc.startsWith('http://') || imageSrc.startsWith('https://');
    }, [imageSrc]);

    const isDataUri = useMemo(() => {
        if (typeof imageSrc !== 'string') return false;
        return imageSrc.startsWith('data:');
    }, [imageSrc]);

    const resolvedUnoptimized = useMemo(() => {
        return unoptimized || isExternalUrl || isDataUri;
    }, [unoptimized, isExternalUrl, isDataUri]);

    const defaultSizes = useMemo(() => {
        return sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }, [sizes]);

    const handleError = useCallback(() => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    }, [hasError, imageSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    // ✅ Show loading state for at least 300ms to avoid flicker
    const shouldShowLoading = useMemo(() => {
        if (!showLoadingState) return false;
        return isLoading && (Date.now() - loadStartTime < 300);
    }, [isLoading, loadStartTime, showLoadingState]);

    // ✅ Memoize className with loading state
    const imageClassName = useMemo(() => {
        const classes = [className];
        if (shouldShowLoading) classes.push('bg-gray-200 animate-pulse');
        if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
        return classes.filter(Boolean).join(' ');
    }, [className, shouldShowLoading, onClick]);

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
                {/* ✅ Loading skeleton */}
                {shouldShowLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-inherit" />
                )}
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
        <div className="relative inline-block" style={{ width: width || 400, height: height || 300 }}>
            {/* ✅ Loading skeleton */}
            {shouldShowLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-inherit" />
            )}
            <Image
                {...imageProps}
                width={width || 400}
                height={height || 300}
                {...props}
            />
        </div>
    );
});

AppImage.displayName = 'AppImage';

export default AppImage;
