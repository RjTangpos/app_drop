import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const versionSchema = z.object({
  versionName: z.string()
    .regex(/^v?\d+\.\d+\.\d+$/, 'Must be semantic version (e.g., 1.0.0 or v1.0.0)'),
  versionCode: z.string()
    .regex(/^\d+$/, 'Version code must be a number'),
  releaseNotes: z.string()
    .max(500, 'Release notes must be less than 500 characters')
    .optional(),
  minAndroid: z.string().optional(),
  status: z.enum(['live', 'draft']),
});

export const fileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size < 100 * 1024 * 1024, 'File size must be less than 100MB')
    .refine(
      (file) => file.name.endsWith('.apk') || file.name.endsWith('.aab'),
      'File must be an APK or AAB file'
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type VersionInput = z.infer<typeof versionSchema>;
export type FileInput = z.infer<typeof fileSchema>;
