// Enterprise-level color palette from design system
export const CHART_COLORS = {
  primary: [
    '#52B69A', // Teal
    '#34A0A4', // Medium Teal
    '#168AAD', // Deep Teal
    '#1A759F', // Blue Teal
    '#1E6091', // Deep Blue
    '#184E77', // Navy Blue
    '#76C893', // Light Green
    '#99D98C', // Medium Green
    '#B5E48C', // Light Lime
    '#D9ED92', // Yellow Green
  ],
  
  // Exact colors from the provided palette
  palette: {
    yellowGreen: '#D9ED92',
    lightLime: '#B5E48C', 
    mediumGreen: '#99D98C',
    lightGreen: '#76C893',
    teal: '#52B69A',
    mediumTeal: '#34A0A4',
    deepTeal: '#168AAD',
    blueTeal: '#1A759F',
    deepBlue: '#1E6091',
    navyBlue: '#184E77',
  },
  
  heatmap: {
    low: '#D9ED92',    // Yellow Green
    midLow: '#B5E48C', // Light Lime
    mid: '#52B69A',    // Teal
    midHigh: '#1A759F',// Blue Teal
    high: '#184E77',   // Navy Blue
    zero: '#f9fafb',   // Gray 50
  },
  
  success: '#52B69A',
  warning: '#D9ED92',
  error: '#1E6091',
  info: '#168AAD',
  
  // Gradient combinations for headers
  gradients: {
    primary: 'from-[#52B69A] to-[#168AAD]', // Teal to Deep Teal
    secondary: 'from-[#168AAD] to-[#1A759F]', // Deep Teal to Blue Teal
    tertiary: 'from-[#1A759F] to-[#1E6091]', // Blue Teal to Deep Blue
  }
}

export const CHART_THEME = {
  grid: {
    strokeDasharray: '3 3',
    stroke: '#e5e7eb',
  },
  
  axis: {
    style: {
      fontSize: 12,
      fill: '#000000',
    },
  },
  
  tooltip: {
    contentStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    labelStyle: {
      fontWeight: 600,
      color: '#111827',
    },
  },
  
  legend: {
    wrapperStyle: {
      paddingTop: '20px',
    },
    iconType: 'rect' as const,
    iconSize: 12,
    style: {
      color: '#000000',
    },
  },
}

// Extended color palette for more variety with solid colors
export const EXTENDED_COLORS = [
  '#52B69A', // Teal
  '#34A0A4', // Medium Teal
  '#168AAD', // Deep Teal
  '#1A759F', // Blue Teal
  '#1E6091', // Deep Blue
  '#184E77', // Navy Blue
  '#76C893', // Light Green
  '#99D98C', // Medium Green
  '#B5E48C', // Light Lime
  '#D9ED92', // Yellow Green
  '#2D9CDB', // Bright Blue
  '#27AE60', // Green
  '#8E44AD', // Purple
  '#E74C3C', // Red
  '#F39C12', // Orange
  '#1ABC9C', // Turquoise
  '#3498DB', // Sky Blue
  '#9B59B6', // Violet
  '#E67E22', // Dark Orange
  '#16A085', // Dark Turquoise
]

export const getChartColor = (index: number, subIndex?: number): string => {
  // Always return solid colors - no gradient/lightening effect
  // For stacked bars, use different positions in the color palette
  if (subIndex !== undefined && subIndex > 0) {
    // For secondary items in stacking, pick colors from different positions
    // This ensures solid distinct colors for each segment within a stack
    const colorIndex = (index + subIndex * 5) % EXTENDED_COLORS.length
    return EXTENDED_COLORS[colorIndex]
  }

  return CHART_COLORS.primary[index % CHART_COLORS.primary.length]
}

export const getHeatmapColor = (value: number, min: number, max: number): string => {
  if (value === 0) return CHART_COLORS.heatmap.zero
  
  const range = max - min
  if (range === 0) return CHART_COLORS.heatmap.mid
  
  const percentage = ((value - min) / range) * 100
  
  if (percentage < 20) return CHART_COLORS.heatmap.low
  if (percentage < 40) return CHART_COLORS.heatmap.midLow
  if (percentage < 60) return CHART_COLORS.heatmap.mid
  if (percentage < 80) return CHART_COLORS.heatmap.midHigh
  return CHART_COLORS.heatmap.high
}
