import { NextRequest, NextResponse } from 'next/server'
import { loadAndProcessJsonFiles } from '@/lib/json-processor'
import * as fs from 'fs/promises'
import * as path from 'path'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const valuePath = searchParams.get('valuePath') || 'data/value.json'
    const volumePath = searchParams.get('volumePath') || 'data/volume.json'
    const segmentationPath = searchParams.get('segmentationPath') || 'data/segmentation_analysis.json'
    
    const currentDir = process.cwd()
    const publicDataDir = path.join(currentDir, 'public', 'data')
    
    const resolvePath = (filePath: string): string => {
      if (path.isAbsolute(filePath)) return filePath
      const cleanPath = filePath.replace(/^data\//, '')
      return path.join(publicDataDir, cleanPath)
    }
    
    const resolvedValuePath = resolvePath(valuePath)
    const resolvedVolumePath = volumePath ? resolvePath(volumePath) : null
    const resolvedSegmentationPath = segmentationPath ? resolvePath(segmentationPath) : null

    console.log('🔊 API Route - File paths:', {
      valuePath,
      volumePath,
      segmentationPath,
      resolvedValuePath,
      resolvedVolumePath,
      resolvedSegmentationPath,
      publicDataDir
    })

    let finalValuePath = resolvedValuePath
    let finalVolumePath = resolvedVolumePath
    let finalSegmentationPath = resolvedSegmentationPath

    try {
      await fs.access(finalValuePath)
      console.log('🔊 Value file exists:', finalValuePath)
    } catch {
      const errorMsg = 'Value file not found: ' + finalValuePath
      console.error('🔊 Value file NOT found:', finalValuePath)
      return NextResponse.json(
        { error: errorMsg },
        { status: 404 }
      )
    }

    if (finalVolumePath) {
      try {
        await fs.access(finalVolumePath)
        console.log('🔊 Volume file exists:', finalVolumePath)
      } catch (err) {
        console.warn('🔊 Volume file NOT found, setting to null:', finalVolumePath, err)
        finalVolumePath = null
      }
    } else {
      console.log('🔊 Volume path is null/empty, no volume file will be loaded')
    }
    
    if (finalSegmentationPath) {
      try {
        await fs.access(finalSegmentationPath)
      } catch {
        finalSegmentationPath = null
      }
    }
    
    console.log('🔊 Calling loadAndProcessJsonFiles with:', {
      finalValuePath,
      finalVolumePath,
      finalSegmentationPath
    })

    const comparisonData = await loadAndProcessJsonFiles(
      finalValuePath,
      finalVolumePath,
      finalSegmentationPath
    )

    console.log('🔊 API Response summary:', {
      hasVolume: comparisonData.metadata?.has_volume,
      hasValue: comparisonData.metadata?.has_value,
      valueRecords: comparisonData.data?.value?.geography_segment_matrix?.length || 0,
      volumeRecords: comparisonData.data?.volume?.geography_segment_matrix?.length || 0,
      sampleVolumeRecord: comparisonData.data?.volume?.geography_segment_matrix?.[0] ? {
        geo: comparisonData.data.volume.geography_segment_matrix[0].geography,
        seg: comparisonData.data.volume.geography_segment_matrix[0].segment,
        ts: Object.entries(comparisonData.data.volume.geography_segment_matrix[0].time_series || {}).slice(0, 3)
      } : 'NONE'
    })

    return NextResponse.json(comparisonData)
  } catch (error) {
    console.error('Error processing JSON files:', error)
    const errorMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { 
        error: 'Failed to process JSON files',
        details: errorMsg
      },
      { status: 500 }
    )
  }
}
