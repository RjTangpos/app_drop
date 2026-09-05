'use client';

import React, { useState, useRef } from 'react';

interface UploadFormData {
  versionName: string;
  versionCode: string;
  platform: string;
  releaseNotes: string;
  minAndroid: string;
  status: 'live' | 'draft';
}

export default function UploadSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<UploadFormData>({
    versionName: '',
    versionCode: '',
    platform: 'Android',
    releaseNotes: '',
    minAndroid: '8.0',
    status: 'draft',
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.apk') || file.name.endsWith('.aab'))) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (!selectedFile) {
      setError('Please select an APK file to upload.');
      return false;
    }
    if (!form.versionName.trim()) {
      setError('Version name is required.');
      return false;
    }
    if (!form.versionCode.trim()) {
      setError('Version code is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setUploading(true);

    try {
      // Simulate upload (no real backend)
      await new Promise((resolve, reject) => {
        // Simulate random failure for testing (remove in production)
        const shouldFail = Math.random() < 0.1;
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error('Network error: Failed to upload APK. Please try again.'));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      setSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setSelectedFile(null);
        setForm({
          versionName: '',
          versionCode: '',
          platform: 'Android',
          releaseNotes: '',
          minAndroid: '8.0',
          status: 'draft',
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload APK. Please try again.';
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">Upload New APK</h2>
        <p className="text-sm text-muted-foreground">Publish a new version of AppDrop to the public download page.</p>
      </div>

      {success && (
        <div
          className="mb-6 flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 rounded-2xl animate-bounce-in"
          role="alert"
          aria-live="polite"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800">Upload successful!</p>
            <p className="text-xs text-green-600">Your new version has been published.</p>
          </div>
        </div>
      )}

      {error && (
        <div
          className="mb-6 flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-2xl animate-fade-up"
          role="alert"
          aria-live="assertive"
        >
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-red-800">Upload failed</p>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* File Drop Zone */}
        <div
          className={`file-drop-zone rounded-2xl p-8 text-center cursor-pointer transition-all ${
            dragOver ? 'dropzone-active' : ''
          } ${selectedFile ? 'border-green-400 bg-green-50' : ''} ${
            error && !selectedFile ? 'border-red-400 bg-red-50' : ''
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="File upload dropzone"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".apk,.aab"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Choose APK file"
          />

          {selectedFile ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setError(null); }}
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove selected file"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" x2="12" y1="3" y2="15"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Drop your APK here</p>
                <p className="text-xs text-muted-foreground">or click to browse — .apk or .aab files only</p>
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="versionName" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Version Name *
            </label>
            <input
              id="versionName"
              type="text"
              value={form.versionName}
              onChange={(e) => setForm({ ...form, versionName: e.target.value })}
              placeholder="e.g. 3.3.0"
              required
              aria-required="true"
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-all"
            />
          </div>
          <div>
            <label htmlFor="versionCode" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Version Code *
            </label>
            <input
              id="versionCode"
              type="text"
              value={form.versionCode}
              onChange={(e) => setForm({ ...form, versionCode: e.target.value })}
              placeholder="e.g. 33"
              required
              aria-required="true"
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-all"
            />
          </div>
          <div>
            <label htmlFor="minAndroid" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Min Android Version
            </label>
            <select
              id="minAndroid"
              value={form.minAndroid}
              onChange={(e) => setForm({ ...form, minAndroid: e.target.value })}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-all"
            >
              <option value="8.0">Android 8.0 (Oreo)</option>
              <option value="9.0">Android 9.0 (Pie)</option>
              <option value="10.0">Android 10</option>
              <option value="11.0">Android 11</option>
              <option value="12.0">Android 12</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Status
            </label>
            <select
              id="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as 'live' | 'draft' })}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-all"
            >
              <option value="draft">Draft (not public)</option>
              <option value="live">Live (public download)</option>
            </select>
          </div>
        </div>

        {/* Release Notes */}
        <div>
          <label htmlFor="releaseNotes" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Release Notes
          </label>
          <textarea
            id="releaseNotes"
            value={form.releaseNotes}
            onChange={(e) => setForm({ ...form, releaseNotes: e.target.value })}
            placeholder="What's new in this version? Bug fixes, new features, improvements..."
            rows={4}
            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!selectedFile || uploading}
          className="btn-download w-full py-4 text-primary-foreground text-sm font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={uploading ? 'Uploading APK...' : 'Publish APK'}
        >
          {uploading ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" x2="12" y1="3" y2="15"/>
              </svg>
              Publish APK
            </>
          )}
        </button>
      </form>
    </div>
  );
}
