interface CompletedTimeline {
  _id: {
    month: number | null
    day: number | null
    year: number | null
  }
  count: number
}

export default CompletedTimeline
