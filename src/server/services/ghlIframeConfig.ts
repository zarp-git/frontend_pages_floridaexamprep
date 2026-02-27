/**
 * GHL Iframe Configuration Service
 * =================================
 * Service for managing GoHighLevel iframe configurations for checkout pages.
 * Provides configuration lookup, validation, and startup checks.
 */

import type { CourseSlug } from "@/types/courses"

/**
 * Configuration interface for GHL iframes
 */
export interface GHLIframeConfig {
  url: string
  allowedOrigins: string[]
  timeout: number // milliseconds
  sandbox: string // sandbox attribute value
}

/**
 * Configuration service interface
 */
export interface GHLConfigService {
  getIframeConfig(courseSlug: string): GHLIframeConfig | null
  validateConfig(): boolean
  getAllConfigs(): Map<string, GHLIframeConfig>
}

/**
 * Environment variable keys for each pricing tier
 */
const ENV_VAR_KEYS: Record<CourseSlug, string> = {
  "primary-course": "NEXT_PUBLIC_GHL_IFRAME_PRIMARY_COURSE",
  "primary-books": "NEXT_PUBLIC_GHL_IFRAME_PRIMARY_BOOKS",
  "premium-books": "NEXT_PUBLIC_GHL_IFRAME_PREMIUM_BOOKS",
}

/**
 * Get iframe configuration for a specific course
 * @param courseSlug - The course identifier
 * @returns Configuration object or null if not found/invalid
 */
export function getIframeConfig(courseSlug: string): GHLIframeConfig | null {
  const envKey = ENV_VAR_KEYS[courseSlug as CourseSlug]
  
  if (!envKey) {
    console.error(`[GHL_CONFIG] Invalid course slug: ${courseSlug}`)
    return null
  }

  const url = process.env[envKey]
  const origin = process.env.NEXT_PUBLIC_GHL_ORIGIN

  if (!url || !origin) {
    console.error(`[GHL_CONFIG] Missing configuration for course: ${courseSlug}`, {
      url: !!url,
      origin: !!origin,
    })
    return null
  }

  // Validate URL format
  if (!url.startsWith("https://")) {
    console.error(`[GHL_CONFIG] Invalid URL format for ${courseSlug}: must start with https://`)
    return null
  }

  return {
    url,
    allowedOrigins: [origin],
    timeout: 5000,
    sandbox: "allow-scripts allow-forms allow-same-origin allow-popups",
  }
}

/**
 * Validate that all required environment variables are configured
 * @returns true if all configurations are valid, false otherwise
 */
export function validateConfig(): boolean {
  const origin = process.env.NEXT_PUBLIC_GHL_ORIGIN

  if (!origin) {
    console.error("[GHL_CONFIG] Missing NEXT_PUBLIC_GHL_ORIGIN environment variable")
    return false
  }

  const courseSlugs: CourseSlug[] = [
    "primary-course",
    "primary-books",
    "premium-books",
  ]

  let isValid = true
  const missingConfigs: string[] = []

  for (const slug of courseSlugs) {
    const envKey = ENV_VAR_KEYS[slug]
    const url = process.env[envKey]

    if (!url) {
      missingConfigs.push(envKey)
      isValid = false
    } else if (!url.startsWith("https://")) {
      console.error(`[GHL_CONFIG] Invalid URL format for ${slug}: ${url}`)
      isValid = false
    }
  }

  if (missingConfigs.length > 0) {
    console.error("[GHL_CONFIG] Missing environment variables:", missingConfigs)
  }

  return isValid
}

/**
 * Get all iframe configurations as a Map
 * @returns Map of course slug to configuration
 */
export function getAllConfigs(): Map<string, GHLIframeConfig> {
  const configs = new Map<string, GHLIframeConfig>()

  const courseSlugs: CourseSlug[] = [
    "primary-course",
    "primary-books",
    "premium-books",
  ]

  for (const slug of courseSlugs) {
    const config = getIframeConfig(slug)
    if (config) {
      configs.set(slug, config)
    }
  }

  return configs
}

/**
 * Startup validation - throws error if configuration is invalid
 * This should be called during application initialization
 */
export function validateConfigOrThrow(): void {
  const isValid = validateConfig()

  if (!isValid) {
    const errorMessage = `
[GHL_CONFIG] Configuration validation failed!

Required environment variables:
- NEXT_PUBLIC_GHL_ORIGIN
- NEXT_PUBLIC_GHL_IFRAME_PRIMARY_COURSE
- NEXT_PUBLIC_GHL_IFRAME_PRIMARY_BOOKS
- NEXT_PUBLIC_GHL_IFRAME_PREMIUM_BOOKS

Please ensure all variables are set in your .env.local file.
See .env.example for reference.
    `.trim()

    throw new Error(errorMessage)
  }

  console.log("[GHL_CONFIG] Configuration validated successfully")
}

// Startup validation disabled to prevent crashes during Turbopack initialization
// The validation will still happen when getIframeConfig() is called at runtime
// If you need to manually validate the configuration, call validateConfigOrThrow()
//
// if (process.env.NODE_ENV !== "test") {
//   try {
//     validateConfigOrThrow()
//   } catch (error) {
//     // Log error but don't crash during build time
//     // The error will be thrown at runtime when the config is actually needed
//     if (process.env.NODE_ENV === "production") {
//       console.error(error)
//     }
//   }
// }
