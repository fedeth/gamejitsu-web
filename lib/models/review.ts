import { Replay } from "gamejitsu/api/resources/replay"
import { Comment } from "gamejitsu/api/types/comment"
import { ReviewRequest } from "gamejitsu/api/resources/review-request"
import { Review } from "gamejitsu/api/resources/review"
import { Coach } from "gamejitsu/api/resources/coach"
import { DecoratedReplay, decorateReplay } from "gamejitsu/models/replay"

export interface DecoratedReview extends Review {
  reviewRequest: ReviewRequest
  replay: DecoratedReplay
  coachId: string
  comments: Comment[]
  id: string
  isPublished: boolean
  isDeleted: boolean
  requestId: string
}

interface IncludedReviews {
  "review-request": ReviewRequest[]
  replay: Replay[]
  coach: Coach[]
}

export const decorateReview = (review: Review, included: IncludedReviews) => {
  const reviewRequest = included["review-request"].find((r) => r.id === review.requestId)
  const replay = included.replay.find((r) => r.id === reviewRequest?.replayId)
  if (reviewRequest && replay) {
    return {
      reviewRequest,
      replay: decorateReplay(replay),
      coachId: review.coachId,
      comments: review.comments,
      id: review.id,
      isPublished: review.isPublished,
      isDeleted: review.isDeleted,
      requestId: review.requestId
    }
  } else {
    throw new Error("Review request or replay not found!")
  }
}

export const decorateReviews = (reviews: Review[], included: IncludedReviews) => {
  return reviews.map((review) => {
    const reviewRequest = included["review-request"].find((r) => r.id === review.requestId)
    const replay = included.replay.find((r) => r.id === reviewRequest?.replayId)
    if (reviewRequest && replay) {
      return {
        reviewRequest,
        replay: decorateReplay(replay),
        coachId: review.coachId,
        comments: review.comments,
        id: review.id,
        isPublished: review.isPublished,
        isDeleted: review.isDeleted,
        requestId: review.requestId
      }
    } else {
      throw new Error("Review request or replay not found!")
    }
  })
}
