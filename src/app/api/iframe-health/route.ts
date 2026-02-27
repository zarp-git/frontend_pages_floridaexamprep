/**
 * GHL Iframe Health Check API Route
 * ==================================
 * Provides health status for all configured GHL iframe URLs.
 * Checks accessibility and measures response time for each course.
 */

import { NextResponse } from "next/server"
import { getAllConfigs } from "@/server/services/ghlIframeConfig"
import type { IframeHealthStatus } from "@/types/monitoring"

/**
 * Check if a URL is accessible using HEAD request
 * @param url - The URL to check
 * @returns Object with accessibility status and response time
 */
async function checkUrlAccessibility(
  url: string
): Promise<{ isAccessible: boolean; responseTime: number }> {
  const startTime = Date.now()

  try {
    // Use HEAD request for performance (no body download)
    const response = await fetch(url, {
      method: "HEAD",
      // Set timeout to prevent hanging
      signal: AbortSignal.timeout(5000),
    })

    const responseTime = Date.now() - startTime
    const isAccessible = response.ok // 200-299 status codes

    return { isAccessible, responseTime }
  } catch (error) {
    const responseTime = Date.now() - startTime

    // Log error for debugging
    console.error(`[HEALTH_CHECK] Failed to check URL: ${url}`, {
      error: error instanceof Error ? error.message : String(error),
      responseTime,
    })

    return { isAccessible: false, responseTime }
  }
}

/**
 * GET handler for health check endpoint
 * Returns health status for all configured iframe URLs
 */
export async function GET(): Promise<NextResponse<IframeHealthStatus[]>> {
  const configs = getAllConfigs()
  const healthStatuses: IframeHealthStatus[] = []
  const lastChecked = Date.now()

  // Check each configured iframe URL
  const checks = Array.from(configs.entries()).map(
    async ([courseSlug, config]) => {
      const { isAccessible, responseTime } = await checkUrlAccessibility(
        config.url
      )

      return {
        courseSlug,
        isAccessible,
        lastChecked,
        responseTime,
      }
    }
  )

  // Wait for all checks to complete
  const results = await Promise.all(checks)
  healthStatuses.push(...results)

  // Log summary
  const accessibleCount = healthStatuses.filter((s) => s.isAccessible).length
  console.log(`[HEALTH_CHECK] Checked ${healthStatuses.length} iframes`, {
    accessible: accessibleCount,
    inaccessible: healthStatuses.length - accessibleCount,
  })

  return NextResponse.json(healthStatuses)
}
